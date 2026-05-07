import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
    {
        question: "How do Magic Tokens work for client onboarding?",
        answer: "When you create a new client, our system generates a unique, one-time-use secure link (Magic Token). The client can click this link to instantly access their portal without needing to remember a password. They can later set a password if they choose, but the onboarding process is friction-free."
    },
    {
        question: "Is my client data isolated and secure?",
        answer: "Yes. LaraCollab uses a multi-tenant architecture at the application level. Clients can only see projects specifically assigned to them, and freelancers can only see their own clients. All data is encrypted and backed by immutable audit logs."
    },
    {
        question: "Can I use my own domain for the client portal?",
        answer: "White-labeling and custom domain support are currently in Beta for our Agency and Enterprise plans. We expect a full rollout in the coming quarter."
    },
    {
        question: "What payment methods do you support?",
        answer: "Currently, we allow you to manually track payments against project budgets. We are in the process of integrating Stripe and PayPal for automated invoice collection and payment processing."
    },
    {
        question: "Is there a limit to how many files I can upload?",
        answer: "Individual file size limits are 50MB by default. Total storage depends on your plan, starting at 10GB for Professional and 100GB for Agency. Enterprise plans have customizable storage options."
    }
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 bg-muted/30 dark:bg-slate-900/50">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base font-bold text-brand uppercase tracking-[0.2em] mb-4">Common Questions</h2>
                    <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">
                        Frequently asked <span className="text-brand">questions</span>.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border rounded-xl border-border bg-card">
                            <button
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-bold uppercase tracking-tight text-foreground/90">
                                    {faq.question}
                                </span>
                                {openIndex === index ? (
                                    <Minus className="h-5 w-5 text-brand" />
                                ) : (
                                    <Plus className="h-5 w-5 text-brand" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-6 text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
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
