// pages/auth/login.tsx
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
    [key: string]: any;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout
            title="Welcome back"
            description="Enter your email and password to access your account"
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-center text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-5">
                    {/* Email Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="john@example.com"
                                className="pl-10"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    {/* Password Field */}
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={route('password.request')}
                                    className="text-sm font-medium"
                                    tabIndex={5}
                                >
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter your password"
                                className="pl-10"
                            />
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            tabIndex={3}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                            Remember me for 30 days
                        </Label>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-2 w-full py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                Signing in...
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </Button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <TextLink
                        href={route('register')}
                        tabIndex={6}
                        className="font-medium"
                    >
                        Create an account
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}