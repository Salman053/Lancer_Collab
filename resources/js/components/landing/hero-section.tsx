import React from 'react';
import {
  ArrowRight,
  CheckCircle,
  Briefcase,
  Clock,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Auth } from '@/types';
import { NoiseTexture } from '../backgrounds/noise-texture';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';

const HeroSection = () => {
  const { auth } = usePage<{ auth: Auth }>().props;

  return (
    <div className="relative bg-white min-h-screen  dark:bg-gray-900">
      <NoiseTexture />
      {/* Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-br from-brand/5 to-brand/10 dark:from-brand/10 dark:to-brand/5"></div>

      <div className="relative mx-auto max-w-7xl ">
        {/* Navigation */}
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">

            <span className="text-xl font-bold text-gray-900 dark:text-white">ProjectHub</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">Testimonials</a>
            <a href="#faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-3">
            <AnimatedThemeToggler />
            {auth.user ? (
              <Link
                href="/dashboard"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:bg-brand/90 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center rounded-full bg-brand/10 dark:bg-brand/20 px-3 py-1 text-sm font-medium text-brand">
                <span className="mr-1">✨</span>
                Trusted by 500+ agencies
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Streamline Your
                <span className="block text-brand">Project Workflow</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                A complete solution for managing clients, projects, milestones, and payments.
                Everything your team needs to deliver exceptional results.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-base font-semibold text-brand-foreground shadow-sm hover:bg-brand/90 transition-all duration-200"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <button className="inline-flex items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200">
                  Watch Demo
                </button>
              </div>

              {/* Feature List */}
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">14-day free trial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Priority support</span>
                </div>
              </div> */}
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-background/30 dark:bg-gray-950/30 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="h-5 w-5 text-brand" />
                    <span className="text-xs font-medium text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded">+24%</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">$124.5K</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                </div>
                <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-background/30 dark:bg-gray-950/30 p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="h-5 w-5 text-brand" />
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-950/30 px-2 py-0.5 rounded">12 active</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">32</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Active Projects</p>
                </div>
              </div>

              {/* Main Dashboard Card */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-background/30 dark:bg-gray-950/30 shadow-lg overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Projects</p>
                    <div className="w-14"></div>
                  </div>
                </div>
                <div className="p-6">
                  {/* Project Item 1 */}
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Website Redesign</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Acme Corp</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">$12,500</p>
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-1.5 w-3/4 rounded-full bg-brand"></div>
                      </div>
                    </div>
                  </div>

                  {/* Project Item 2 */}
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Mobile App Development</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">TechStart Inc</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">$28,000</p>
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-1.5 w-1/2 rounded-full bg-brand"></div>
                      </div>
                    </div>
                  </div>

                  {/* Project Item 3 */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">E-commerce Platform</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Retail Solutions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">$45,000</p>
                      <div className="mt-1 h-1.5 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                        <div className="h-1.5 w-2/3 rounded-full bg-brand"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span>GDPR Compliant</span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-700"></span>
                <span>256-bit SSL</span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-700"></span>
                <span>PCI DSS Level 1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 py-8 mt-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">Trusted by teams from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            <span className="text-gray-400 dark:text-gray-600 text-lg font-semibold">ACME</span>
            <span className="text-gray-400 dark:text-gray-600 text-lg font-semibold">TechCorp</span>
            <span className="text-gray-400 dark:text-gray-600 text-lg font-semibold">GlobalSoft</span>
            <span className="text-gray-400 dark:text-gray-600 text-lg font-semibold">InnovateLabs</span>
            <span className="text-gray-400 dark:text-gray-600 text-lg font-semibold">FutureSys</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;