import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, MessageSquare, Clock, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {auth.user.name}</h1>
                    <p className="text-muted-foreground">Here's what's happening with your projects today.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                            <Folder className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{activeProjectsCount}</div>
                            <Link href="/client/projects" className="text-xs text-primary flex items-center gap-1 mt-2 hover:underline">
                                View all projects <ArrowRight className="h-3 w-3" />
                            </Link>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{unreadMessagesCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {unreadMessagesCount > 0 ? `You have ${unreadMessagesCount} new messages` : "You're all caught up"}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Upcoming Milestones</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{upcomingMilestones.length}</div>
                            <p className="text-xs text-muted-foreground">Next one due soon</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.length > 0 ? (
                                    recentActivity.map((activity) => (
                                        <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                                            <div className="rounded-full bg-primary/10 p-2">
                                                <Clock className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className="text-sm font-medium leading-none">
                                                    {activity.title} in <span className="text-primary">{activity.project_title}</span>
                                                </p>
                                                <p className="text-sm text-muted-foreground line-clamp-1">
                                                    {activity.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(activity.created_at).toLocaleString()} by {activity.user_name}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex h-40 items-center justify-center text-muted-foreground">
                                        No recent activity to show.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Upcoming Deadlines</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {upcomingMilestones.length > 0 ? (
                                upcomingMilestones.map((milestone) => (
                                    <div key={milestone.id} className="flex items-center justify-between space-x-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{milestone.title}</span>
                                            <span className="text-xs text-muted-foreground">{milestone.project.title}</span>
                                        </div>
                                        <Badge variant="outline">
                                            {new Date(milestone.due_date).toLocaleDateString()}
                                        </Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-muted-foreground">No upcoming milestones.</div>
                            )}
                            <div className="pt-4 border-t mt-2">
                                <h4 className="text-sm font-medium mb-3">Quick Actions</h4>
                                <div className="grid gap-2">
                                    <Button variant="outline" className="justify-start gap-2" asChild>
                                        <Link href="/client/projects">
                                            <Folder className="h-4 w-4" />
                                            View My Projects
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="justify-start gap-2">
                                        <MessageSquare className="h-4 w-4" />
                                        Message Support
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
