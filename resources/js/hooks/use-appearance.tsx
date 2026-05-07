import { useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';
export type AnimationVariant =
    | 'circle'
    | 'fade'
    | 'slide-up'
    | 'slide-down'
    | 'slide-left'
    | 'slide-right'
    | 'rotate'
    | 'scale'
    | 'blur'
    | 'flip'
    | 'bounce'
    | 'wave'
    | 'glow'
    | 'spiral'
    | 'none';

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

const applyTheme = (appearance: Appearance) => {
    const isDark = appearance === 'dark' || (appearance === 'system' && prefersDark());

    document.documentElement.classList.toggle('dark', isDark);
};

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const handleSystemThemeChange = () => {
    const currentAppearance = localStorage.getItem('appearance') as Appearance;
    applyTheme(currentAppearance || 'system');
};

export function initializeTheme() {
    const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';

    applyTheme(savedAppearance);

    // Add the event listener for system theme changes...
    mediaQuery.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');
    const [animationVariant, setAnimationVariant] = useState<AnimationVariant>('circle');

    const updateAppearance = (mode: Appearance) => {
        setAppearance(mode);
        localStorage.setItem('appearance', mode);
        applyTheme(mode);
    };

    const updateAnimationVariant = (variant: AnimationVariant) => {
        setAnimationVariant(variant);
        localStorage.setItem('animationVariant', variant);
    };

    useEffect(() => {
        const savedAppearance = localStorage.getItem('appearance') as Appearance | null;
        const savedVariant = localStorage.getItem('animationVariant') as AnimationVariant | null;

        if (savedAppearance) updateAppearance(savedAppearance);
        if (savedVariant) setAnimationVariant(savedVariant);

        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, []);

    return { appearance, updateAppearance, animationVariant, updateAnimationVariant };
}
