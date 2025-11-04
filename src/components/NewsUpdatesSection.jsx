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
        <div className="space-y-6">
            <SectionTitle icon={IconNewspaper} title={t.newsTitle} />
            <p className="text-sm text-brand-navy/70">{t.newsSubtitle}</p>

            {status === 'loading' && (
                <div className="flex items-center gap-3 rounded-2xl border border-brand-cyan/20 bg-white/70 px-4 py-3 text-brand-navy">
                    <svg className="h-5 w-5 animate-spin text-brand-cyan" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span className="font-semibold">{t.newsLoading}</span>
                </div>
            )}

            {status === 'error' && (
                <div className="rounded-3xl border border-brand-red/40 bg-brand-red/10 p-6 text-brand-red">
                    <p className="font-semibold">{t.newsError}</p>
                    {error?.message && (
                        <p className="mt-2 text-sm text-brand-red/80">{error.message}</p>
                    )}
                    <button
                        type="button"
                        onClick={handleRetry}
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-cyan"
                    >
                        {t.newsRetry}
                    </button>
                </div>
            )}

            {status === 'empty' && (
                <p className="rounded-3xl border border-brand-navy/10 bg-white/70 p-6 text-brand-navy/70">{t.newsEmpty}</p>
            )}

            {status === 'success' && (
                <div className="grid gap-5 md:grid-cols-2">
                    {items.map((item) => {
                        const source = getHostName(item.link) || item.source;
                        const publishedAt = formatTimestamp(item.updatedAt);
                        return (
                            <article
                                key={item.id}
                                className="group relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-white/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand-cyan/40"
                            >
                                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ backgroundImage: 'linear-gradient(135deg, rgba(0,0,128,0.15), rgba(84,160,155,0.15))' }} aria-hidden="true"></div>
                                <div className="relative flex h-full flex-col">
                                    <h3 className="text-lg font-semibold text-brand-navy">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {item.title}
                                        </a>
                                    </h3>
                                    <div className="mt-3 flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-brand-navy/50">
                                        {source && <span>{t.newsSourceLabel}: {source}</span>}
                                        {publishedAt && <span>{t.newsPublished}: {publishedAt}</span>}
                                    </div>
                                    <div className="mt-auto pt-4">
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan"
                                        >
                                            {t.newsReadMore}
                                            <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
