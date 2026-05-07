import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatBoxProps {
    title: string;
    avatarFallback: string;
    messages: any[];
    auth: any;
    onSendMessage: (msg: string) => void;
    processing: boolean;
}

export default function ChatBox({ title, avatarFallback, messages, auth, onSendMessage, processing }: ChatBoxProps) {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
        }, 100);
        return () => clearTimeout(timer);
    }, [messages]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage('');
    };

    return (
        <div className="flex flex-col h-full  rounded-xl overflow-hidden border">
            {/* Chat Header */}
            <div className="p-4 border-b  flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarFallback className='bg-brand text-white capitalize'>{avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-xs text-emerald-500 font-medium">Online</p>
                </div>
            </div>

            {/* Message Feed */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 mask-t-from-50% ">
                    {messages.map((msg: any) => {
                        const isSent = msg.from_user_id === auth.user.id;
                        return (
                            <div key={msg.id} className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
                                <div className={cn(
                                    "max-w-[75%] px-4 py-2.5 text-sm shadow-sm",
                                    isSent 
                                        ? 'bg-primary text-primary-foreground rounded-l-2xl rounded-tr-lg' 
                                        : 'bg-muted border text-foreground rounded-r-2xl rounded-tl-lg'
                                )}>
                                    <p className="whitespace-pre-wrap">{msg.message}</p>
                                    <span className={cn("text-[10px] block mt-1", isSent ? 'opacity-70' : 'text-muted-foreground')}>
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 bg-card border-t flex items-center gap-2">
                <Button variant="ghost" size="icon" type="button" className="text-muted-foreground">
                    <Plus className="h-5 w-5" />
                </Button>
                <Input 
                    placeholder="Type a message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="rounded-full bg-background"
                />
                <Button size="icon" type="submit" className="rounded-full" disabled={processing || !message.trim()}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
        </div>
    );
}
