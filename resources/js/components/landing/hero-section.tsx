import { cn } from '@/lib/utils';
import { Auth } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowRight, Globe, Layers, Lock, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NoiseTexture } from '../backgrounds/noise-texture';
import DashboardButton from '../dashboard-button';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';

const HeroSection = () => {
    const { auth } = usePage<{ auth: Auth }>().props;
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-background relative min-h-screen overflow-hidden">
            <NoiseTexture />

            {/* Animated Background Blobs */}
            <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-30 dark:opacity-20">
                <div className="bg-brand/30 animate-blob absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full blur-[120px]"></div>
                <div className="animate-blob animation-delay-2000 absolute right-[-10%] bottom-[-10%] h-[50%] w-[50%] rounded-full bg-blue-400/20 blur-[120px]"></div>
                <div className="animate-blob animation-delay-4000 absolute top-[20%] right-[10%] h-[30%] w-[30%] rounded-full bg-indigo-500/20 blur-[100px]"></div>
            </div>

            {/* Floating Navigation */}
            <header className={cn('fixed inset-x-0 top-0 z-50 bg-transparent px-6 py-4 transition-all duration-300', isScrolled ? 'py-3' : 'py-6')}>
                <nav
                    className={cn(
                        'mx-auto flex max-w-5xl items-center justify-between rounded-full border px-6 py-2 transition-all duration-300',
                        isScrolled ? 'bg-background/80 border-border shadow-lg backdrop-blur-sm' : 'border-transparent bg-transparent',
                    )}
                >
                    <div className="group flex cursor-pointer items-center gap-2">
<div className="bg-brand text-brand-foreground shadow-brand/20 flex aspect-square rounded-full size-9 items-center justify-center overflow-hidden shadow-lg transition-all duration-300 group-hover:shadow-[0_0_15px_5px_rgba(var(--brand-color),0.5)]">                           <img src="/logo.png" alt="LancerCollab Logo" className="w-full h-full object-cover scale-105 aspect-square" />
                        </div>
                        <span className="text-foreground text-lg font-bold tracking-tight">LancerCollab</span>
                    </div>

                    <div className="hidden items-center gap-8 md:flex">
                        {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-muted-foreground hover:text-brand group relative text-sm font-medium transition-colors"
                            >
                                {item}
                                <span className="bg-brand absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <AnimatedThemeToggler />
                        {auth.user ? (
                            <DashboardButton auth={auth} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/login"
                                    className="text-muted-foreground hover:text-foreground hidden px-4 py-2 text-sm font-medium transition-colors sm:block"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-brand text-brand-foreground hover:bg-brand/90 hover:shadow-brand/20 rounded-full px-6 py-2 text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8 lg:pt-48">
                <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24">
                    {/* Left Column */}
                    <div className="relative z-10">
                        <div className="border-brand/20 bg-brand/5 text-brand animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold">
                            <Zap className="size-3 fill-current" />
                            <span>Trusted by 500+ global agencies</span>
                        </div>

                        <h1 className="text-foreground mb-8 text-5xl leading-[1.05] font-extrabold tracking-tight lg:text-7xl">
                            Elevate Your <br />
                            <span className="from-brand bg-gradient-to-r to-indigo-500 bg-clip-text text-transparent">Client Relations</span>
                        </h1>

                        <p className="text-muted-foreground mb-10 max-w-lg text-xl leading-relaxed">
                            The all-in-one portal for modern agencies to manage projects, track milestones, and automate payments with absolute
                            transparency.
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/register"
                                className="bg-brand text-brand-foreground shadow-brand/20 hover:bg-brand/90 group inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-bold shadow-xl transition-all hover:-translate-y-1"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <button className="border-border bg-background text-foreground hover:bg-muted inline-flex items-center justify-center rounded-2xl border px-8 py-4 text-base font-bold transition-all hover:-translate-y-1">
                                Watch Demo
                            </button>
                        </div>

                        <div className="text-muted-foreground/60 mt-12 flex items-center gap-8">
                            <div className="flex items-center gap-2">
                                <Lock className="size-4" />
                                <span className="text-sm font-medium">Bank-grade Security</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="size-4" />
                                <span className="text-sm font-medium">Global Infrastructure</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Dashboard Preview */}
                    <div className="relative flex items-center justify-center lg:h-[600px]">
                        {/* Main Preview Card */}
                        <div className="border-border bg-card/50 animate-float relative w-full max-w-[540px] overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-xl">
                            <div className="border-border bg-muted/20 flex items-center justify-between border-b px-6 py-4">
                                <div className="flex gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-400/50"></div>
                                    <div className="h-3 w-3 rounded-full bg-yellow-400/50"></div>
                                    <div className="h-3 w-3 rounded-full bg-green-400/50"></div>
                                </div>
                                <div className="bg-muted h-4 w-32 animate-pulse rounded-full"></div>
                                <div className="w-10"></div>
                            </div>

                            <div className="space-y-8 p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-brand/5 border-brand/10 space-y-1 rounded-2xl border p-4">
                                        <p className="text-brand text-[10px] font-bold tracking-widest uppercase">Monthly Revenue</p>
                                        <p className="text-foreground text-3xl font-black">$48,250</p>
                                    </div>
                                    <div className="space-y-1 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4">
                                        <p className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">Active Tasks</p>
                                        <p className="text-foreground text-3xl font-black">124</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-muted/30 border-border/50 group hover:bg-muted/50 flex items-center gap-4 rounded-2xl border p-4 transition-colors">
                                        <div className="bg-brand/20 text-brand flex size-12 items-center justify-center rounded-xl text-xl font-bold">
                                            P
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold">Platform Redesign</p>
                                            <div className="bg-background mt-2 h-1.5 w-full overflow-hidden rounded-full">
                                                <div className="bg-brand h-full w-[75%] transition-all duration-1000"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-muted/30 border-border/50 group hover:bg-muted/50 flex items-center gap-4 rounded-2xl border p-4 transition-colors">
                                        <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-500/20 text-xl font-bold text-indigo-500">
                                            M
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold">Mobile App V2</p>
                                            <div className="bg-background mt-2 h-1.5 w-full overflow-hidden rounded-full">
                                                <div className="h-full w-[45%] bg-indigo-500 transition-all duration-1000"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="bg-brand/20 absolute -top-10 -right-4 size-24 animate-pulse rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-4 size-32 animate-pulse rounded-full bg-indigo-500/20 blur-3xl delay-700"></div>
                    </div>
                </div>

                {/* Trusted By / Logos */}
                <div className="border-border/50 mt-24 border-t pt-12">
                    <p className="text-muted-foreground/60 mb-10 text-center text-xs font-bold tracking-[0.3em] uppercase">Integration Partners</p>
                    <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8 opacity-30 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0">
                        {['STRIPE', 'SLACK', 'NOTION', 'FIGMA', 'LINEAR'].map((logo) => (
                            <span key={logo} className="text-2xl font-black tracking-tighter">
                                {logo}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
