import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext(null);

const getInitialTheme = () => {
    if (typeof window === 'undefined') {
        return 'light';
    }

    const savedTheme = window.localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(getInitialTheme);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        window.localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }
    }, [theme]);

    useEffect(() => {
        const initial = getInitialTheme();
        document.documentElement.setAttribute('data-theme', initial);
        if (document.body) {
            document.body.setAttribute('data-theme', initial);
        }
    }, []);

    const setTheme = useCallback((nextTheme) => {
        setThemeState((current) => {
            if (nextTheme === 'light' || nextTheme === 'dark') {
                return nextTheme;
            }
            return current;
        });
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((current) => (current === 'light' ? 'dark' : 'light'));
    }, []);

    const value = useMemo(
        () => ({
            theme,
            setTheme,
            toggleTheme,
        }),
        [theme, setTheme, toggleTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
