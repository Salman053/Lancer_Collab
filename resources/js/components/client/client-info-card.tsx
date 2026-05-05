// components/client/client-info-card.tsx
import { Client } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Mail, 
    Phone, 
    Building2, 
    MapPin, 
    Globe, 
    Clock, 
    Users,
    MessageSquare,
    CheckCircle2,
    XCircle
} from 'lucide-react';

interface ClientInfoCardProps {
    client: Client;
}

export function ClientInfoCard({ client }: ClientInfoCardProps) {
    const infoSections = [
        {
            title: "Contact Information",
            icon: Mail,
            items: [
                { icon: Mail, label: "Email", value: client.email, link: `mailto:${client.email}` },
                { icon: Phone, label: "Phone", value: client.phone, link: `tel:${client.phone}` },
                { icon: MessageSquare, label: "WhatsApp", value: client.whatsapp_number, link: client.whatsapp_number ? `https://wa.me/${client.whatsapp_number}` : null },
            ]
        },
        {
            title: "Business Details",
            icon: Building2,
            items: [
                { icon: Building2, label: "Company", value: client.company },
                { icon: Globe, label: "Website", value: client.website_url, link: client.website_url },
                { icon: MapPin, label: "Address", value: client.address },
            ]
        },
        {
            title: "Account Details",
            icon: Users,
            items: [
                { icon: Clock, label: "Timezone", value: client.timezone },
                { icon: CheckCircle2, label: "Account Status", value: client.account_id ? "Provisioned" : "Not Provisioned", isBadge: true },
            ]
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infoSections.map((section, idx) => (
                <Card key={idx}>
                    <CardHeader className="flex flex-row items-center gap-2 pb-3">
                        <section.icon className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {section.items.map((item :any, itemIdx) => (
                            item.value && (
                                <div key={itemIdx} className="flex items-start gap-3">
                                    <item.icon className="h-4 w-4 text-muted-foreground mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                                        {item.isBadge ? (
                                            <Badge variant={client.account_id ? "default" : "secondary"} className="mt-1">
                                                {item.value}
                                            </Badge>
                                        ) : item.link ? (
                                            <a 
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm hover:underline break-all"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm break-words whitespace-pre-wrap">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            )
                        ))}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}