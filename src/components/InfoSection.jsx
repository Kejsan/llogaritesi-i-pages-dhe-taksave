import React from 'react';
import { SectionTitle } from './Shared';
import { IconInfo } from './Icons';

const InfoBlock = ({ title, content }) => (
    <details className="group rounded-2xl border border-brand-navy/10 bg-white/70 transition hover:border-brand-cyan/40">
        <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-lg font-semibold text-brand-navy">
            <span>{title}</span>
            <span className="rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-semibold text-brand-cyan transition group-open:bg-brand-cyan group-open:text-white">
                Hape
            </span>
        </summary>
        <div className="px-5 pb-5 text-sm leading-relaxed text-brand-navy/80" dangerouslySetInnerHTML={{ __html: content }} />
    </details>
);

export const InfoSection = ({ t }) => (
    <div className="space-y-8">
        <SectionTitle icon={IconInfo} title={t.infoTitle} />
        <p className="text-brand-navy/70">
            {t.infoIntro}
        </p>
        <div className="grid gap-4">
            <InfoBlock title={t.infoGrossNetTitle} content={t.infoGrossNetText} />
            <InfoBlock title={t.infoContributionsTitle} content={t.infoContributionsText} />
            <InfoBlock title={t.infoTapTitle} content={t.infoTapText} />
            <InfoBlock title={t.infoFreelancerTitle} content={t.infoFreelancerText} />
        </div>
    </div>
);
