import ConfirmDialog from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AlertCircle, Calendar, CheckCircle2, DollarSign, Edit, Plus, Trash2 } from 'lucide-react';

export default function ProjectMilestones({ project, onAdd, onEdit, onDelete, getStatusColor }: any) {
    return (
        <Card className="bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg">Project Milestones</CardTitle>
                    <CardDescription>Deliverables and key stages of this project.</CardDescription>
                </div>
                <Button size="sm" variant="outline" className="h-8" onClick={onAdd}>
                    <Plus className="mr-2 h-4 w-4" /> Add Milestone
                </Button>
            </CardHeader>
            <CardContent>
                {project.milestones && project.milestones.length > 0 ? (
                    <div className="space-y-4">
                        {project.milestones.map((milestone: any) => (
                            <div
                                key={milestone.id}
                                className="bg-card/50 group flex items-start gap-4 rounded-xl border p-4 dark:border-slate-800 dark:bg-slate-900/20"
                            >
                                <div
                                    className={cn(
                                        'mt-1 rounded-full border p-1',
                                        milestone.status === 'completed'
                                            ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
                                            : 'bg-muted text-muted-foreground',
                                    )}
                                >
                                    <CheckCircle2 className="h-4 w-4" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-semibold">{milestone.title}</h4>
                                            <Badge
                                                variant="outline"
                                                className={cn('h-4 px-1.5 text-[10px] capitalize', getStatusColor(milestone.status))}
                                            >
                                                {milestone.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(milestone)}>
                                                <Edit className="h-3.5 w-3.5" />
                                            </Button>
                                            <ConfirmDialog
                                                trigger={
                                                    <Button variant="ghost" size="icon" className="text-destructive h-7 w-7">
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                }
                                                title="Delete Milestone"
                                                description={`Are you sure you want to delete "${milestone.title}"?`}
                                                confirmText="Delete Milestone"
                                                variant="destructive"
                                                onConfirm={() => onDelete(milestone.id)}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground line-clamp-2 text-xs">{milestone.description}</p>
                                    <div className="flex items-center gap-4 pt-1">
                                        {milestone.due_date && (
                                            <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                                                <Calendar className="h-3 w-3" /> Due: {new Date(milestone.due_date).toLocaleDateString()}
                                            </span>
                                        )}
                                        {milestone.amount && (
                                            <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                                                <DollarSign className="h-3 w-3" /> {parseFloat(milestone.amount.toString()).toLocaleString()}{' '}
                                                {project.currency}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-muted/20 rounded-xl border border-dashed py-12 text-center">
                        <AlertCircle className="text-muted-foreground/50 mx-auto mb-3 h-10 w-10" />
                        <p className="text-muted-foreground text-sm font-medium">No milestones defined for this project yet.</p>
                        <Button variant="link" size="sm" className="mt-2" onClick={onAdd}>
                            Set up first milestone
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
