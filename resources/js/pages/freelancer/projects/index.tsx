import PageHeader from '@/components/page-header';
import ProjectTable from '@/components/project/project-table';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Client, Project, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/freelancer/dashboard',
    },
    {
        title: 'Projects',
        href: '/freelancer/projects',
    },
];

export default function Index({ projects, clients }: { clients: Client[], projects: Project[] }) {

    const handleEdit = (project: Project) => {
        router.get(route('freelancer.projects.edit', project.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <PageHeader
                        title="All Projects"
                        subtitle="Manage all your projects from here"
                    />

                    <Link href={route('freelancer.projects.create')}>
                        <Button className="cursor-pointer" variant="primary">
                            New Project
                        </Button>
                    </Link>
                </div>

                <div>
                    <ProjectTable projects={projects} onEdit={handleEdit} />
                </div>

            </div>
        </AppLayout>
    );
}