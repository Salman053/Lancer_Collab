import { Client } from '@/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface ClientHeaderProps {
    client: Client;
    onEdit: () => void;
}

export function ClientHeader({ client, onEdit }: ClientHeaderProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    {client.profile_image_url ? (
                        <img src={client.profile_image_url} alt={client.name} />
                    ) : (
                        <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                            {getInitials(client.name)}
                        </AvatarFallback>
                    )}
                </Avatar>
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-2xl md:text-3xl font-bold">{client.name}</h1>
                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                            {client.status}
                        </Badge>
                        {client.account_id && (
                            <Badge variant="outline" className="text-xs">
                                Account: #{client.account_id}
                            </Badge>
                        )}
                    </div>
                    {client.company && (
                        <p className="text-muted-foreground mt-1">{client.company}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onEdit} className="gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit Client
                </Button>
            </div>
        </div>
    );
}