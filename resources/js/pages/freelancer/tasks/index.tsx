import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { AlertCircle, CheckCircle2, Circle, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tasks',
        href: '/freelancer/tasks',
    },
];

const priorityColors = {
    low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    urgent: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

const statusIcons = {
    pending: <Circle className="text-muted-foreground h-5 w-5" />,
    in_progress: <Clock className="h-5 w-5 text-blue-500" />,
    completed: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    blocked: <AlertCircle className="h-5 w-5 text-red-500" />,
};

export default function TasksIndex() {
    const { tasks } = usePage<{ tasks: any[] }>().props;

    const toggleTask = (taskId: number) => {
        router.put(route('freelancer.tasks.toggle', taskId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">My Tasks</h1>
                </div>

                <div className="grid gap-4">
                    {tasks.length === 0 ? (
                        <Card>
                            <CardContent className="text-muted-foreground flex h-32 items-center justify-center">No tasks assigned yet.</CardContent>
                        </Card>
                    ) : (
                        tasks.map((task) => (
                            <Card key={task.id} className={task.status === 'completed' ? 'opacity-70' : ''}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className="flex items-center gap-3">
                                        <button onClick={() => toggleTask(task.id)} className="transition-opacity hover:opacity-75">
                                            {statusIcons[task.status as keyof typeof statusIcons]}
                                        </button>
                                        <CardTitle
                                            className={`text-lg font-medium ${task.status === 'completed' ? 'text-muted-foreground line-through' : ''}`}
                                        >
                                            {task.title}
                                        </CardTitle>
                                    </div>
                                    <Badge className={priorityColors[task.priority as keyof typeof priorityColors]}>
                                        {task.priority.toUpperCase()}
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground text-sm">{task.description}</p>
                                    <div className="text-muted-foreground mt-4 flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1">
                                            <span className="text-foreground font-semibold">Project:</span>
                                            {task.project.title}
                                        </div>
                                        {task.milestone && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-foreground font-semibold">Milestone:</span>
                                                {task.milestone.title}
                                            </div>
                                        )}
                                        {task.due_date && (
                                            <div className="flex items-center gap-1">
                                                <span className="text-foreground font-semibold">Due:</span>
                                                {new Date(task.due_date).toLocaleDateString()}
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
