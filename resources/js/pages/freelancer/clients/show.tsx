import { ClientHeader } from '@/components/client/client-header';
import { ClientInfoCard } from '@/components/client/client-info-card';
import { ClientNotes } from '@/components/client/client-notes';
import { ClientStats } from '@/components/client/client-stats';
import AppLayout from '@/layouts/app-layout';
import { Client, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/freelancer/dashboard',
    },
    {
        title: 'Clients',
        href: '/freelancer/clients',
    },
    {
        title: 'Client Details',
        href: '#',
    },
];

export default function Show({ client }: { client: Client }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleEdit = () => {
        setIsDrawerOpen(true);
    };

    const handleUpdate = () => {
        router.reload(); 
        setIsDrawerOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${client.name} - Client Details`} />
            
            <div className="flex flex-col gap-6 p-4 md:p-6 ">
                {/* Header Section */}
                <ClientHeader client={client} onEdit={handleEdit} />

                {/* Stats Overview */}
                <ClientStats client={client} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Contact & Business Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <ClientInfoCard client={client} />
                    </div>

                    {/* Right Column - Notes & Additional Info */}
                    <div className="space-y-6">
                        <ClientNotes client={client} onNoteUpdate={handleUpdate} />
                        
                        {/* Additional Info Card */}
                        {client.preferences && (
                            <div className="bg-muted/50 rounded-lg p-4">
                                <h3 className="font-semibold mb-2">Preferences</h3>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Newsletter:</span>
                                        <span>{client.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Notifications:</span>
                                        <span>{client.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

         
        </AppLayout>
    );
}