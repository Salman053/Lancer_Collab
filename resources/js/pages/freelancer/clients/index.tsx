import ClientTable from '@/components/client/client-table';
import PageHeader from '@/components/page-header';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Client, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

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

    const handleEdit = (client: Client) => {
        router.get(route('freelancer.clients.edit', client.id));
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

                    <Link href={route('freelancer.clients.create')}>
                        <Button className='cursor-pointer' variant={'primary'}>
                            New Client
                        </Button>
                    </Link>
                </div>

                <ClientTable clients={clients} onEdit={handleEdit} />
            </div>
        </AppLayout>
    );
}
