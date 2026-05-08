import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChatBoxProps } from '@/types';
import { Paperclip, Send, X, FileIcon, Download, Trash2 } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

function ChatBox({ title, avatarFallback, messages = [], auth, onSendMessage, onDeleteMessage, onDeleteAttachment, processing }: ChatBoxProps & { onDeleteAttachment?: (id: number) => void }) {
    const [message, setMessage] = useState('');
    const [attachment, setAttachment] = useState<File | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if ((!message.trim() && !attachment) || processing) return;

        onSendMessage(message, attachment);
        setMessage('');
        setAttachment(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 512 * 1024) {
                alert('File size must be less than 0.5MB');
                return;
            }
            setAttachment(file);
        }
    };

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/50 bg-card shadow-xl">
            {/* Header */}
            <div className="z-20 flex items-center justify-between border-b bg-background/50 p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-background">
                            <AvatarFallback className="bg-primary font-bold uppercase text-primary-foreground">
                                {avatarFallback?.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-tight">{title}</h3>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Active Now</p>
                    </div>
                </div>
            </div>

            {/* Message Feed */}
            <div className="relative flex-1 overflow-hidden">
                <ScrollArea
                    className="h-full px-4"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                    }}
                >
                    <div className="space-y-6 py-8">
                        {messages.map((msg: any, index: number) => {
                            const isSent = msg.from_user_id === auth.user.id;
                            return (
                                <div key={msg.id ?? `msg-${index}`} className={cn('flex flex-col group', isSent ? 'items-end' : 'items-start')}>
                                    <div className="flex items-center gap-2 max-w-[80%]">
                                        {isSent && onDeleteMessage && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0"
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this message?')) {
                                                        onDeleteMessage(msg.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        )}
                                        <div
                                            className={cn(
                                                'px-4 py-3 text-sm transition-all hover:shadow-md flex-1',
                                                isSent
                                                    ? 'rounded-2xl rounded-tr-none bg-primary text-primary-foreground'
                                                    : 'rounded-2xl rounded-tl-none border border-border bg-muted/50 text-foreground',
                                            )}
                                        >
                                            <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                                            {msg.attachment_path && (
                                                <div className={cn(
                                                    "mt-2 p-2 rounded-lg flex items-center gap-2 border",
                                                    isSent ? "bg-primary-foreground/10 border-primary-foreground/20" : "bg-background/50 border-border"
                                                )}>
                                                    <FileIcon className="h-4 w-4 shrink-0" />
                                                    <span className="text-xs truncate max-w-[150px]">{msg.attachment_name}</span>
                                                    <div className="flex items-center gap-1 ml-auto">
                                                        <Button size="icon" variant="ghost" className="h-6 w-6" asChild>
                                                            <a href={`/storage/${msg.attachment_path}`} download={msg.attachment_name} target="_blank">
                                                                <Download className="h-3 w-3" />
                                                            </a>
                                                        </Button>
                                                        {isSent && onDeleteAttachment && (
                                                            <Button
                                                                size="icon"
                                                                variant="ghost"
                                                                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to delete this attachment?')) {
                                                                        onDeleteAttachment(msg.id);
                                                                    }
                                                                }}
                                                            >
                                                                <X className="h-3 w-3" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className="mt-1.5 px-1 text-[9px] font-bold uppercase tracking-tight opacity-40">
                                        {msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                    </span>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </div>

            {/* Input Area */}
            <div className="bg-background/50 p-4 backdrop-blur-sm space-y-2">
                {attachment && (
                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg border border-border animate-in slide-in-from-bottom-2">
                        <FileIcon className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium truncate flex-1">{attachment.name}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => setAttachment(null)}
                        >
                            <X className="h-3 w-3" />
                        </Button>
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center gap-2 rounded-2xl border border-border bg-background p-1.5 transition-all focus-within:ring-2 focus-within:ring-primary/20"
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        className="shrink-0 rounded-xl text-muted-foreground hover:text-primary"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                        placeholder="Message your team..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="h-9 border-none bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                        size="icon"
                        type="submit"
                        className="size-9 shrink-0 rounded-xl shadow-lg shadow-primary/20"
                        disabled={processing || (!message.trim())}
                    >
                        <Send className="h-3.5 w-3.5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ChatBox;
