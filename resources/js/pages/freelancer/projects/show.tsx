import AppLayout from '@/layouts/app-layout';
import { Project, Client, Milestone, BreadcrumbItem, ProjectUpdate } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    Calendar,
    DollarSign,
    Clock,
    Briefcase,
    User,
    CheckCircle2,
    AlertCircle,
    MoreVertical,
    Edit,
    Plus,
    Target,
    Trash2,
    MessageSquare,
    FileText,
    History,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PaymentForm from '@/components/project/payment-form';
import MilestoneForm from '@/components/project/milestone-form';
import FileManager from '@/components/project/file-manager';
import ProjectUpdateForm from '@/components/project/project-update-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatBox from '@/components/project/chat-box';

interface ProjectShowProps {
    project: Project & { 
        client: Client & { account: any };
        milestones: Milestone[];
        updates: ProjectUpdate[];
        messages: any[];
        files?: any[];
    };
    auth: any;
}

export default function ProjectShow({ project, auth }: ProjectShowProps) {
    const [milestoneDialogOpen, setMilestoneDialogOpen] = useState(false);
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
    const [editingMilestone, setEditingMilestone] = useState<Milestone | undefined>(undefined);
    
    const { delete: destroyMilestone } = useForm();
    const { delete: destroyUpdate } = useForm();

    const messageForm = useForm({
        project_id: project.id,
        to_user_id: project.client?.account_id || project.client?.account?.id,
        message: '',
    });

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!messageForm.data.message.trim() || !messageForm.data.to_user_id) return;
        
        messageForm.post(route('messages.store'), {
            onSuccess: () => {
                messageForm.reset('message');
                setTimeout(() => scrollToBottom('smooth'), 100);
            },
            preserveScroll: true,
        });
    };

    useEffect(() => {
        // Sync to_user_id if project client changes
        if (project.client?.account_id || project.client?.account?.id) {
            messageForm.setData('to_user_id', project.client?.account_id || project.client?.account?.id);
        }
    }, [project.client]);

    useEffect(() => {
        // Delay initial scroll slightly to allow the UI to fully render
        const timer = setTimeout(() => {
            scrollToBottom('auto');
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Scroll when messages change
        scrollToBottom('smooth');
    }, [project.messages]);

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

    const getMilestoneStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
            in_progress: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
            in_review: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
            completed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            hold: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
            cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
        };
        return colors[status] || colors.pending;
    };

    const handleAddMilestone = () => {
        setEditingMilestone(undefined);
        setMilestoneDialogOpen(true);
    };

    const handleEditMilestone = (milestone: Milestone) => {
        setEditingMilestone(milestone);
        setMilestoneDialogOpen(true);
    };

    const handleDeleteMilestone = (milestoneId: number) => {
        if (confirm('Are you sure you want to delete this milestone?')) {
            destroyMilestone(route('freelancer.milestones.destroy', milestoneId));
        }
    };

    const handleDeleteUpdate = (updateId: number) => {
        if (confirm('Are you sure you want to delete this update?')) {
            destroyUpdate(route('freelancer.project-updates.destroy', updateId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Project: ${project.title}`} />
            
            <div className="space-y-6 pb-12 p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                            <Badge variant="outline" className={cn("capitalize px-2.5 py-0.5", getStatusColor(project.status))}>
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
                                <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="milestones" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 mb-4">
                                <TabsTrigger value="milestones" className="flex items-center gap-2">
                                    <Target className="h-4 w-4" /> Milestones
                                </TabsTrigger>
                                <TabsTrigger value="updates" className="flex items-center gap-2">
                                    <History className="h-4 w-4" /> Updates
                                </TabsTrigger>
                                <TabsTrigger value="messages" className="flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" /> Messages
                                </TabsTrigger>
                                <TabsTrigger value="files" className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" /> Files
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="milestones" className="space-y-6">
                                {/* Progress Overview Card */}
                                <Card className="dark:bg-slate-900/40 dark:border-slate-800">
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <Target className="h-5 w-5 text-primary" />
                                            Execution Progress
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span>Completion</span>
                                                <span>{project.progress}%</span>
                                            </div>
                                            <Progress value={project.progress} className="h-2.5" />
                                        </div>
                                        
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase font-semibold">Priority</p>
                                                <p className="font-medium capitalize">{project.priority}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase font-semibold">Type</p>
                                                <p className="font-medium">{project.type}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase font-semibold">Start Date</p>
                                                <p className="font-medium">{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'N/A'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground uppercase font-semibold">Deadline</p>
                                                <p className="font-medium text-destructive">{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'No limit'}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Milestones Card */}
                                <Card className="dark:bg-slate-900/40 dark:border-slate-800">
                                    <CardHeader className="flex flex-row items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg">Project Milestones</CardTitle>
                                            <CardDescription>Deliverables and key stages of this project.</CardDescription>
                                        </div>
                                        <Button size="sm" variant="outline" className="h-8" onClick={handleAddMilestone}>
                                            <Plus className="mr-2 h-4 w-4" /> Add Milestone
                                        </Button>
                                    </CardHeader>
                                    <CardContent>
                                        {project.milestones && project.milestones.length > 0 ? (
                                            <div className="space-y-4">
                                                {project.milestones.map((milestone) => (
                                                    <div key={milestone.id} className="flex items-start gap-4 p-4 rounded-xl border bg-card/50 dark:border-slate-800 dark:bg-slate-900/20 group">
                                                        <div className={cn(
                                                            "mt-1 p-1 rounded-full border",
                                                            milestone.status === 'completed' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground"
                                                        )}>
                                                            <CheckCircle2 className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <h4 className="font-semibold text-sm">{milestone.title}</h4>
                                                                    <Badge variant="outline" className={cn("text-[10px] h-4 px-1.5 capitalize", getMilestoneStatusColor(milestone.status))}>
                                                                        {milestone.status.replace('_', ' ')}
                                                                    </Badge>
                                                                </div>
                                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEditMilestone(milestone)}>
                                                                        <Edit className="h-3.5 w-3.5" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteMilestone(milestone.id)}>
                                                                        <Trash2 className="h-3.5 w-3.5" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-muted-foreground line-clamp-2">{milestone.description}</p>
                                                            <div className="flex items-center gap-4 pt-1">
                                                                {milestone.due_date && (
                                                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                                        <Calendar className="h-3 w-3" /> Due: {new Date(milestone.due_date).toLocaleDateString()}
                                                                    </span>
                                                                )}
                                                                {milestone.amount && (
                                                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                                        <DollarSign className="h-3 w-3" /> {parseFloat(milestone.amount.toString()).toLocaleString()} {project.currency}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
                                                <AlertCircle className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
                                                <p className="text-muted-foreground text-sm font-medium">No milestones defined for this project yet.</p>
                                                <Button variant="link" size="sm" className="mt-2" onClick={handleAddMilestone}>Set up first milestone</Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="updates" className="space-y-6">
                                <Card className="dark:bg-slate-900/40 dark:border-slate-800">
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
                                            {project.updates.map((update) => (
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
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteUpdate(update.id)}>
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
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
                            </TabsContent>

                            <TabsContent value="messages" className="h-[600px]">
                                <ChatBox 
                                    messages={project.messages || []}
                                    auth={auth}
                                    processing={messageForm.processing}
                                    onSendMessage={(msg) => {
                                        messageForm.setData('message', msg);
                                        messageForm.post(route('messages.store'), {
                                            onSuccess: () => messageForm.reset('message'),
                                            preserveScroll: true,
                                        });
                                    } } title={''} avatarFallback={project.client.name.charAt(0) }                                />
                            </TabsContent>

                            <TabsContent value="files">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Files</CardTitle>
                                        <CardDescription>Shared documents and assets for this project.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <FileManager project={project} files={project.files || []} auth={auth} />
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar: Financials & Client Info */}
                    <div className="space-y-6">
                        {/* Financial Overview Card */}
                        <Card className="bg-emerald-50/30 border-emerald-100/50 dark:bg-emerald-950/10 dark:border-emerald-900/30">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-emerald-600" />
                                    Financials
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase font-semibold">Budget ({project.currency})</p>
                                    <p className="text-2xl font-bold">{parseFloat(project.budget?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                </div>
                                <Separator className="bg-emerald-100/50 dark:bg-emerald-900/30" />
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">Cost to Date</p>
                                        <p className="font-semibold">{parseFloat(project.actual_cost?.toString() || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-muted-foreground uppercase font-semibold">Billing Type</p>
                                        <p className="font-semibold capitalize">{project.billing_type}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Client Info Card */}
                        <Card className="dark:bg-slate-900/40 dark:border-slate-800 overflow-hidden">
                            <div className="h-2 w-full" style={{ backgroundColor: project.color || '#3b82f6' }} />
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <User className="h-5 w-5 text-primary" />
                                    Client Profile
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                        {project.client?.name?.charAt(0) || 'C'}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{project.client?.name}</p>
                                        <p className="text-xs text-muted-foreground">{project.client?.company || 'Personal'}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span>{project.client?.timezone || 'UTC'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                                        <Link href={route('freelancer.clients.show', project.client_id || 0)} className="text-primary hover:underline font-medium">
                                            View Full Portfolio
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Internal Notes Card */}
                        <Card className="dark:bg-slate-900/40 dark:border-slate-800">
                            <CardHeader>
                                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    Internal Project Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm italic text-muted-foreground whitespace-pre-wrap">
                                    {project.notes || 'No internal notes provided for this project.'}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Milestone Dialog */}
            <Dialog open={milestoneDialogOpen} onOpenChange={setMilestoneDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingMilestone ? 'Edit Milestone' : 'Add New Milestone'}</DialogTitle>
                        <DialogDescription>
                            {editingMilestone 
                                ? 'Update the details of this project milestone.' 
                                : 'Define a new milestone for this project to track progress.'}
                        </DialogDescription>
                    </DialogHeader>
                    <MilestoneForm 
                        project={project} 
                        milestone={editingMilestone} 
                        onSuccess={() => setMilestoneDialogOpen(false)} 
                    />
                </DialogContent>
            </Dialog>

            {/* Payment Dialog */}
            <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Record Payment</DialogTitle>
                        <DialogDescription>
                            Manually record a payment for this project.
                        </DialogDescription>
                    </DialogHeader>
                    <PaymentForm 
                        project={project} 
                        onSuccess={() => setPaymentDialogOpen(false)} 
                    />
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
