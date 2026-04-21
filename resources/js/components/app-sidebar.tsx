import { NavFooter } from '@/components/nav-footer';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';
import { useRoleNavigation } from '@/hooks/useRoleNavigation';
import { NavigationSections } from './navigation-sections';

export function AppSidebar() {
    const { userRole, dashboardRoute, navigationItems, footerItems } = useRoleNavigation();

    return (
        <Sidebar collapsible="icon" variant="floating" >
            <SidebarHeader  >
                <SidebarMenu >
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardRoute} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavigationSections items={navigationItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavFooter items={footerItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}