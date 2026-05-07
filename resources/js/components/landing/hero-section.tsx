import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Lock,
  Layers
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Auth } from '@/types';
import { NoiseTexture } from '../backgrounds/noise-texture';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';
import DashboardButton from '../dashboard-button';
import { Separator } from '../ui/separator';
import { cn } from '@/lib/utils';

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
    <div className="relative bg-background min-h-screen overflow-hidden">
      <NoiseTexture />
      
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 dark:opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/30 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Navigation */}
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 bg-transparent transition-all duration-300 px-6 py-4",
        isScrolled ? "py-3" : "py-6"
      )}>
        <nav className={cn(
          "max-w-5xl mx-auto px-6 py-2 rounded-full border transition-all duration-300 flex items-center justify-between",
          isScrolled 
            ? "bg-background/80 backdrop-blur-sm shadow-lg border-border" 
            : "bg-transparent border-transparent"
        )}>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-lg shadow-brand/20 group-hover:scale-110 transition-transform">
                <Layers className="size-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">LaraCollab</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Pricing', 'Testimonials', 'FAQ'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-muted-foreground hover:text-brand transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <AnimatedThemeToggler variant='circle' />
            {auth.user ? (
              <DashboardButton auth={auth} />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="hidden sm:block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-brand px-6 py-2 text-sm font-bold text-brand-foreground hover:bg-brand/90 transition-all shadow-md hover:shadow-brand/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 pt-32 lg:pt-48 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 text-xs font-semibold text-brand mb-8 animate-fade-in">
              <Zap className="size-3 fill-current" />
              <span>Trusted by 500+ global agencies</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.05]">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-indigo-500">Client Relations</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg">
              The all-in-one portal for modern agencies to manage projects, track milestones, and automate payments with absolute transparency.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-brand text-brand-foreground rounded-2xl shadow-xl shadow-brand/20 hover:bg-brand/90 transition-all hover:-translate-y-1 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold border border-border bg-background text-foreground rounded-2xl hover:bg-muted transition-all hover:-translate-y-1">
                Watch Demo
              </button>
            </div>

            <div className="mt-12 flex items-center gap-8 text-muted-foreground/60">
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
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Main Preview Card */}
            <div className="relative w-full max-w-[540px] rounded-3xl border border-border bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden animate-float">
              <div className="border-b border-border px-6 py-4 bg-muted/20 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400/50"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400/50"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400/50"></div>
                </div>
                <div className="h-4 w-32 bg-muted rounded-full animate-pulse"></div>
                <div className="w-10"></div>
              </div>
              
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 rounded-2xl bg-brand/5 border border-brand/10 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand">Monthly Revenue</p>
                    <p className="text-3xl font-black text-foreground">$48,250</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">Active Tasks</p>
                    <p className="text-3xl font-black text-foreground">124</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 group hover:bg-muted/50 transition-colors">
                    <div className="size-12 rounded-xl bg-brand/20 flex items-center justify-center text-brand font-bold text-xl">P</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Platform Redesign</p>
                      <div className="mt-2 h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-brand w-[75%] transition-all duration-1000"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50 group hover:bg-muted/50 transition-colors">
                    <div className="size-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-500 font-bold text-xl">M</div>
                    <div className="flex-1">
                      <p className="text-sm font-bold">Mobile App V2</p>
                      <div className="mt-2 h-1.5 w-full bg-background rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-[45%] transition-all duration-1000"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-4 size-24 bg-brand/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-4 size-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>
        </div>

        {/* Trusted By / Logos */}
        <div className="mt-24 pt-12 border-t border-border/50">
          <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-10">Integration Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
            {['STRIPE', 'SLACK', 'NOTION', 'FIGMA', 'LINEAR'].map((logo) => (
              <span key={logo} className="text-2xl font-black tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;