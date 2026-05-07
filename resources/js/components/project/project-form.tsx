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
import { Loader2, Briefcase, Calendar, DollarSign, Tag, Info, Layers, Palette, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Project, Client } from '@/types';
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';
import { Separator } from '@/components/ui/separator';

const projectTypes = ['Web', 'Mobile', 'Desktop', 'Marketing', 'Construction', 'Other'] as const;
const priorities = ['low', 'medium', 'high', 'urgent'] as const;
const statuses = [
    { value: 'backlog', label: 'Backlog', color: 'bg-slate-500' },
    { value: 'open', label: 'Open', color: 'bg-blue-500' },
    { value: 'in_progress', label: 'In Progress', color: 'bg-amber-500' },
    { value: 'on_review', label: 'Under Review', color: 'bg-purple-500' },
    { value: 'testing', label: 'Testing', color: 'bg-pink-500' },
    { value: 'completed', label: 'Completed', color: 'bg-emerald-500' },
    { value: 'on_hold', label: 'On Hold', color: 'bg-orange-500' },
    { value: 'cancelled', label: 'Cancelled', color: 'bg-red-500' },
    { value: 'archived', label: 'Archived', color: 'bg-gray-700' },
] as const;

const billingTypes = [
    { value: 'fixed', label: 'Fixed Price' },
    { value: 'hourly', label: 'Hourly Rate' },
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
    actual_cost: string;
    billing_type: typeof billingTypes[number]['value'];
    color: string;
    start_date: string;
    deadline: string;
    client_id: string;
    thumbnail: string;
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
        actual_cost: project?.actual_cost?.toString() || '0',
        billing_type: (project?.billing_type as FormData['billing_type']) || 'fixed',
        color: project?.color || '#3b82f6',
        start_date: project?.start_date ? new Date(project.start_date).toISOString().split('T')[0] : '',
        deadline: project?.deadline ? new Date(project.deadline).toISOString().split('T')[0] : '',
        client_id: project?.client_id?.toString() || '',
        thumbnail: project?.thumbnail || '',
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
            put(route('freelancer.projects.update', project.id), options);
        } else {
            post(route('freelancer.projects.store'), options);
        }
    };

    return (
        <Card className={cn("w-full mx-auto shadow-xl border-t-4", isEditing ? "border-t-primary" : "border-t-emerald-500", className)}>
            <CardHeader className="bg-muted/30 pb-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-3xl font-bold tracking-tight">
                            {isEditing ? 'Update Project' : 'New Project Request'}
                        </CardTitle>
                        <CardDescription className="text-base">
                            {isEditing ? `Refining details for project: ${project.title}` : 'Initialize a new project workspace for your client.'}
                        </CardDescription>
                    </div>
                    <div className={cn("p-3 rounded-xl bg-background shadow-sm border", isEditing ? "text-primary" : "text-emerald-600")}>
                        <Briefcase className="h-8 w-8" />
                    </div>
                </div>
            </CardHeader>

            <form onSubmit={submit}>
                <CardContent className="p-8 space-y-10">
                    {/* Step 1: Core Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm">
                            <Layers className="h-4 w-4" /> Core Specifications
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-8 space-y-2">
                                <Label htmlFor="title" className="font-semibold">Project Title <span className="text-destructive">*</span></Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={handleTitleChange}
                                    placeholder="e.g. Corporate Rebranding 2024"
                                    className={cn("h-11 text-lg", errors.title && "border-destructive")}
                                />
                                {errors.title && <p className="text-xs text-destructive font-medium">{errors.title}</p>}
                            </div>
                            <div className="md:col-span-4 space-y-2">
                                <Label htmlFor="client_id" className="font-semibold">Assign Client <span className="text-destructive">*</span></Label>
                                <Select value={data.client_id} onValueChange={(v) => setData('client_id', v)}>
                                    <SelectTrigger id="client_id" className={cn("h-11", errors.client_id && "border-destructive")}>
                                        <SelectValue placeholder="Select account..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {clients.map((c) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>
                                                {c.company ? `${c.name} (${c.company})` : c.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.client_id && <p className="text-xs text-destructive font-medium">{errors.client_id}</p>}
                            </div>

                            <div className="md:col-span-12 space-y-2">
                                <Label htmlFor="slug" className="font-semibold text-muted-foreground">Unique Workspace URL Slug <span className="text-destructive">*</span></Label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded border">laracollab.io/p/</span>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        className={cn("h-9 font-mono text-sm", errors.slug && "border-destructive")}
                                    />
                                </div>
                                {errors.slug && <p className="text-xs text-destructive font-medium">{errors.slug}</p>}
                            </div>

                            <div className="md:col-span-12 space-y-2">
                                <Label htmlFor="description" className="font-semibold">Detailed Description <span className="text-destructive">*</span></Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe the project scope, high-level objectives, and expected deliverables..."
                                    className={cn("min-h-[120px] resize-none", errors.description && "border-destructive")}
                                />
                                {errors.description && <p className="text-xs text-destructive font-medium">{errors.description}</p>}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Step 2: Timeline & Status */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-amber-600 font-bold uppercase tracking-wider text-sm">
                            <Calendar className="h-4 w-4" /> Timeline & Management
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <Label htmlFor="status" className="font-semibold">Current Status</Label>
                                <Select value={data.status} onValueChange={(v: any) => setData('status', v)}>
                                    <SelectTrigger id="status" className="h-10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statuses.map((s) => (
                                            <SelectItem key={s.value} value={s.value}>
                                                <div className="flex items-center gap-2">
                                                    <div className={cn("h-2 w-2 rounded-full", s.color)} />
                                                    {s.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority" className="font-semibold">Urgency Level</Label>
                                <Select value={data.priority} onValueChange={(v: any) => setData('priority', v)}>
                                    <SelectTrigger id="priority" className="h-10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {priorities.map((p) => (
                                            <SelectItem key={p} value={p}>
                                                {p.charAt(0).toUpperCase() + p.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type" className="font-semibold">Category</Label>
                                <Select value={data.type} onValueChange={(v: any) => setData('type', v)}>
                                    <SelectTrigger id="type" className="h-10">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {projectTypes.map((t) => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="start_date" className="font-semibold">Launch Date</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    className="h-10 block"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="deadline" className="font-semibold text-destructive">Hard Deadline</Label>
                                <Input
                                    id="deadline"
                                    type="date"
                                    value={data.deadline}
                                    onChange={(e) => setData('deadline', e.target.value)}
                                    className="h-10 border-destructive/20 block"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="progress" className="font-semibold flex justify-between">
                                    Overall Progress <span>{data.progress}%</span>
                                </Label>
                                <div className="pt-4 px-1">
                                    <Slider
                                        value={[data.progress]}
                                        onValueChange={(v) => setData('progress', v[0])}
                                        max={100}
                                        step={1}
                                        className="py-4"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Step 3: Financials */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-wider text-sm">
                            <DollarSign className="h-4 w-4" /> Financial Configuration
                        </div>
                        <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="billing_type" className="font-semibold">Billing Model</Label>
                                <Select value={data.billing_type} onValueChange={(v: any) => setData('billing_type', v)}>
                                    <SelectTrigger id="billing_type" className="h-10 bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {billingTypes.map((b) => (
                                            <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="currency" className="font-semibold">Currency</Label>
                                <Select value={data.currency} onValueChange={(v: any) => setData('currency', v)}>
                                    <SelectTrigger id="currency" className="h-10 bg-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {currencies.map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="budget" className="font-semibold">Total Budget</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">{data.currency}</span>
                                    <Input
                                        id="budget"
                                        type="number"
                                        value={data.budget}
                                        onChange={(e) => setData('budget', e.target.value)}
                                        className="pl-12 h-10 bg-white"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="actual_cost" className="font-semibold">Current Expenditure</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">{data.currency}</span>
                                    <Input
                                        id="actual_cost"
                                        type="number"
                                        value={data.actual_cost}
                                        onChange={(e) => setData('actual_cost', e.target.value)}
                                        className="pl-12 h-10 bg-white"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Step 4: Branding & Attachments */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-wider text-sm">
                            <Palette className="h-4 w-4" /> Aesthetics & Resources
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="color" className="font-semibold">Workspace Brand Color</Label>
                                    <div className="flex items-center gap-4 p-3 border rounded-lg bg-background">
                                        <Input
                                            id="color"
                                            type="color"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            className="w-14 h-10 p-1 cursor-pointer border-none"
                                        />
                                        <div className="space-y-0.5">
                                            <span className="text-sm font-mono font-medium uppercase">{data.color}</span>
                                            <p className="text-xs text-muted-foreground">Used for UI highlights and badges</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="thumbnail" className="font-semibold">Project Thumbnail URL</Label>
                                    <div className="relative">
                                        <ImageIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="thumbnail"
                                            value={data.thumbnail}
                                            onChange={(e) => setData('thumbnail', e.target.value)}
                                            placeholder="https://images.unsplash.com/..."
                                            className="pl-10 h-10"
                                        />
                                    </div>
                                    <p className="text-[11px] text-muted-foreground italic flex items-center gap-1">
                                        <Info className="h-3 w-3" /> External image link for project card preview
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes" className="font-semibold">Internal Workspace Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Add private team notes, account credentials, or specific client requests..."
                                    className="min-h-[140px] resize-none border-dashed bg-muted/20"
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="bg-muted/30 p-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Info className="h-4 w-4" />
                        <span>All changes are automatically audited.</span>
                    </div>
                    <div className="flex gap-4 w-full sm:w-auto">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset()}
                            disabled={processing}
                            className="flex-1 sm:flex-none h-11 px-8"
                        >
                            Reset Form
                        </Button>
                        <Button type="submit" disabled={processing} className="flex-1 sm:flex-none h-11 px-12 shadow-lg shadow-primary/20">
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                isEditing ? 'Update Project' : 'Create Project'
                            )}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ProjectForm;
