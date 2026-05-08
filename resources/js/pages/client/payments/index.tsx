import { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Search, FileText, Download, Share2, DollarSign, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Payments & Invoices', href: '/client/payments' }];

export default function ClientPaymentsIndex() {
    const { payments } = usePage<{ payments: any[] }>().props;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filtered = payments.filter(p => 
        p.project.title.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter === 'all' || p.status === statusFilter)
    );

    const shareInvoice = (projectId: number) => {
        navigator.clipboard.writeText(window.location.origin + route('projects.invoice', projectId));
        alert('Invoice link copied to clipboard!');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments & Invoices" />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Payments & Invoices</h1>
                </div>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                        <CardTitle>History</CardTitle>
                        <div className="flex gap-2">
                            <Input placeholder="Filter projects..." className="w-64" onChange={(e) => setSearch(e.target.value)} />
                            <Select onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-32"><SelectValue placeholder="Status" /></SelectTrigger>
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
                                    <TableHead>Method</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell className="font-medium">{p.project.title}</TableCell>
                                        <TableCell><DollarSign className="inline size-4" />{parseFloat(p.amount).toLocaleString()}</TableCell>
                                        <TableCell className="capitalize">{p.method}</TableCell>
                                        <TableCell><Badge variant={p.status === 'paid' ? 'default' : 'secondary'}>{p.status.toUpperCase()}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" asChild title="Download PDF">
                                                <a href={route('projects.invoice', p.project_id)}><FileText className="size-4" /></a>
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => shareInvoice(p.project_id)} title="Share Invoice">
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
