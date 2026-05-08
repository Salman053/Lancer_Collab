import ChatBox from '@/components/project/chat-box';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { MessageSquare, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function MessagesIndex() {
    const { projects, messages: initialMessages, selectedProjectId, auth } = usePage<any>().props;
    const [messages, setMessages] = useState(initialMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selectedProject = projects.find((p: any) => p.id === selectedProjectId);

    const { data, setData, processing, reset } = useForm({
        project_id: selectedProjectId || '',
        to_user_id: selectedProject?.other_user?.id || '',
        message: '',
        attachment: null as File | null,
    });

    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    useEffect(() => {
        if (!selectedProjectId) return;

        window.Echo.private(`project.${selectedProjectId}`)
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
            });

        return () => {
            window.Echo.leave(`project.${selectedProjectId}`);
        };

    }, [selectedProjectId]);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Messages',
            href: auth.user.role === 'client' ? '/client/messages' : '/freelancer/messages',
        },
    ];

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        messagesEndRef.current?.scrollIntoView({ behavior });
    };

    const selectProject = (id: number) => {
        router.get(
            route(auth.user.role === 'client' ? 'client.messages' : 'freelancer.messages'),
            { project_id: id },
            { preserveState: true },
        );
    };

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

    useEffect(() => {
        if (selectedProject) {
            setData({
                project_id: selectedProject.id,
                to_user_id: selectedProject.other_user.id,
                message: data.message,
                attachment: data.attachment,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedProjectId]);

    useEffect(() => {
        scrollToBottom('auto');
    }, [messages, selectedProjectId]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="bg-background m-4 flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl border shadow-sm">
                {/* Sidebar */}
                <div className="bg-muted/10 flex w-80 flex-col border-r">
                    <div className="bg-background border-b p-4">
                        <h2 className="mb-4 text-lg font-semibold">Conversations</h2>
                        <div className="relative">
                            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
                            <Input placeholder="Search projects..." className="bg-muted/20 pl-8" />
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="divide-y">
                            {projects.length === 0 ? (
                                <div className="text-muted-foreground p-8 text-center text-sm">
                                    <MessageSquare className="mx-auto mb-2 h-8 w-8 opacity-20" />
                                    No active conversations.
                                </div>
                            ) : (
                                projects.map((project: any) => (
                                    <button
                                        key={project.id}
                                        onClick={() => selectProject(project.id)}
                                        className={`hover:bg-muted/50 flex w-full items-center gap-3 p-4 text-left transition-colors ${selectedProjectId === project.id ? 'bg-muted border-l-primary border-l-4' : ''}`}
                                    >
                                        <Avatar className="h-10 w-10 border shadow-sm">
                                            <AvatarFallback className="bg-primary/5 text-primary capitalize">{project.other_user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex items-start justify-between">
                                                <div className="truncate text-sm font-medium capitalize">{project.other_user.name}</div>
                                                {project.unread_count > 0 && (
                                                    <Badge className="flex h-5 min-w-5 items-center justify-center rounded-full p-0">
                                                        {project.unread_count}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-muted-foreground truncate text-[11px] font-semibold tracking-wider uppercase">
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
                <div className="bg-background flex flex-1 flex-col">
                    {selectedProject ? (
                        <>
                            <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex items-center justify-between border-b p-4 backdrop-blur">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9 border shadow-sm">
                                        <AvatarFallback className="bg-primary/5 text-primary capitalize">
                                            {selectedProject.other_user.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="text-sm leading-none font-semibold capitalize">{selectedProject.other_user.name}</div>
                                        <div className="text-muted-foreground mt-1 text-[10px] tracking-tight uppercase">
                                            Project: {selectedProject.title}
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link
                                        href={route(
                                            auth.user.role === 'client' ? 'client.projects.show' : 'freelancer.projects.show',
                                            selectedProject.id,
                                        )}
                                    >
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
                                onDeleteMessage={handleDeleteMessage}
                                onDeleteAttachment={handleDeleteAttachment}
                                onSendMessage={(msg, attachment) => {
                                    const formData = {
                                        ...data,
                                        message: msg,
                                        attachment: attachment as any,
                                    };

                                    setData(formData);

                                    router.post(route('messages.store'), formData, {
                                        onSuccess: () => reset('message', 'attachment' as any),
                                        preserveScroll: true,
                                    });
                                }}
                            />
                        </>
                    ) : (
                        <div className="text-muted-foreground bg-muted/5 flex h-full flex-col items-center justify-center gap-4">
                            <div className="bg-muted mb-2 flex h-20 w-20 items-center justify-center rounded-full">
                                <MessageSquare className="h-10 w-10 opacity-20" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-foreground text-lg font-medium">Your Messages</h3>
                                <p className="mx-auto mt-1 max-w-[250px] text-sm">
                                    Select a project from the sidebar to start communicating with your{' '}
                                    {auth.user.role === 'client' ? 'freelancer' : 'client'}.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

declare function route(name: string, params?: any): string;
