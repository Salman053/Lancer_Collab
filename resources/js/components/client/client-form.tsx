import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Note } from '@/components/note';
import { Loader2, KeyRound, Info, User, Phone, Building, Globe, MessageSquare, ShieldCheck, Mail } from 'lucide-react';
import { Client } from '@/types';
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Dubai',
    'Australia/Sydney',
];

const ClientForm = ({
    className,
    client = null,
    onSuccess = null,
    hideHeader = false
}: {
    client?: Client | null,
    onSuccess?: (() => void) | null,
    className?: string,
    hideHeader?: boolean
}) => {
    const isEditing = !!client;
    const [showPasswordHint, setShowPasswordHint] = useState(!isEditing);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: client?.name || '',
        email: client?.email || '',
        phone: client?.phone || '',
        whatsapp_number: client?.whatsapp_number || '',
        company: client?.company || '',
        address: client?.address || '',
        website_url: client?.website_url || '',
        timezone: client?.timezone || 'UTC',
        status: client?.status || 'active',
        notes: client?.notes || '',
        preferences: client?.preferences || {
            newsletter: false,
            notifications: true,
        },
    });

    useEffect(() => {
        if (!isEditing && data.name) {
            const timer = setTimeout(() => setShowPasswordHint(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [data.name, isEditing]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            onSuccess: () => {
                if (onSuccess) {
                    onSuccess();
                } else if (!isEditing) {
                    reset();
                }
            },
        };

        if (isEditing) {
            put(route('freelancer.clients.update', client.id), options);
        } else {
            post(route('freelancer.clients.store'), options);
        }
    };

    const getDefaultPassword = () => {
        if (!data.name) return '[clientname]123';
        const nameSlug = data.name.toLowerCase().replace(/\s/g, '');
        return `${nameSlug}123`;
    };

    return (
        <Card className={cn("w-full mx-auto shadow-lg", className)}>
            {!hideHeader && (
                <CardHeader className="bg-muted/30 pb-8">
                    <div className="flex items-start justify-between">
                        <div className="space-y-1">
                            <CardTitle className="text-2xl font-bold flex items-center gap-2">
                                {isEditing ? <User className="h-6 w-6" /> : <ShieldCheck className="h-6 w-6" />}
                                {isEditing ? 'Edit Client Profile' : 'Register New Client'}
                            </CardTitle>
                            <CardDescription className="text-base">
                                {isEditing
                                    ? 'Refine client details and account preferences.'
                                    : 'Set up a new client portal account and professional profile.'}
                            </CardDescription>
                        </div>
                        {!isEditing && (
                            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <KeyRound className="h-6 w-6" />
                            </div>
                        )}
                    </div>
                </CardHeader>
            )}

            <form onSubmit={submit}>
                <CardContent className="p-6 space-y-8">
                    {/* Security Alert for New Clients */}
                    {!isEditing && showPasswordHint && (
                        <Note
                            variant="info"
                            className="border-blue-200 bg-blue-50/50"
                            onClose={() => setShowPasswordHint(false)}
                        >
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-blue-900">Auto-Provisioning Enabled</span>
                                <p className="text-sm text-blue-800">
                                    Creating this client will automatically generate a portal account with password:
                                    <code className="mx-2 rounded bg-blue-100 px-1.5 py-0.5 font-mono text-blue-900">
                                        {data.name ? getDefaultPassword() : '[clientname]123'}
                                    </code>
                                </p>
                            </div>
                        </Note>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Section: Primary Information */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <User className="h-4 w-4" /> Primary Information
                            </h3>
                            <Separator />
                            
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-destructive">*</span></Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="John Doe"
                                    className={cn(errors.name && "border-destructive focus-visible:ring-destructive")}
                                />
                                {errors.name && <p className="text-xs text-destructive font-medium">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">Professional Email <span className="text-destructive">*</span></Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="john@company.com"
                                        className={cn("pl-10", errors.email && "border-destructive focus-visible:ring-destructive")}
                                    />
                                </div>
                                {errors.email && <p className="text-xs text-destructive font-medium">{errors.email}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-sm font-medium">Account Status</Label>
                                    <Select value={data.status} onValueChange={(v: any) => setData('status', v)}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="lead">Lead</SelectItem>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                            <SelectItem value="suspended">Suspended</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone" className="text-sm font-medium">Timezone</Label>
                                    <Select value={data.timezone} onValueChange={(v) => setData('timezone', v)}>
                                        <SelectTrigger id="timezone">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {timezones.map((tz) => (
                                                <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        {/* Section: Contact & Company */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Building className="h-4 w-4" /> Business & Contact
                            </h3>
                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-sm font-medium">Company Name</Label>
                                <Input
                                    id="company"
                                    value={data.company}
                                    onChange={(e) => setData('company', e.target.value)}
                                    placeholder="Acme Corp"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="+1..."
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="whatsapp" className="text-sm font-medium">WhatsApp</Label>
                                    <div className="relative">
                                        <MessageSquare className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="whatsapp"
                                            value={data.whatsapp_number}
                                            onChange={(e) => setData('whatsapp_number', e.target.value)}
                                            placeholder="+1..."
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website" className="text-sm font-medium">Website URL</Label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="website"
                                        value={data.website_url}
                                        onChange={(e) => setData('website_url', e.target.value)}
                                        placeholder="https://..."
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Section: Address & Notes */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Globe className="h-4 w-4" /> Location & Notes
                            </h3>
                            <Separator />
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-sm font-medium">Physical Address</Label>
                                <Textarea
                                    id="address"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Street, City, Country"
                                    className="min-h-[100px] resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes" className="text-sm font-medium">Internal Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Private notes about this client..."
                                    className="min-h-[100px] resize-none"
                                />
                            </div>
                        </div>

                        {/* Section: Preferences */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <Info className="h-4 w-4" /> Preferences & System
                            </h3>
                            <Separator />
                            <div className="bg-muted/20 rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="notifications" className="text-sm font-medium cursor-pointer">Email Notifications</Label>
                                        <p className="text-xs text-muted-foreground">Receive updates on project milestones</p>
                                    </div>
                                    <Checkbox 
                                        id="notifications" 
                                        checked={data.preferences.notifications}
                                        onCheckedChange={(v) => setData('preferences', { ...data.preferences, notifications: !!v })}
                                    />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">Newsletter Subscription</Label>
                                        <p className="text-xs text-muted-foreground">Monthly product updates and news</p>
                                    </div>
                                    <Checkbox 
                                        id="newsletter" 
                                        checked={data.preferences.newsletter}
                                        onCheckedChange={(v) => setData('preferences', { ...data.preferences, newsletter: !!v })}
                                    />
                                </div>
                            </div>
                            
                            {isEditing && (
                                <Note variant="info" className="bg-primary/5 border-primary/10">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Info className="h-3.5 w-3.5 text-primary" />
                                        <span>Portal security can be managed in the <strong className="text-primary">Client Access</strong> tab.</span>
                                    </div>
                                </Note>
                            )}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="bg-muted/30 p-6 flex justify-between items-center">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => reset()}
                        disabled={processing}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Discard Changes
                    </Button>
                    <div className="flex gap-3">
                        <Button type="submit" size="lg" disabled={processing} className="min-w-[140px]">
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                isEditing ? 'Update Client' : 'Create Client'
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ClientForm;
