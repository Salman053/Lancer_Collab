import ClientForm from '@/components/client/client-form';
import { ClientHeader } from '@/components/client/client-header';
import { ClientInfoCard } from '@/components/client/client-info-card';
import { ClientNotes } from '@/components/client/client-notes';
import { ClientStats } from '@/components/client/client-stats';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
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
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleEdit = () => {
        setIsSheetOpen(true);
    };

    const handleUpdate = () => {
        router.reload();
        setIsSheetOpen(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${client.name} - Client Details`} />

            <div className="flex flex-col gap-6 p-4 md:p-6">
                {/* Header Section */}
                <ClientHeader client={client} onEdit={handleEdit} />

                {/* Stats Overview */}
                <ClientStats client={client} />

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Contact & Business Info */}
                    <div className="space-y-6 lg:col-span-2">
                        <ClientInfoCard client={client} />
                    </div>

                    {/* Right Column - Notes & Additional Info */}
                    <div className="space-y-6">
                        <ClientNotes client={client} onEdit={handleEdit} onNoteUpdate={handleUpdate} />

                        {/* Additional Info Card */}
                        {client.preferences && (
                            <div className="bg-muted/50 rounded-lg p-4">
                                <h3 className="mb-2 font-semibold">Preferences</h3>
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

            {/* Edit Client Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="border-l p-0 sm:max-w-[600px]">
                    <ScrollArea className="h-full">
                        <div className="p-6">
                            <SheetHeader className="mb-6">
                                <SheetTitle>Edit Client</SheetTitle>
                                <SheetDescription>Update client information and preferences.</SheetDescription>
                            </SheetHeader>

                            <ClientForm
                                client={client}
                                onSuccess={handleUpdate}
                                hideHeader={true}
                                className="border-none bg-transparent p-0 shadow-none"
                            />
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>
        </AppLayout>
    );
}
