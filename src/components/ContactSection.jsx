import React from 'react';
import { SectionTitle } from './Shared';
import { IconMail } from './Icons';

export const ContactSection = ({ t }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <SectionTitle icon={IconMail} title={t.navContact} />
        <div>
            <p className="text-gray-700">
                Keni pyetje ose sugjerime? Na kontaktoni në: <a href="mailto:info@llogaritesi.al" className="text-brand-cyan font-semibold hover:underline">info@llogaritesi.al</a>
            </p>
            <p className="text-gray-500 text-sm mt-4">
                Ky mjet është krijuar nga <a href="https://kejsan-coku.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-navy hover:underline">Kejsan Coku</a> dhe ofrohet falas për komunitetin.
            </p>
        </div>
    </div>
);
