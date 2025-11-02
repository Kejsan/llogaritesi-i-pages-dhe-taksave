import React from 'react';
import { SectionTitle } from './Shared';
import { IconInfo } from './Icons';

export const InfoSection = ({ t }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg">
        <SectionTitle icon={IconInfo} title={t.infoTitle} />
        <div className="prose max-w-none">
            <p>{t.infoIntro}</p>

            <h3>{t.infoGrossNetTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: t.infoGrossNetText }} />

            <h3>{t.infoContributionsTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: t.infoContributionsText }} />

            <h3>{t.infoTapTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: t.infoTapText }} />

            <h3>{t.infoFreelancerTitle}</h3>
            <p dangerouslySetInnerHTML={{ __html: t.infoFreelancerText }} />
        </div>
    </div>
);
