import React from 'react';

export const DisclaimerBanner = ({ t }) => {
    const message = typeof t === 'function' ? t('disclaimer') : t?.disclaimer;

    if (!message) {
        return null;
    }

    return (
        <div
            className="bg-[#843e12] text-white h-10 py-2 px-4 flex items-center"
            aria-label="Disclaimer"
        >
            <div className="w-full overflow-hidden">
                <div className="flex w-max items-center gap-8 whitespace-nowrap animate-marquee">
                    <span className="text-sm">{message}</span>
                    <span className="text-sm" aria-hidden="true">
                        {message}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DisclaimerBanner;
