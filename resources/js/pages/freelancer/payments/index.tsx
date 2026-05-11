import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { Clock, CreditCard, DollarSign, Download, FileText, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function FreelancerPaymentsIndex() {
    const { payments } = usePage<{ payments: any[] }>().props;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    console.log(payments)
    const totalEarnings = payments.filter((p) => p.status === 'completed').reduce((acc, p) => acc + parseFloat(p.amount), 0);
    const filtered = payments.filter(
        (p) => p.project.title.toLowerCase().includes(search.toLowerCase()) && (statusFilter === 'all' || p.status === statusFilter),
    );

    const shareInvoice = (projectId: number) => {
        navigator.clipboard.writeText(window.location.origin + route('projects.invoice', projectId));
        alert('Invoice link copied to clipboard!');
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Payments', href: '/freelancer/payments' }]}>
            <Head title="Earnings & Payments" />
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Earnings & Payments</h1>
                    <Button variant="outline" asChild>
                        <a href={route('freelancer.payments.report')}>
                            <Download className="mr-2 size-4" /> Download History Report
                        </a>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                            <DollarSign className="text-muted-foreground size-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalEarnings.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Pending</CardTitle>
                            <Clock className="text-muted-foreground size-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                
                                {payments
                                    .filter((p) => p.status === 'pending')
                                    .reduce((acc, p) => acc + parseFloat(p.amount), 0)
                                    .toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                            <CreditCard className="text-muted-foreground size-4" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{payments.length}</div>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle>Transaction History</CardTitle>
                        <div className="flex gap-2">
                            <Input placeholder="Filter projects..." className="w-64" onChange={(e) => setSearch(e.target.value)} />
                            <Select onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-32">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.project.title}</TableCell>
                                        <TableCell className="font-bold text-green-600">${parseFloat(p.amount).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={p.status === 'paid' ? 'default' : 'secondary'}>{p.status.toUpperCase()}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" asChild title="Invoice">
                                                <a href={route('projects.invoice', p.project_id)}>
                                                    <FileText className="size-4" />
                                                </a>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => shareInvoice(p.project_id)} title="Share">
                                                <Share2 className="size-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
