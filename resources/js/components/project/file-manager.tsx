import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Trash2, Download, Upload } from 'lucide-react';
import ConfirmDialog from '@/components/confirm-dialog';

export default function FileManager({ project, files, auth }: { project: any, files: any[], auth: any }) {
    const { data, setData, post, delete: destroyFile, processing, reset } = useForm({
        project_id: project.id,
        file: null as File | null,
    });

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.file) return;
        post(route('freelancer.files.store'), {
            onSuccess: () => reset('file'),
        });
    };

    const handleDelete = (fileId: number) => {
        destroyFile(route('freelancer.files.destroy', fileId));
    };

    return (
        <div className="space-y-4">
            {auth.user.role === 'freelancer' && (
                <form onSubmit={handleUpload} className="flex gap-2 p-4 bg-muted/20 rounded-lg border border-dashed border-muted-foreground/30">
                    <Input 
                        type="file" 
                        onChange={(e) => setData('file', e.target.files?.[0] || null)}
                        disabled={processing}
                    />
                    <Button type="submit" disabled={processing || !data.file}>
                        <Upload className="mr-2 h-4 w-4" /> Upload
                    </Button>
                </form>
            )}

            <div className="space-y-2">
                {files.map((file: any) => (
                    <div key={file.id} className="flex items-center justify-between p-3 border rounded-lg bg-card">
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <p className="text-sm font-medium">{file.file_name}</p>
                                <p className="text-[10px] text-muted-foreground">{(file.file_size / 1024).toFixed(2)} KB</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <a href={route('files.download', file.id)}>
                                    <Download className="h-4 w-4" />
                                </a>
                            </Button>
                            {auth.user.role === 'freelancer' && (
                                <ConfirmDialog
                                    trigger={
                                        <Button variant="ghost" size="icon" className="text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    }
                                    title="Delete File"
                                    description={`Are you sure you want to delete "${file.file_name}"?`}
                                    confirmText="Delete File"
                                    variant="destructive"
                                    onConfirm={() => handleDelete(file.id)}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
