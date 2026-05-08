import ProjectForm from '@/components/project/project-form';
import AppLayout from '@/layouts/app-layout';
import { Client } from '@/types';

export default function Create({ clients }: { clients: Client[] }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Projects', href: '/freelancer/projects' },
                { title: 'Create', href: '' },
            ]}
        >
            <div className="p-4">
                <ProjectForm className="border-none bg-transparent p-4 shadow-none" clients={clients} />
            </div>
        </AppLayout>
    );
}
