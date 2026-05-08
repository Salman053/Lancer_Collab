import { Card, CardContent } from '@/components/ui/card';
import { Client } from '@/types';
import { Briefcase, Calendar, Clock, UserCheck } from 'lucide-react';

interface ClientStatsProps {
    client: Client;
}

export function ClientStats({ client }: ClientStatsProps) {
    const stats = [
        {
            label: 'Member Since',
            value: new Date(client.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            icon: Calendar,
        },
        {
            label: 'Last Updated',
            value: new Date(client.updated_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            icon: Clock,
        },
        {
            label: 'Status',
            value: client.status,
            icon: UserCheck,
        },
        {
            label: 'Client ID',
            value: `#${client.id}`,
            icon: Briefcase,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
                <Card key={idx}>
                    <CardContent className="flex items-center gap-4 p-6">
                        <div className="bg-primary/10 rounded-lg p-3">
                            <stat.icon className="text-primary h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-muted-foreground text-sm">{stat.label}</p>
                            <p className="text-lg font-semibold capitalize">{stat.value}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
