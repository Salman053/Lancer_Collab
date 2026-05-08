import ConfirmDialog from '@/components/confirm-dialog';
import ChatBox from '@/components/project/chat-box';
import FileManager from '@/components/project/file-manager';
import MilestoneForm from '@/components/project/milestone-form';
import PaymentForm from '@/components/project/payment-form';
import ProjectMilestones from '@/components/project/project-milestones';
import ProjectSidebar from '@/components/project/project-sidebar';
import ProjectUpdates from '@/components/project/project-updates';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Client, Milestone, Project, ProjectUpdate } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { CheckCircle2, DollarSign, Edit, FileText, History, MoreVertical, Target, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ProjectShowProps {
    project: Project & {
        client: Client & { account: any };
        milestones: Milestone[];
        updates: ProjectUpdate[];
        messages: any[];
        files?: any[];
        tasks?: any[];
    };
    auth: any;
}

export default function ProjectShow({ project, auth }: ProjectShowProps) {
    const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState<Milestone | undefined>(undefined);
    const [messages, setMessages] = useState(project.messages || []);
    const [files, setFiles] = useState(project.files || []);
    const [tasks, setTasks] = useState(project.tasks || []);
    const [updates, setUpdates] = useState(project.updates || []);
    const [milestones, setMilestones] = useState(project.milestones || []);

    useEffect(() => {
        setMessages(project.messages || []);
        setFiles(project.files || []);
        setTasks(project.tasks || []);
        setUpdates(project.updates || []);
        setMilestones(project.milestones || []);
    }, [project.messages, project.files, project.tasks, project.updates, project.milestones]);

    useEffect(() => {
        window.Echo.private(`project.${project.id}`)
            .listen('.MessageSent', (e: any) => {
                setMessages((prev: any) => {
                    if (prev.find((msg: any) => msg.id === e.message.id)) {
                        return prev;
                    }
                    return [...prev, e.message];
                });
            })
            .listen('.MessageDeleted', (e: any) => {
                setMessages((prev: any) => prev.filter((msg: any) => msg.id !== e.message.id));
            })
            .listen('.FileUploaded', (e: any) => {
                setFiles((prev: any) => {
                    if (prev.find((f: any) => f.id === e.file.id)) {
                        return prev;
                    }
                    return [...prev, e.file];
                });
            })
            .listen('.FileDeleted', (e: any) => {
                setFiles((prev: any) => prev.filter((f: any) => f.id !== e.file.id));
            })
            .listen('.TaskCreated', (e: any) => {
                setTasks((prev: any) => {
                    if (prev.find((t: any) => t.id === e.task.id)) return prev;
                    return [...prev, e.task];
                });
            })
            .listen('.TaskUpdated', (e: any) => {
                setTasks((prev: any) => prev.map((t: any) => (t.id === e.task.id ? e.task : t)));
            })
            .listen('.TaskDeleted', (e: any) => {
                setTasks((prev: any) => prev.filter((t: any) => t.id !== e.taskId));
            })
            .listen('.ProjectUpdateCreated', (e: any) => {
                setUpdates((prev: any) => {
                    if (prev.find((u: any) => u.id === e.update.id)) return prev;
                    return [e.update, ...prev];
                });
            })
            .listen('.ProjectUpdateDeleted', (e: any) => {
                setUpdates((prev: any) => prev.filter((u: any) => u.id !== e.updateId));
            })
            .listen('.MilestoneCreated', (e: any) => {
                setMilestones((prev: any) => {
                    if (prev.find((m: any) => m.id === e.milestone.id)) return prev;
                    return [...prev, e.milestone];
                });
            })
            .listen('.MilestoneUpdated', (e: any) => {
                setMilestones((prev: any) => prev.map((m: any) => (m.id === e.milestone.id ? e.milestone : m)));
            })
            .listen('.MilestoneDeleted', (e: any) => {
                setMilestones((prev: any) => prev.filter((m: any) => m.id !== e.milestoneId));
            });

        return () => {
            window.Echo.leave(`project.${project.id}`);
        };
    }, [project.id]);

    const { delete: destroyProject } = useForm();
    const handleDeleteProject = () => destroyProject(route('freelancer.projects.destroy', project.id));

    const { delete: destroyMilestone } = useForm();
    const { delete: destroyUpdate } = useForm();

    const messageForm = useForm({
        project_id: project.id,
        to_user_id: project.client?.account_id || project.client?.account?.id,
        message: '',
        attachment: null as File | null,
    });

    const handleDeleteMessage = (id: number) => {
        router.delete(route('messages.destroy', id), {
            preserveScroll: true,
        });
    };

    const handleSendMessage = (msg: string, attachment?: File | null) => {
        const formData = {
            ...messageForm.data,
            message: msg,
            attachment: attachment as any,
        };
        messageForm.setData(formData);

        router.post(route('messages.store'), formData as any, {
            onSuccess: () => messageForm.reset('message', 'attachment' as any),
            preserveScroll: true,
        });
    };



    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: route('freelancer.projects') },
        { title: project.title, href: route('freelancer.projects.show', project.id) },
    ];

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            open: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            in_progress: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
            completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            on_hold: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
            backlog: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
        };
        return colors[status] || colors.open;
    };

    const handleAddMilestone = () => {
        setEditingMilestone(undefined);
        setMilestoneDialogOpen(true);
    };
    const handleEditMilestone = (m: Milestone) => {
        setEditingMilestone(m);
        setMilestoneDialogOpen(true);
    };
    const handleDeleteMilestone = (id: number) => destroyMilestone(route('freelancer.milestones.destroy', id));
    const handleDeleteUpdate = (id: number) => destroyUpdate(route('freelancer.project-updates.destroy', id));
    const handleDeleteAttachment = (id: number) => {
        router.delete(route('messages.attachment.destroy', id), {
            preserveScroll: true,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Project: ${project.title}`} />
            <div className="space-y-6 p-6 pb-12">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                            <Badge variant="outline" className={cn('px-2.5 py-0.5 capitalize', getStatusColor(project.status))}>
                                {project.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground max-w-2xl">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={() => setPaymentDialogOpen(true)}>
                            <DollarSign className="mr-2 h-4 w-4" /> Record Payment
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={route('freelancer.projects.edit', project.id)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit Project
                            </Link>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <ConfirmDialog
                                    trigger={
                                        <DropdownMenuItem
                                            onSelect={(e) => e.preventDefault()}
                                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Project
                                        </DropdownMenuItem>
                                    }
                                    title="Delete Project"
                                    description={`Are you sure you want to delete "${project.title}"? This action cannot be undone.`}
                                    confirmText="Delete Project"
                                    variant="destructive"
                                    onConfirm={handleDeleteProject}
                                />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <Tabs defaultValue="milestones" className="w-full">
                            <TabsList className="mb-4 grid w-full grid-cols-5">
                                <TabsTrigger value="milestones">
                                    <Target className="mr-2 h-4 w-4" /> Milestones
                                </TabsTrigger>
                                <TabsTrigger value="tasks">
                                    <CheckCircle2 className="mr-2 h-4 w-4" /> Tasks
                                </TabsTrigger>
                                <TabsTrigger value="updates">
                                    <History className="mr-2 h-4 w-4" /> Updates
                                </TabsTrigger>
                                <TabsTrigger value="financials">
                                    <DollarSign className="mr-2 h-4 w-4" /> Financials
                                </TabsTrigger>
                                <TabsTrigger value="files">
                                    <FileText className="mr-2 h-4 w-4" /> Files
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="milestones">
                                <ProjectMilestones
                                    project={{ ...project, milestones }}
                                    onAdd={handleAddMilestone}
                                    onEdit={handleEditMilestone}
                                    onDelete={handleDeleteMilestone}
                                    getStatusColor={getStatusColor}
                                />
                            </TabsContent>
                            <TabsContent value="tasks" className="mt-0 space-y-4">
                                {tasks && tasks.length > 0 ? (
                                    tasks.map((task: any) => (
                                        <div key={task.id} className="hover:bg-muted/10 flex items-center gap-3 rounded-lg border p-4">
                                            <button
                                                onClick={() => router.put(route('freelancer.tasks.toggle', task.id), {}, { preserveScroll: true })}
                                                className="focus:outline-none"
                                            >
                                                {task.is_completed ? (
                                                    <CheckCircle2 className="text-green-500" />
                                                ) : (
                                                    <div className="border-muted-foreground hover:bg-muted size-5 rounded-full border" />
                                                )}
                                            </button>
                                            <span className={task.is_completed ? 'text-muted-foreground line-through' : 'font-medium'}>
                                                {task.title}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground rounded-xl border border-dashed py-12 text-center">No tasks.</div>
                                )}
                            </TabsContent>
                            <TabsContent value="updates">
                                <ProjectUpdates project={{ ...project, updates }} onDelete={handleDeleteUpdate} />
                            </TabsContent>
                            <TabsContent value="financials" className="h-[600px]">
                                <ProjectSidebar project={project} />


                            </TabsContent>
                            <TabsContent value="files">
                                <FileManager project={project} files={files} auth={auth} />
                            </TabsContent>
                        </Tabs>
                    </div>
                    <div className="max-h-[80vh] space-y-6">
                        <ChatBox
                            messages={messages}
                            auth={auth}
                            processing={messageForm.processing}
                            onDeleteMessage={handleDeleteMessage}
                            onDeleteAttachment={handleDeleteAttachment}
                            onSendMessage={handleSendMessage}
                            title={project.client.name}
                            avatarFallback={project.client.name.charAt(0)}
                        />
                    </div>
                </div>
            </div>
            <Dialog open={milestoneDialogOpen} onOpenChange={setMilestoneDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}</DialogTitle>
                    </DialogHeader>
                    <MilestoneForm project={project} milestone={editingMilestone} onSuccess={() => setMilestoneDialogOpen(false)} />
                </DialogContent>
            </Dialog>
            <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Record Payment</DialogTitle>
                    </DialogHeader>
                    <PaymentForm project={project} onSuccess={() => setPaymentDialogOpen(false)} />
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
