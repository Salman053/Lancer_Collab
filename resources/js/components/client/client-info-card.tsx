// components/client/client-info-card.tsx
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
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
                { icon: Globe, label: 'Website', value: client.website_url, link: client.website_url, isWebsite: true },
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

    const renderValue = (item: any) => {
        if (item.isBadge) {
            return (
                <Badge variant={client.account_id ? 'default' : 'secondary'} className="mt-1">
                    {item.value}
                </Badge>
            );
        }

        if (item.isWebsite) {
            return (
                <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                        <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                        >
                            {item.value}
                            <Globe className="h-3 w-3 opacity-50" />
                        </a>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="start" className="w-80 p-0 overflow-hidden border-2 shadow-2xl rounded-xl bg-card">
                        <div className="relative aspect-video group">
                            <img
                                src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(item.value)}?w=800`}
                                alt="Website Preview"
                                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-0 left-0 right-0 p-3 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                                <p className="text-[10px] font-mono truncate opacity-80">{item.value}</p>
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            );
        }

        if (item.link) {
            return (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm break-all hover:underline">
                    {item.value}
                </a>
            );
        }

        return <p className="text-sm break-words whitespace-pre-wrap">{item.value}</p>
    };

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
                                            {renderValue(item)}
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
