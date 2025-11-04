import React, { useState } from 'react';
import { SectionTitle } from './Shared';
import { IconHelp, IconChevronDown } from './Icons';

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="rounded-2xl border border-brand-navy/10 bg-white/70 p-4 shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between text-left text-lg font-semibold text-brand-navy"
            >
                <span>{title}</span>
                <span className={`rounded-full border border-brand-cyan/40 p-2 text-brand-cyan transition ${isOpen ? 'rotate-180 bg-brand-cyan text-white' : ''}`}>
                    <IconChevronDown className="h-4 w-4" />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[400px] mt-3' : 'max-h-0'}`}>
                <div className="text-sm leading-relaxed text-brand-navy/80" dangerouslySetInnerHTML={{ __html: children }} />
            </div>
        </div>
    );
};

export const FAQSection = ({ t }) => (
    <div className="space-y-6">
        <SectionTitle icon={IconHelp} title={t.faqTitle} />
        <div className="space-y-4">
            <AccordionItem title={t.faq1Title}>{t.faq1Text}</AccordionItem>
            <AccordionItem title={t.faq2Title}>{t.faq2Text}</AccordionItem>
            <AccordionItem title={t.faq3Title}>{t.faq3Text}</AccordionItem>
            <AccordionItem title={t.faq4Title}>{t.faq4Text}</AccordionItem>
            <AccordionItem title={t.faq5Title}>{t.faq5Text}</AccordionItem>
            <AccordionItem title={t.faq6Title}>{t.faq6Text}</AccordionItem>
        </div>
    </div>
);
