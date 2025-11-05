import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    IconUser,
    IconBriefcase,
    IconCamera,
    IconSettings,
    IconNewspaper,
    IconInfo,
    IconHelp,
    IconLink,
    IconMail
} from './Icons';

const SectionToggle = ({ title, isOpen, onToggle }) => (
    <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-2xl border border-brand-navy/10 bg-white/60 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-brand-navy transition hover:bg-white/80"
        aria-expanded={isOpen}
    >
        <span>{title}</span>
        <svg className={`h-4 w-4 transition ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none">
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>
);

const NavButton = ({ item }) => (
    <NavLink
        to={item.to}
        end
        className={({ isActive }) =>
            `group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                isActive
                    ? 'border-brand-cyan bg-gradient-to-r from-brand-cyan/90 to-brand-navy/90 text-white shadow-xl'
                    : 'border-transparent bg-white/70 text-brand-navy hover:border-brand-cyan/40 hover:bg-white'
            }`
        }
    >
        {({ isActive }) => (
            <>
                <div className="flex items-center gap-3">
                    <span
                        className={`rounded-xl bg-brand-cyan/15 p-2 text-brand-cyan transition ${
                            isActive ? 'bg-white/20 text-white' : ''
                        }`}
                    >
                        <item.icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold">{item.label}</span>
                </div>
                <span
                    className={`text-xs font-semibold uppercase tracking-wide ${
                        isActive ? 'text-white/80' : 'text-brand-navy/40'
                    }`}
                >
                    {isActive ? 'Aktive' : 'Shiko'}
                </span>
            </>
        )}
    </NavLink>
);

export const Sidebar = ({ t }) => {
    const navItems = [
        { to: '/employee', label: t.navEmployee, icon: IconUser },
        { to: '/freelancer', label: t.navFreelancer, icon: IconBriefcase },
        { to: '/influencer', label: t.navInfluencer, icon: IconCamera },
        { to: '/freelancer-guide', label: t.navFreelancerGuide, icon: IconSettings },
    ];

    const infoItems = [
        { to: '/news', label: t.navNews, icon: IconNewspaper },
        { to: '/info', label: t.navInfo, icon: IconInfo },
        { to: '/faq', label: t.navFAQ, icon: IconHelp },
        { to: '/links', label: t.navLinks, icon: IconLink },
        { to: '/contact', label: t.navContact, icon: IconMail },
    ];

    const [toolsOpen, setToolsOpen] = useState(true);
    const [resourcesOpen, setResourcesOpen] = useState(true);

    return (
        <aside className="w-full lg:w-80">
            <div className="rounded-3xl border border-white/35 bg-white/70 p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/60">Navigimi</p>
                    <span className="rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-semibold text-brand-cyan">UX i ri</span>
                </div>
                <p className="mt-2 text-sm text-brand-navy/70">
                    Zgjidh një modul për të llogaritur pagën, taksat ose për të lexuar analizat tona.
                </p>

                <div className="mt-6 space-y-6">
                    <div>
                        <SectionToggle title={t.navTools} isOpen={toolsOpen} onToggle={() => setToolsOpen((prev) => !prev)} />
                        {toolsOpen && (
                            <ul className="mt-3 space-y-3">
                                {navItems.map((item) => (
                                    <li key={item.to}>
                                        <NavButton item={item} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <SectionToggle title={t.navResources} isOpen={resourcesOpen} onToggle={() => setResourcesOpen((prev) => !prev)} />
                        {resourcesOpen && (
                            <ul className="mt-3 space-y-3">
                                {infoItems.map((item) => (
                                    <li key={item.to}>
                                        <NavButton item={item} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};
