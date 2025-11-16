import React from 'react';
import { IconBrandGithub, IconBrandLinkedin } from './Icons';

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/kejsancoku',
        icon: IconBrandGithub,
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/kejsan-coku/',
        icon: IconBrandLinkedin,
    },
];

export const Footer = ({ t }) => (
    <footer className="theme-footer mt-16 border-t theme-border-strong">
        <div className="relative max-w-7xl mx-auto flex flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <img src="/Llogaritësi i Pagës dhe Taksave.png" alt="Llogaritësi" className="h-14 w-auto object-contain" />
                    <div>
                        <p className="text-xl font-bold text-brand-navy">Llogaritësi i Pagës dhe Taksave</p>
                        <p className="text-sm theme-text-muted">{t.footerCopyright}</p>
                    </div>
                </div>
                <p className="mt-4 max-w-xl text-sm theme-text-muted">
                    {t.footerCreatedBy} –{' '}
                    <a
                        href="https://kejsancoku.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-brand-navy hover:text-brand-navy/80"
                    >
                        Kejsan Coku
                    </a>
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.35em] theme-text-muted">Na gjeni online</span>
                <div className="flex items-center gap-3">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-2xl theme-surface-muted transition hover:-translate-y-0.5 hover:shadow-lg"
                            aria-label={label}
                        >
                            <Icon className="h-5 w-5 theme-text-primary" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);
