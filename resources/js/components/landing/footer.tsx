import { Link } from '@inertiajs/react';
import { Github, Linkedin, Sparkles, Twitter } from 'lucide-react';

export default function LandingFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background border-border border-t px-6 py-16 lg:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
                {/* Brand Section - Wider Column */}
                <div className="space-y-6 md:col-span-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-brand flex aspect-square size-10 items-center justify-center rounded-xl text-white shadow-sm">
                            <Sparkles className="size-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">LaraCollab</span>
                    </div>
                    <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                        The definitive client collaboration platform for modern agencies and high-performing freelancers. Professional. Secure.
                        Transparent.
                    </p>
                    <div className="flex items-center gap-5 pt-2">
                        <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-muted-foreground hover:text-primary transition-all hover:-translate-y-1">
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </div>

                {/* Navigation Links - Grid spanning remaining space */}
                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
                    {/* Product */}
                    <div className="space-y-4">
                        <h4 className="text-foreground text-xs font-semibold tracking-widest uppercase">Product</h4>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                            <li>
                                <Link href="#features" className="hover:text-primary transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="hover:text-primary transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    API Docs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Changelog
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h4 className="text-foreground text-xs font-semibold tracking-widest uppercase">Company</h4>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Press Kit
                                </a>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h4 className="text-foreground text-xs font-semibold tracking-widest uppercase">Compliance</h4>
                        <ul className="text-muted-foreground space-y-3 text-sm">
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    Security Audit
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-primary transition-colors">
                                    GDPR Portal
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-border text-muted-foreground/60 mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t pt-8 text-[11px] font-medium tracking-wider uppercase md:flex-row">
                <p>&copy; {currentYear} LaraCollab SaaS. All rights reserved.</p>
                <div className="flex gap-6">
                    <span className="hover:text-primary cursor-default transition-colors">New York</span>
                    <span className="hover:text-primary cursor-default transition-colors">London</span>
                    <span className="hover:text-primary cursor-default transition-colors">Tokyo</span>
                </div>
            </div>
        </footer>
    );
}
