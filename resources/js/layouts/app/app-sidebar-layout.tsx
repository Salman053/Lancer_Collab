import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import FlashNotifications from '@/components/flash-notifications';
import { Toaster } from '@/components/ui/sonner';
import { type BreadcrumbItem } from '@/types';

import { useEffect } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: { children: React.ReactNode; breadcrumbs?: BreadcrumbItem[] }) {
    useEffect(() => {
        // Safety net for Radix UI / Vaul modals that sometimes leave the body in an unclickable state
        // due to 'pointer-events: none' or 'overflow: hidden' being stuck after closure.
        const cleanup = () => {
            if (typeof document !== 'undefined') {
                const body = document.body;
                // We only clear it if we don't see any active dialogs or open states
                const activeModals = document.querySelectorAll('[role="dialog"], [data-state="open"], .fixed.inset-0');
                if (activeModals.length === 0) {
                    if (body.style.pointerEvents === 'none') body.style.pointerEvents = 'auto';
                    if (body.style.overflow === 'hidden') body.style.overflow = 'auto';
                }
            }
        };

        const observer = new MutationObserver(cleanup);
        observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

        return () => observer.disconnect();
    }, []);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
            <Toaster />
            <FlashNotifications />
        </AppShell>
    );
}

