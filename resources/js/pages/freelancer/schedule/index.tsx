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

    // Group events by date
    const groupedEvents = events.reduce((acc: any, event: any) => {
        const date = event.start;
        if (!acc[date]) acc[date] = [];
        acc[date].push(event);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupedEvents).sort();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedule" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Project Schedule</h1>
                </div>

                <div className="grid gap-6">
                    {sortedDates.length === 0 ? (
                        <Card>
                            <CardContent className="text-muted-foreground flex h-32 items-center justify-center">
                                No upcoming tasks or milestones scheduled.
                            </CardContent>
                        </Card>
                    ) : (
                        sortedDates.map((date) => (
                            <div key={date} className="space-y-2">
                                <h2 className="text-muted-foreground flex items-center gap-2 text-lg font-semibold">
                                    <CalendarIcon className="h-4 w-4" />
                                    {new Date(date).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </h2>
                                <div className="grid gap-3">
                                    {groupedEvents[date].map((event: any) => (
                                        <Card key={event.id} className="overflow-hidden">
                                            <div className="flex">
                                                <div className={`w-1 ${event.type === 'milestone' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                                                <div className="flex-1 p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium">{event.title}</span>
                                                            <Badge variant="outline" className="text-[10px] uppercase">
                                                                {event.type}
                                                            </Badge>
                                                        </div>
                                                        <span className="text-muted-foreground text-xs">{event.project}</span>
                                                    </div>
                                                    <div className="text-muted-foreground mt-2 flex items-center justify-between text-xs">
                                                        <span>Status: {event.status}</span>
                                                        <ChevronRight className="h-3 w-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
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
