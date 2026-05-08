import ProjectForm from '@/components/project/project-form';
import AppLayout from '@/layouts/app-layout';
import { Client, Project } from '@/types';

export default function Edit({ project, clients }: { project: Project; clients: Client[] }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Projects', href: '/freelancer/projects' },
                { title: 'Edit', href: '' },
            ]}
        >
            <div className="p-6">
                <ProjectForm className="border-none bg-transparent p-4 shadow-none" project={project} clients={clients} />
            </div>
        </AppLayout>
    );
}
