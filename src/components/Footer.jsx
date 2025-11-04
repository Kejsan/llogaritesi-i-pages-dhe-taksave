import React from 'react';

export const Footer = ({ t }) => (
    <footer className="bg-brand-navy text-white p-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
                <p className="text-lg font-semibold">Llogaritësi.al</p>
                <p className="text-sm text-gray-400">{t.footerCopyright}</p>
            </div>
            <div>
                <p className="text-sm text-gray-400">
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
