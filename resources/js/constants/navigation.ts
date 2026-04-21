// config/navigation.ts
import {
    LayoutGrid,
    Briefcase,
    Users,
    Settings,
    FileText,
    Calendar,
    MessageSquare,
    CreditCard,
    Folder,
    BookOpen,
    Home,
    BarChart,
    Bell,
    Shield,
    Truck,
    Star
} from 'lucide-react';
import { type NavItem } from '@/types';

export const commonNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
];

// Admin specific navigation items
export const adminNavItems: NavItem[] = [
    {
        title: 'User Management',
        url: '/admin/users',
        icon: Users,
        badge: 'Admin',
    },
    {
        title: 'System Settings',
        url: '/admin/settings',
        icon: Settings,
    },
    {
        title: 'All Projects',
        url: '/admin/projects',
        icon: Folder,
    },
    {
        title: 'Analytics',
        url: '/admin/analytics',
        icon: BarChart,
    },
    {
        title: 'Reports',
        url: '/admin/reports',
        icon: FileText,
    },
    {
        title: 'Notifications',
        url: '/admin/notifications',
        icon: Bell,
        badge: '3',
    },
];

// Client specific navigation items
export const clientNavItems: NavItem[] = [
    {
        title: 'My Projects',
        url: '/client/projects',
        icon: Folder,
    },
    {
        title: 'Post New Project',
        url: '/client/projects/create',
        icon: Briefcase,
    },
    {
        title: 'My Freelancers',
        url: '/client/freelancers',
        icon: Users,
    },
    {
        title: 'Payments & Invoices',
        url: '/client/payments',
        icon: CreditCard,
    },
    {
        title: 'Messages',
        url: '/client/messages',
        icon: MessageSquare,
        badge: '2',
    },
    {
        title: 'Reviews',
        url: '/client/reviews',
        icon: Star,
    },
];

// Freelancer specific navigation items
export const freelancerNavItems: NavItem[] = [

    {
        title: 'Clients',
        url: '/freelancer/clients',
        icon: Users,
    },
    {
        title: 'Available Projects',
        url: '/freelancer/projects',
        icon: Briefcase,
        badge: '12',
    },
    {
        title: 'My Tasks',
        url: '/freelancer/tasks',
        icon: FileText,
    },
    {
        title: 'Active Projects',
        url: '/freelancer/my-projects',
        icon: Folder,
    },
    {
        title: 'Earnings',
        url: '/freelancer/earnings',
        icon: CreditCard,
    },
    {
        title: 'Schedule',
        url: '/freelancer/schedule',
        icon: Calendar,
    },
    {
        title: 'Messages',
        url: '/freelancer/messages',
        icon: MessageSquare,
        badge: '5',
    },
    {
        title: 'My Reviews',
        url: '/freelancer/reviews',
        icon: Star,
    },
];

// Guest specific navigation items
export const guestNavItems: NavItem[] = [
    {
        title: 'Browse Projects',
        url: '/guest/projects',
        icon: Briefcase,
    },
    {
        title: 'How it Works',
        url: '/guest/how-it-works',
        icon: BookOpen,
    },
    {
        title: 'Become a Freelancer',
        url: '/guest/become-freelancer',
        icon: Users,
    },
];

// Footer navigation items configuration
export const footerNavItems: Record<string, NavItem[]> = {
    common: [
        {
            title: 'Repository',
            url: 'https://github.com/laravel/react-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            url: 'https://laravel.com/docs/starter-kits',
            icon: BookOpen,
        },
    ],
    admin: [
        {
            title: 'Admin Panel',
            url: '/admin/panel',
            icon: Shield,
        },
    ],
    client: [
        {
            title: 'Support Center',
            url: '/client/support',
            icon: MessageSquare,
        },
        {
            title: 'Help',
            url: '/client/help',
            icon: BookOpen,
        },
    ],
    freelancer: [
        {
            title: 'Support',
            url: '/freelancer/support',
            icon: MessageSquare,
        },
        {
            title: 'Resources',
            url: '/freelancer/resources',
            icon: Folder,
        },
    ],
};

// Role to dashboard route mapping
export const roleDashboardRoutes: Record<string, string> = {
    admin: '/admin/dashboard',
    client: '/client/dashboard',
    freelancer: '/freelancer/dashboard',
    guest: '/dashboard',
};

// Role to navigation items mapping
export const roleNavItems: Record<string, NavItem[]> = {
    admin: [...commonNavItems, ...adminNavItems],
    client: [...commonNavItems, ...clientNavItems],
    freelancer: [...commonNavItems, ...freelancerNavItems],
    guest: [...commonNavItems, ...guestNavItems],
};
