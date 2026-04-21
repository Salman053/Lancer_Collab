import { Shield, Briefcase, Users, User } from 'lucide-react';

interface RoleBadgeProps {
    role: string;
}

const roleConfig: Record<string, { icon: React.ComponentType<{ className?: string }>, label: string, color: string }> = {
    admin: {
        icon: Shield,
        label: 'Administrator',
        color: 'bg-red-500/10 text-red-600 dark:text-red-400',
    },
    client: {
        icon: Briefcase,
        label: 'Client',
        color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    },
    freelancer: {
        icon: Users,
        label: 'Freelancer',
        color: 'bg-green-500/10 text-green-600 dark:text-green-400',
    },
    guest: {
        icon: User,
        label: 'Guest',
        color: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    },
};

export function RoleBadge({ role }: RoleBadgeProps) {
    const config = roleConfig[role] || roleConfig.guest;
    const Icon = config.icon;

    return (
        <div className={`flex items-center gap-2 overflow-hidden  rounded-md px-3 py-1.5 text-xs font-medium ${config.color}`}>
            <Icon className="h-3 w-3" />
            <span>{config.label}</span>
        </div>
    );
}