import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, CheckCircle2 } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post: postResend, processing: resending } = useForm({});
    const { data, setData, post: postVerify, processing: verifying, errors } = useForm({
        otp: '',
    });

    const handleResend: FormEventHandler = (e) => {
        e.preventDefault();
        postResend(route('verification.send'));
    };

    const handleVerify: FormEventHandler = (e) => {
        e.preventDefault();
        postVerify(route('verification.otp'));
    };

    return (
        <AuthLayout title="Verify your email" description="Enter the 6-digit code we sent to your email to verify your account.">
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-600 border border-emerald-100 dark:bg-emerald-900/10 dark:border-emerald-900/20">
                    <CheckCircle2 className="h-4 w-4" />
                    A new OTP code has been sent to your email.
                </div>
            )}

            <div className="space-y-8">
                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="otp" className="text-center block text-sm font-bold uppercase tracking-widest text-muted-foreground">Verification Code</Label>
                        <Input
                            id="otp"
                            type="text"
                            value={data.otp}
                            onChange={(e) => setData('otp', e.target.value)}
                            className="h-14 text-center text-3xl font-black tracking-[1em] focus-visible:ring-primary"
                            placeholder="000000"
                            maxLength={6}
                            autoFocus
                        />
                        {errors.otp && <p className="text-destructive text-center text-sm font-medium">{errors.otp}</p>}
                    </div>

                    <Button disabled={verifying} className="w-full h-11 text-base font-bold shadow-lg shadow-primary/20">
                        {verifying && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Verify Account
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Didn't receive code?</span></div>
                </div>

                <form onSubmit={handleResend} className="flex flex-col items-center gap-4">
                    <Button disabled={resending} variant="ghost" className="text-sm font-semibold hover:bg-primary/5">
                        {resending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                        Resend Code
                    </Button>

                    <TextLink href={route('logout')} method="post" className="text-sm font-medium opacity-60 hover:opacity-100 transition-opacity">
                        Log out and try again
                    </TextLink>
                </form>
            </div>
        </AuthLayout>
    );
}
