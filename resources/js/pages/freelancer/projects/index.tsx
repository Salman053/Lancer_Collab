import ClientForm from '@/components/freelancer/client-form';
import ClientTable from '@/components/freelancer/client-table';
import { Note } from '@/components/note';
import PageHeader from '@/components/page-header';
import ProjectForm from '@/components/project/project-form';
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
        setIsDialogOpen(true);
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
                            <Button onClick={handleAddNew} className="cursor-pointer" variant="secondary">
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

                {/* Your projects content here */}
                <div>
                    {/* Add your projects table/list component here */}
                    <p className="text-muted-foreground">Projects list will appear here...</p>
                </div>
            </div>
        </AppLayout>
    );
}