import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types';
import { useForm } from '@inertiajs/react';
import { Loader2, Send } from 'lucide-react';
import { FormEventHandler } from 'react';

interface ProjectUpdateFormProps {
    project: Project;
    onSuccess?: () => void;
}

export default function ProjectUpdateForm({ project, onSuccess }: ProjectUpdateFormProps) {
    const { data, setData, post, processing, reset, errors } = useForm({
        project_id: project.id,
        message: '',
        visible_to_client: true,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('freelancer.project-updates.store'), {
            onSuccess: () => {
                reset('message');
                if (onSuccess) onSuccess();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="message">New Update</Label>
                <Textarea
                    id="message"
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    placeholder="What's the latest progress?"
                    rows={3}
                    required
                />
                {errors.message && <p className="text-destructive text-sm">{errors.message}</p>}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="visible_to_client"
                        checked={data.visible_to_client}
                        onCheckedChange={(checked: any) => setData('visible_to_client', checked)}
                    />
                    <Label htmlFor="visible_to_client" className="text-muted-foreground text-xs">
                        Visible to client
                    </Label>
                </div>
                <Button type="submit" disabled={processing || !data.message.trim()}>
                    {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                    Post Update
                </Button>
            </div>
        </form>
    );
}
