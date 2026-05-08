import { Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';

const tiers = [
    {
        name: 'Professional',
        price: '49',
        description: 'Ideal for solo freelancers and small boutique agencies.',
        features: ['Up to 10 active projects', 'Unlimited clients', 'Milestone tracking', 'Basic financial tracking', 'Email support'],
        cta: 'Start Free Trial',
        mostPopular: false,
    },
    {
        name: 'Agency',
        price: '99',
        description: 'Perfect for growing teams requiring advanced collaboration.',
        features: [
            'Unlimited active projects',
            'Unlimited clients',
            'White-label portal (Beta)',
            'Advanced financial analytics',
            'Priority support',
            'Magic Link onboarding',
        ],
        cta: 'Start Free Trial',
        mostPopular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Dedicated infrastructure and support for large organizations.',
        features: [
            'SLA-backed uptime',
            'Custom integrations',
            'Dedicated success manager',
            'SSO & SAML support',
            'In-house training',
            'Custom data retention',
        ],
        cta: 'Contact Sales',
        mostPopular: false,
    },
];

export default function PricingSection() {
    return (
        <section id="pricing" className="bg-white py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-brand mb-4 text-base font-bold tracking-[0.2em] uppercase">Pricing Plans</h2>
                    <p className="text-foreground text-3xl font-bold tracking-tight uppercase sm:text-4xl">
                        Transparent pricing for <span className="text-brand">every growth stage</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
                    {tiers.map((tier) => (
                        <div
                            key={tier.name}
                            className={`flex flex-col rounded-xl border p-8 ${tier.mostPopular ? 'border-brand relative border-2 shadow-xl' : 'border-border'} bg-card`}
                        >
                            {tier.mostPopular && (
                                <span className="bg-brand absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 text-[10px] font-bold tracking-widest text-white uppercase">
                                    Most Popular
                                </span>
                            )}
                            <div className="mb-8">
                                <h3 className="mb-2 text-xl font-bold tracking-wider uppercase">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-primary text-4xl font-bold">{tier.price === 'Custom' ? '' : '$'}</span>
                                    <span className="text-primary text-5xl font-bold">{tier.price}</span>
                                    {tier.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                                </div>
                                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{tier.description}</p>
                            </div>

                            <ul className="mb-10 flex-grow space-y-4">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <Check className="text-brand h-5 w-5 shrink-0" />
                                        <span className="text-foreground/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={tier.price === 'Custom' ? '/contact' : '/register'}
                                className={`inline-flex items-center justify-center px-6 py-4 text-sm font-bold tracking-widest uppercase transition-all ${
                                    tier.mostPopular
                                        ? 'bg-brand hover:bg-primary/90 text-white'
                                        : 'bg-secondary text-primary hover:bg-secondary/80 border-primary/20 border'
                                }`}
                            >
                                {tier.cta}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground text-sm">All plans include a 14-day free trial. No credit card required to start.</p>
                </div>
            </div>
        </section>
    );
}
