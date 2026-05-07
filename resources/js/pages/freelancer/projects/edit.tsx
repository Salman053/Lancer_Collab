import ProjectForm from '@/components/project/project-form';
import AppLayout from '@/layouts/app-layout';
import { Client, Project } from '@/types';

export default function Edit({ project, clients }: { project: Project, clients: Client[] }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Projects', href: '/freelancer/projects' },
                { title: 'Edit', href: '' },
            ]}
        >
            <div className="p-6">
                <ProjectForm
                    className="border-none p-4 shadow-none bg-transparent"
                    project={project}
                    clients={clients}
                />
            </div>
        </AppLayout>
    );
}
