import { Quote, Star } from 'lucide-react';

const testimonials = [
    {
        content:
            "LancerCollab transformed our agency's client onboarding. What used to take days now happens in minutes with Magic Tokens and automated portals.",
        author: 'Sarah Jenkins',
        role: 'CEO, Pixel & Grain Agency',
        image: 'https://i.pravatar.cc/150?u=sarah',
    },
    {
        content:
            'The level of transparency we can provide to our high-level executives through the milestone tracking and financial summaries is unparalleled.',
        author: 'Mark Sterling',
        role: 'Head of Operations, Global Strategy',
        image: 'https://i.pravatar.cc/150?u=mark',
    },
    {
        content:
            "We've seen a 40% reduction in 'status update' emails since switching to LancerCollab. The project update feature is a game-changer for focus.",
        author: 'Elena Rodriguez',
        role: 'Creative Director, Studio Flux',
        image: 'https://i.pravatar.cc/150?u=elena',
    },
];

export default function TestimonialsSection() {
    return (
        <section id="testimonials" className="bg-muted/30 py-24 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-brand mb-4 text-base font-bold tracking-[0.2em] uppercase">Social Proof</h2>
                    <p className="text-foreground text-3xl font-bold tracking-tight uppercase sm:text-4xl">
                        Trusted by <span className="text-brand">industry leaders</span> worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-card group border-border relative flex flex-col rounded-xl border p-10 shadow-sm">
                            <Quote className="text-primary/10 group-hover:text-brand absolute top-6 right-6 h-12 w-12 animate-pulse duration-1000 group-hover:rotate-12" />
                            <div className="mb-6 flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="fill-brand text-brand h-4 w-4" />
                                ))}
                            </div>
                            <p className="text-foreground/80 mb-8 flex-grow text-lg leading-relaxed italic">"{testimonial.content}"</p>
                            <div className="border-border flex items-center gap-4 border-t pt-6">
                                <img src={testimonial.image} alt={testimonial.author} className="border-primary/20 h-12 w-12 rounded-full border-2" />
                                <div>
                                    <h4 className="text-foreground text-sm font-bold tracking-wide uppercase">{testimonial.author}</h4>
                                    <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
