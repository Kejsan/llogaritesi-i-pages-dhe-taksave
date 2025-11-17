import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IconUser, IconBriefcase, IconCamera, IconSettings } from './Icons';

export const SectionToggle = ({ title, isOpen, onToggle }) => (
    <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-2xl theme-surface-muted px-4 py-3 text-sm font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 ${
            isOpen ? 'shadow-lg shadow-brand-cyan/20' : 'hover:shadow-md hover:-translate-y-0.5'
        }`}
        aria-expanded={isOpen}
    >
        <span className="theme-text-primary">{title}</span>
        <svg className={`h-4 w-4 transition theme-text-muted ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none">
            <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </button>
);

export const NavButton = ({ item }) => (
    <NavLink
        to={item.to}
        end
        className={({ isActive }) =>
            `group relative flex w-full items-center justify-between overflow-hidden rounded-2xl px-4 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 ${
                isActive
                    ? 'border border-brand-cyan bg-gradient-to-r from-brand-cyan/90 to-brand-navy/90 text-white shadow-xl'
                    : 'theme-surface hover:-translate-y-0.5 hover:shadow-lg'
            }`
        }
    >
        {({ isActive }) => (
            <>
                <div className="flex items-center gap-3">
                    <span
                        className={`rounded-xl p-2 transition ${
                            isActive
                                ? 'bg-white/20 text-white'
                                : 'theme-chip'
                        }`}
                        data-active={isActive}
                    >
                        <item.icon className="h-5 w-5" />
                    </span>
                    <span className="font-semibold theme-text-primary">{item.label}</span>
                </div>
                <span
                    className={`text-xs font-semibold uppercase tracking-wide ${
                        isActive ? 'text-white/80' : 'theme-text-muted'
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

    const [toolsOpen, setToolsOpen] = useState(true);

    return (
        <aside className="w-full lg:w-80">
            <div className="rounded-3xl theme-surface p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/60">
                        {t.sidebar.navigation.title}
                    </p>
                </div>
                <p className="mt-2 text-sm theme-text-muted">{t.sidebar.navigation.description}</p>

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
                </div>
            </div>
        </aside>
    );
};
