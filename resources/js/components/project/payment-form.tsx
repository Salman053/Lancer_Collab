import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Project } from '@/types';
import { useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

interface PaymentFormProps {
    project: Project;
    onSuccess: () => void;
}

export default function PaymentForm({ project, onSuccess }: PaymentFormProps) {
    const { data, setData, post, processing, errors } = useForm({
        project_id: project.id,
        milestone_id: '',
        amount: '',
        method: 'bank_transfer',
        status: 'completed',
        transaction_id: '',
        notes: '',
        paid_at: new Date().toISOString().split('T')[0],
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('freelancer.payments.store'), {
            onSuccess: () => onSuccess(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="amount">Amount ({project.currency})</Label>
                <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                    placeholder="0.00"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="method">Payment Method</Label>
                    <Select value={data.method} onValueChange={(v) => setData('method', v)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="stripe">Stripe</SelectItem>
                            <SelectItem value="cash">Cash</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="paid_at">Date</Label>
                    <Input id="paid_at" type="date" value={data.paid_at} className="block" onChange={(e) => setData('paid_at', e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="transaction_id">Transaction ID</Label>
                <Input
                    id="transaction_id"
                    value={data.transaction_id}
                    onChange={(e) => setData('transaction_id', e.target.value)}
                    placeholder="e.g. TXN-12345"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={data.notes} onChange={(e) => setData('notes', e.target.value)} rows={2} />
            </div>

            <DialogFooter>
                <Button type="submit" disabled={processing}>
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Record Payment
                </Button>
            </DialogFooter>
        </form>
    );
}
