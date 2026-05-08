// layouts/auth-layout.tsx
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Shield, Sparkles, Star, Zap } from 'lucide-react';
import { ReactNode } from 'react';

import { NoiseTexture } from '@/components/backgrounds/noise-texture';
import AnimatedThemeToggler from '@/components/ui/animated-theme-toggler';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    showBranding?: boolean;
}

export default function AuthLayout({ children, title, description, showBranding = true }: AuthLayoutProps) {
    return (
        <>
            <Head title={title} />

            <div className="absolute top-6 right-6 z-50">
                <AnimatedThemeToggler />
            </div>

            <NoiseTexture />

            <div className="bg-background relative flex min-h-screen overflow-hidden">
                {/* LEFT SIDE - BRAND SECTION */}
                {showBranding && (
                    <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950"></div>

                            {/* Animated geometric shapes */}
                            <div className="absolute top-20 -left-20 h-96 w-96 animate-pulse rounded-full border border-neutral-200 opacity-20 dark:border-neutral-800"></div>
                            <div className="animation-delay-2000 absolute -right-20 bottom-20 h-96 w-96 animate-pulse rounded-full border border-neutral-200 opacity-20 dark:border-neutral-800"></div>
                            <div className="animate-spin-slow absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-200 opacity-10 dark:border-neutral-800"></div>

                            {/* Decorative dots grid */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
                                    backgroundSize: '24px 24px',
                                }}
                            ></div>
                        </div>

                        <div className="relative z-10 flex h-full w-full flex-col justify-between p-12">
                            {/* Logo with animated underline */}
                            <div className="group">
                                <Link href={route('home')} className="inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight">
                                    <div className="relative">
                                        <Sparkles className="text-brand absolute -top-1 -right-1 h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                    </div>
                                    <span className="from-brand to-brand/70 bg-gradient-to-r bg-clip-text text-transparent">LancerCollab</span>
                                </Link>
                                <div className="bg-brand mt-1 h-0.5 w-0 transition-all duration-500 group-hover:w-full"></div>
                            </div>

                            {/* Main Value Proposition */}
                            <div className="space-y-8">
                                {/* Animated badge */}
                                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/50 px-3 py-1.5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50">
                                    <Sparkles className="text-brand h-3.5 w-3.5" />
                                    <span className="text-xs font-medium tracking-wide uppercase">Trusted by 500+ agencies</span>
                                </div>

                                {/* Hero quote */}
                                <blockquote className="space-y-6">
                                    <p className="text-3xl leading-tight font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                                        "The best platform we've used for managing client projects. Saves us hours every week."
                                    </p>
                                    <footer className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-brand/10 flex h-12 w-12 items-center justify-center rounded-full">
                                                <span className="text-brand text-lg font-semibold">JD</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-neutral-900 dark:text-neutral-100">John Doe</p>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">CEO, TechStart Inc</p>
                                            </div>
                                        </div>

                                        {/* Rating stars with animation */}
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-5 w-5 fill-current text-amber-400" strokeWidth={0} />
                                            ))}
                                        </div>
                                    </footer>
                                </blockquote>
                            </div>

                            {/* Feature List with icons */}
                            <div className="space-y-4">
                                <div className="group flex cursor-default items-center gap-3">
                                    <div className="bg-brand/10 text-brand rounded-lg p-1.5 transition-transform duration-200 group-hover:scale-110">
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        14-day free trial, no credit card required
                                    </span>
                                </div>
                                <div className="group flex cursor-default items-center gap-3">
                                    <div className="bg-brand/10 text-brand rounded-lg p-1.5 transition-transform duration-200 group-hover:scale-110">
                                        <Shield className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                        Cancel anytime, no questions asked
                                    </span>
                                </div>
                                <div className="group flex cursor-default items-center gap-3">
                                    <div className="bg-brand/10 text-brand rounded-lg p-1.5 transition-transform duration-200 group-hover:scale-110">
                                        <Zap className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Priority support for all plans</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* RIGHT SIDE - FORM SECTION */}
                <div className={`flex flex-1 items-center justify-center p-6 sm:p-8 lg:p-12 ${showBranding ? '' : 'lg:mx-auto lg:max-w-md'}`}>
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        {showBranding && (
                            <div className="mb-10 flex justify-center lg:hidden">
                                <Link href={route('home')} className="flex items-center gap-2">
                                    <span className="text-brand text-2xl font-bold tracking-tight">LancerCollab</span>
                                </Link>
                            </div>
                        )}

                        {/* Header with animated underline */}
                        <div className="mb-10 text-center">
                            <div className="mb-4 inline-block">
                                <div className="bg-brand/10 text-brand rounded-full px-3 py-1 text-xs font-medium tracking-wide">Welcome</div>
                            </div>
                            <h1 className="mb-3 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h1>
                            <div className="via-brand mx-auto h-0.5 w-12 bg-gradient-to-r from-transparent to-transparent"></div>
                            <p className="mt-4 text-neutral-600 dark:text-neutral-400">{description}</p>
                        </div>

                        {/* Form Content */}
                        <div className="animate-fade-in-up">{children}</div>

                        {/* Social Proof with hover effects */}
                        <div className="mt-10 border-t border-neutral-200 pt-8 dark:border-neutral-800">
                            <p className="mb-4 text-center text-xs tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                                Trusted by industry leaders
                            </p>
                            <div className="flex justify-center gap-8 opacity-60">
                                {['ACME', 'TechCorp', 'GlobalSoft', 'InnovateLabs'].map((company, idx) => (
                                    <span
                                        key={idx}
                                        className="cursor-default text-xs font-semibold text-neutral-500 transition-colors duration-200 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
                                    >
                                        {company}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animation Styles */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                
                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-blob {
                    animation: blob 7s infinite;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.5s ease-out;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 4px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: #94a3b8;
                }
                
                .dark ::-webkit-scrollbar-thumb {
                    background: #262626;
                }
                
                .dark ::-webkit-scrollbar-thumb:hover {
                    background: #404040;
                }
            `}</style>
        </>
    );
}
