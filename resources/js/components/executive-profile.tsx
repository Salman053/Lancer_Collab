import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Globe, Mail, Phone, TrendingUp } from 'lucide-react';

interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
}

interface Achievement {
    title: string;
    value: string;
    description: string;
}

interface ExecutiveProfileProps {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    experiences: Experience[];
    achievements: Achievement[];
}

export function ExecutiveProfile({ name, title, email, phone, location, summary, experiences, achievements }: ExecutiveProfileProps) {
    return (
        <div className="bg-card border-border mx-auto max-w-5xl space-y-12 border px-6 py-12 shadow-sm">
            {/* Header Section */}
            <header className="border-primary flex flex-col items-start justify-between gap-6 border-b-2 pb-8 md:flex-row md:items-end">
                <div className="space-y-2">
                    <h1 className="text-primary text-4xl font-bold tracking-tight uppercase md:text-5xl">{name}</h1>
                    <p className="text-muted-foreground text-xl font-medium tracking-widest uppercase">{title}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm font-medium">
                    <div className="text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{email}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{phone}</span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        <span>{location}</span>
                    </div>
                </div>
            </header>

            {/* Executive Summary */}
            <section className="space-y-4">
                <h2 className="border-primary border-l-4 pl-4 text-lg font-bold tracking-[0.2em] uppercase">Executive Summary</h2>
                <p className="text-foreground/80 text-lg leading-relaxed font-light italic">"{summary}"</p>
            </section>

            {/* Key Achievements Grid */}
            <section className="space-y-6">
                <h2 className="border-primary border-l-4 pl-4 text-lg font-bold tracking-[0.2em] uppercase">Key Achievements</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {achievements.map((achievement, index) => (
                        <Card
                            key={index}
                            className="bg-muted/50 dark:bg-muted/20 group hover:bg-primary rounded-none border-none shadow-none transition-colors duration-300"
                        >
                            <CardHeader className="pb-2">
                                <TrendingUp className="text-primary mb-2 h-6 w-6 group-hover:text-white" />
                                <CardTitle className="text-2xl font-bold group-hover:text-white">{achievement.value}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="mb-1 text-sm font-bold tracking-wider uppercase group-hover:text-white/90">{achievement.title}</p>
                                <p className="text-muted-foreground text-xs group-hover:text-white/70">{achievement.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Professional Experience */}
            <section className="space-y-8">
                <h2 className="border-primary border-l-4 pl-4 text-lg font-bold tracking-[0.2em] uppercase">Professional Experience</h2>
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="border-border relative border-l pl-8">
                            <div className="bg-primary border-card absolute top-0 -left-1.5 h-3 w-3 rounded-full border-4" />
                            <div className="mb-4 flex flex-col items-start justify-between md:flex-row">
                                <div>
                                    <h3 className="text-foreground text-xl font-bold uppercase">{exp.role}</h3>
                                    <p className="text-primary text-lg font-medium">{exp.company}</p>
                                </div>
                                <Badge
                                    variant="outline"
                                    className="border-primary text-primary mt-2 rounded-none px-3 py-1 font-mono tracking-tighter md:mt-0"
                                >
                                    {exp.period}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground text-base leading-relaxed">{exp.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer / Contact CTA */}
            <footer className="border-border border-t pt-12 text-center">
                <p className="text-muted-foreground mb-4 text-sm tracking-[0.5em] uppercase">Confidential Executive Profile</p>
                <div className="inline-flex gap-8">
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">{name.split(' ').pop()} 2026</span>
                    <Separator orientation="vertical" className="h-4" />
                </div>
            </footer>
        </div>
    );
}
