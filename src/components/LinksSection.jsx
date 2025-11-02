import React from 'react';
import { SectionTitle } from './Shared';
import { IconLink } from './Icons';

export const LinksSection = ({ t }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg">
        <SectionTitle icon={IconLink} title={t.linksTitle} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="https://www.tatime.gov.al/" target="_blank" rel="noopener noreferrer" className="p-6 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy text-lg">{t.linksDpt}</span>
                <p className="text-sm text-gray-500 mt-1">Burimi zyrtar për taksat dhe legjislacionin fiskal.</p>
            </a>
            <a href="https://qkb.gov.al/" target="_blank" rel="noopener noreferrer" className="p-6 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy text-lg">{t.linksQkb}</span>
                <p className="text-sm text-gray-500 mt-1">Për regjistrimin e biznesit tuaj si profesionist i lirë.</p>
            </a>
            <a href="https://www.issh.gov.al/" target="_blank" rel="noopener noreferrer" className="p-6 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy text-lg">{t.linksSigurime}</span>
                <p className="text-sm text-gray-500 mt-1">Informacion mbi kontributet shoqërore dhe shëndetësore.</p>
            </a>
            <a href="https://qbz.gov.al/eli/html/00000000-0000-0000-0000-00000007961a" target="_blank" rel="noopener noreferrer" className="p-6 border rounded-lg hover:shadow-md hover:border-brand-cyan transition-all">
                <span className="font-semibold text-brand-navy text-lg">{t.linksKodiPunes}</span>
                <p className="text-sm text-gray-500 mt-1">Të drejtat dhe detyrimet tuaja si punëmarrës.</p>
            </a>
        </div>
    </div>
);
