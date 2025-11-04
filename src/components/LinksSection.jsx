import React from 'react';
import { SectionTitle } from './Shared';
import { IconLink } from './Icons';

const LinkCard = ({ title, description, href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-white/70 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand-cyan/50"
    >
        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ backgroundImage: 'linear-gradient(135deg, rgba(84,160,155,0.25), rgba(251,97,99,0.2))' }} aria-hidden="true"></div>
        <div className="relative">
            <h3 className="text-lg font-semibold text-brand-navy">{title}</h3>
            <p className="mt-2 text-sm text-brand-navy/70">{description}</p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan">
                Hap lidhjen
                <span aria-hidden="true">→</span>
            </span>
        </div>
    </a>
);

export const LinksSection = ({ t }) => (
    <div className="space-y-6">
        <SectionTitle icon={IconLink} title={t.linksTitle} />
        <div className="grid gap-5 md:grid-cols-2">
            <LinkCard title={t.linksDpt} description="Burimi zyrtar për taksat dhe legjislacionin fiskal." href="https://www.tatime.gov.al/" />
            <LinkCard title={t.linksQkb} description="Për regjistrimin e biznesit tuaj si profesionist i lirë." href="https://qkb.gov.al/" />
            <LinkCard title={t.linksSigurime} description="Informacion mbi kontributet shoqërore dhe shëndetësore." href="https://www.issh.gov.al/" />
            <LinkCard title={t.linksKodiPunes} description="Të drejtat dhe detyrimet tuaja si punëmarrës." href="https://qbz.gov.al/eli/html/00000000-0000-0000-0000-00000007961a" />
        </div>
    </div>
);
