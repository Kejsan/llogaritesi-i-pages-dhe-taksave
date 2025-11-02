import React, { useState } from 'react';
import { SectionTitle } from './Shared';
import { IconHelp, IconChevronDown } from './Icons';

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between items-center w-full py-5 text-left text-lg font-semibold text-gray-800"
            >
                <span>{title}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-cyan' : 'text-gray-400'}`}>
                    <IconChevronDown />
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-full' : 'max-h-0'}`}>
                <div className="pb-5 pr-10 text-gray-600" dangerouslySetInnerHTML={{ __html: children }} />
            </div>
        </div>
    );
};

export const FAQSection = ({ t }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg">
        <SectionTitle icon={IconHelp} title={t.faqTitle} />
        <div className="divide-y divide-gray-200">
            <AccordionItem title={t.faq1Title}>{t.faq1Text}</AccordionItem>
            <AccordionItem title={t.faq2Title}>{t.faq2Text}</AccordionItem>
            <AccordionItem title={t.faq3Title}>{t.faq3Text}</AccordionItem>
            <AccordionItem title={t.faq4Title}>{t.faq4Text}</AccordionItem>
            <AccordionItem title={t.faq5Title}>{t.faq5Text}</AccordionItem>
            <AccordionItem title={t.faq6Title}>{t.faq6Text}</AccordionItem>
        </div>
    </div>
);
