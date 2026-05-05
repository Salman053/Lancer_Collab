import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, ExternalLink, Calendar, DollarSign } from 'lucide-react';
import { router } from '@inertiajs/react';
import ConfirmDialog from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Progress } from '../ui/progress';

interface ProjectTableProps {
    projects: Project[];
    onEdit: (project: Project) => void;
}

export default function ProjectTable({ projects, onEdit }: ProjectTableProps) {
    const onDelete = (id: number) => {
        router.delete(route('freelancer.projects.destroy', id));
    };

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'completed': return 'default';
            case 'in_progress': return 'secondary';
            case 'open': return 'outline';
            case 'cancelled': return 'destructive';
            default: return 'outline';
        }
    };

    const getPriorityBadgeVariant = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'destructive';
            case 'high': return 'default';
            case 'medium': return 'secondary';
            case 'low': return 'outline';
            default: return 'outline';
        }
    };

    if (projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-muted-foreground mb-4">No projects found. Add your first project to get started!</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card">
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
                                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                                        <Badge variant="outline" className="text-[10px] py-0 px-1">
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
                                <div className="text-sm font-medium">
                                    {project.client?.name || 'Unknown Client'}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {project.client?.company}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center text-sm font-medium">
                                    <DollarSign className="mr-1 h-3 w-3 text-muted-foreground" />
                                    {project.budget} {project.currency}
                                </div>
                                <div className="text-[10px] text-muted-foreground capitalize">
                                    {project.billing_type.replace('_', ' ')}
                                </div>
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
                                    <Badge className="w-fit text-[10px] py-0 px-1 capitalize" variant={getPriorityBadgeVariant(project.priority)}>
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
    );
}
