import ConfirmDialog from '@/components/confirm-dialog';
import ProjectUpdateForm from '@/components/project/project-update-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, History, Trash2 } from 'lucide-react';

export default function ProjectUpdates({ project, onDelete }: any) {
    return (
        <div className="space-y-6">
            <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                    <CardTitle>Post a Project Update</CardTitle>
                    <CardDescription>Keep your client informed about the latest progress.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectUpdateForm project={project} />
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="px-1 text-lg font-semibold">Update History</h3>
                {project.updates && project.updates.length > 0 ? (
                    <div className="space-y-6">
                        {project.updates.map((update: any) => (
                            <div
                                key={update.id}
                                className="relative pl-8 before:absolute before:top-2 before:bottom-0 before:left-[11px] before:w-px before:bg-slate-200 last:before:hidden dark:before:bg-slate-800"
                            >
                                <div className="bg-background absolute top-1.5 left-0 z-10 flex h-6 w-6 items-center justify-center rounded-full border">
                                    <History className="text-muted-foreground h-3 w-3" />
                                </div>
                                <div className="bg-card rounded-xl border p-4 shadow-sm">
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold">{new Date(update.created_at).toLocaleDateString()}</span>
                                            <span className="text-muted-foreground text-[10px]">
                                                {new Date(update.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                            {!update.visible_to_client && (
                                                <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                                                    Private
                                                </Badge>
                                            )}
                                        </div>
                                        <ConfirmDialog
                                            trigger={
                                                <Button variant="ghost" size="icon" className="text-destructive h-7 w-7">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            }
                                            title="Delete Update"
                                            description="Are you sure you want to delete this project update?"
                                            confirmText="Delete Update"
                                            variant="destructive"
                                            onConfirm={() => onDelete(update.id)}
                                        />
                                    </div>
                                    <div className="text-sm whitespace-pre-wrap text-slate-600 dark:text-slate-400">{update.message}</div>
                                    {update.seen_by_client_at && (
                                        <div className="mt-3 flex items-center gap-1 border-t pt-2 text-[10px] text-emerald-500 dark:border-slate-800">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Seen by client
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-muted/20 rounded-xl border border-dashed py-12 text-center">
                        <History className="text-muted-foreground/50 mx-auto mb-3 h-10 w-10" />
                        <p className="text-muted-foreground text-sm font-medium">No updates posted yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
