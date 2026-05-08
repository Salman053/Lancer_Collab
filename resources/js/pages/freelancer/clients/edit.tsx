import ClientForm from '@/components/client/client-form';
import AppLayout from '@/layouts/app-layout';
import { Client } from '@/types';

export default function Edit({ client }: { client: Client }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Clients', href: '/freelancer/clients' },
                { title: 'Edit', href: '' },
            ]}
        >
            <div className="p-6">
                <ClientForm className="border-none bg-transparent shadow-none" client={client} />
            </div>
        </AppLayout>
    );
}
