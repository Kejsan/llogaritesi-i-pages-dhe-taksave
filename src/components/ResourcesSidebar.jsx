import React, { useState } from 'react';
import { SectionToggle, NavButton } from './Sidebar';
import { IconNewspaper, IconInfo, IconHelp, IconLink, IconMail, IconUsers } from './Icons';

export const ResourcesSidebar = ({ t }) => {
    const infoItems = [
        { to: '/news', label: t.navNews, icon: IconNewspaper },
        { to: '/info', label: t.navInfo, icon: IconInfo },
        { to: '/faq', label: t.navFAQ, icon: IconHelp },
        { to: '/links', label: t.navLinks, icon: IconLink },
        { to: '/programs', label: t.navPrograms, icon: IconUsers },
        { to: '/contact', label: t.navContact, icon: IconMail },
    ];

    const [resourcesOpen, setResourcesOpen] = useState(true);

    return (
        <aside className="w-full lg:w-80">
            <div className="rounded-3xl theme-surface p-6 shadow-2xl backdrop-blur">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-navy/60">
                        {t.sidebar.resources?.title || t.navResources}
                    </p>
                </div>
                {t.sidebar.resources?.description && (
                    <p className="mt-2 text-sm theme-text-muted">{t.sidebar.resources.description}</p>
                )}

                <div className="mt-6 space-y-6">
                    <div>
                        <SectionToggle
                            title={t.navResources}
                            isOpen={resourcesOpen}
                            onToggle={() => setResourcesOpen((prev) => !prev)}
                        />
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
