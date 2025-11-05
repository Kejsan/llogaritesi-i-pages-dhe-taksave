import React from 'react';
import { Link } from 'react-router-dom';
import {
    IconUser,
    IconBriefcase,
    IconCamera,
    IconSettings,
    IconTrendingUp,
    IconInfo,
    IconNewspaper,
    IconHelp,
} from '../components/Icons';

const HomePage = ({ t }) => {
    const calculatorCards = [
        {
            to: '/employee',
            title: t.home?.cards?.employee?.title,
            description: t.home?.cards?.employee?.description,
            icon: IconUser,
            accent: 'from-brand-cyan/80 via-brand-cyan/70 to-brand-navy/80',
        },
        {
            to: '/freelancer',
            title: t.home?.cards?.freelancer?.title,
            description: t.home?.cards?.freelancer?.description,
            icon: IconBriefcase,
            accent: 'from-brand-navy/80 via-[#04047a] to-brand-cyan/60',
        },
        {
            to: '/influencer',
            title: t.home?.cards?.influencer?.title,
            description: t.home?.cards?.influencer?.description,
            icon: IconCamera,
            accent: 'from-brand-red/70 via-brand-orange/70 to-brand-cyan/70',
        },
        {
            to: '/freelancer-guide',
            title: t.home?.cards?.guide?.title,
            description: t.home?.cards?.guide?.description,
            icon: IconSettings,
            accent: 'from-brand-navy/85 via-brand-cyan/50 to-white/80',
        },
    ];

    const benefitIcons = [IconTrendingUp, IconSettings, IconInfo];
    const benefitItems = t.home?.benefits || [];

    const resourceLinks = [
        {
            to: '/news',
            eyebrow: t.home?.resources?.news?.eyebrow,
            title: t.home?.resources?.news?.title,
            description: t.home?.resources?.news?.description,
            icon: IconNewspaper,
        },
        {
            to: '/info',
            eyebrow: t.home?.resources?.info?.eyebrow,
            title: t.home?.resources?.info?.title,
            description: t.home?.resources?.info?.description,
            icon: IconInfo,
        },
        {
            to: '/faq',
            eyebrow: t.home?.resources?.faq?.eyebrow,
            title: t.home?.resources?.faq?.title,
            description: t.home?.resources?.faq?.description,
            icon: IconHelp,
        },
    ];

    return (
        <div className="space-y-10">
            <section className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-brand-navy via-[#04047a] to-brand-cyan/40 p-10 text-white shadow-2xl">
                <div
                    className="pointer-events-none absolute inset-0 opacity-40"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 55%)' }}
                    aria-hidden="true"
                ></div>
                <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center">
                    <div className="flex-1 space-y-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em]">
                            <span className="h-2 w-2 rounded-full bg-brand-cyan animate-pulse" aria-hidden="true"></span>
                            {t.home?.heroBadge}
                        </span>
                        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">{t.home?.heroTitle}</h1>
                        <p className="max-w-2xl text-base text-white/85 sm:text-lg">{t.home?.heroSubtitle}</p>
                        <div className="flex flex-col items-start gap-3 sm:flex-row">
                            <Link
                                to="/employee"
                                className="inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-navy shadow-lg shadow-brand-cyan/40 transition hover:shadow-brand-cyan/60"
                            >
                                {t.home?.heroPrimaryCta}
                                <span aria-hidden="true">→</span>
                            </Link>
                            <Link
                                to="/freelancer"
                                className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                            >
                                {t.home?.heroSecondaryCta}
                                <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full max-w-md space-y-4 rounded-3xl border border-white/25 bg-white/10 p-6 backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{t.navTools}</p>
                        <ul className="space-y-3 text-sm text-white/80">
                            <li>• {t.home?.cards?.employee?.description}</li>
                            <li>• {t.home?.cards?.freelancer?.description}</li>
                            <li>• {t.home?.cards?.guide?.description}</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/60">
                            {t.navTools}
                        </p>
                        <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">{t.home?.calculatorsTitle}</h2>
                        <p className="mt-2 max-w-2xl text-sm text-brand-navy/70 sm:text-base">
                            {t.home?.calculatorsSubtitle}
                        </p>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    {calculatorCards.map((card) => (
                        <Link
                            key={card.to}
                            to={card.to}
                            className={`group relative overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br ${card.accent} p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <span className="rounded-2xl bg-white/15 p-3 text-white">
                                    <card.icon className="h-6 w-6" />
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                                    {card.to.replace('/', '').toUpperCase()}
                                </span>
                            </div>
                            <div className="mt-5 space-y-3">
                                <h3 className="text-xl font-semibold leading-tight">{card.title}</h3>
                                <p className="text-sm text-white/85">{card.description}</p>
                            </div>
                            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition group-hover:gap-3">
                                <span>{t.home?.heroPrimaryCta}</span>
                                <span aria-hidden="true">→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="rounded-3xl border border-white/30 bg-white/80 p-8 shadow-2xl">
                <div className="space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/50">
                        {t.home?.benefitsTitle}
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">{t.home?.benefitsSubtitle}</h2>
                    </div>
                </div>
                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {benefitItems.map((benefit, index) => {
                        const Icon = benefitIcons[index % benefitIcons.length];
                        return (
                            <div
                                key={benefit.title}
                                className="group rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                            >
                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-cyan">
                                    <Icon className="h-4 w-4" />
                                    PRO
                                </span>
                                <h3 className="mt-4 text-lg font-semibold text-brand-navy">{benefit.title}</h3>
                                <p className="mt-2 text-sm text-brand-navy/70">{benefit.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="space-y-6">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/60">
                        {t.navResources}
                    </p>
                    <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">{t.home?.resourcesTitle}</h2>
                    <p className="mt-2 max-w-2xl text-sm text-brand-navy/70 sm:text-base">{t.home?.resourcesSubtitle}</p>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                    {resourceLinks.map((resource) => (
                        <Link
                            key={resource.to}
                            to={resource.to}
                            className="group flex h-full flex-col justify-between rounded-3xl border border-white/30 bg-white/80 p-6 text-left shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="space-y-4">
                                <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-brand-navy/70">
                                    <resource.icon className="h-4 w-4" />
                                    {resource.eyebrow}
                                </span>
                                <h3 className="text-lg font-semibold text-brand-navy">{resource.title}</h3>
                                <p className="text-sm text-brand-navy/70">{resource.description}</p>
                            </div>
                            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-navy transition group-hover:gap-3">
                                {t.navResources}
                                <span aria-hidden="true">→</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
