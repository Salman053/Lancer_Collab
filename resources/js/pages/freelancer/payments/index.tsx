import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/freelancer/payments',
    },
];

export default function PaymentsIndex() {
    const { payments } = usePage<{ payments: any[] }>().props;

    const totalEarnings = payments.reduce((acc, p) => acc + parseFloat(p.amount), 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Earnings" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Earnings & Payments</h1>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$0</div>
                            <p className="text-xs text-muted-foreground">All caught up!</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Invoices Sent</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{payments.length}</div>
                            <p className="text-xs text-muted-foreground">Across {new Set(payments.map(p => p.project_id)).size} projects</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {payments.length === 0 ? (
                                <div className="text-center text-muted-foreground py-8">
                                    No transactions recorded yet.
                                </div>
                            ) : (
                                payments.map((payment) => (
                                    <div key={payment.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                                                <ArrowDownLeft className="h-4 w-4 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium">{payment.project.title}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {payment.milestone ? payment.milestone.title : 'General Payment'} • {new Date(payment.paid_at || payment.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-green-600 dark:text-green-400">+${parseFloat(payment.amount).toLocaleString()}</div>
                                            <Badge variant="outline" className="text-[10px]">{payment.status.toUpperCase()}</Badge>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

import { Clock } from 'lucide-react';
