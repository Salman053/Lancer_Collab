// layouts/auth-layout.tsx
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Briefcase, Sparkles, Shield, Zap, Star } from 'lucide-react';
import { ReactNode } from 'react';

import { NoiseTexture } from '@/components/backgrounds/noise-texture';
import { ThemeToggle } from '@/components/theme-toggle';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    showBranding?: boolean;
}

export default function AuthLayout({
    children,
    title,
    description,
    showBranding = true
}: AuthLayoutProps) {
    return (
        <>
            <Head title={title} />

            <div className="absolute top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            <NoiseTexture />

            <div className="relative min-h-screen bg-background flex overflow-hidden">

                {/* LEFT SIDE - BRAND SECTION */}
                {showBranding && (
                    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>

                            {/* Animated geometric shapes */}
                            <div className="absolute top-20 -left-20 w-96 h-96 rounded-full border border-gray-200 dark:border-gray-700 opacity-20 animate-pulse"></div>
                            <div className="absolute bottom-20 -right-20 w-96 h-96 rounded-full border border-gray-200 dark:border-gray-700 opacity-20 animate-pulse animation-delay-2000"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gray-200 dark:border-gray-700 opacity-10 animate-spin-slow"></div>

                            {/* Decorative dots grid */}
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)',
                                backgroundSize: '24px 24px'
                            }}></div>
                        </div>

                        <div className="relative z-10 flex flex-col justify-between p-12 h-full w-full">
                            {/* Logo with animated underline */}
                            <div className="group">
                                <Link href={route("home")} className="inline-flex items-center gap-2.5 text-2xl font-bold tracking-tight">
                                    <div className="relative">
                                        <Sparkles className="h-3 w-3 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <span className="bg-gradient-to-r from-brand to-brand/70 bg-clip-text text-transparent">
                                        ProjectHub
                                    </span>
                                </Link>
                                <div className="h-0.5 w-0 group-hover:w-full bg-brand transition-all duration-500 mt-1"></div>
                            </div>

                            {/* Main Value Proposition */}
                            <div className="space-y-8">
                                {/* Animated badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    <span className="text-xs font-medium tracking-wide uppercase">Trusted by 500+ agencies</span>
                                </div>

                                {/* Hero quote */}
                                <blockquote className="space-y-6">
                                    <p className="text-3xl font-bold leading-tight tracking-tight">
                                        "The best platform we've used for managing client projects. Saves us hours every week."
                                    </p>
                                    <footer className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center">
                                                <span className="font-semibold text-lg">JD</span>
                                            </div>
                                            <div>
                                                <p className="font-semibold">John Doe</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">CEO, TechStart Inc</p>
                                            </div>
                                        </div>

                                        {/* Rating stars with animation */}
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 fill-current text-amber-400"
                                                    strokeWidth={0}
                                                />
                                            ))}
                                        </div>
                                    </footer>
                                </blockquote>
                            </div>

                            {/* Feature List with icons */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 group cursor-default">
                                    <div className="p-1.5 rounded-lg bg-brand/10 group-hover:scale-110 transition-transform duration-200 text-brand">
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">14-day free trial, no credit card required</span>
                                </div>
                                <div className="flex items-center gap-3 group cursor-default">
                                    <div className="p-1.5 rounded-lg bg-brand/10 group-hover:scale-110 transition-transform duration-200 text-brand">
                                        <Shield className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">Cancel anytime, no questions asked</span>
                                </div>
                                <div className="flex items-center gap-3 group cursor-default">
                                    <div className="p-1.5 rounded-lg bg-brand/10 group-hover:scale-110 transition-transform duration-200 text-brand">
                                        <Zap className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">Priority support for all plans</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* RIGHT SIDE - FORM SECTION */}
                <div className={`flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 ${showBranding ? '' : 'lg:mx-auto lg:max-w-md'}`}>
                    <div className="w-full max-w-md">
                        {/* Mobile Logo */}
                        {showBranding && (
                            <div className="flex justify-center lg:hidden mb-10">
                                <Link href={route("home")} className="flex items-center gap-2">
                                    <span className="text-2xl font-bold tracking-tight">
                                        ProjectHub
                                    </span>
                                </Link>
                            </div>
                        )}

                        {/* Header with animated underline */}
                        <div className="text-center mb-10">
                            <div className="inline-block mb-4">
                                <div className="px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-medium tracking-wide">
                                    Welcome
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight mb-3">
                                {title}
                            </h1>
                            <div className="h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-brand to-transparent"></div>
                            <p className="text-gray-600 dark:text-gray-400 mt-4">
                                {description}
                            </p>
                        </div>

                        {/* Form Content */}
                        <div className="animate-fade-in-up">
                            {children}
                        </div>

                        {/* Social Proof with hover effects */}
                        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-800">
                            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                                Trusted by industry leaders
                            </p>
                            <div className="flex justify-center gap-8 opacity-60">
                                {['ACME', 'TechCorp', 'GlobalSoft', 'InnovateLabs'].map((company, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs font-semibold text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 cursor-default"
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
                
                /* Smooth transitions */
                * {
                    transition-property: opacity, transform, background-color, border-color;
                    transition-duration: 200ms;
                    transition-timing-function: ease-out;
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
                    background: #475569;
                }
                
                .dark ::-webkit-scrollbar-thumb:hover {
                    background: #64748b;
                }
            `}</style>
        </>
    );
}