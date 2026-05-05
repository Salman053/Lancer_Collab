import PageHeader from '@/components/page-header';
import ProjectForm from '@/components/project/project-form';
import ProjectTable from '@/components/project/project-table';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Client, Project, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        // Use a small timeout to ensure the dropdown menu is fully closed 
        // and its cleanup logic has run before opening the dialog.
        setTimeout(() => {
            setIsDialogOpen(true);
        }, 100);
    };



    const handleAddNew = () => {
        setEditingProject(null);
        setIsDialogOpen(true);
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        setEditingProject(null);
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

                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={handleAddNew} className="cursor-pointer" variant="primary">
                                New Project
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingProject ? 'Edit Project' : 'Create New Project'}
                                </DialogTitle>
                            </DialogHeader>
                            <ProjectForm
                                className="border-none shadow-none"
                                project={editingProject}
                                onSuccess={handleSuccess}
                                clients={clients}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <div>
                    <ProjectTable
                        projects={projects} onEdit={handleEdit} />
                </div>

            </div>
        </AppLayout>
    );
}