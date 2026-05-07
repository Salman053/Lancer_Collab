import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
    Briefcase, 
    Users, 
    DollarSign, 
    CheckCircle2, 
    ArrowUpRight, 
    Clock, 
    Calendar,
    Plus,
    MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
}

export default function Dashboard() {
    const { stats, recent_projects, upcoming_tasks } = usePage<DashboardProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Freelancer Dashboard" />
            
            <div className="p-6 space-y-8 animate-in fade-in duration-500">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Freelancer Hub
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Overview of your agency's performance and upcoming work.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
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
                    <Card className="lg:col-span-4 shadow-sm border-sidebar-border/50">
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
                                        <div key={project.id} className="group relative flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-all duration-200">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                    {project.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <Link href={route('freelancer.projects.show', project.id)} className="font-medium hover:underline block">
                                                        {project.title}
                                                    </Link>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Users className="h-3 w-3" />
                                                        {project.client?.name || 'No Client'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="hidden md:block text-right">
                                                    <div className="text-sm font-medium">85%</div>
                                                    <Progress value={85} className="h-1 w-16 mt-1" />
                                                </div>
                                                <Badge variant="secondary" className="capitalize">
                                                    {project.status.replace('_', ' ')}
                                                </Badge>
                                                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10 text-muted-foreground italic">
                                        No projects found. Start by creating one!
                                    </div>
                                )}
                            </div>
                            <Button variant="link" className="w-full mt-4 text-primary" asChild>
                                <Link href={route('freelancer.projects')}>
                                    View all projects
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Upcoming Tasks */}
                    <Card className="lg:col-span-3 shadow-sm border-sidebar-border/50">
                        <CardHeader>
                            <CardTitle>Upcoming Tasks</CardTitle>
                            <CardDescription>Tasks due in the next 7 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {upcoming_tasks.length > 0 ? (
                                    upcoming_tasks.map((task) => (
                                        <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                                            <div className="mt-1">
                                                <div className={`h-2 w-2 rounded-full ${task.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium leading-none truncate">{task.title}</p>
                                                <p className="text-xs text-muted-foreground mt-1 truncate">
                                                    {task.project?.title}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2 text-[10px] uppercase font-bold text-muted-foreground">
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
                                    <div className="text-center py-10 text-muted-foreground italic">
                                        All caught up! No pending tasks.
                                    </div>
                                )}
                            </div>
                            <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-brand/5 to-brand/10 border border-brand/10">
                                <h4 className="text-sm font-bold flex items-center gap-2 text-brand">
                                    <Sparkles className="h-4 w-4" />
                                    Agency Pro Tip
                                </h4>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
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

function StatCard({ title, value, icon, description, trend, color }: any) {
    const colors: any = {
        blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400',
        purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-400',
        green: 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400',
        amber: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400',
    };

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 group border-sidebar-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className={`p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 ${colors[color]}`}>
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold tracking-tight">{value}</div>
                <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                        {trend}
                    </span>
                    <p className="text-xs text-muted-foreground font-medium">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="M5 3v4"/>
            <path d="M19 17v4"/>
            <path d="M3 5h4"/>
            <path d="M17 19h4"/>
        </svg>
    );
}
