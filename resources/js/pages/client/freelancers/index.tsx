import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Briefcase, Mail } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'My Freelancers', href: '/client/freelancers' }];

export default function FreelancersIndex() {
    const { freelancers } = usePage<{ freelancers: any[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Freelancers" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">My Freelancers</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {freelancers.length > 0 ? (
                        freelancers.map((freelancer) => (
                            <Card key={freelancer.id}>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarFallback className="bg-brand">{freelancer.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle>{freelancer.name}</CardTitle>
                                        <p className="text-muted-foreground text-sm">{freelancer.email}</p>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex gap-2">
                                    <Button variant="outline" size="sm" className="gap-2">
                                        <Mail className="h-4 w-4" /> Message
                                    </Button>
                                    <Button variant="secondary" size="sm" className="gap-2">
                                        <Briefcase className="h-4 w-4" /> View Projects
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-muted-foreground col-span-full py-8 text-center">No active freelancers found.</div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
