import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { ThemeVariantSelector } from '@/components/ui/animated-theme-toggler';
import { useAppearance } from '@/hooks/use-appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    const { animationVariant, updateAnimationVariant } = useAppearance();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-8">
                    <div className="space-y-6">
                        <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                        <AppearanceTabs />
                    </div>

                    <div className="space-y-6">
                        <HeadingSmall title="Theme Transition" description="Choose your preferred animation when switching between light and dark mode" />
                        <div className="rounded-xl border bg-card/50 backdrop-blur-sm shadow-sm overflow-hidden">
                            <ThemeVariantSelector 
                                currentVariant={animationVariant} 
                                onVariantChange={updateAnimationVariant} 
                            />
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
