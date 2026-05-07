import React from 'react';
import { 
    Users, 
    Layers, 
    CreditCard, 
    MessageSquare, 
    ShieldCheck, 
    BarChart3 
} from 'lucide-react';

const features = [
    {
        name: 'Client Management',
        description: 'Comprehensive CRM designed specifically for agencies. Track leads, active clients, and historical partnerships in one elegant interface.',
        icon: Users,
    },
    {
        name: 'Milestone Tracking',
        description: 'Break complex projects into manageable deliverables. Real-time progress tracking ensures you never miss a deadline.',
        icon: Layers,
    },
    {
        name: 'Secure Payments',
        description: 'Integrated financial module to track project budgets, milestone completions, and payment history with automated alerts.',
        icon: CreditCard,
    },
    {
        name: 'Centralized Communication',
        description: 'Role-aware direct messaging and formal project updates replace fragmented email threads and Slack clutter.',
        icon: MessageSquare,
    },
    {
        name: 'Audit Transparency',
        description: 'Immutable records of all operations and timestamped client engagement logs for complete accountability.',
        icon: ShieldCheck,
    },
    {
        name: 'Advanced Analytics',
        description: 'Profitability analysis and client engagement scoring to help you make data-driven decisions for your agency.',
        icon: BarChart3,
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="relative py-24 bg-background overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">
                        Core Capabilities
                    </h2>
                    <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground uppercase italic mb-6">
                        Deliver <span className="text-primary not-italic">exceptional</span> client experiences.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        LaraCollab automates the administrative overhead of client collaboration, 
                        allowing your team to focus on high-impact deliverables.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div 
                            key={feature.name} 
                            className="group relative p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5"
                        >
                            {/* Icon container with subtle glow on hover */}
                            <div className="inline-flex items-center justify-center p-3 bg-secondary rounded-xl mb-6 group-hover:bg-brand group-hover:text-foreground transition-colors duration-75">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            
                            <h3 className="text-lg font-bold text-foreground uppercase tracking-wider mb-3 group-hover:text-primary transition-colors">
                                {feature.name}
                            </h3>
                            
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Corner accent for a modern touch */}
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="h-1 w-1 rounded-full bg-primary" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
