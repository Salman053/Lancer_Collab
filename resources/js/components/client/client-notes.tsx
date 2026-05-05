// components/client/client-notes.tsx
import { Client } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Note } from '@/components/note';
import { FileText } from 'lucide-react';

interface ClientNotesProps {
    client: Client;
    onNoteUpdate?: () => void;
}

export function ClientNotes({ client, onNoteUpdate }: ClientNotesProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Notes</CardTitle>
            </CardHeader>
            <CardContent>
                {client.notes ? (
                    <Note 
                    >
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