import ClientForm from '@/components/client/client-form';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Clients', href: '/freelancer/clients' },
                { title: 'Create', href: '' },
            ]}
        >
            <div className="p-6">
                <ClientForm className="border-none shadow-none bg-transparent" />
            </div>
        </AppLayout>
    );
}