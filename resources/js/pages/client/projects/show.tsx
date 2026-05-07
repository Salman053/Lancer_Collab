import { useState, FormEvent } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Project, Milestone, ProjectUpdate, BreadcrumbItem, User } from '@/types';
import { Head, useForm, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatBox from '@/components/project/chat-box';
import ClientTaskForm from '@/components/project/client-task-form';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle2, Circle, FileText, Download, DollarSign, Check, X, Plus, Calendar, Clock, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientProjectShowProps {
    project: Project & {
        user: User;
        milestones: Milestone[];
        updates: ProjectUpdate[];
        files: any[];
        payments: any[];
        messages: any[];
    };
    auth: {
        user: User;
    };
}

export default function ClientProjectShow() {
    const { project, auth } = usePage<any>().props as ClientProjectShowProps;
    const [taskDialogOpen, setTaskDialogOpen] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/client/projects' },
        { title: project.title, href: `/client/projects/${project.id}` },
    ];

    const messageForm = useForm({
        project_id: project.id,
        to_user_id: project.user.id,
        message: '',
    });

    const handleMilestoneAction = (id: number, status: 'completed' | 'revision') => {
        router.put(route('client.milestones.update', id), { status }, {
            preserveScroll: true,
        });
    };

    const getStatusVariant = (status: string) => {
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            'backlog': 'outline',
            'open': 'secondary',
            'in_progress': 'default',
            'on_review': 'default',
            'completed': 'default',
            'archived': 'outline',
            'on_hold': 'secondary',
            'cancelled': 'destructive',
        };
        return variants[status] || 'default';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            
            <div className="flex flex-col gap-6 p-4 md:p-6 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-6 rounded-xl border shadow-sm">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{project.title}</h1>
                            <Badge variant={getStatusVariant(project.status)} className="capitalize">
                                {project.status.replace('_', ' ')}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <UserIcon className="h-4 w-4" />
                            Managed by <span className="font-semibold text-foreground">{project.user.name}</span>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button onClick={() => setTaskDialogOpen(true)} className="shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Add Task
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left/Main Column */}
                    <Card className="lg:col-span-2 shadow-sm border-none bg-transparent overflow-hidden">
                        <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="w-full justify-start rounded-none bg-transparent h-12 border-b px-0 gap-6">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12 font-medium">Overview</TabsTrigger>
                                <TabsTrigger value="milestones" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12 font-medium">Milestones</TabsTrigger>
                                <TabsTrigger value="updates" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12 font-medium">Updates</TabsTrigger>
                                <TabsTrigger value="files" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12 font-medium">Files</TabsTrigger>
                                <TabsTrigger value="payments" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12 font-medium">Payments</TabsTrigger>
                            </TabsList>
                            
                            <div className="bg-card border rounded-b-xl border-t-0">
                                <CardContent className="pt-6">
                                    <TabsContent value="overview" className="mt-0 space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="font-semibold text-lg flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-primary" />
                                                Project Description
                                            </h3>
                                            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap bg-muted/30 p-4 rounded-lg border border-dashed">
                                                {project.description || 'No description provided.'}
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                                <Calendar className="h-5 w-5 text-primary" />
                                                <div>
                                                    <span className="text-xs text-muted-foreground uppercase font-bold">Start Date</span>
                                                    <p className="font-medium">{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'TBD'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20">
                                                <Clock className="h-5 w-5 text-primary" />
                                                <div>
                                                    <span className="text-xs text-muted-foreground uppercase font-bold">Deadline</span>
                                                    <p className="font-medium">{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="milestones" className="mt-0">
                                        <div className="space-y-4">
                                            {project.milestones.length > 0 ? project.milestones.map((milestone: any) => (
                                                <div key={milestone.id} className="flex items-start gap-4 p-4 border rounded-xl hover:bg-muted/10 transition-colors">
                                                    <div className="mt-1">
                                                        {milestone.status === 'completed' ? (
                                                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                                                        ) : (
                                                            <Circle className="h-6 w-6 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <h4 className="font-bold text-lg">{milestone.title}</h4>
                                                                <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="font-bold text-lg text-primary">${milestone.amount}</span>
                                                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1 justify-end">
                                                                    <Calendar className="h-3 w-3" />
                                                                    {new Date(milestone.due_date).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="mt-4 flex items-center justify-between">
                                                            <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'} className="capitalize">
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
                                            )) : (
                                                <div className="text-center py-12 border border-dashed rounded-xl">
                                                    <p className="text-muted-foreground">No milestones defined for this project.</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="updates" className="mt-0">
                                        <div className="space-y-6 py-4">
                                            {project.updates.length > 0 ? project.updates.map((update: any) => (
                                                <div key={update.id} className="relative pl-8 border-l-2 border-primary/20 ml-2">
                                                    <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-card" />
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                                        <Clock className="h-3 w-3" />
                                                        {new Date(update.created_at).toLocaleString()}
                                                    </div>
                                                    <div className="bg-muted/40 p-5 rounded-2xl border">
                                                        <p className="text-sm leading-relaxed">{update.message}</p>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-center py-12 border border-dashed rounded-xl">
                                                    <p className="text-muted-foreground">No formal updates yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="files" className="mt-0">
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {project.files.length > 0 ? project.files.map((file: any) => (
                                                <div key={file.id} className="flex items-center gap-3 p-4 border rounded-xl hover:bg-muted/10 transition-colors">
                                                    <div className="p-3 bg-primary/10 rounded-lg">
                                                        <FileText className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold truncate">{file.file_name}</p>
                                                        <p className="text-xs text-muted-foreground mt-0.5">{(file.file_size / 1024 / 1024).toFixed(2)} MB</p>
                                                    </div>
                                                    <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full" asChild>
                                                        <a href={route('files.download', file.id)}>
                                                            <Download className="h-5 w-5" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            )) : (
                                                <div className="col-span-2 text-center py-12 border border-dashed rounded-xl">
                                                    <p className="text-muted-foreground">No files shared yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="payments" className="mt-0">
                                        <div className="space-y-4">
                                            {project.payments.length > 0 ? project.payments.map((payment: any) => (
                                                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/10 transition-colors">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                                                            <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-lg">{payment.reference_number || `Payment #${payment.id}`}</p>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {new Date(payment.payment_date).toLocaleDateString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-bold text-xl text-foreground">${payment.amount}</p>
                                                        <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'} className="mt-1 capitalize">
                                                            {payment.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="text-center py-12 border border-dashed rounded-xl">
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
                    <div className="lg:col-span-1 h-[600px] lg:h-[calc(100vh-250px)] sticky top-6">
                        <ChatBox 
                            title={project.user.name}
                            avatarFallback={project.user.name.charAt(0)}
                            messages={project.messages}
                            auth={auth}
                            processing={messageForm.processing}
                            onSendMessage={(msg) => {
                                router.post(route('messages.store'), {
                                    project_id: project.id,
                                    to_user_id: project.user.id,
                                    message: msg,
                                }, {
                                    onSuccess: () => messageForm.reset('message'),
                                    preserveScroll: true,
                                });
                            }}
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
