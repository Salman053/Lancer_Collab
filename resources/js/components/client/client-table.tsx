import { Client } from '@/types';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Mail, Phone, Building2, LayoutGrid, Table2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import ConfirmDialog from '@/components/confirm-dialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

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
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (clients.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-muted-foreground mb-4">No clients found. Add your first client to get started!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* View Toggle */}
            <div className="flex justify-end">
                <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                    <Button
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                        className="h-8 px-3"
                    >
                        <Table2 className="h-4 w-4 mr-2" />
                        Table
                    </Button>
                    <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="h-8 px-3"
                    >
                        <LayoutGrid className="h-4 w-4 mr-2" />
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
                                            <div className="text-xs text-muted-foreground">{client.timezone}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center text-sm">
                                                <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
                                                {client.email}
                                            </div>
                                            {client.phone && (
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Phone className="mr-2 h-3 w-3" />
                                                    {client.phone}
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center">
                                            <Building2 className="mr-2 h-4 w-4 text-muted-foreground" />
                                            {client.company || <span className="text-muted-foreground italic">N/A</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1 capitalize w-fit">
                                            <Badge className='w-fit' variant={client.status === 'active' ? 'secondary' : 'outline'}>
                                                {client.status || 'Active'}
                                            </Badge>
                                            {client.account_id && (
                                                <Badge variant={"secondary"} className="text-[10px] py-0 px-1">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map((client) => (
                        <Card key={client.id} className="group hover:shadow-lg transition-shadow duration-200">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {getInitials(client.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-lg leading-none">{client.name}</h3>
                                            {client.timezone && (
                                                <p className="text-xs text-muted-foreground mt-1">{client.timezone}</p>
                                            )}
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                        <Mail className="mr-2 h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                        <span className="truncate">{client.email}</span>
                                    </div>
                                    {client.phone && (
                                        <div className="flex items-center text-sm">
                                            <Phone className="mr-2 h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                            <span>{client.phone}</span>
                                        </div>
                                    )}
                                    {client.company && (
                                        <div className="flex items-center text-sm">
                                            <Building2 className="mr-2 h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                            <span className="truncate">{client.company}</span>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-3 flex items-center justify-between border-t">
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