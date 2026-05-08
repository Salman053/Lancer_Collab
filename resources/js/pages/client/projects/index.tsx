import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Folder } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/client/projects',
    },
];

export default function ClientProjectsIndex() {
    const { projects } = usePage<{ projects: any[] }>().props;
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredProjects = statusFilter === 'all' ? projects : projects.filter((p) => p.status === statusFilter);

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
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="on_hold">On Hold</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.length === 0 ? (
                        <Card className="md:col-span-2 lg:col-span-3">
                            <CardContent className="text-muted-foreground flex h-32 items-center justify-center">
                                No projects found matching your filter.
                            </CardContent>
                        </Card>
                    ) : (
                        filteredProjects.map((project) => (
                            <Link key={project.id} href={route('client.projects.show', project.id)}>
                                <Card className="hover:border-primary/50 h-full cursor-pointer transition-all hover:shadow-md">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                                        <Folder className="text-muted-foreground h-4 w-4" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="mt-2 flex items-center justify-between">
                                            <Badge variant="secondary" className="capitalize">
                                                {project.status.replace('_', ' ')}
                                            </Badge>
                                            <span className="text-muted-foreground text-xs">By {project.user.name}</span>
                                        </div>
                                        <div className="mt-4">
                                            <div className="mb-1 flex justify-between text-xs">
                                                <span>Progress</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <div className="bg-muted h-1.5 w-full rounded-full">
                                                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${project.progress}%` }} />
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
