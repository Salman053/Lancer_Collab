import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, useForm, router, Link } from '@inertiajs/react';
import { Search, Send, User, MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import ChatBox from '@/components/project/chat-box';

export default function MessagesIndex() {
    const { projects, messages, selectedProjectId, auth } = usePage<any>().props;
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selectedProject = projects.find((p: any) => p.id === selectedProjectId);

    const { data, setData, post, processing, reset } = useForm({
        project_id: selectedProjectId || '',
        to_user_id: selectedProject?.other_user?.id || '',
        message: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Messages',
            href: auth.user.role === 'client' ? '/client/messages' : '/freelancer/messages',
        },
    ];

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        if (!data.message.trim() || !data.project_id || !data.to_user_id) return;
        
        post(route('messages.store'), {
            onSuccess: () => {
                reset('message');
                setTimeout(() => scrollToBottom('smooth'), 100);
            },
            preserveScroll: true,
        });
    };

    const selectProject = (id: number) => {
        router.get(route(auth.user.role === 'client' ? 'client.messages' : 'freelancer.messages'), 
            { project_id: id }, 
            { preserveState: true }
        );
    };

    useEffect(() => {
        if (selectedProject) {
            setData({
                project_id: selectedProject.id,
                to_user_id: selectedProject.other_user.id,
                message: data.message
            });
        }
    }, [selectedProjectId]);

    useEffect(() => {
        scrollToBottom('auto');
    }, [messages, selectedProjectId]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border bg-background m-4 shadow-sm">
                {/* Sidebar */}
                <div className="w-80 border-r flex flex-col bg-muted/10">
                    <div className="p-4 border-b bg-background">
                        <h2 className="font-semibold text-lg mb-4">Conversations</h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search projects..." className="pl-8 bg-muted/20" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="divide-y">
                            {projects.length === 0 ? (
                                <div className="p-8 text-center text-sm text-muted-foreground">
                                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                    No active conversations.
                                </div>
                            ) : (
                                projects.map((project: any) => (
                                    <button
                                        key={project.id}
                                        onClick={() => selectProject(project.id)}
                                        className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/50 ${selectedProjectId === project.id ? 'bg-muted border-l-4 border-l-primary' : ''}`}
                                    >
                                        <Avatar className="h-10 w-10 border shadow-sm">
                                            <AvatarFallback className="bg-primary/5 text-primary">
                                                {project.other_user.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex justify-between items-start">
                                                <div className="font-medium truncate text-sm">{project.other_user.name}</div>
                                                {project.unread_count > 0 && (
                                                    <Badge className="h-5 min-w-5 flex items-center justify-center p-0 rounded-full">
                                                        {project.unread_count}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="truncate text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
                                                {project.title}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                </div>

                {/* Chat Area */}
                <div className="flex flex-1 flex-col bg-background">
                    {selectedProject ? (
                        <>
                            <div className="flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border shadow-sm">
                                        <AvatarFallback className="bg-primary/5 text-primary">
                                            {selectedProject.other_user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold text-sm leading-none">{selectedProject.other_user.name}</div>
                                        <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tight">Project: {selectedProject.title}</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href={route(auth.user.role === 'client' ? 'client.projects.show' : 'freelancer.projects.show', selectedProject.id)}>
                                        View Project
                                    </Link>
                                </Button>
                            </div>
                            
                            <ChatBox 
                                title={selectedProject.other_user.name}
                                avatarFallback={selectedProject.other_user.name.charAt(0)}
                                messages={messages}
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
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground bg-muted/5">
                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-2">
                                <MessageSquare className="h-10 w-10 opacity-20" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-foreground">Your Messages</h3>
                                <p className="text-sm max-w-[250px] mt-1 mx-auto">Select a project from the sidebar to start communicating with your {auth.user.role === 'client' ? 'freelancer' : 'client'}.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

declare function route(name: string, params?: any): string;
