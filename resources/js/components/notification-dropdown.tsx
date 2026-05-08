import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Link, router, usePage } from '@inertiajs/react';
import { Bell, Check, Clock, Info, MessageSquare, PlusCircle, Target, History, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
    id: string;
    data: {
        title: string;
        message: string;
        url: string;
        type: string;
        icon?: string;
    };
    read_at: string | null;
    created_at: string;
}

export function NotificationDropdown() {
    const { auth } = usePage().props as any;
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = async () => {
        try {
            const response = await fetch('/api/notifications');
            const data = await response.json();
            setNotifications(data.notifications);
            setUnreadCount(data.unread_count);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    useEffect(() => {
        fetchNotifications();

        if (window.Echo) {
            window.Echo.private(`App.Models.User.${auth.user.id}`)
                .notification((notification: any) => {
                    setNotifications((prev) => [
                        {
                            id: Math.random().toString(), // Temporary ID for real-time
                            data: notification,
                            read_at: null,
                            created_at: new Date().toISOString(),
                        },
                        ...prev,
                    ]);
                    setUnreadCount((prev) => prev + 1);

                    // Show browser notification if permitted
                    if (Notification.permission === 'granted') {
                        const push = new Notification(notification.title, {
                            body: notification.message,
                            icon: '/logo.png'
                        });
                        push.onclick = () => {
                            window.focus();
                            router.visit(notification.url);
                        };
                    }
                });
        }

        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }

        return () => {
            if (window.Echo) {
                window.Echo.leave(`App.Models.User.${auth.user.id}`);
            }
        };
    }, [auth.user.id]);

    const markAsRead = async (id?: string) => {
        try {
            await router.post(route('notifications.mark-read'), { id }, {
                preserveScroll: true,
                onSuccess: () => fetchNotifications()
            });
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
        }
    };

    const getIcon = (iconName?: string) => {
        switch (iconName) {
            case 'MessageSquare': return <MessageSquare className="h-4 w-4" />;
            case 'PlusCircle': return <PlusCircle className="h-4 w-4" />;
            case 'Target': return <Target className="h-4 w-4" />;
            case 'History': return <History className="h-4 w-4" />;
            case 'AlertTriangle': return <AlertTriangle className="h-4 w-4" />;
            default: return <Bell className="h-4 w-4" />;
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group h-9 w-9 cursor-pointer">
                    <Bell className="!size-5 opacity-80 group-hover:opacity-100" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground animate-in zoom-in">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                    <DropdownMenuLabel className="p-0 font-bold">Notifications</DropdownMenuLabel>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs font-medium hover:text-primary"
                            onClick={() => markAsRead()}
                        >
                            Mark all as read
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-80">
                    {notifications.length > 0 ? (
                        <div className="flex flex-col">
                            {notifications.map((notification) => (
                                <Link
                                    key={notification.id}
                                    href={notification.data.url}
                                    className={cn(
                                        "flex gap-4 p-4 hover:bg-muted transition-colors border-b last:border-0",
                                        !notification.read_at && "bg-primary/5 border-l-2 border-l-primary"
                                    )}
                                    onClick={() => !notification.read_at && markAsRead(notification.id)}
                                >
                                    <div className={cn(
                                        "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                                        notification.data.type === 'success' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                                            notification.data.type === 'warning' ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                                notification.data.type === 'error' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                                                    "bg-primary/10 text-primary"
                                    )}>
                                        {getIcon(notification.data.icon)}
                                    </div>
                                    <div className="flex flex-col gap-1 overflow-hidden">
                                        <p className={cn("text-sm font-semibold truncate", !notification.read_at && "text-primary")}>
                                            {notification.data.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {notification.data.message}
                                        </p>
                                        <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                                            <Clock className="h-3 w-3" />
                                            {new Date(notification.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Bell className="h-12 w-12 text-muted-foreground/20 mb-4" />
                            <p className="text-sm text-muted-foreground">No notifications yet.</p>
                        </div>
                    )}
                </ScrollArea>
                <DropdownMenuSeparator className="m-0" />
                <div className="p-2">
                    <Button variant="ghost" className="w-full text-xs" asChild>
                        <Link href="/notifications">View all notifications</Link>
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
