import React from 'react';
import { SectionTitle } from './Shared';
import { IconInfo, IconChevronDown } from './Icons';
import { AccordionItem } from './Accordion.jsx';

const InfoIndicator = ({ isOpen, expandLabel, collapseLabel }) => (
    <span
        className={`inline-flex items-center gap-2 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-3 py-1 text-xs font-semibold text-brand-cyan transition ${isOpen ? 'border-brand-cyan bg-brand-cyan text-white' : ''}`}
    >
        <span className={isOpen ? 'hidden' : 'inline'}>{expandLabel}</span>
        <span className={isOpen ? 'inline' : 'hidden'}>{collapseLabel}</span>
        <IconChevronDown
            className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
        />
    </span>
);

const InfoBlock = ({ title, content, expandLabel, collapseLabel }) => (
    <AccordionItem
        title={title}
        content={content}
        indicator={(isOpen) => (
            <InfoIndicator isOpen={isOpen} expandLabel={expandLabel} collapseLabel={collapseLabel} />
        )}
        containerClassName="bg-white/75"
        headerClassName="px-4 py-2"
        bodyClassName="px-3"
    />
);

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
