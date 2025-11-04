import React from 'react';
import { SectionTitle } from './Shared';
import { IconMail } from './Icons';

export const ContactSection = ({ t }) => (
    <div className="space-y-6">
        <SectionTitle icon={IconMail} title={t.navContact} />
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-brand-cyan/30 bg-white/70 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-brand-navy">Na shkruani</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                    Keni pyetje ose sugjerime? Na kontaktoni në: <a href="mailto:info@llogaritesi.al" className="font-semibold text-brand-cyan hover:text-brand-navy">info@llogaritesi.al</a>
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-brand-navy/40">Përgjigje brenda 48 orëve</p>
            </div>
            <div className="rounded-3xl border border-brand-navy/15 bg-brand-navy/5 p-6 shadow-inner">
                <h3 className="text-xl font-semibold text-brand-navy">Kush e ndërtoi?</h3>
                <p className="mt-3 text-sm text-brand-navy/70">
                    Ky mjet është krijuar nga <a href="https://kejsan-coku.netlify.app/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-cyan hover:text-brand-navy">Kejsan Coku</a> dhe ofrohet falas për komunitetin.
                </p>
            </div>
        </div>
    </div>
);
