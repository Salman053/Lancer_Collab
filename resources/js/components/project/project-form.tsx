import { useForm, router } from '@inertiajs/react'; // Add router import
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
// Removed unused Note import
import { Loader2, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { Project, Client } from '@/types';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';

const projectTypes = ['Web', 'Mobile', 'Desktop', 'Marketing', 'Construction', 'Other'] as const;
const priorities = ['low', 'medium', 'high', 'urgent'] as const;
const statuses = [
    { value: 'backlog', label: 'Backlog' },
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'on_review', label: 'Under Review' },
    { value: 'testing', label: 'Testing' },
    { value: 'completed', label: 'Completed' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'archived', label: 'Archived' },
] as const;
const billingTypes = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'retainer', label: 'Retainer' },
] as const;
const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'] as const;

type FormData = {
    title: string;
    slug: string;
    description: string;
    status: typeof statuses[number]['value'];
    priority: typeof priorities[number];
    type: typeof projectTypes[number];
    progress: number;
    notes: string;
    budget: string;
    currency: typeof currencies[number];
    actual_cost: number;
    billing_type: typeof billingTypes[number]['value'];
    color: string;
    start_date: string;
    deadline: string;
    client_id: number | string;
};

const ProjectForm = ({
    className,
    project = null,
    clients = [],
    onSuccess = null
}: {
    project?: Project | null,
    clients?: Client[],
    onSuccess?: (() => void) | null,
    className?: string
}) => {
    const isEditing = !!project;


    const { data, setData, post, put, processing, errors, reset } = useForm<FormData>({
        title: project?.title || '',
        slug: project?.slug || '',
        description: project?.description || '',
        status: (project?.status as FormData['status']) || 'open',
        priority: (project?.priority as FormData['priority']) || 'medium',
        type: (project?.type as FormData['type']) || 'Web',
        progress: project?.progress || 0,
        notes: project?.notes || '',
        budget: project?.budget?.toString() || '',
        currency: (project?.currency as FormData['currency']) || 'USD',
        actual_cost: project?.actual_cost || 0,
        billing_type: (project?.billing_type as FormData['billing_type']) || 'fixed',
        color: project?.color || 'blue',
        start_date: project?.start_date || '',
        deadline: project?.deadline || '',
        client_id: project?.client_id || '',
    });

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setData('title', newTitle);
        if (!isEditing && !data.slug) {
            setData('slug', generateSlug(newTitle));
        }
    };

    const handleReset = () => {
        if (isEditing && project) {
            setData({
                title: project.title || '',
                slug: project.slug || '',
                description: project.description || '',
                status: (project.status as FormData['status']) || 'open',
                priority: (project.priority as FormData['priority']) || 'medium',
                type: (project.type as FormData['type']) || 'Web',
                progress: project.progress || 0,
                notes: project.notes || '',
                budget: project.budget?.toString() || '',
                currency: (project.currency as FormData['currency']) || 'USD',
                actual_cost: project.actual_cost || 0,
                billing_type: (project.billing_type as FormData['billing_type']) || 'fixed',
                color: project.color || 'blue',
                start_date: project.start_date || '',
                deadline: project.deadline || '',
                client_id: project.client_id || '',
            });
        } else {
            reset();
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => {
                if (onSuccess) {
                    onSuccess();
                } else if (!isEditing) {
                    reset();
                }
            },
        };

        if (isEditing && project?.id) {
            // Option 1: If you have route helper, use it
            put(route('freelancer.projects.update', project.id), options);

        } else {
            post(route('freelancer.projects.store'), options);
        }
    };

    return (
        <form onSubmit={submit} className={cn("space-y-6", className)}>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Client Selection */}
                    <div className="space-y-2">
                        <Label htmlFor="client_id">
                            Client <span className="text-red-500">*</span>
                        </Label>
                        <Select
                            value={data.client_id?.toString() || ''}
                            onValueChange={(value) => setData('client_id', value ? parseInt(value) : '')}
                        >
                            <SelectTrigger
                                id="client_id"
                                className={errors.client_id ? 'border-red-500' : ''}
                            >
                                <SelectValue placeholder="Select a client" />
                            </SelectTrigger>
                            <SelectContent>
                                {clients.map((client) => (
                                    <SelectItem key={client.id} value={client.id.toString()}>
                                        {client.name} {client.company ? `(${client.company})` : ''}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.client_id && (
                            <p className="text-sm text-destructive">{errors.client_id}</p>
                        )}
                    </div>

                    {/* Title Field */}
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Project Title <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={handleTitleChange}
                            placeholder="E-commerce Website Redesign"
                            className={errors.title ? 'border-red-500' : ''}
                            required
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title}</p>
                        )}
                    </div>
                </div>

                {/* Slug Field */}
                <div className="space-y-2">
                    <Label htmlFor="slug">
                        Slug <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="slug"
                        type="text"
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        placeholder="e-commerce-website-redesign"
                        className={errors.slug ? 'border-red-500' : ''}
                        required
                    />
                    <p className="text-xs text-muted-foreground">
                        URL-friendly version of the title. Must be unique.
                    </p>
                    {errors.slug && (
                        <p className="text-sm text-destructive">{errors.slug}</p>
                    )}
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                    <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        placeholder="Describe the project scope, objectives, and deliverables..."
                        rows={4}
                        className={errors.description ? 'border-red-500' : ''}
                        required
                    />
                    {errors.description && (
                        <p className="text-sm text-destructive">{errors.description}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Project Type */}
                    <div className="space-y-2">
                        <Label htmlFor="type">Project Type</Label>
                        <Select
                            value={data.type}
                            onValueChange={(value) => setData('type', value as FormData['type'])}
                        >
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {projectTypes.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Priority */}
                    <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={data.priority}
                            onValueChange={(value) => setData('priority', value as FormData['priority'])}
                        >
                            <SelectTrigger id="priority">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                {priorities.map((priority) => (
                                    <SelectItem key={priority} value={priority}>
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Status & Progress */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={data.status}
                            onValueChange={(value) => setData('status', value as FormData['status'])}
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statuses.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        {status.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="progress">
                            Progress: {data.progress}%
                        </Label>
                        <Slider
                            id="progress"
                            value={[data.progress]}
                            onValueChange={(value) => setData('progress', value[0])}
                            className="w-full mt-2"
                            min={0}
                            max={100}
                            step={1}
                        />
                    </div>
                </div>

                {/* Budget Section */}
                <div className="space-y-3 pt-2">
                    <Label className="flex items-center gap-2 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        Budget & Billing
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-4 bg-muted/20">
                        <div className="space-y-2">
                            <Label htmlFor="billing_type">Billing Type</Label>
                            <Select
                                value={data.billing_type}
                                onValueChange={(value) => setData('billing_type', value as FormData['billing_type'])}
                            >
                                <SelectTrigger id="billing_type">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {billingTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="budget">Budget</Label>
                            <Input
                                id="budget"
                                type="number"
                                step="0.01"
                                value={data.budget}
                                onChange={(e) => setData('budget', e.target.value)}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select
                                value={data.currency}
                                onValueChange={(value) => setData('currency', value as FormData['currency'])}
                            >
                                <SelectTrigger id="currency">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {currencies.map((currency) => (
                                        <SelectItem key={currency} value={currency}>
                                            {currency}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="start_date" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Start Date
                        </Label>
                        <Input
                            id="start_date"
                            type="date"
                            value={data.start_date}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="deadline" className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Deadline
                        </Label>
                        <Input
                            id="deadline"
                            type="date"
                            value={data.deadline}
                            onChange={(e) => setData('deadline', e.target.value)}
                        />
                    </div>
                </div>

                {/* Notes Field */}
                <div className="space-y-2 pt-2">
                    <Label htmlFor="notes">Internal Notes</Label>
                    <Textarea
                        id="notes"
                        value={data.notes || ''}
                        onChange={(e) => setData('notes', e.target.value)}
                        placeholder="Add internal notes, reminders, or additional details..."
                        rows={3}
                        className={errors.notes ? 'border-red-500' : ''}
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={processing}
                >
                    Reset
                </Button>
                <Button type="submit" disabled={processing}>
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? 'Update Project' : 'Create Project'}
                </Button>
            </div>
        </form>
    );
};


export default ProjectForm;