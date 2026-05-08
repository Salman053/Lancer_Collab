import { useForm } from '@inertiajs/react';
import { Milestone, Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogFooter } from '@/components/ui/dialog';
import { FormEventHandler } from 'react';
import { Loader2 } from 'lucide-react';

interface MilestoneFormProps {
    project: Project;
    milestone?: Milestone;
    onSuccess: () => void;
}

export default function MilestoneForm({ project, milestone, onSuccess }: MilestoneFormProps) {
    const isEditing = !!milestone;

    const { data, setData, post, put, processing, errors } = useForm({
        project_id: project.id,
        title: milestone?.title || '',
        description: milestone?.description || '',
        amount: milestone?.amount || '',
        due_date: milestone?.due_date || '',
        status: milestone?.status || 'pending',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(route('freelancer.milestones.update', milestone.id), {
                onSuccess: () => onSuccess(),
            });
        } else {
            post(route('freelancer.milestones.store'), {
                onSuccess: () => onSuccess(),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="title">Milestone Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    placeholder="e.g. Initial Prototype"
                    required
                />
                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                    id="description"
                    value={data.description || ''}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Describe the deliverables for this milestone"
                    rows={3}
                />
                {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="amount">Amount ({project.currency})</Label>
                    <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                        placeholder="0.00"
                    />
                    {errors.amount && <p className="text-sm text-destructive">{errors.amount}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                        id="due_date"
                        type="date"
                        value={data.due_date || ''}
                        onChange={(e) => setData('due_date', e.target.value)}
                        className='block'
                    />
                    {errors.due_date && <p className="text-sm text-destructive">{errors.due_date}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={data.status} onValueChange={(value: any) => setData('status', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="in_review">In Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="hold">On Hold</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
                {errors.status && <p className="text-sm text-destructive">{errors.status}</p>}
            </div>

            <DialogFooter className="pt-4">
                <Button type="submit" disabled={processing}>
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? 'Update Milestone' : 'Create Milestone'}
                </Button>
            </DialogFooter>
        </form>
    );
}
