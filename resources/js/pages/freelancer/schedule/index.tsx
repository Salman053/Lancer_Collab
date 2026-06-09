import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Schedule',
        href: '/freelancer/schedule',
    },
];

export default function ScheduleIndex() {
    const { events } = usePage<{ events: any[] }>().props;


    // Group events by month first for better organization
    const groupedByMonth = events.reduce((acc: any, event: any) => {
        const date = new Date(event.start);
        const monthYear = date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
        if (!acc[monthYear]) acc[monthYear] = {};
        
        const day = event.start;
        if (!acc[monthYear][day]) acc[monthYear][day] = [];
        acc[monthYear][day].push(event);
        return acc;
    }, {});

    const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Project Schedule</h1>
                        <p className="text-muted-foreground mt-1 text-sm">Upcoming milestones and tasks across all your projects.</p>
                    </div>
                </div>

                <div className="grid gap-8">
                    {events.length === 0 ? (
                        <Card className="border-dashed bg-muted/20">
                            <CardContent className="text-muted-foreground flex h-64 flex-col items-center justify-center gap-4">
                                <CalendarIcon className="h-12 w-12 opacity-20" />
                                <div className="text-center">
                                    <p className="text-lg font-medium">Your schedule is clear</p>
                                    <p className="text-sm">No tasks or milestones with due dates were found.</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        sortedMonths.map((month) => (
                            <div key={month} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-xl font-bold text-primary shrink-0">{month}</h2>
                                    <div className="h-[1px] w-full bg-border" />
                                </div>
                                
                                <div className="space-y-8">
                                    {Object.keys(groupedByMonth[month]).sort().map((date) => (
                                        <div key={date} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8">
                                            <div className="sticky top-6 h-fit">
                                                <div className="flex flex-col">
                                                    <span className="text-3xl font-black tabular-nums">
                                                        {new Date(date).getDate()}
                                                    </span>
                                                    <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                                        {new Date(date).toLocaleDateString(undefined, { weekday: 'long' })}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="grid gap-3">
                                                {groupedByMonth[month][date].map((event: any) => (
                                                    <Card key={event.id} className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
                                                        <div 
                                                            className="absolute left-0 top-0 bottom-0 w-1.5 transition-all group-hover:w-2" 
                                                            style={{ backgroundColor: event.color }} 
                                                        />
                                                        <div className="flex-1 p-5">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="space-y-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <h3 className="font-bold text-lg leading-tight">{event.title}</h3>
                                                                        <h3 className="font-bold text-lg leading-tight">{event.description}</h3>
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground font-medium flex items-center gap-1.5">
                                                                        <span className="w-2 h-2 rounded-full bg-border" />
                                                                        {event.project}
                                                                    </p>
                                                                </div>
                                                                <Badge variant="outline" className="capitalize shrink-0 font-bold bg-background shadow-sm">
                                                                    {event.status?.replace('_', ' ') || 'Pending'}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
