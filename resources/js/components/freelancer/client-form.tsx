import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { Loader2 } from 'lucide-react';
import { Client } from '@/types';
import React from 'react';
import { cn } from '@/lib/utils';

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

const ClientForm = ({ className, client = null, onSuccess = null }: {
    client?: Client | null, onSuccess?: (() => void) | null
    , className?: string
}) => {
    const isEditing = !!client;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: client?.name || '',
        email: client?.email || '',
        phone: client?.phone || '',
        company: client?.company || '',
        address: client?.address || '',
        timezone: client?.timezone || 'UTC',
        status: client?.status || 'active',
        preferences: client?.preferences || {
            newsletter: false,
            notifications: true,
        },
    });

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

    return (
        <Card className={cn("w-full max-w-2xl mx-auto", className)}>
            <CardHeader>
                <CardTitle>
                    {isEditing ? 'Edit Client' : 'Create New Client'}
                </CardTitle>
                <CardDescription>
                    {isEditing
                        ? 'Update client information'
                        : 'Add a new client to your system'}
                </CardDescription>
            </CardHeader>
            <form onSubmit={submit}>
                <CardContent className="space-y-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="John Doe"
                            className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{errors.name}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="client@example.com"
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{errors.email}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{errors.phone}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Company Field */}
                    <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                            id="company"
                            type="text"
                            value={data.company}
                            onChange={(e) => setData('company', e.target.value)}
                            placeholder="Company Name"
                            className={errors.company ? 'border-red-500' : ''}
                        />
                        {errors.company && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{errors.company}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Address Field */}
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            placeholder="Street Address, City, State, ZIP Code"
                            rows={3}
                            className={errors.address ? 'border-red-500' : ''}
                        />
                        {errors.address && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{errors.address}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Timezone Field */}
                    <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                            value={data.timezone}
                            onValueChange={(value) => setData('timezone', value)}
                        >
                            <SelectTrigger className={errors.timezone ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                {timezones.map((tz) => (
                                    <SelectItem key={tz} value={tz}>
                                        {tz}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.timezone && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{errors.timezone}</AlertDescription>
                            </Alert>
                        )}
                    </div>

                    {/* Status Field */}
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value: any) => setData('status', value)}
                        >
                            <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active Client</SelectItem>
                                <SelectItem value="lead">Potential Lead</SelectItem>
                                <SelectItem value="pending">Awaiting Verification</SelectItem>
                                <SelectItem value="inactive">Past Client</SelectItem>
                                <SelectItem value="suspended">Account Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.status && (
                            <Alert variant="destructive" className="mt-2">
                                <AlertDescription>{errors.status}</AlertDescription>
                            </Alert>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end space-x-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => reset()}
                        disabled={processing}
                    >
                        Reset
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? 'Update Client' : 'Create Client'}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ClientForm;