import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Payments & Invoices', href: '/client/payments' },
];

export default function PaymentsIndex() {
    const { payments } = usePage<{ payments: any[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments & Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Payments & Invoices</h1>
                <div className="space-y-4">
                    {payments.length > 0 ? payments.map((payment) => (
                        <Card key={payment.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-lg font-medium">{payment.project.title}</CardTitle>
                                <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'}>
                                    {payment.status.toUpperCase()}
                                </Badge>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-green-100 p-2 text-green-700">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg">${payment.amount}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(payment.created_at).toLocaleDateString()} • {payment.method}
                                        </p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                    <Download className="mr-2 h-4 w-4" /> Receipt
                                </Button>
                            </CardContent>
                        </Card>
                    )) : (
                        <div className="py-8 text-center text-muted-foreground">
                            No payment history available.
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
