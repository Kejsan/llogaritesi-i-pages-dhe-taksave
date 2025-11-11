import { parseHTML } from 'linkedom';
import { NEWS_SOURCES, standardizeNewsItems } from '../../src/utils/index.js';

const headers = {
    'Content-Type': 'application/json; charset=utf-8',
};

let cachedFetch = typeof fetch === 'function' ? fetch : null;

const ensureFetch = async () => {
    if (cachedFetch) return cachedFetch;
    const module = await import('node-fetch');
    cachedFetch = module.default;
    return cachedFetch;
};

const ok = (body) => ({
    statusCode: 200,
    headers,
    body: JSON.stringify(body),
});

export const handler = async () => {
    globalThis.__NEWS_HTML_PARSER__ = (markup) => parseHTML(markup);
    const fetchImpl = await ensureFetch();
    const attemptStartedAt = new Date();

    let lastError = null;

    for (const source of NEWS_SOURCES) {
        try {
            const response = await fetchImpl(source.endpoint, {
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
                return ok({
                    items: normalized,
                    fetchedAt: new Date().toISOString(),
                    source: source.id,
                });
            }
        } catch (error) {
            lastError = error;
            console.warn('News source failed', source.id, error);
        }
    }

    const body = {
        items: [],
        fetchedAt: attemptStartedAt.toISOString(),
    };

    if (lastError) {
        body.error = {
            message: lastError.message || 'Service temporarily unavailable',
        };
    }

    return ok(body);
};
