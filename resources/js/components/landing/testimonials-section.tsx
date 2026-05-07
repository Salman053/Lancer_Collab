import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
    {
        content: "LaraCollab transformed our agency's client onboarding. What used to take days now happens in minutes with Magic Tokens and automated portals.",
        author: "Sarah Jenkins",
        role: "CEO, Pixel & Grain Agency",
        image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        content: "The level of transparency we can provide to our high-level executives through the milestone tracking and financial summaries is unparalleled.",
        author: "Mark Sterling",
        role: "Head of Operations, Global Strategy",
        image: "https://i.pravatar.cc/150?u=mark"
    },
    {
        content: "We've seen a 40% reduction in 'status update' emails since switching to LaraCollab. The project update feature is a game-changer for focus.",
        author: "Elena Rodriguez",
        role: "Creative Director, Studio Flux",
        image: "https://i.pravatar.cc/150?u=elena"
    }
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 bg-muted/30 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-base font-bold text-brand uppercase tracking-[0.2em] mb-4">Social Proof</h2>
                    <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl uppercase">
                        Trusted by <span className="text-brand">industry leaders</span> worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="flex flex-col bg-card p-10 border rounded-xl group border-border shadow-sm relative">
                            <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10 group-hover:rotate-12 animate-pulse duration-500 group-hover:text-brand" />
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-brand text-brand" />
                                ))}
                            </div>
                            <p className="text-lg italic text-foreground/80 mb-8 flex-grow leading-relaxed">
                                "{testimonial.content}"
                            </p>
                            <div className="flex items-center gap-4 border-t border-border pt-6">
                                <img 
                                    src={testimonial.image} 
                                    alt={testimonial.author} 
                                    className="h-12 w-12 rounded-full border-2 border-primary/20"
                                />
                                <div>
                                    <h4 className="font-bold text-foreground uppercase text-sm tracking-wide">{testimonial.author}</h4>
                                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
