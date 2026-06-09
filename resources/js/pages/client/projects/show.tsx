import ChatBox from '@/components/project/chat-box';
import ClientTaskForm from '@/components/project/client-task-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Milestone, Project, ProjectUpdate, User } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Calendar, Check, CheckCircle2, Circle, Clock, DollarSign, Download, FileText, Plus, User as UserIcon, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ClientProjectShowProps {
    project: Project & {
        user: User;
        milestones: Milestone[];
        updates: ProjectUpdate[];
        files: any[];
        payments: any[];
        messages: any[];
        tasks?: any[];
    };
    auth: {
        user: User;
    };
}

export default function ClientProjectShow() {
    const { project, auth } = usePage<any>().props as ClientProjectShowProps;
    const [taskDialogOpen, setTaskDialogOpen] = useState(false);
    const [messages, setMessages] = useState(project.messages);
    const [files, setFiles] = useState(project.files || []);
    const [tasks, setTasks] = useState(project.tasks || []);
    const [updates, setUpdates] = useState(project.updates || []);
    const [milestones, setMilestones] = useState(project.milestones || []);
    const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

    useEffect(() => {
        setMessages(project.messages);
        setFiles(project.files || []);
        setTasks(project.tasks || []);
        setUpdates(project.updates || []);
        setMilestones(project.milestones || []);
        console.log('--- Effect Hook Running ---');
        console.log('Project ID:', project.id);



    }, [project.messages, project.files, project.tasks, project.updates, project.milestones]);

    useEffect(() => {
        console.log('Initializing Echo for project:', project.id);
        if (!window.Echo) {
            console.error('Echo not found on window');
            return;
        }

        try {
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

            console.log('Joining presence channel:', `project-presence.${project.id}`);
            window.Echo.join(`project-presence.${project.id}`)
                .here((users: any) => {
                    console.log('Online users:', users);
                    setOnlineUsers(users);
                })
                .joining((user: any) => {
                    console.log('User joined:', user);
                    setOnlineUsers((prev) => [...prev, user]);
                    toast.success(`${user.name} is now online`, {
                        icon: <div className="h-2 w-2 rounded-full bg-green-500" />,
                    });
                })
                .leaving((user: any) => {
                    console.log('User left:', user);
                    setOnlineUsers((prev) => prev.filter((u) => u.id !== user.id));
                    toast.info(`${user.name} went offline`);
                })
                .error((error: any) => {
                    console.error('Echo join error:', error);
                });
        } catch (err) {
            console.error('Failed to setup Echo listeners:', err);
        }

        return () => {
            if (window.Echo) {
                window.Echo.leave(`project.${project.id}`);
                window.Echo.leave(`project-presence.${project.id}`);
            }
        };
    }, [project.id]);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/client/projects' },
        { title: project?.title, href: `/client/projects/${project?.id}` },
    ];

    const messageForm = useForm({
        project_id: project?.id,
        to_user_id: project?.user?.id,
        message: '',
        attachment: null as File | null,
    });

    const handleDeleteMessage = (id: number) => {
        router.delete(route('messages.destroy', id), {
            preserveScroll: true,
        });
    };

    const handleDeleteAttachment = (id: number) => {
        router.delete(route('messages.attachment.destroy', id), {
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
            onSuccess: () => {
                messageForm.reset('message', 'attachment' as any);
            },
            preserveScroll: true,
        });
    };

    const handleMilestoneAction = (id: number, status: 'completed' | 'revision') => {
        router.put(
            route('client.milestones.update', id),
            { status },
            {
                preserveScroll: true,
            },
        );
    };

    const getStatusVariant = (status: string) => {
        const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
            backlog: 'outline',
            open: 'secondary',
            in_progress: 'default',
            on_review: 'default',
            completed: 'default',
            archived: 'outline',
            on_hold: 'secondary',
            cancelled: 'destructive',
        };
        return variants[status] || 'default';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />

            <div className="mx-auto flex w-full flex-col gap-6 p-4 md:p-6">
                {/* Header Section */}
                <div className="bg-card flex flex-col gap-4 rounded-xl border p-6 shadow-sm md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        {project.thumbnail && (
                            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border shadow-sm">
                                <img src={project.thumbnail} alt={project.title} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <div>
                            <div className="mb-1 flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{project.title}</h1>
                                <Badge variant={getStatusVariant(project.status)} className="capitalize">
                                    {project.status.replace('_', ' ')}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground flex items-center gap-2">
                                <UserIcon className="h-4 w-4" />
                                Managed by <span className="text-foreground font-semibold">{project.user.name}</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" asChild>
                            <a href={route('projects.invoice', project.id)}>
                                <FileText className="mr-2 h-4 w-4" /> Download Invoice
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <a href={route('projects.payments.report', project.id)}>
                                <Download className="mr-2 h-4 w-4" /> Payment Report
                            </a>
                        </Button>
                        <Button onClick={() => setTaskDialogOpen(true)} className="shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Task
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left/Main Column */}
                    <Card className="overflow-hidden max-h-fit border-none bg-transparent shadow-sm lg:col-span-2">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="h-12 w-full justify-start gap-6 rounded-none border-b bg-transparent px-0">
                                <TabsTrigger
                                    value="overview"
                                    className="data-[state=active]:border-primary h-12 rounded-none px-2 font-medium data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="milestones"
                                    className="data-[state=active]:border-primary h-12 rounded-none px-2 font-medium data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                                >
                                    Milestones
                                </TabsTrigger>
                                <TabsTrigger
                                    value="tasks"
                                    className="data-[state=active]:border-primary h-12 rounded-none px-2 font-medium data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                                >
                                    Tasks
                                </TabsTrigger>
                                <TabsTrigger
                                    value="updates"
                                    className="data-[state=active]:border-primary h-12 rounded-none px-2 font-medium data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                                >
                                    Updates
                                </TabsTrigger>
                                <TabsTrigger
                                    value="files"
                                    className="data-[state=active]:border-primary h-12 rounded-none px-2 font-medium data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                                >
                                    Files
                                </TabsTrigger>
                                <TabsTrigger
                                    value="payments"
                                    className="data-[state=active]:border-primary h-12 rounded-none px-2 font-medium data-[state=active]:border-b-2 data-[state=active]:bg-transparent"
                                >
                                    Payments
                                </TabsTrigger>
                            </TabsList>

                            <div className="bg-card p-3 rounded-b-xl border border-t-0">
                                <CardContent className="pt-6">
                                    <TabsContent value="overview" className="mt-0 space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="flex items-center gap-2 text-lg font-semibold">
                                                <FileText className="text-primary h-5 w-5" />
                                                Project Description
                                            </h3>
                                            <div className="text-muted-foreground bg-muted/30 rounded-lg border border-dashed p-4 leading-relaxed whitespace-pre-wrap">
                                                {project.description || 'No description provided.'}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-2">
                                            <div className="bg-muted/20 flex items-center gap-3 rounded-lg p-3">
                                                <Calendar className="text-primary h-5 w-5" />
                                                <div>
                                                    <span className="text-muted-foreground text-xs font-bold uppercase">Start Date</span>
                                                    <p className="font-medium">
                                                        {project.start_date ? new Date(project.start_date).toLocaleDateString() : 'TBD'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-muted/20 flex items-center gap-3 rounded-lg p-3">
                                                <Clock className="text-primary h-5 w-5" />
                                                <div>
                                                    <span className="text-muted-foreground text-xs font-bold uppercase">Deadline</span>
                                                    <p className="font-medium">
                                                        {project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="tasks" className="mt-0 space-y-4 ">
                                        {tasks && tasks.length > 0 ? (
                                            <div className="space-y-3">
                                                {tasks.map((task: any) => (
                                                    <div key={task.id} className="flex items-center gap-3 rounded-lg border p-4">
                                                        {task.is_completed ? (
                                                            <CheckCircle2 className="size-5 text-green-500" />
                                                        ) : (
                                                            <Circle className="text-muted-foreground size-5" />
                                                        )}
                                                        <div className="flex flex-col gap-0.5">

                                                            <span className={task.is_completed ? 'text-muted-foreground line-through' : 'font-medium'}>
                                                                {task.title}
                                                            </span>
                                                            <span className={"text-xs " + (task.is_completed ? 'text-muted-foreground line-through' : 'font-medium')}>
                                                                {task.description}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-muted-foreground rounded-xl border border-dashed py-12 text-center">No tasks.</div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="milestones" className="mt-0">
                                        <div className="space-y-4">
                                            {milestones && milestones.length > 0 ? (
                                                milestones.map((milestone: any) => (
                                                    <div
                                                        key={milestone.id}
                                                        className="hover:bg-muted/10 flex items-start gap-4 rounded-xl border p-4 transition-colors"
                                                    >
                                                        <div className="mt-1">
                                                            {milestone.status === 'completed' ? (
                                                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                                                            ) : (
                                                                <Circle className="text-muted-foreground h-6 w-6" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <h4 className="text-lg font-bold">{milestone.title}</h4>
                                                                    <p className="text-muted-foreground mt-1 text-sm">{milestone.description}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <span className="text-primary text-lg font-bold">${milestone.amount}</span>
                                                                    <div className="text-muted-foreground mt-1 flex items-center justify-end gap-1 text-xs">
                                                                        <Calendar className="h-3 w-3" />
                                                                        {new Date(milestone.due_date).toLocaleDateString()}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mt-4 flex items-center justify-between">
                                                                <Badge
                                                                    variant={milestone.status === 'completed' ? 'default' : 'secondary'}
                                                                    className="capitalize"
                                                                >
                                                                    {milestone.status.replace('_', ' ')}
                                                                </Badge>

                                                                {milestone.status === 'in_review' && (
                                                                    <div className="flex gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            className="h-8 gap-1.5"
                                                                            onClick={() => handleMilestoneAction(milestone.id, 'completed')}
                                                                        >
                                                                            <Check className="h-3.5 w-3.5" /> Approve
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="h-8 gap-1.5"
                                                                            onClick={() => handleMilestoneAction(milestone.id, 'revision')}
                                                                        >
                                                                            <X className="h-3.5 w-3.5" /> Revision
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="rounded-xl border border-dashed py-12 text-center">
                                                    <p className="text-muted-foreground">No milestones defined for this project.</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="updates" className="mt-0">
                                        <div className="space-y-6 py-4">
                                            {updates && updates.length > 0 ? (
                                                updates.map((update: any) => (
                                                    <div key={update.id} className="border-primary/20 relative ml-2 border-l-2 pl-8">
                                                        <div className="bg-primary border-card absolute top-0 -left-[9px] h-4 w-4 rounded-full border-4" />
                                                        <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                                                            <Clock className="h-3 w-3" />
                                                            {new Date(update.created_at).toLocaleString()}
                                                        </div>
                                                        <div className="bg-muted/40 rounded-2xl border p-5">
                                                            <p className="text-sm leading-relaxed">{update.message}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="rounded-xl border border-dashed py-12 text-center">
                                                    <p className="text-muted-foreground">No formal updates yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="files" className="mt-0">
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {files.length > 0 ? (
                                                files.map((file: any) => (
                                                    <div
                                                        key={file.id}
                                                        className="hover:bg-muted/10 flex items-center gap-3 rounded-xl border p-4 transition-colors"
                                                    >
                                                        <div className="bg-primary/10 rounded-lg p-3">
                                                            <FileText className="text-primary h-6 w-6" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-bold">{file.file_name}</p>
                                                            <p className="text-muted-foreground mt-0.5 text-xs">
                                                                {(file.file_size / 1024 / 1024).toFixed(2)} MB
                                                            </p>
                                                        </div>
                                                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full" asChild>
                                                            <a href={route('files.download', file.id)}>
                                                                <Download className="h-5 w-5" />
                                                            </a>
                                                        </Button>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-2 rounded-xl border border-dashed py-12 text-center">
                                                    <p className="text-muted-foreground">No files shared yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="payments" className="mt-0">
                                        <div className="space-y-4">
                                            {project.payments.length > 0 ? (
                                                project.payments.map((payment: any) => (
                                                    <div
                                                        key={payment.id}
                                                        className="hover:bg-muted/10 flex items-center justify-between rounded-xl border p-4 transition-colors"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                                                                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                                                            </div>
                                                            <div>
                                                                <p className="text-lg font-bold">
                                                                    {payment.reference_number || `Payment #${payment.id}`}
                                                                </p>
                                                                <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
                                                                    <Calendar className="h-3 w-3" />
                                                                    {new Date(payment.payment_date).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-foreground text-xl font-bold">${payment.amount}</p>
                                                            <Badge
                                                                variant={payment.status === 'paid' ? 'default' : 'secondary'}
                                                                className="mt-1 capitalize"
                                                            >
                                                                {payment.status}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="rounded-xl border border-dashed py-12 text-center">
                                                    <p className="text-muted-foreground">No payment history available.</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>
                                </CardContent>
                            </div>
                        </Tabs>
                    </Card>

                    {/* Right Column - Chat */}
                    <div className="sticky top-6 h-[600px] lg:col-span-1 lg:h-[calc(100vh-250px)]">
                        <ChatBox
                            title={project.user.name}
                            avatarFallback={project.user.name.charAt(0)}
                            messages={messages}
                            auth={auth}
                            processing={messageForm.processing}
                            onDeleteMessage={handleDeleteMessage}
                            onDeleteAttachment={handleDeleteAttachment}
                            onSendMessage={handleSendMessage}
                            isOnline={onlineUsers.some((u) => Number(u.id) === Number(project.user_id))}
                        />
                    </div>
                </div>
            </div>

            <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Assign New Task</DialogTitle>
                        <DialogDescription>Assign a new task to your freelancer for this project.</DialogDescription>
                    </DialogHeader>
                    <ClientTaskForm project={project} onSuccess={() => setTaskDialogOpen(false)} />
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

declare function route(name: string, params?: any): string;
