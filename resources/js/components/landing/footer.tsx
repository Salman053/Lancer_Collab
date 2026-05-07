import React from 'react';
import { Sparkles, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function LandingFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-t border-border py-16 px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
                
                {/* Brand Section - Wider Column */}
                <div className="md:col-span-4 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-brand text-white shadow-sm">
                            <Sparkles className="size-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">LaraCollab</span>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
                        The definitive client collaboration platform for modern agencies and high-performing freelancers. Professional. Secure. Transparent.
                    </p>
                    <div className="flex items-center gap-5 pt-2">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1"><Twitter className="h-5 w-5" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1"><Linkedin className="h-5 w-5" /></a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1"><Github className="h-5 w-5" /></a>
                    </div>
                </div>

                {/* Navigation Links - Grid spanning remaining space */}
                <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
                    {/* Product */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Product</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#features" className="hover:text-primary transition-colors">Features</Link></li>
                            <li><Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Company</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Press Kit</a></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">Compliance</h4>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Security Audit</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">GDPR Portal</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
                <p>&copy; {currentYear} LaraCollab SaaS. All rights reserved.</p>
                <div className="flex gap-6">
                    <span className="hover:text-primary transition-colors cursor-default">New York</span>
                    <span className="hover:text-primary transition-colors cursor-default">London</span>
                    <span className="hover:text-primary transition-colors cursor-default">Tokyo</span>
                </div>
            </div>
        </footer>
    );
}
