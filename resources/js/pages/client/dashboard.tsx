import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
    Folder, 
    MessageSquare, 
    Clock, 
    ArrowRight, 
    User, 
    CheckCircle2, 
    Zap,
    TrendingUp,
    ShieldCheck,
    Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/client/dashboard',
    },
];

interface DashboardProps {
    auth: any;
    activeProjectsCount: number;
    unreadMessagesCount: number;
    upcomingMilestones: any[];
    recentActivity: any[];
    [key:string]:any;
}

export default function ClientDashboard() {
    const { auth, activeProjectsCount, unreadMessagesCount, upcomingMilestones, recentActivity } = usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Dashboard" />
            
            <div className="p-6 space-y-8 animate-in fade-in duration-700">
                {/* Welcome Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Welcome back, {auth.user.name.split(' ')[0]}
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-brand" />
                            Your project portal is secure and up to date.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="shadow-sm" asChild>
                            <Link href="/client/projects">
                                <Folder className="h-4 w-4 mr-2" />
                                My Projects
                            </Link>
                        </Button>
                        <Button size="sm" className="shadow-md bg-brand hover:bg-brand/90 text-white" asChild>
                            <Link href="/client/messages">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Contact Agency
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Impact Stats Grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    <ImpactCard 
                        title="Active Projects" 
                        value={activeProjectsCount} 
                        subtitle="Ongoing collaboration"
                        icon={<Zap className="h-5 w-5" />}
                        color="blue"
                    />
                    <ImpactCard 
                        title="New Messages" 
                        value={unreadMessagesCount} 
                        subtitle={unreadMessagesCount > 0 ? "Awaiting your reply" : "All caught up"}
                        icon={<MessageSquare className="h-5 w-5" />}
                        color="purple"
                        active={unreadMessagesCount > 0}
                    />
                    <ImpactCard 
                        title="Upcoming Deadlines" 
                        value={upcomingMilestones.length} 
                        subtitle="Next 7 days"
                        icon={<TrendingUp className="h-5 w-5" />}
                        color="green"
                    />
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Activity Feed */}
                    <Card className="lg:col-span-7 shadow-sm border-sidebar-border/50 overflow-hidden">
                        <CardHeader className="border-b bg-muted/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest updates from your project team</CardDescription>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center">
                                    <CheckCircle2 className="h-4 w-4 text-brand" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-sidebar-border/50">
                                {recentActivity.length > 0 ? (
                                    recentActivity.map((activity) => (
                                        <div key={activity.id} className="p-4 hover:bg-muted/30 transition-colors flex gap-4">
                                            <div className="mt-1 h-9 w-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold">
                                                        {activity.title}
                                                    </p>
                                                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                                        {new Date(activity.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm font-medium text-brand truncate">
                                                    {activity.project_title}
                                                </p>
                                                <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                                                    {activity.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5 font-bold">
                                                        {activity.user_name}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground p-8">
                                        <div className="h-12 w-12 rounded-full bg-muted mb-4 flex items-center justify-center">
                                            <Clock className="h-6 w-6 opacity-20" />
                                        </div>
                                        <p className="text-sm font-medium">No recent activity to show.</p>
                                        <p className="text-xs mt-1">Updates will appear here as they happen.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Milestones & Actions */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="shadow-sm border-sidebar-border/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-brand" />
                                    Upcoming Deadlines
                                </CardTitle>
                                <CardDescription>Key project dates and deliveries</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {upcomingMilestones.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcomingMilestones.map((milestone) => (
                                            <div key={milestone.id} className="relative group">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold tracking-tight">{milestone.title}</span>
                                                        <span className="text-xs text-muted-foreground font-medium">{milestone.project.title}</span>
                                                    </div>
                                                    <Badge variant="outline" className="border-brand/20 bg-brand/5 text-brand font-bold text-[10px]">
                                                        {new Date(milestone.due_date).toLocaleDateString()}
                                                    </Badge>
                                                </div>
                                                <Progress value={45} className="h-1" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-6 text-center bg-muted/20 rounded-xl border border-dashed">
                                        <p className="text-sm text-muted-foreground">No upcoming milestones.</p>
                                    </div>
                                )}
                                
                                <div className="pt-6 border-t mt-4">
                                    <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-brand" />
                                        Quick Operations
                                    </h4>
                                    <div className="grid gap-3">
                                        <Button variant="outline" className="justify-between group hover:border-brand/50 hover:bg-brand/5" asChild>
                                            <Link href="/client/projects" className="w-full flex items-center justify-between">
                                                <span className="flex items-center gap-3">
                                                    <Folder className="h-4 w-4 text-muted-foreground group-hover:text-brand" />
                                                    View Active Projects
                                                </span>
                                                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" className="justify-between group hover:border-brand/50 hover:bg-brand/5">
                                            <span className="flex items-center gap-3">
                                                <MessageSquare className="h-4 w-4 text-muted-foreground group-hover:text-brand" />
                                                Start Priority Chat
                                            </span>
                                            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Portal Security Badge */}
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-brand/10 via-brand/5 to-transparent border border-brand/10 shadow-sm relative overflow-hidden group">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-white dark:bg-black/50 shadow-sm flex items-center justify-center text-brand">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Encrypted Portal</h4>
                                    <p className="text-xs text-muted-foreground">Your project data is protected with 256-bit AES encryption.</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap className="h-20 w-20 text-brand -rotate-12" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function ImpactCard({ title, value, subtitle, icon, color, active = false }: any) {
    const colors: any = {
        blue: 'text-blue-600 bg-blue-100/50 dark:bg-blue-900/30 dark:text-blue-400',
        purple: 'text-purple-600 bg-purple-100/50 dark:bg-purple-900/30 dark:text-purple-400',
        green: 'text-green-600 bg-green-100/50 dark:bg-green-900/30 dark:text-green-400',
    };

    return (
        <Card className={`relative overflow-hidden group border-sidebar-border/50 hover:shadow-lg transition-all duration-300 ${active ? 'ring-2 ring-brand ring-offset-2 dark:ring-offset-background' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</CardTitle>
                <div className={`p-2 rounded-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${colors[color]}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tight">{value}</div>
                <p className="text-xs font-medium text-muted-foreground mt-1 flex items-center gap-2">
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />}
                    {subtitle}
                </p>
            </CardContent>
            {/* Background design */}
            <div className={`absolute -right-2 -bottom-2 w-20 h-20 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${colors[color].split(' ')[1]}`} />
        </Card>
    );
}
