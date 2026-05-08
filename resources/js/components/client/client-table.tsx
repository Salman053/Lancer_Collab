import ConfirmDialog from '@/components/confirm-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Client } from '@/types';
import { router } from '@inertiajs/react';
import { Building2, Edit, LayoutGrid, Mail, MoreHorizontal, Phone, Table2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ClientTableProps {
    clients: Client[];
    onEdit: (client: Client) => void;
}

type ViewMode = 'table' | 'grid';

export default function ClientTable({ clients, onEdit }: ClientTableProps) {
    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const onDelete = (id: number) => {
        router.delete(route('freelancer.clients.destroy', id));
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (clients.length === 0) {
        return (
            <div className="bg-muted/50 flex flex-col items-center justify-center rounded-lg border border-dashed p-10">
                <p className="text-muted-foreground mb-4">No clients found. Add your first client to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* View Toggle */}
            <div className="flex justify-end">
                <div className="bg-muted flex items-center gap-1 rounded-lg p-1">
                    <Button variant={viewMode === 'table' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('table')} className="h-8 px-3">
                        <Table2 className="mr-2 h-4 w-4" />
                        Table
                    </Button>
                    <Button variant={viewMode === 'grid' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="h-8 px-3">
                        <LayoutGrid className="mr-2 h-4 w-4" />
                        Grid
                    </Button>
                </div>
            </div>

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">
                                        <div>
                                            <div className="text-base font-semibold">{client.name}</div>
                                            <div className="text-muted-foreground text-xs">{client.timezone}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm">
                                                <Mail className="text-muted-foreground mr-2 h-3 w-3" />
                                                {client.email}
                                            </div>
                                            {client.phone && (
                                                <div className="text-muted-foreground flex items-center text-sm">
                                                    <Phone className="mr-2 h-3 w-3" />
                                                    {client.phone}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Building2 className="text-muted-foreground mr-2 h-4 w-4" />
                                            {client.company || <span className="text-muted-foreground italic">N/A</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex w-fit flex-col gap-1 capitalize">
                                            <Badge className="w-fit" variant={client.status === 'active' ? 'secondary' : 'outline'}>
                                                {client.status || 'Active'}
                                            </Badge>
                                            {client.account_id && (
                                                <Badge variant={'secondary'} className="px-1 py-0 text-[10px]">
                                                    Account Provisioned
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-[160px]">
                                                <DropdownMenuItem onSelect={() => onEdit(client)}>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>

                                                <ConfirmDialog
                                                    trigger={
                                                        <DropdownMenuItem
                                                            onSelect={(e) => e.preventDefault()}
                                                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    }
                                                    title="Delete Client"
                                                    description={`Are you sure you want to delete ${client.name}? All associated data will be permanently removed. This action cannot be undone.`}
                                                    confirmText="Delete Client"
                                                    variant="destructive"
                                                    onConfirm={() => onDelete(client.id)}
                                                />
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {/* Grid/Card View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clients.map((client) => (
                        <Card key={client.id} className="group transition-shadow duration-200 hover:shadow-lg">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary/10 text-primary">{getInitials(client.name)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="text-lg leading-none font-semibold">{client.name}</h3>
                                            {client.timezone && <p className="text-muted-foreground mt-1 text-xs">{client.timezone}</p>}
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-[160px]">
                                            <DropdownMenuItem onSelect={() => onEdit(client)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <ConfirmDialog
                                                trigger={
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()}
                                                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                }
                                                title="Delete Client"
                                                description={`Are you sure you want to delete ${client.name}? All associated data will be permanently removed. This action cannot be undone.`}
                                                confirmText="Delete Client"
                                                variant="destructive"
                                                onConfirm={() => onDelete(client.id)}
                                            />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 pb-3">
                                <div className="space-y-2">
                                    <div className="flex items-center text-sm">
                                        <Mail className="text-muted-foreground mr-2 h-3.5 w-3.5 flex-shrink-0" />
                                        <span className="truncate">{client.email}</span>
                                    </div>
                                    {client.phone && (
                                        <div className="flex items-center text-sm">
                                            <Phone className="text-muted-foreground mr-2 h-3.5 w-3.5 flex-shrink-0" />
                                            <span>{client.phone}</span>
                                        </div>
                                    )}
                                    {client.company && (
                                        <div className="flex items-center text-sm">
                                            <Building2 className="text-muted-foreground mr-2 h-3.5 w-3.5 flex-shrink-0" />
                                            <span className="truncate">{client.company}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t pt-3">
                                <div className="flex flex-col gap-1">
                                    <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                                        {client.status || 'Active'}
                                    </Badge>
                                    {client.account_id && (
                                        <Badge variant="outline" className="text-[10px]">
                                            Account Provisioned
                                        </Badge>
                                    )}
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => router.visit(route('freelancer.clients.show', client.id))}
                                    className="text-xs"
                                >
                                    View Details
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
