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
    phone: string | null;
    whatsapp_number: string | null;
    company: string | null;
    address: string | null;
    website_url: string | null;
    profile_image_url: string | null;
    timezone: string;
    status: 'active' | 'inactive' | 'lead' | 'suspended' | 'pending';
    notes: string | null;
    preferences: {
        newsletter: boolean;
        notifications: boolean;
        [key: string]: any;
    };
    created_at: string;
    updated_at: string;
    [key: string]: any;

    // Relationships
    projects?: Project[];
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: 'backlog' | 'open' | 'in_progress' | 'on_review' | 'testing' | 'completed' | 'on_hold' | 'cancelled' | 'archived';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    type: 'Web' | 'Mobile' | 'Desktop' | 'Marketing' | 'Construction' | 'Other';
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
    
    // Relationships
    client?: Client;
    milestones?: Milestone[];
    updates?: ProjectUpdate[];
}

export interface Milestone {
    id: number;
    project_id: number;
    user_id: number;
    title: string;
    description: string | null;
    amount: number | null;
    due_date: string | null;
    status: 'pending' | 'in_progress' | 'in_review' | 'completed' | 'hold' | 'cancelled';
    order: number;
    completed_at: string | null;
    created_at: string;
    updated_at: string;

    // Relationships
    project?: Project;
}

export interface ProjectUpdate {
    id: number;
    project_id: number;
    user_id: number;
    message: string;
    attachment_path: string | null;
    visible_to_client: boolean;
    seen_by_client_at: string | null;
    created_at: string;
    updated_at: string;

    // Relationships
    project?: Project;
    user?: User;
}
