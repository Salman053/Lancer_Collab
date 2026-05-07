import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const tiers = [
    {
        name: 'Professional',
        price: '49',
        description: 'Ideal for solo freelancers and small boutique agencies.',
        features: [
            'Up to 10 active projects',
            'Unlimited clients',
            'Milestone tracking',
            'Basic financial tracking',
            'Email support',
        ],
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
        <section id="pricing" className="py-24 bg-white dark:bg-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base font-bold text-brand uppercase tracking-[0.2em] mb-4">Pricing Plans</h2>
                    <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">
                        Transparent pricing for <span className="text-brand">every growth stage</span>.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {tiers.map((tier) => (
                        <div 
                            key={tier.name} 
                            className={`flex flex-col p-8 border rounded-xl ${tier.mostPopular ? 'border-brand border-2 shadow-xl relative' : 'border-border'} bg-card`}
                        >
                            {tier.mostPopular && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1">
                                    Most Popular
                                </span>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-primary">{tier.price === 'Custom' ? '' : '$'}</span>
                                    <span className="text-5xl font-bold text-primary">{tier.price}</span>
                                    {tier.price !== 'Custom' && <span className="text-muted-foreground">/mo</span>}
                                </div>
                                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                                    {tier.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-grow">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm">
                                        <Check className="h-5 w-5 text-brand shrink-0" />
                                        <span className="text-foreground/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={tier.price === 'Custom' ? '/contact' : '/register'}
                                className={`inline-flex items-center justify-center px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                                    tier.mostPopular 
                                        ? 'bg-brand text-white hover:bg-primary/90' 
                                        : 'bg-secondary text-primary hover:bg-secondary/80 border border-primary/20'
                                }`}
                            >
                                {tier.cta}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="text-muted-foreground text-sm">
                        All plans include a 14-day free trial. No credit card required to start.
                    </p>
                </div>
            </div>
        </section>
    );
}
