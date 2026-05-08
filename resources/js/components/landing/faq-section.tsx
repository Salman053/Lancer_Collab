import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
    {
        question: 'How do Magic Tokens work for client onboarding?',
        answer: 'When you create a new client, our system generates a unique, one-time-use secure link (Magic Token). The client can click this link to instantly access their portal without needing to remember a password. They can later set a password if they choose, but the onboarding process is friction-free.',
    },
    {
        question: 'Is my client data isolated and secure?',
        answer: 'Yes. LancerCollab uses a multi-tenant architecture at the application level. Clients can only see projects specifically assigned to them, and freelancers can only see their own clients. All data is encrypted and backed by immutable audit logs.',
    },
    {
        question: 'Can I use my own domain for the client portal?',
        answer: 'White-labeling and custom domain support are currently in Beta for our Agency and Enterprise plans. We expect a full rollout in the coming quarter.',
    },
    {
        question: 'What payment methods do you support?',
        answer: 'Currently, we allow you to manually track payments against project budgets. We are in the process of integrating Stripe and PayPal for automated invoice collection and payment processing.',
    },
    {
        question: 'Is there a limit to how many files I can upload?',
        answer: 'Individual file size limits are 50MB by default. Total storage depends on your plan, starting at 10GB for Professional and 100GB for Agency. Enterprise plans have customizable storage options.',
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="bg-muted/30 py-24 dark:bg-slate-900/50">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-brand mb-4 text-base font-bold tracking-[0.2em] uppercase">Common Questions</h2>
                    <p className="text-foreground text-3xl font-bold tracking-tight uppercase sm:text-4xl">
                        Frequently asked <span className="text-brand">questions</span>.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border-border bg-card rounded-xl border">
                            <button
                                className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-foreground/90 text-lg font-bold tracking-tight uppercase">{faq.question}</span>
                                {openIndex === index ? <Minus className="text-brand h-5 w-5" /> : <Plus className="text-brand h-5 w-5" />}
                            </button>
                            {openIndex === index && (
                                <div className="text-muted-foreground animate-in fade-in slide-in-from-top-2 px-6 pb-6 leading-relaxed duration-300">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
