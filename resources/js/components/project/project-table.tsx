import ConfirmDialog from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Project } from '@/types';
import { router } from '@inertiajs/react';
import { Calendar, DollarSign, Edit, ExternalLink, LayoutGrid, MoreHorizontal, Table as TableIcon, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Progress } from '../ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ProjectTableProps {
    projects: Project[];
    onEdit: (project: Project) => void;
}

export default function ProjectTable({ projects, onEdit }: ProjectTableProps) {
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

    const onDelete = (id: number) => {
        router.delete(route('freelancer.projects.destroy', id));
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed':
                return 'default';
            case 'in_progress':
                return 'secondary';
            case 'open':
                return 'outline';
            case 'cancelled':
                return 'destructive';
            default:
                return 'outline';
        }
    };

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'destructive';
            case 'high':
                return 'default';
            case 'medium':
                return 'secondary';
            case 'low':
                return 'outline';
            default:
                return 'outline';
        }
    };

    if (projects.length === 0) {
        return (
            <div className="bg-muted/50 flex flex-col items-center justify-center rounded-lg border border-dashed p-10">
                <p className="text-muted-foreground mb-4">No projects found. Add your first project to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* View Toggle Buttons */}
            <div className="flex justify-end gap-2">
                <Button variant={viewMode === 'table' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('table')} className="gap-2">
                    <TableIcon className="h-4 w-4" />
                    Table View
                </Button>
                <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')} className="gap-2">
                    <LayoutGrid className="h-4 w-4" />
                    Grid View
                </Button>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="bg-card rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[300px]">Project</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Progress</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell className="font-medium">
                                        <div className="space-y-1">
                                            <div className="text-base font-semibold">{project.title}</div>
                                            <div className="text-muted-foreground flex items-center gap-2 text-xs">
                                                <Badge variant="outline" className="px-1 py-0 text-[10px]">
                                                    {project.type}
                                                </Badge>
                                                <span className="flex items-center">
                                                    <Calendar className="mr-1 h-3 w-3" />
                                                    {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm font-medium">{project.client?.name || 'Unknown Client'}</div>
                                        <div className="text-muted-foreground text-xs">{project.client?.company}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center text-sm font-medium">
                                            <DollarSign className="text-muted-foreground mr-1 h-3 w-3" />
                                            {project.budget} {project.currency}
                                        </div>
                                        <div className="text-muted-foreground text-[10px] capitalize">{project.billing_type.replace('_', ' ')}</div>
                                    </TableCell>
                                    <TableCell className="w-[150px]">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between text-[10px]">
                                                <span>{project.progress}%</span>
                                            </div>
                                            <Progress value={project.progress} className="h-1.5" />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1.5">
                                            <Badge className="w-fit capitalize" variant={getStatusBadgeVariant(project.status)}>
                                                {project.status.replace('_', ' ')}
                                            </Badge>
                                            <Badge
                                                className="w-fit px-1 py-0 text-[10px] capitalize"
                                                variant={getPriorityBadgeVariant(project.priority)}
                                            >
                                                {project.priority}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuItem onSelect={() => onEdit(project)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>

                                                <DropdownMenuItem onSelect={() => router.get(route('freelancer.projects.show', project.id))}>
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    View Details
                                                </DropdownMenuItem>
                                                <ConfirmDialog
                                                    trigger={
                                                        <DropdownMenuItem
                                                            onSelect={(e) => e.preventDefault()}
                                                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    }
                                                    title="Delete Project"
                                                    description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
                                                    confirmText="Delete Project"
                                                    variant="destructive"
                                                    onConfirm={() => onDelete(project.id)}
                                                />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <Card key={project.id} className="overflow-hidden">
                            {project.thumbnail && (
                                <div className="aspect-video w-full overflow-hidden border-b">
                                    <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover transition-transform hover:scale-105" />
                                </div>
                            )}
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-lg leading-tight font-semibold">{project.title}</h3>
                                        <Badge variant="outline" className="text-xs">
                                            {project.type}
                                        </Badge>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[160px]">
                                            <DropdownMenuItem onSelect={() => onEdit(project)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => router.get(route('freelancer.projects.show', project.id))}>
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <ConfirmDialog
                                                trigger={
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()}
                                                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                }
                                                title="Delete Project"
                                                description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
                                                confirmText="Delete Project"
                                                variant="destructive"
                                                onConfirm={() => onDelete(project.id)}
                                            />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 pb-3">
                                {/* Client Info */}
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">{project.client?.name || 'Unknown Client'}</p>
                                    {project.client?.company && <p className="text-muted-foreground text-xs">{project.client.company}</p>}
                                </div>

                                {/* Budget and Deadline */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm font-medium">
                                        <DollarSign className="text-muted-foreground mr-1 h-4 w-4" />
                                        {project.budget} {project.currency}
                                    </div>
                                    <div className="text-muted-foreground flex items-center text-xs">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No deadline'}
                                    </div>
                                </div>

                                {/* Billing Type */}
                                <div className="text-muted-foreground text-xs capitalize">{project.billing_type.replace('_', ' ')}</div>

                                {/* Progress */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span>Progress</span>
                                        <span className="font-medium">{project.progress}%</span>
                                    </div>
                                    <Progress value={project.progress} className="h-2" />
                                </div>

                                {/* Status and Priority Badges */}
                                <div className="flex gap-2">
                                    <Badge className="capitalize" variant={getStatusBadgeVariant(project.status)}>
                                        {project.status.replace('_', ' ')}
                                    </Badge>
                                    <Badge className="capitalize" variant={getPriorityBadgeVariant(project.priority)}>
                                        {project.priority}
                                    </Badge>
                                </div>
                            </CardContent>

                            <CardFooter className="pt-3">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={() => router.get(route('freelancer.projects.show', project.id))}
                                >
                                    <ExternalLink className="mr-2 h-3 w-3" />
                                    View Project Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
