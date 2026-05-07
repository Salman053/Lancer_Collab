import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FileManager from '@/components/project/file-manager';
import { CheckCircle2, Circle, Clock, MessageSquare, FileText, Send, Download, DollarSign, Check, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FormEvent, useEffect, useRef } from 'react';
import ChatBox from '@/components/project/chat-box';

export default function ClientProjectShow() {
    const { project, auth } = usePage<any>().props;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Projects', href: '/client/projects' },
        { title: project.title, href: `/client/projects/${project.id}` },
    ];

    const { data, setData, post, processing, reset } = useForm({
        project_id: project.id,
        to_user_id: project.user.id,
        message: '',
    });

    const milestoneForm = useForm({
        status: '',
    });

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior, block: 'end' });
        }
    };

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim()) return;
        
        post(route('messages.store'), {
            onSuccess: () => {
                reset('message');
                setTimeout(() => scrollToBottom('smooth'), 50);
            },
            preserveScroll: true,
        });
    };

    const handleMilestoneAction = (id: number, status: 'completed' | 'revision') => {
        milestoneForm.setData('status', status);
        milestoneForm.put(route('client.milestones.update', id), {
            preserveScroll: true,
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            scrollToBottom('auto');
        }, 100);
        return () => clearTimeout(timer);
    }, [project.messages]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
                        <p className="text-muted-foreground">Managed by {project.user.name}</p>
                    </div>
                    <Badge variant="outline" className="w-fit text-lg py-1 px-4">
                        {project.status.toUpperCase()}
                    </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="md:col-span-2">
                        <Tabs defaultValue="overview">
                            <CardHeader className="p-0 border-b">
                                <TabsList className="w-full justify-start rounded-none bg-transparent h-12">
                                    <TabsTrigger value="overview" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Overview</TabsTrigger>
                                    <TabsTrigger value="milestones" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Milestones</TabsTrigger>
                                    <TabsTrigger value="updates" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Updates</TabsTrigger>
                                    <TabsTrigger value="files" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Files</TabsTrigger>
                                    <TabsTrigger value="payments" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">Payments</TabsTrigger>
                                </TabsList>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <TabsContent value="overview" className="mt-0 space-y-4">
                                    <div className="space-y-2">
                                        <h3 className="font-semibold text-lg">Project Description</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {project.description || 'No description provided.'}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                        <div>
                                            <span className="text-xs text-muted-foreground uppercase font-bold">Start Date</span>
                                            <p>{project.start_date ? new Date(project.start_date).toLocaleDateString() : 'TBD'}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-muted-foreground uppercase font-bold">Deadline</span>
                                            <p>{project.deadline ? new Date(project.deadline).toLocaleDateString() : 'TBD'}</p>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="milestones" className="mt-0">
                                    <div className="space-y-4">
                                        {project.milestones.map((milestone: any) => (
                                            <div key={milestone.id} className="flex items-start gap-4 p-4 border rounded-lg">
                                                {milestone.status === 'completed' ? (
                                                    <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                                                ) : (
                                                    <Circle className="h-6 w-6 text-muted-foreground mt-1" />
                                                )}
                                                <div className="flex-1">
                                                    <div className="flex justify-between">
                                                        <h4 className="font-bold">{milestone.title}</h4>
                                                        <span className="font-mono text-sm">${milestone.amount}</span>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <span className="text-xs text-muted-foreground">
                                                            Due: {new Date(milestone.due_date).toLocaleDateString()}
                                                        </span>
                                                        <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                                                            {milestone.status.toUpperCase().replace('_', ' ')}
                                                        </Badge>
                                                    </div>
                                                    
                                                    {milestone.status === 'in_review' && (
                                                        <div className="mt-4 flex gap-2">
                                                            <Button 
                                                                size="sm" 
                                                                className="gap-1" 
                                                                onClick={() => handleMilestoneAction(milestone.id, 'completed')}
                                                                disabled={milestoneForm.processing}
                                                            >
                                                                <Check className="h-3.5 w-3.5" /> Approve
                                                            </Button>
                                                            <Button 
                                                                size="sm" 
                                                                variant="outline" 
                                                                className="gap-1"
                                                                onClick={() => handleMilestoneAction(milestone.id, 'revision')}
                                                                disabled={milestoneForm.processing}
                                                            >
                                                                <X className="h-3.5 w-3.5" /> Request Revision
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="updates" className="mt-0">
                                    <div className="space-y-6">
                                        {project.updates.length > 0 ? project.updates.map((update: any) => (
                                            <div key={update.id} className="relative pl-6 border-l-2 border-muted ml-2">
                                                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                                                <div className="text-xs text-muted-foreground mb-1">
                                                    {new Date(update.created_at).toLocaleString()}
                                                </div>
                                                <div className="bg-muted/30 p-4 rounded-lg">
                                                    <p className="text-sm">{update.message}</p>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-center text-muted-foreground py-8">No updates yet.</p>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="files" className="mt-0">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {project.files.length > 0 ? project.files.map((file: any) => (
                                            <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                                                <div className="p-2 bg-muted rounded-md">
                                                    <FileText className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate">{file.file_name}</p>
                                                    <p className="text-xs text-muted-foreground">{(file.file_size / 1024 / 1024).toFixed(2)} MB</p>
                                                </div>
                                                <Button size="icon" variant="ghost" asChild>
                                                    <a href={route('files.download', file.id)}>
                                                        <Download className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            </div>
                                        )) : (
                                            <div className="col-span-2 text-center text-muted-foreground py-8">No files shared yet.</div>
                                        )}
                                    </div>
                                </TabsContent>
                                <TabsContent value="payments" className="mt-0">
                                    <div className="space-y-4">
                                        {project.payments.length > 0 ? project.payments.map((payment: any) => (
                                            <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-green-100 rounded-full">
                                                        <DollarSign className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold">{payment.reference_number || `Payment #${payment.id}`}</p>
                                                        <p className="text-xs text-muted-foreground">{new Date(payment.payment_date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono font-bold">${payment.amount}</p>
                                                    <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                                                        {payment.status.toUpperCase()}
                                                    </Badge>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-center text-muted-foreground py-8">No payments recorded yet.</p>
                                        )}
                                    </div>
                                </TabsContent>
                            </CardContent>
                        </Tabs>
                    </Card>

                    <div className="md:col-span-1 h-[600px]">
                        <ChatBox 
                            title={project.user.name}
                            avatarFallback={project.user.name.charAt(0)}
                            messages={project.messages}
                            auth={auth}
                            processing={processing}
                            onSendMessage={(msg) => {
                                setData('message', msg);
                                post(route('messages.store'), {
                                    onSuccess: () => reset('message'),
                                    preserveScroll: true,
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Add route helper if it's not globally available (though it usually is with Ziggy)
declare function route(name: string, params?: any): string;
