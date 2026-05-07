// components/client/client-notes.tsx
import { Client } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Note } from '@/components/note';
import { FileText, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClientNotesProps {
    client: Client;
    onEdit?: () => void;
    onNoteUpdate?: () => void;
}

export function ClientNotes({ client, onEdit, onNoteUpdate }: ClientNotesProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
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
                    <Note>
                        {client.notes}
                    </Note>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No notes yet</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}