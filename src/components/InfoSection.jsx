import React, { useState } from 'react';
import { SectionTitle } from './Shared';
import { IconInfo, IconChevronDown } from './Icons';

const InfoBlock = ({ title, content, expandLabel, collapseLabel }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <details
            className="group rounded-2xl border border-brand-navy/10 bg-white/75 transition focus-within:border-brand-cyan/50 hover:border-brand-cyan/40"
            onToggle={(event) => setIsOpen(event.target.open)}
        >
            <summary
                className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 text-lg font-semibold text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-opacity-40 [&::-webkit-details-marker]:hidden"
                aria-expanded={isOpen}
            >
                <span className="leading-snug">{title}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1 text-xs font-semibold text-brand-cyan transition group-open:border-brand-cyan group-open:bg-brand-cyan group-open:text-white">
                    <span className="group-open:hidden">{expandLabel}</span>
                    <span className="hidden group-open:inline">{collapseLabel}</span>
                    <IconChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
                </span>
            </summary>
            <div className="px-5 pb-5 text-sm leading-relaxed text-brand-navy/80" dangerouslySetInnerHTML={{ __html: content }} />
        </details>
    );
};

export const InfoSection = ({ t }) => (
    <div className="space-y-8">
        <SectionTitle icon={IconInfo} title={t.infoTitle} />
        <p className="text-brand-navy/70">
            {t.infoIntro}
        </p>
        <div className="grid gap-4">
            {t.infoTopics?.map((topic) => (
                <InfoBlock
                    key={topic.title}
                    title={topic.title}
                    content={topic.content}
                    expandLabel={t.infoExpand}
                    collapseLabel={t.infoCollapse}
                />
            ))}
        </div>
    </div>
);
