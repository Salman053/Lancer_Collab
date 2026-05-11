import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Client } from '@/types';
import { Mail, Pencil } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface ClientHeaderProps {
    client: Client;
    onEdit: () => void;
}

export function ClientHeader({ client, onEdit }: ClientHeaderProps) {
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const [isSending, setIsSending] = useState(false);

    const handleSendMagicLink = () => {
        setIsSending(true);
        router.post(
            route('freelancer.clients.magic-link', client.id),
            {},
            {
                onFinish: () => setIsSending(false),
                preserveScroll: true,
              
            }
        );
    };

    return (
        <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                    {client.profile_image_url ? (
                        <img src={client.profile_image_url} alt={client.name} />
                    ) : (
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl">{getInitials(client.name)}</AvatarFallback>
                    )}
                </Avatar>
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-2xl font-bold md:text-3xl">{client.name}</h1>
                        <Badge variant={client.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                            {client.status}
                        </Badge>
                        {client.account_id && (
                            <Badge variant="outline" className="text-xs">
                                Account: #{client.account_id}
                            </Badge>
                        )}
                    </div>
                    {client.company && <p className="text-muted-foreground mt-1">{client.company}</p>}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleSendMagicLink} disabled={isSending} className="gap-2">
                    <Mail className="h-4 w-4" />
                    {isSending ? 'Sending...' : 'Send Login Link'}
                </Button>
                <Button variant="outline" size="sm" onClick={onEdit} className="gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit Client
                </Button>
            </div>
        </div>
    );
}
