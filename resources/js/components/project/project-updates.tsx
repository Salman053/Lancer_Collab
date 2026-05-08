import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, CheckCircle2, Trash2 } from 'lucide-react';
import ConfirmDialog from '@/components/confirm-dialog';
import ProjectUpdateForm from '@/components/project/project-update-form';

export default function ProjectUpdates({ project, onDelete }: any) {
    return (
        <div className="space-y-6">
            <Card className="bg-card shadow-sm border-border">
                <CardHeader>
                    <CardTitle>Post a Project Update</CardTitle>
                    <CardDescription>Keep your client informed about the latest progress.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectUpdateForm project={project} />
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg px-1">Update History</h3>
                {project.updates && project.updates.length > 0 ? (
                    <div className="space-y-6">
                        {project.updates.map((update: any) => (
                            <div key={update.id} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-px before:bg-slate-200 dark:before:bg-slate-800 last:before:hidden">
                                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border bg-background flex items-center justify-center z-10">
                                    <History className="h-3 w-3 text-muted-foreground" />
                                </div>
                                <div className="bg-card border rounded-xl p-4 shadow-sm">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-xs">{new Date(update.created_at).toLocaleDateString()}</span>
                                            <span className="text-[10px] text-muted-foreground">{new Date(update.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            {!update.visible_to_client && (
                                                <Badge variant="secondary" className="text-[10px] h-4 px-1">Private</Badge>
                                            )}
                                        </div>
                                        <ConfirmDialog
                                            trigger={
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
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
                                    <div className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                        {update.message}
                                    </div>
                                    {update.seen_by_client_at && (
                                        <div className="mt-3 pt-2 border-t dark:border-slate-800 flex items-center gap-1 text-[10px] text-emerald-500">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Seen by client
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
                        <History className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                        <p className="text-muted-foreground text-sm font-medium">No updates posted yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
