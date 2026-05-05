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
    account_id?: number;
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



export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: 'open' | 'in_progress' | 'review' | 'completed' | 'cancelled';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    type: 'Web' | 'Mobile' | 'Design' | 'Consulting' | 'Marketing' | 'Other';
    progress: number;
    notes: string | null;
    budget: number | null;
    currency: string;
    actual_cost: number;
    billing_type: 'fixed' | 'hourly' | 'retainer';
    color: string;
    start_date: string | null;
    deadline: string | null;
    completed_at: string | null;
    thumbnail: string | null;
    client_id: number | null;
    user_id: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    
    // Optional: eager loaded relationships
    client?: Client;
}