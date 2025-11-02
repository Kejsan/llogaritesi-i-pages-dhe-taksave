import React from 'react';
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

export const Sidebar = ({ activePage, setActivePage, t }) => {
    const navItems = [
        { id: 'employee', label: t.navEmployee, icon: IconUser },
        { id: 'freelancer', label: t.navFreelancer, icon: IconBriefcase },
        { id: 'influencer', label: t.navInfluencer, icon: IconCamera },
        { id: 'freelancer-guide', label: t.navFreelancerGuide, icon: IconSettings },
    ];

    const infoItems = [
        { id: 'news', label: t.navNews, icon: IconNewspaper },
        { id: 'info', label: t.navInfo, icon: IconInfo },
        { id: 'faq', label: t.navFAQ, icon: IconHelp },
        { id: 'links', label: t.navLinks, icon: IconLink },
        { id: 'contact', label: t.navContact, icon: IconMail },
    ];

    const NavButton = ({ item, isActive, onClick }) => (
         <button
            onClick={onClick}
            className={`flex items-center w-full space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive
                ? 'bg-gradient-to-r from-brand-cyan to-cyan-600 text-white shadow-lg'
                : 'text-gray-700 hover:bg-gray-100 hover:text-brand-navy'
            }`}
        >
            <item.icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-brand-cyan'}`} />
            <span className="font-semibold">{item.label}</span>
        </button>
    );

    return (
         <aside className="w-full lg:w-72 bg-white/70 backdrop-blur-lg p-6 flex-shrink-0 lg:sticky lg:top-[88px] lg:self-start lg:max-h-[calc(100vh-88px)] lg:overflow-y-auto rounded-xl shadow-sm">
            <nav className="flex-grow">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">{t.navTools}</h3>
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.id}>
                            <NavButton
                                item={item}
                                isActive={activePage === item.id}
                                onClick={() => setActivePage(item.id)}
                            />
                        </li>
                    ))}
                </ul>

                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-8 mb-3">{t.navResources}</h3>
                 <ul className="space-y-2">
                    {infoItems.map(item => (
                        <li key={item.id}>
                             <NavButton
                                item={item}
                                isActive={activePage === item.id}
                                onClick={() => setActivePage(item.id)}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
