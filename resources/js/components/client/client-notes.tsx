// components/client/client-notes.tsx
import { Note } from '@/components/note';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/types';
import { FileText, Pencil } from 'lucide-react';

interface ClientNotesProps {
    client: Client;
    onEdit?: () => void;
    onNoteUpdate?: () => void;
}

export function ClientNotes({ client, onEdit }: ClientNotesProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                    <FileText className="text-muted-foreground h-5 w-5" />
                    <CardTitle className="text-lg">Notes</CardTitle>
                </div>
                {onEdit && (
                    <Button variant="ghost" size="icon" onClick={onEdit} title="Edit Notes">
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                {client.notes ? (
                    <Note>{client.notes}</Note>
                ) : (
                    <div className="text-muted-foreground py-8 text-center">
                        <FileText className="mx-auto mb-3 h-12 w-12 opacity-50" />
                        <p>No notes yet</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
