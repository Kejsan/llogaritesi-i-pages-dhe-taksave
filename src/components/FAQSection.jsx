import React, { useEffect, useId, useState, useRef } from 'react';
import { SectionTitle } from './Shared';
import { IconHelp, IconChevronDown } from './Icons';

const useDisclosure = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonId = useId();
    const panelId = useId();

    const toggle = () => setIsOpen((prev) => !prev);

    return {
        isOpen,
        toggle,
        buttonProps: {
            id: buttonId,
            "aria-expanded": isOpen,
            "aria-controls": panelId,
            onClick: toggle,
        },
        panelProps: {
            id: panelId,
            role: 'region',
            "aria-labelledby": buttonId,
        },
    };
};

const AccordionItem = ({ title, children }) => {
    const { isOpen, buttonProps, panelProps } = useDisclosure();
    const contentRef = useRef(null);
    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setMaxHeight(contentRef.current.scrollHeight);
        }
    }, [children, isOpen]);

    return (
        <div className="rounded-2xl border border-brand-navy/10 bg-white/70 p-4 shadow-sm">
            <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl px-1 text-left text-lg font-semibold text-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-opacity-40"
                {...buttonProps}
            >
                <span>{title}</span>
                <span
                    className={`rounded-full border border-brand-cyan/40 p-2 text-brand-cyan transition ${isOpen ? 'rotate-180 bg-brand-cyan text-white' : ''}`}
                    aria-hidden="true"
                >
                    <IconChevronDown className="h-4 w-4" />
                </span>
            </button>
            <div
                {...panelProps}
                className={`overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ${isOpen ? 'mt-3 opacity-100' : 'opacity-0'}`}
                style={{ maxHeight: isOpen ? maxHeight : 0 }}
            >
                <div
                    ref={contentRef}
                    className="text-sm leading-relaxed text-brand-navy/80"
                    dangerouslySetInnerHTML={{ __html: children }}
                />
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
