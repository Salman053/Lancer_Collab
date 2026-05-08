import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowUpRight, Briefcase, Calendar, CheckCircle2, Clock, DollarSign, MoreHorizontal, Plus, Sparkles, Users } from 'lucide-react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/freelancer/dashboard',
    },
];

interface DashboardProps {
    stats: {
        active_projects: number;
        total_clients: number;
        total_revenue: number;
        pending_tasks: number;
    };
    recent_projects: any[];
    upcoming_tasks: any[];
    [key: string]: any;
}

export default function Dashboard() {
    const { stats, recent_projects, upcoming_tasks } = usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Freelancer Dashboard" />

            <div className="animate-in fade-in space-y-8 p-6 duration-500">
                {/* Header Section */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                            Freelancer Hub
                        </h1>
                        <p className="text-muted-foreground mt-1">Overview of your agency's performance and upcoming work.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="hidden items-center gap-2 sm:flex">
                            <Calendar className="h-4 w-4" />
                            View Schedule
                        </Button>
                        <Button size="sm" className="items-center gap-2 shadow-sm" asChild>
                            <Link href={route('freelancer.projects.create')}>
                                <Plus className="h-4 w-4" />
                                New Project
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Active Projects"
                        value={stats.active_projects}
                        icon={<Briefcase className="h-4 w-4" />}
                        description="Currently in development"
                        trend="+12%"
                        color="blue"
                    />
                    <StatCard
                        title="Total Clients"
                        value={stats.total_clients}
                        icon={<Users className="h-4 w-4" />}
                        description="Across all categories"
                        trend="+5%"
                        color="purple"
                    />
                    <StatCard
                        title="Revenue"
                        value={`$${(stats.total_revenue / 1000).toFixed(1)}k`}
                        icon={<DollarSign className="h-4 w-4" />}
                        description="Total earnings to date"
                        trend="+18%"
                        color="green"
                    />
                    <StatCard
                        title="Tasks Pending"
                        value={stats.pending_tasks}
                        icon={<CheckCircle2 className="h-4 w-4" />}
                        description="Awaiting completion"
                        trend="-3"
                        color="amber"
                    />
                </div>

                <div className="grid gap-6 lg:grid-cols-7">
                    {/* Recent Projects */}
                    <Card className="shadow-sm lg:col-span-4">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Recent Projects</CardTitle>
                                <CardDescription>Your most recently updated assignments</CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {recent_projects.length > 0 ? (
                                    recent_projects.map((project) => (
                                        <div
                                            key={project.id}
                                            className="group hover:bg-muted/50 relative flex items-center justify-between rounded-xl p-3 transition-all duration-200"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-lg font-bold">
                                                    {project.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <Link
                                                        href={route('freelancer.projects.show', project.id)}
                                                        className="block font-medium hover:underline"
                                                    >
                                                        {project.title}
                                                    </Link>
                                                    <span className="text-muted-foreground flex items-center gap-1 text-xs">
                                                        <Users className="h-3 w-3" />
                                                        {project.client?.name || 'No Client'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="hidden text-right md:block">
                                                    <div className="text-sm font-medium">85%</div>
                                                    <Progress value={85} className="mt-1 h-1 w-16" />
                                                </div>
                                                <Badge variant="secondary" className="capitalize">
                                                    {project.status.replace('_', ' ')}
                                                </Badge>
                                                <ArrowUpRight className="text-muted-foreground h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground py-10 text-center italic">No projects found. Start by creating one!</div>
                                )}
                            </div>
                            <Button variant="link" className="text-primary mt-4 w-full" asChild>
                                <Link href={route('freelancer.projects')}>View all projects</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Upcoming Tasks */}
                    <Card className="shadow-sm lg:col-span-3">
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Tasks due in the next 7 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcoming_tasks.length > 0 ? (
                                    upcoming_tasks.map((task) => (
                                        <div key={task.id} className="hover:bg-muted/30 flex items-start gap-3 rounded-lg p-2 transition-colors">
                                            <div className="mt-1">
                                                <div className={`h-2 w-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm leading-none font-medium">{task.title}</p>
                                                <p className="text-muted-foreground mt-1 truncate text-xs">{task.project?.title}</p>
                                                <div className="text-muted-foreground mt-2 flex items-center gap-2 text-[10px] font-bold uppercase">
                                                    <Clock className="h-3 w-3" />
                                                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'No date'}
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-muted-foreground py-10 text-center italic">All caught up! No pending tasks.</div>
                                )}
                            </div>
                            <div className="from-brand/5 to-brand/10 border-brand/10 mt-6 rounded-xl border bg-gradient-to-br p-4">
                                <h4 className="text-brand flex items-center gap-2 text-sm font-bold">
                                    <Sparkles className="h-4 w-4" />
                                    Agency Pro Tip
                                </h4>
                                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                                    Completing milestones on time increases client satisfaction by 40%. Keep it up!
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <style>{`
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-500 { animation-delay: 0.5s; }
                
                @keyframes pulse-subtle {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.8; }
                }
                
                .animate-pulse-subtle {
                    animation: pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </AppLayout>
    );
}

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    description: string;
    trend: string;
    color: 'blue' | 'purple' | 'green' | 'amber';
}

export function StatCard({ title, value, icon, description, trend, color }: StatCardProps) {
    const colorMap = {
        blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
        purple: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
        green: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    };

    const isPositive = trend.startsWith('+');

    return (
        <Card className="group border-border/50 bg-card/50 relative overflow-hidden backdrop-blur-sm transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            {/* Top accent line that appears on hover */}
            <div
                className={`absolute top-0 left-0 h-[2px] w-full -translate-x-full transition-transform duration-500 group-hover:translate-x-0 ${colorMap[color].split(' ')[0].replace('text', 'bg')}`}
            />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-muted-foreground/70 text-[11px] font-bold tracking-widest uppercase">{title}</CardTitle>
                <div className={`rounded-xl border p-2.5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorMap[color]}`}>
                    {React.cloneElement(icon as React.ReactElement<any>, { className: 'size-4' })}
                </div>
            </CardHeader>

            <CardContent>
                <div className="text-foreground text-3xl font-bold tracking-tight tabular-nums">{value}</div>

                <div className="mt-3 flex items-center gap-2">
                    <div
                        className={`flex items-center rounded-md px-2 py-0.5 text-[11px] font-bold ${
                            isPositive
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
                        }`}
                    >
                        {isPositive ? '↑' : '↓'} {trend}
                    </div>
                    <p className="text-muted-foreground text-[11px] font-medium italic">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}

// Sparkles SVG remains same but usage within the icon container is cleaner.
