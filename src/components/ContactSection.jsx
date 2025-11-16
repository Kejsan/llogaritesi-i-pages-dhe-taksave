import React from 'react';
import { SectionTitle } from './Shared';
import { IconMail } from './Icons';

export const ContactSection = ({ t }) => (
    <div className="space-y-6">
        <SectionTitle icon={IconMail} title={t.navContact} />
        <div className="grid gap-6 lg:grid-cols-2">
            <a
                href="mailto:info@llogaritesi.al"
                className="group block rounded-3xl border border-brand-cyan/30 bg-white/70 p-6 shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
                <h3 className="text-xl font-semibold text-brand-navy transition-colors duration-200 group-hover:text-brand-navy group-focus-visible:text-brand-navy">Na shkruani</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/80">
                    Keni pyetje ose sugjerime? Na kontaktoni në: <span className="font-semibold text-brand-cyan transition-colors duration-200 group-hover:text-brand-navy group-focus-visible:text-brand-navy">info@llogaritesi.al</span>
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.3em] text-brand-navy/40">Përgjigje brenda 48 orëve</p>
            </a>
            <a
                href="https://kejsan-coku.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Shiko portofolin e Kejsan Coku"
                className="group block rounded-3xl border border-brand-navy/15 bg-brand-navy/5 p-6 shadow-inner transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
                <h3 className="text-xl font-semibold text-brand-navy transition-colors duration-200 group-hover:text-brand-navy group-focus-visible:text-brand-navy">Kush e ndërtoi?</h3>
                <p className="mt-3 text-sm text-brand-navy/70">
                    Ky mjet është krijuar nga <span className="font-semibold text-brand-cyan transition-colors duration-200 group-hover:text-brand-navy group-focus-visible:text-brand-navy">Kejsan Coku</span> dhe ofrohet falas për komunitetin.
                </p>
            </a>
        </div>
    </div>
);
