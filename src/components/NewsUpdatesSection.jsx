import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { SectionTitle } from './Shared';
import { IconNewspaper } from './Icons';
import { fetchNewsUpdates } from '../utils';

export const NewsUpdatesSection = ({ t, language }) => {
    const [status, setStatus] = useState('loading');
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const isMountedRef = React.useRef(true);

    const locale = useMemo(() => {
        switch (language) {
            case 'sq':
                return 'sq-AL';
            case 'it':
                return 'it-IT';
            default:
                return 'en-GB';
        }
    }, [language]);

    const loadNews = useCallback(async ({ forceRefresh = false } = {}) => {
        if (!isMountedRef.current) return;
        setStatus('loading');
        setError(null);
        try {
            const updates = await fetchNewsUpdates({ forceRefresh });
            if (!isMountedRef.current) return;
            setItems(updates);
            setStatus(updates.length ? 'success' : 'empty');
        } catch (err) {
            if (!isMountedRef.current) return;
            setError(err);
            setStatus('error');
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        loadNews();
        return () => {
            isMountedRef.current = false;
        };
    }, [loadNews]);

    const formatTimestamp = useCallback((value) => {
        if (!value) return '';
        try {
            return new Date(value).toLocaleString(locale, {
                dateStyle: 'medium',
                timeStyle: 'short',
            });
        } catch (err) {
            console.warn('Failed to format news timestamp', err);
            return value;
        }
    }, [locale]);

    const getHostName = (value) => {
        try {
            return new URL(value).hostname.replace(/^www\./, '');
        } catch {
            return '';
        }
    };

    const handleRetry = () => {
        loadNews({ forceRefresh: true });
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
            <SectionTitle icon={IconNewspaper} title={t.newsTitle} />
            <p className="text-gray-600 mb-6">{t.newsSubtitle}</p>

            {status === 'loading' && (
                <div className="flex items-center gap-3 text-brand-navy font-semibold">
                    <svg className="animate-spin h-5 w-5 text-brand-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span>{t.newsLoading}</span>
                </div>
            )}

            {status === 'error' && (
                <div className="bg-brand-red/10 border border-brand-red/40 text-brand-red rounded-lg p-4">
                    <p className="font-semibold">{t.newsError}</p>
                    {error?.message && (
                        <p className="text-sm mt-2 text-brand-red/80">{error.message}</p>
                    )}
                    <button
                        onClick={handleRetry}
                        className="mt-3 inline-flex items-center px-4 py-2 rounded-lg bg-brand-cyan text-white font-semibold hover:bg-brand-navy transition-colors"
                    >
                        {t.newsRetry}
                    </button>
                </div>
            )}

            {status === 'empty' && (
                <p className="text-gray-600">{t.newsEmpty}</p>
            )}

            {status === 'success' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map(item => {
                        const source = getHostName(item.link) || item.source;
                        const publishedAt = formatTimestamp(item.updatedAt);
                        return (
                            <article
                                key={item.id}
                                className="p-6 border border-gray-200 rounded-lg hover:border-brand-cyan hover:shadow-md transition-shadow h-full flex flex-col"
                            >
                                <h3 className="text-lg font-semibold text-brand-navy mb-2">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:underline"
                                    >
                                        {item.title}
                                    </a>
                                </h3>
                                <div className="text-sm text-gray-500 space-y-1 mb-4">
                                    {source && (
                                        <p>
                                            <span className="font-medium text-gray-600">{t.newsSourceLabel}:</span> {source}
                                        </p>
                                    )}
                                    {publishedAt && (
                                        <p>
                                            <span className="font-medium text-gray-600">{t.newsPublished}:</span> {publishedAt}
                                        </p>
                                    )}
                                </div>
                                <div className="mt-auto">
                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-sm font-semibold text-brand-cyan hover:text-brand-navy transition-colors"
                                    >
                                        {t.newsReadMore}
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
