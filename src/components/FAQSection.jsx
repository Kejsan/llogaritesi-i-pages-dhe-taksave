import React from 'react';
import { SectionTitle } from './Shared';
import { IconHelp } from './Icons';
import { AccordionItem } from './Accordion.jsx';

export const FAQSection = ({ t }) => (
    <div className="space-y-6">
        <SectionTitle icon={IconHelp} title={t.faqTitle} />
        <div className="space-y-4">
            <AccordionItem title={t.faq1Title} content={t.faq1Text} />
            <AccordionItem title={t.faq2Title} content={t.faq2Text} />
            <AccordionItem title={t.faq3Title} content={t.faq3Text} />
            <AccordionItem title={t.faq4Title} content={t.faq4Text} />
            <AccordionItem title={t.faq5Title} content={t.faq5Text} />
            <AccordionItem title={t.faq6Title} content={t.faq6Text} />
        </div>
    </div>
);
