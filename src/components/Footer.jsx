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
    <footer className="relative mt-16 border-t border-white/20 bg-gradient-to-br from-brand-navy via-[#020252] to-brand-cyan/40 text-white">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(251,97,99,0.3), transparent 60%)' }} aria-hidden="true"></div>
        <div className="relative max-w-7xl mx-auto flex flex-col gap-10 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <div className="flex items-center gap-3">
                    <img src="/logo-mark.svg" alt="Llogaritësi" className="h-14 w-14" />
                    <div>
                        <p className="text-xl font-bold">Llogaritësi i Pagës dhe Taksave</p>
                        <p className="text-sm text-white/70">{t.footerCopyright}</p>
                    </div>
                </div>
                <p className="mt-4 max-w-xl text-sm text-white/70">
                    {t.footerCreatedBy} – <a href="https://kejsan-coku.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-cyan hover:text-white">kejsan-coku.netlify.app</a>
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-xs uppercase tracking-[0.35em] text-white/60">Na gjeni online</span>
                <div className="flex items-center gap-3">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-white transition hover:bg-white/20"
                            aria-label={label}
                        >
                            <Icon className="h-5 w-5" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);
