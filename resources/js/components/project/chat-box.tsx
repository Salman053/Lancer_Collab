import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Plus, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatBoxProps } from '@/types';

export default function ChatBox({ title, avatarFallback, messages, auth, onSendMessage, processing }: ChatBoxProps) {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (!trimmedMessage || processing) return;
        
        onSendMessage(trimmedMessage);
        setMessage('');
    };

    return (
        <div className="flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border/50 shadow-xl">
            {/* Header with Glass Effect */}
            <div className="p-4 border-b bg-background/50 backdrop-blur-md flex items-center justify-between z-20">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar className="h-10 w-10 border-2 border-background">
                            <AvatarFallback className='bg-primary text-primary-foreground font-bold uppercase'>
                                {avatarFallback.substring(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm tracking-tight">{title}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Active Now</p>
                    </div>
                </div>
            </div>

            {/* Message Feed with Mask Effect */}
            <div className="relative flex-1 overflow-hidden">
                <ScrollArea
                    className="h-full px-4"
                    /* 
                       THE MASK EFFECT: 
                       Creates a fade-out at the top (0% to 15%) 
                    */
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)'
                    }}

                >
                    <div className="space-y-6 py-8">
                        {messages.map((msg: any, index: number) => {
                            const isSent = msg.from_user_id === auth.user.id;
                            return (
                                <div key={msg.id || index} className={cn("flex flex-col", isSent ? 'items-end' : 'items-start')}>
                                    <div className={cn(
                                        "max-w-[80%] px-4 py-3 text-sm transition-all hover:shadow-md",
                                        isSent
                                            ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-none'
                                            : 'bg-muted/50 border border-border text-foreground rounded-2xl rounded-tl-none'
                                    )}>
                                        <p className="leading-relaxed">{msg.message}</p>
                                    </div>
                                    <span className="text-[9px] mt-1.5 font-bold uppercase tracking-tighter opacity-40 px-1">
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </ScrollArea>
            </div>

            {/* Input Area - Floating Style */}
            <div className="p-4 bg-background/50 backdrop-blur-sm">
                <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center gap-2 p-1.5 bg-background border border-border rounded-2xl focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                >
                    <Button variant="ghost" size="icon" type="button" className="shrink-0 text-muted-foreground hover:text-primary rounded-xl">
                        <Paperclip className="h-4 w-4" />
                    </Button>
                    <Input
                        placeholder="Message your team..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm h-9"
                    />
                    <Button
                        size="icon"
                        type="submit"
                        className="shrink-0 rounded-xl size-9 shadow-lg shadow-primary/20"
                        disabled={processing || !message.trim()}
                    >
                        <Send className="h-3.5 w-3.5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
