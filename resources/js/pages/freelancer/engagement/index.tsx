import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Eye, Globe, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Engagement',
        href: '/freelancer/engagement',
    },
];

export default function EngagementIndex() {
    const { views } = usePage<{ views: any[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Engagement" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Client Engagement Tracking</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                            <Eye className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{views.length}</div>
                            <p className="text-xs text-muted-foreground">Across all portal projects</p>
                        </CardContent>
                    </Card>
                    {/* Additional stats could go here */}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Client User</TableHead>
                                    <TableHead>Location/IP</TableHead>
                                    <TableHead>Date & Time</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {views.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                            No engagement activity recorded yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    views.map((view) => (
                                        <TableRow key={view.id}>
                                            <TableCell className="font-medium">{view.project.title}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                    {view.user.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Globe className="h-3 w-3" />
                                                    {view.ip_address}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {new Date(view.viewed_at).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
