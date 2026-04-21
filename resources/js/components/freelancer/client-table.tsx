import { Client } from '@/types';
import { Button } from '@/components/ui/button';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Mail, Phone, Building2 } from 'lucide-react';
import { router } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface ClientTableProps {
    clients: Client[];
    onEdit: (client: Client) => void;
}

export default function ClientTable({ clients, onEdit }: ClientTableProps) {
    const onDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this client?')) {
            router.delete(route('freelancer.clients.destroy', id));
        }
    };

    if (clients.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-10 bg-muted/50 rounded-lg border border-dashed">
                <p className="text-muted-foreground mb-4">No clients found. Add your first client to get started!</p>
            </div>
        );
    }

    return (
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
                                <Badge variant={client.status === 'active' ? 'secondary' : 'outline'}>
                                    {client.status || 'Active'}
                                </Badge>
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
                                        <DropdownMenuItem onClick={() => onEdit(client)}>
                                            <Edit className="mr-2 h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => onDelete(client.id)}
                                            className="text-destructive focus:text-destructive"
                                        >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
