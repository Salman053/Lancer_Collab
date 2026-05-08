import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Bell, Check, Clock, MessageSquare, PlusCircle, Target, History, AlertTriangle, ArrowLeft } from 'lucide-react';

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

interface Props {
    notifications: {
        data: Notification[];
        links: any[];
    };
}

export default function NotificationsIndex({ notifications }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Notifications', href: '/notifications' },
    ];

    const markAllRead = () => {
        router.post(route('notifications.mark-read'), {}, { preserveScroll: true });
    };

    const getIcon = (iconName?: string) => {
        switch (iconName) {
            case 'MessageSquare': return <MessageSquare className="h-5 w-5" />;
            case 'PlusCircle': return <PlusCircle className="h-5 w-5" />;
            case 'Target': return <Target className="h-5 w-5" />;
            case 'History': return <History className="h-5 w-5" />;
            case 'AlertTriangle': return <AlertTriangle className="h-5 w-5" />;
            default: return <Bell className="h-5 w-5" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notifications" />

            <div className="mx-auto max-w-4xl py-8 px-4">
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild className="rounded-full">
                            <Link href="/dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                            <p className="text-muted-foreground">Stay updated with your project activities.</p>
                        </div>
                    </div>
                    
                    <Button variant="outline" onClick={markAllRead}>
                        <Check className="mr-2 h-4 w-4" /> Mark all as read
                    </Button>
                </div>

                <div className="space-y-4">
                    {notifications.data.length > 0 ? (
                        notifications.data.map((notification) => (
                            <Card 
                                key={notification.id} 
                                className={cn(
                                    "transition-all hover:shadow-md",
                                    !notification.read_at && "border-l-4 border-l-primary bg-primary/5"
                                )}
                            >
                                <CardContent className="p-0">
                                    <Link 
                                        href={notification.data.url} 
                                        className="flex gap-6 p-6"
                                        onClick={() => {
                                            if (!notification.read_at) {
                                                router.post(route('notifications.mark-read'), { id: notification.id }, { preserveScroll: true });
                                            }
                                        }}
                                    >
                                        <div className={cn(
                                            "mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                                            notification.data.type === 'success' ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" :
                                            notification.data.type === 'warning' ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                            notification.data.type === 'error' ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                                            "bg-primary/10 text-primary"
                                        )}>
                                            {getIcon(notification.data.icon)}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <h3 className={cn("text-lg font-bold", !notification.read_at && "text-primary")}>
                                                    {notification.data.title}
                                                </h3>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium whitespace-nowrap">
                                                    <Clock className="h-3 w-3" />
                                                    {new Date(notification.created_at).toLocaleString()}
                                                </span>
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {notification.data.message}
                                            </p>
                                        </div>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <Card className="border-dashed">
                            <CardContent className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full mb-4">
                                    <Bell className="h-8 w-8 text-muted-foreground/40" />
                                </div>
                                <h3 className="text-xl font-bold">All caught up!</h3>
                                <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
                                    You don't have any notifications at the moment. We'll let you know when something happens.
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
