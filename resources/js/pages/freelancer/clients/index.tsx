import ClientForm from '@/components/client/client-form';
import ClientTable from '@/components/client/client-table';
import { Note } from '@/components/note';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import AppLayout from '@/layouts/app-layout';
import { Client, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
];

export default function Index({ clients }: { clients: Client[] }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setTimeout(() => {
            setIsDrawerOpen(true);
        }, 100);
    };

    const handleAddNew = () => {
        setEditingClient(null);
        setIsDrawerOpen(true);
    };

    const handleSuccess = () => {
        setIsDrawerOpen(false);
        setEditingClient(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex flex-col gap-6 p-6">

                <div className="flex items-center justify-between">
                    <PageHeader
                        title="All Clients"
                        subtitle="Manage all your clients from here"
                    />

                    <Button onClick={handleAddNew} className='cursor-pointer' variant={'primary'}>
                        New Client
                    </Button>

                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-2xl mt-4">
                                <ClientForm
                                    className='border-none shadow-none'
                                    client={editingClient}
                                    onSuccess={handleSuccess}
                                />
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>



                <ClientTable clients={clients} onEdit={handleEdit} />
            </div>
        </AppLayout>
    );
}
