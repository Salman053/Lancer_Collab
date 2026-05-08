import { BarChart3, CreditCard, Layers, MessageSquare, ShieldCheck, Users } from 'lucide-react';

const features = [
    {
        name: 'Client Management',
        description:
            'Comprehensive CRM designed specifically for agencies. Track leads, active clients, and historical partnerships in one elegant interface.',
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
        <section id="features" className="bg-background relative overflow-hidden py-24">
            {/* Subtle background decoration */}
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mb-20 max-w-3xl text-center">
                    <h2 className="text-primary mb-4 text-sm font-bold tracking-[0.3em] uppercase">Core Capabilities</h2>
                    <p className="text-foreground mb-6 text-4xl font-extrabold tracking-tight uppercase italic md:text-5xl">
                        Deliver &nbsp; <span className="text-primary not-italic"> exceptional</span> client experiences.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        LancerCollab automates the administrative overhead of client collaboration, allowing your team to focus on high-impact
                        deliverables.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            key={feature.name}
                            className="group border-border bg-card/50 hover:border-primary/50 hover:shadow-primary/5 relative rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
                        >
                            {/* Icon container with subtle glow on hover */}
                            <div className="bg-secondary group-hover:bg-brand group-hover:text-white mb-6 inline-flex items-center justify-center rounded-xl p-3 transition-colors duration-75">
                                <feature.icon className="h-6 w-6" aria-hidden="true" />
                            </div>

                            <h3 className="text-foreground group-hover:text-primary mb-3 text-lg font-bold tracking-wider uppercase transition-colors">
                                {feature.name}
                            </h3>

                            <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>

                            {/* Corner accent for a modern touch */}
                            <div className="absolute top-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                                <div className="bg-primary h-1 w-1 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
