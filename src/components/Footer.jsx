import React from 'react';

export const Footer = ({ t }) => (
    <footer className="bg-gray-900 text-gray-400 p-8 mt-auto">
        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3 text-sm">
            <div className="md:col-span-1">
                <h3 className="font-bold text-lg text-white mb-2">Llogaritësi.al</h3>
                <p className="leading-relaxed">{t.footerCopyright}</p>
            </div>
            <div className="md:col-span-2 flex justify-end items-end">
                <p>
                    {t.footerCreatedBy} - <a
                        href="https://kejsan-coku.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-cyan hover:underline"
                    >
                        kejsan-coku.netlify.app
                    </a>
                </p>
            </div>
        </div>
    </footer>
);
