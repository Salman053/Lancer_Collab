// components/client/client-info-card.tsx
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/types';
import { Building2, CheckCircle2, Clock, Globe, Mail, MapPin, MessageSquare, Phone, Users } from 'lucide-react';

interface ClientInfoCardProps {
    client: Client;
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
    const infoSections = [
        {
            title: 'Contact Information',
            icon: Mail,
            items: [
                { icon: Mail, label: 'Email', value: client.email, link: `mailto:${client.email}` },
                { icon: Phone, label: 'Phone', value: client.phone, link: `tel:${client.phone}` },
                {
                    icon: MessageSquare,
                    label: 'WhatsApp',
                    value: client.whatsapp_number,
                    link: client.whatsapp_number ? `https://wa.me/${client.whatsapp_number}` : null,
                },
            ],
        },
        {
            title: 'Business Details',
            icon: Building2,
            items: [
                { icon: Building2, label: 'Company', value: client.company },
                { icon: Globe, label: 'Website', value: client.website_url, link: client.website_url },
                { icon: MapPin, label: 'Address', value: client.address },
            ],
        },
        {
            title: 'Account Details',
            icon: Users,
            items: [
                { icon: Clock, label: 'Timezone', value: client.timezone },
                { icon: CheckCircle2, label: 'Account Status', value: client.account_id ? 'Provisioned' : 'Not Provisioned', isBadge: true },
            ],
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {infoSections.map((section, idx) => (
                <Card key={idx}>
                    <CardHeader className="flex flex-row items-center gap-2 pb-3">
                        <section.icon className="text-muted-foreground h-5 w-5" />
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {section.items.map(
                            (item: any, itemIdx) =>
                                item.value && (
                                    <div key={itemIdx} className="flex items-start gap-3">
                                        <item.icon className="text-muted-foreground mt-0.5 h-4 w-4" />
                                        <div className="flex-1">
                                            <p className="text-muted-foreground text-sm font-medium">{item.label}</p>
                                            {item.isBadge ? (
                                                <Badge variant={client.account_id ? 'default' : 'secondary'} className="mt-1">
                                                    {item.value}
                                                </Badge>
                                            ) : item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm break-all hover:underline"
                                                >
                                                    {item.value}
                                                </a>
                                            ) : (
                                                <p className="text-sm break-words whitespace-pre-wrap">{item.value}</p>
                                            )}
                                        </div>
                                    </div>
                                ),
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
