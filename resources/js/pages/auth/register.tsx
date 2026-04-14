// pages/auth/register.tsx
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Mail, Lock } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    [key: string]: any;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout
            title="Create an account"
            description="Start managing your projects professionally"
        >
            <Head title="Register" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-5">
                    {/* Name Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Full name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="John Doe"
                                className="pl-10"
                            />
                        </div>
                        <InputError message={errors.name} />
                    </div>

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
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="john@example.com"
                                className="pl-10"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    {/* Password Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="password"
                                type="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Create a password"
                                className="pl-10"
                            />
                        </div>
                        <InputError message={errors.password} />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Must be at least 8 characters
                        </p>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                id="password_confirmation"
                                type="password"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm your password"
                                className="pl-10"
                            />
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>

                    {/* Terms Agreement */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        By creating an account, you agree to our{' '}
                        <a href="#" className="text-brand hover:underline">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-brand hover:underline">
                            Privacy Policy
                        </a>
                    </p>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="primary"
                        className="mt-2 w-full py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing ? (
                            <>
                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                Creating account...
                            </>
                        ) : (
                            'Create account'
                        )}
                    </Button>
                </div>

                {/* Login Link */}
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <TextLink
                        href={route('login')}
                        tabIndex={6}
                        className="font-medium"
                    >
                        Sign in instead
                    </TextLink>
                </div>
            </form>
        </AuthLayout>
    );
}