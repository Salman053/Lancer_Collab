import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Calendar, CheckCircle2, Clock, Folder, MessageSquare, ShieldCheck, TrendingUp, User, Zap } from 'lucide-react';

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
    [key: string]: any;
}

export default function ClientDashboard() {
    const { auth, activeProjectsCount, unreadMessagesCount, upcomingMilestones, recentActivity } = usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Dashboard" />

            <div className="animate-in fade-in space-y-8 p-6 duration-700">
                {/* Welcome Header */}
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="space-y-2">
                        <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            Welcome back, {auth.user.name.split(' ')[0]}
                        </h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <ShieldCheck className="text-brand h-4 w-4" />
                            Your project portal is secure and up to date.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="shadow-sm" asChild>
                            <Link href="/client/projects">
                                <Folder className="mr-2 h-4 w-4" />
                                My Projects
                            </Link>
                        </Button>
                        <Button size="sm" className="bg-brand hover:bg-brand/90 text-white shadow-md" asChild>
                            <Link href="/client/messages">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Contact Support
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
                        subtitle={unreadMessagesCount > 0 ? 'Awaiting your reply' : 'All caught up'}
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
                    <Card className="overflow-hidden shadow-sm lg:col-span-7">
                        <CardHeader className="bg-muted/30 border-b">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest updates from your project team</CardDescription>
                                </div>
                                <div className="bg-brand/10 flex h-8 w-8 items-center justify-center rounded-full">
                                    <CheckCircle2 className="text-brand h-4 w-4" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-sidebar-border/50 divide-y">
                                {recentActivity.length > 0 ? (
                                    recentActivity.map((activity) => (
                                        <div key={activity.id} className="hover:bg-muted/30 flex gap-4 p-4 transition-colors">
                                            <div className="bg-muted text-muted-foreground mt-1 flex h-9 w-9 items-center justify-center rounded-full">
                                                <User className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-semibold">{activity.title}</p>
                                                    <span className="text-muted-foreground text-[10px] font-medium tracking-wider uppercase">
                                                        {new Date(activity.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-brand truncate text-sm font-medium">{activity.project_title}</p>
                                                <p className="text-muted-foreground mt-1 line-clamp-2 text-sm leading-relaxed">{activity.message}</p>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <Badge variant="secondary" className="px-1.5 py-0 text-[10px] font-bold">
                                                        {activity.user_name}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground flex h-64 flex-col items-center justify-center p-8">
                                        <div className="bg-muted mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                                            <Clock className="h-6 w-6 opacity-20" />
                                        </div>
                                        <p className="text-sm font-medium">No recent activity to show.</p>
                                        <p className="mt-1 text-xs">Updates will appear here as they happen.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Milestones & Actions */}
                    <div className="space-y-6 lg:col-span-5">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="text-brand h-5 w-5" />
                                    Upcoming Deadlines
                                </CardTitle>
                                <CardDescription>Key project dates and deliveries</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {upcomingMilestones.length > 0 ? (
                                    <div className="space-y-4">
                                        {upcomingMilestones.map((milestone) => (
                                            <div key={milestone.id} className="group relative">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold tracking-tight">{milestone.title}</span>
                                                        <span className="text-muted-foreground text-xs font-medium">{milestone.project.title}</span>
                                                    </div>
                                                    <Badge variant="outline" className="border-brand/20 bg-brand/5 text-brand text-[10px] font-bold">
                                                        {new Date(milestone.due_date).toLocaleDateString()}
                                                    </Badge>
                                                </div>
                                                <Progress value={45} className="h-1" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-muted/20 rounded-xl border border-dashed py-6 text-center">
                                        <p className="text-muted-foreground text-sm">No upcoming milestones.</p>
                                    </div>
                                )}

                                <div className="mt-4 border-t pt-6">
                                    <h4 className="mb-4 flex items-center gap-2 text-sm font-bold">
                                        <Zap className="text-brand h-4 w-4" />
                                        Quick Operations
                                    </h4>
                                    <div className="grid gap-3">
                                        <Button variant="outline" className="group hover:border-brand/50 hover:bg-brand/5 justify-between" asChild>
                                            <Link href="/client/projects" className="flex w-full items-center justify-between">
                                                <span className="flex items-center gap-3">
                                                    <Folder className="text-muted-foreground group-hover:text-brand h-4 w-4" />
                                                    View Active Projects
                                                </span>
                                                <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                            </Link>
                                        </Button>
                                        <Button variant="outline" className="group hover:border-brand/50 hover:bg-brand/5 justify-between">
                                            <span className="flex items-center gap-3">
                                                <MessageSquare className="text-muted-foreground group-hover:text-brand h-4 w-4" />
                                                Start Priority Chat
                                            </span>
                                            <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Portal Security Badge */}
                        <div className="from-brand/10 via-brand/5 border-brand/10 group relative overflow-hidden rounded-2xl border bg-gradient-to-br to-transparent p-4 shadow-sm">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="text-brand flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm dark:bg-black/50">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold">Encrypted Portal</h4>
                                    <p className="text-muted-foreground text-xs">Your project data is protected with 256-bit AES encryption.</p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-2 opacity-10 transition-opacity group-hover:opacity-20">
                                <Zap className="text-brand h-20 w-20 -rotate-12" />
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
        <Card
            className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg ${active ? 'ring-brand dark:ring-offset-background ring-2 ring-offset-2' : ''}`}
        >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-muted-foreground text-xs font-bold tracking-wider uppercase">{title}</CardTitle>
                <div className={`rounded-xl p-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${colors[color]}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black tracking-tight">{value}</div>
                <p className="text-muted-foreground mt-1 flex items-center gap-2 text-xs font-medium">
                    {active && <span className="bg-brand h-1.5 w-1.5 animate-pulse rounded-full" />}
                    {subtitle}
                </p>
            </CardContent>
            {/* Background design */}
            <div
                className={`absolute -right-2 -bottom-2 h-20 w-20 rounded-full opacity-5 transition-opacity group-hover:opacity-10 ${colors[color].split(' ')[1]}`}
            />
        </Card>
    );
}
