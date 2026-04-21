import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    badge?: string;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role?: string;
    [key: string]: unknown;
}
export interface Client {
    id: number;
    user_id: number;
    name: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    timezone: string;
    status: 'active' | 'inactive' | 'lead' | 'suspended' | 'pending';
    preferences: {
        newsletter: boolean;
        notifications: boolean;
    };
    created_at: string;
    updated_at: string;
    [key: string]: any;
}
