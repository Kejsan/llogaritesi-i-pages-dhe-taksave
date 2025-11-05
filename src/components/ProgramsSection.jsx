import React from 'react';
import { Link } from 'react-router-dom';
import { SectionTitle } from './Shared';
import { IconUsers } from './Icons';

export const ProgramsSection = ({ t }) => {
    const programs = t.programsList || [];

    return (
        <div className="space-y-8">
            <SectionTitle icon={IconUsers} title={t.programsTitle} />
            <p className="text-brand-navy/70 text-base leading-relaxed">{t.programsSubtitle}</p>
            <div className="grid gap-6 lg:grid-cols-2">
                {programs.map((program) => (
                    <article
                        key={program.title}
                        className="group flex flex-col gap-4 rounded-3xl border border-brand-navy/10 bg-white/75 p-6 shadow-lg transition hover:-translate-y-1 hover:border-brand-cyan/50 hover:shadow-2xl"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-xl font-semibold text-brand-navy">{program.title}</h3>
                                {program.subtitle && <p className="text-sm text-brand-navy/60">{program.subtitle}</p>}
                            </div>
                            {program.badge && (
                                <span className="rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-cyan">
                                    {program.badge}
                                </span>
                            )}
                        </div>
                        <p className="text-sm leading-relaxed text-brand-navy/75">{program.description}</p>
                        {program.benefits && program.benefits.length > 0 && (
                            <ul className="space-y-2">
                                {program.benefits.map((benefit) => (
                                    <li key={benefit} className="flex items-start gap-2 text-sm text-brand-navy/70">
                                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-cyan" aria-hidden="true"></span>
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {program.cta && program.cta.label && (program.cta.href || program.cta.to) && (
                            <div className="pt-2">
                                {program.cta.to ? (
                                    <Link
                                        to={program.cta.to}
                                        className="inline-flex items-center gap-2 rounded-full bg-brand-navy/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white/80"
                                    >
                                        <span>{program.cta.label}</span>
                                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                            <path
                                                d="M5 10h10m0 0-4-4m4 4-4 4"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                ) : (
                                    <a
                                        href={program.cta.href}
                                        target={program.cta.external ? '_blank' : '_self'}
                                        rel={program.cta.external ? 'noreferrer' : undefined}
                                        className="inline-flex items-center gap-2 rounded-full bg-brand-navy/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow transition hover:bg-brand-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-white/80"
                                    >
                                        <span>{program.cta.label}</span>
                                        <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                            <path
                                                d="M5 10h10m0 0-4-4m4 4-4 4"
                                                stroke="currentColor"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default ProgramsSection;
