export const formatALL = (value) => {
    return new Intl.NumberFormat('sq-AL', {
        style: 'currency',
        currency: 'ALL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatCurrency = (value, currency, rates) => {
    if (value === null || value === undefined) value = 0;
    const isALL = currency === 'ALL';
    const rate = rates[currency] || 1;
    const convertedValue = isALL ? value : value / rate;

    return new Intl.NumberFormat(isALL ? 'sq-AL' : (currency === 'USD' ? 'en-US' : 'de-DE'), {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(convertedValue);
};

const NEWS_SOURCES = [
    {
        id: 'tatime-wordpress',
        endpoint: 'https://www.tatime.gov.al/wp-json/wp/v2/posts?per_page=6&_fields=id,link,title.rendered,modified',
        baseUrl: 'https://www.tatime.gov.al',
        hostLabel: 'tatime.gov.al',
        parser: async (response) => {
            const payload = await response.json();
            if (!Array.isArray(payload)) return [];
            return payload.map(entry => ({
                id: entry.id ?? entry.link,
                title: entry.title?.rendered ?? entry.title ?? '',
                link: entry.link,
                updatedAt: entry.modified ?? entry.date,
                source: 'tatime.gov.al',
            }));
        },
    },
    {
        id: 'tatime-open-data',
        endpoint: 'https://www.tatime.gov.al/c/657/open-data',
        baseUrl: 'https://www.tatime.gov.al',
        hostLabel: 'tatime.gov.al',
        parser: async (response) => {
            const markup = await response.text();
            return parseOpenDataMarkup(markup, 'https://www.tatime.gov.al');
        },
    },
    {
        id: 'lajmi9-rssing',
        endpoint: 'https://lajmi9.rssing.com/chan-51245418/all_p9.html',
        baseUrl: 'https://lajmi9.rssing.com',
        hostLabel: 'lajmi9.rssing.com',
        parser: async (response) => {
            const markup = await response.text();
            return parseGenericNewsMarkup(markup, {
                baseUrl: 'https://lajmi9.rssing.com',
                hostLabel: 'lajmi9.rssing.com',
                minimumTitleLength: 20,
            });
        },
    },
];

const NEWS_CACHE_DURATION = 15 * 60 * 1000;
const newsCache = {
    timestamp: 0,
    data: null,
    promise: null,
    lastSource: null,
};

const decodeHtmlEntities = (value) => {
    if (!value) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
};

const sanitizeNewsTitle = (value) => {
    if (!value) return '';
    return decodeHtmlEntities(String(value))
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

const ensureAbsoluteUrl = (maybeRelative, baseUrl) => {
    if (!maybeRelative) return '';
    try {
        return new URL(maybeRelative, baseUrl || window.location.origin).toString();
    } catch {
        return '';
    }
};

const normalizeNewsTimestamp = (value) => {
    if (!value) return null;
    if (value instanceof Date) {
        return value.toISOString();
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        return new Date(value).toISOString();
    }
    const stringValue = String(value).trim();
    if (!stringValue) return null;
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(stringValue) || /^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
        return stringValue;
    }
    const parsed = Date.parse(stringValue);
    if (Number.isNaN(parsed)) return null;
    return new Date(parsed).toISOString();
};

const extractHostName = (value) => {
    try {
        return new URL(value).hostname.replace(/^www\./, '');
    } catch {
        return '';
    }
};

const parseHtmlDocument = (markup) => {
    if (!markup) return null;
    try {
        if (typeof DOMParser !== 'undefined') {
            return new DOMParser().parseFromString(markup, 'text/html');
        }
        const template = document.createElement('template');
        template.innerHTML = markup;
        return template.content;
    } catch (error) {
        console.warn('Failed to parse HTML markup for news feed', error);
        return null;
    }
};

const parseOpenDataMarkup = (markup, baseUrl) => {
    const documentRoot = parseHtmlDocument(markup);
    if (!documentRoot) return [];

    const items = [];
    const seen = new Set();
    const candidateSelectors = ['article', '.e-loop-item', '.elementor-post', '.jeg_post', '.post', '.news-item', 'li'];
    const candidates = candidateSelectors.flatMap(selector => Array.from(documentRoot.querySelectorAll?.(selector) || []));

    const tryAppendItem = (anchorNode, contextNode) => {
        if (!anchorNode) return;
        const link = ensureAbsoluteUrl(anchorNode.getAttribute('href'), baseUrl);
        if (!link || seen.has(link)) return;
        const title = sanitizeNewsTitle(anchorNode.textContent || contextNode?.textContent || '');
        if (!title || title.length < 8) return;

        const timeNode = contextNode?.querySelector?.('time');
        const timestamp = normalizeNewsTimestamp(timeNode?.getAttribute?.('datetime') || timeNode?.textContent || null);

        items.push({
            id: link,
            title,
            link,
            updatedAt: timestamp,
            source: 'tatime.gov.al',
        });
        seen.add(link);
    };

    candidates.forEach(node => {
        if (items.length >= 8) return;
        const anchorNode = node.querySelector?.('a[href]') || node;
        tryAppendItem(anchorNode, node);
    });

    if (items.length < 4) {
        const anchors = Array.from(documentRoot.querySelectorAll?.('a[href*="tatime.gov.al"]') || []);
        anchors.forEach(anchor => {
            if (items.length >= 8) return;
            tryAppendItem(anchor, anchor.closest?.('article, .e-loop-item, .elementor-post, .jeg_post, .post, .news-item, li'));
        });
    }

    return items.slice(0, 6);
};

const parseGenericNewsMarkup = (markup, { baseUrl, hostLabel, minimumTitleLength = 10 } = {}) => {
    const documentRoot = parseHtmlDocument(markup);
    if (!documentRoot) return [];

    const items = [];
    const seen = new Set();
    const anchors = Array.from(documentRoot.querySelectorAll?.('a[href]') || []);

    anchors.forEach(anchor => {
        if (items.length >= 6) return;
        const link = ensureAbsoluteUrl(anchor.getAttribute('href'), baseUrl);
        if (!link || seen.has(link)) return;
        if (baseUrl && !link.startsWith(baseUrl)) return;

        const title = sanitizeNewsTitle(anchor.textContent || '');
        if (!title || title.length < minimumTitleLength) return;

        items.push({
            id: link,
            title,
            link,
            updatedAt: null,
            source: hostLabel || extractHostName(link),
        });
        seen.add(link);
    });

    return items;
};

const standardizeNewsItems = (items, { baseUrl, fallbackSource } = {}) => {
    if (!Array.isArray(items)) return [];
    const seen = new Set();
    const normalized = [];

    items.forEach((item, index) => {
        if (!item) return;
        const title = sanitizeNewsTitle(item.title || '');
        const link = ensureAbsoluteUrl(item.link || item.url, baseUrl);
        if (!title || !link) return;

        const id = item.id || `${link}-${index}`;
        if (seen.has(id)) return;
        seen.add(id);

        normalized.push({
            id,
            title,
            link,
            updatedAt: normalizeNewsTimestamp(item.updatedAt || item.published || item.pubDate || item.date),
            source: item.source || fallbackSource || '',
        });
    });

    normalized.sort((a, b) => {
        const timeA = a.updatedAt ? Date.parse(a.updatedAt) : 0;
        const timeB = b.updatedAt ? Date.parse(b.updatedAt) : 0;
        return timeB - timeA;
    });

    return normalized.slice(0, 6);
};

export const fetchNewsUpdates = async ({ forceRefresh = false } = {}) => {
    if (forceRefresh) {
        newsCache.timestamp = 0;
        newsCache.data = null;
        newsCache.lastSource = null;
    }

    const now = Date.now();

    if (!forceRefresh && newsCache.data && (now - newsCache.timestamp) < NEWS_CACHE_DURATION) {
        return newsCache.data;
    }

    if (newsCache.promise) {
        return newsCache.promise;
    }

    const request = (async () => {
        let lastError = null;

        for (const source of NEWS_SOURCES) {
            try {
                const response = await fetch(source.endpoint, {
                    mode: 'cors',
                    credentials: 'omit',
                    cache: 'no-store',
                    headers: {
                        'Accept': 'application/json, text/html;q=0.9',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to load updates from ${source.id} (HTTP ${response.status})`);
                }

                const rawItems = await source.parser(response);
                const normalized = standardizeNewsItems(rawItems, {
                    baseUrl: source.baseUrl,
                    fallbackSource: source.hostLabel || rawItems?.[0]?.source,
                });

                if (normalized.length) {
                    newsCache.data = normalized;
                    newsCache.timestamp = Date.now();
                    newsCache.lastSource = source.id;
                    return normalized;
                }
            } catch (error) {
                lastError = error;
                console.warn('News source failed', source.id, error);
                continue;
            }
        }

        throw lastError || new Error('Failed to load official updates');
    })().finally(() => {
        newsCache.promise = null;
    });

    newsCache.promise = request;
    return request;
};
