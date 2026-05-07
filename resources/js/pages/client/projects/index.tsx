import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Folder } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/client/projects',
    },
];

export default function ClientProjectsIndex() {
    const { projects } = usePage<{ projects: any[] }>().props;
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredProjects = statusFilter === 'all' 
        ? projects 
        : projects.filter(p => p.status === statusFilter);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Projects</h1>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on-hold">On Hold</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.length === 0 ? (
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardContent className="flex h-32 items-center justify-center text-muted-foreground">
                                No projects found matching your filter.
                            </CardContent>
                        </Card>
                    ) : (
                        filteredProjects.map((project) => (
                            <Link key={project.id} href={route('client.projects.show', project.id)}>
                                <Card className="transition-all hover:border-primary/50 hover:shadow-md cursor-pointer h-full">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                                        <Folder className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between mt-2">
                                            <Badge variant="secondary" className="capitalize">{project.status.replace('-', ' ')}</Badge>
                                            <span className="text-xs text-muted-foreground">
                                                By {project.user.name}
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>Progress</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-1.5">
                                                <div 
                                                    className="bg-primary h-1.5 rounded-full" 
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
