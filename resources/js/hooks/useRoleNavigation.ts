// hooks/useRoleNavigation.ts
import { footerNavItems, roleDashboardRoutes, roleNavItems } from '@/constants/navigation';
import { Auth, type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export function useRoleNavigation() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const userRole = auth?.user?.role || 'guest';

    const dashboardRoute = useMemo(() => {
        return roleDashboardRoutes[userRole] || '/dashboard';
    }, [userRole]);

    const navigationItems = useMemo(() => {
        return roleNavItems[userRole] || roleNavItems.guest;
    }, [userRole]);

    const getFooterItems = useMemo((): NavItem[] => {
        const common = footerNavItems.common || [];
        const roleSpecific = footerNavItems[userRole] || [];
        return [...common, ...roleSpecific];
    }, [userRole]);

    const getDynamicNavItems = useMemo(() => {
        return navigationItems.map((item) => {
            if (item.title === 'Dashboard') {
                return { ...item, url: dashboardRoute };
            }
            return item;
        });
    }, [navigationItems, dashboardRoute]);

    return {
        userRole,
        dashboardRoute,
        navigationItems: getDynamicNavItems,
        footerItems: getFooterItems,
    };
}
