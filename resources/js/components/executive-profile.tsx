import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Award, TrendingUp, Globe, Mail, Phone } from 'lucide-react';

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

export function ExecutiveProfile({
    name,
    title,
    email,
    phone,
    location,
    summary,
    experiences,
    achievements
}: ExecutiveProfileProps) {
    return (
        <div className="max-w-5xl mx-auto space-y-12 py-12 px-6 bg-card shadow-sm border border-border">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-primary pb-8">
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary uppercase">{name}</h1>
                    <p className="text-xl font-medium text-muted-foreground tracking-widest uppercase">{title}</p>
                </div>
                <div className="flex flex-col gap-2 text-sm font-medium">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{location}</span>
                    </div>
                </div>
            </header>

            {/* Executive Summary */}
            <section className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Executive Summary</h2>
                <p className="text-lg leading-relaxed text-foreground/80 font-light italic">
                    "{summary}"
                </p>
            </section>

            {/* Key Achievements Grid */}
            <section className="space-y-6">
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Key Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((achievement, index) => (
                        <Card key={index} className="border-none bg-muted/50 dark:bg-muted/20 rounded-none shadow-none group hover:bg-primary transition-colors duration-300">
                            <CardHeader className="pb-2">
                                <TrendingUp className="h-6 w-6 text-primary group-hover:text-white mb-2" />
                                <CardTitle className="text-2xl font-bold group-hover:text-white">{achievement.value}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm font-bold uppercase tracking-wider group-hover:text-white/90 mb-1">{achievement.title}</p>
                                <p className="text-xs text-muted-foreground group-hover:text-white/70">{achievement.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Professional Experience */}
            <section className="space-y-8">
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] border-l-4 border-primary pl-4">Professional Experience</h2>
                <div className="space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-8 border-l border-border">
                            <div className="absolute -left-1.5 top-0 h-3 w-3 rounded-full bg-primary border-4 border-card" />
                            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-foreground uppercase">{exp.role}</h3>
                                    <p className="text-lg font-medium text-primary">{exp.company}</p>
                                </div>
                                <Badge variant="outline" className="mt-2 md:mt-0 font-mono tracking-tighter rounded-none px-3 py-1 border-primary text-primary">
                                    {exp.period}
                                </Badge>
                            </div>
                            <p className="text-base leading-relaxed text-muted-foreground">
                                {exp.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer / Contact CTA */}
            <footer className="pt-12 border-t border-border text-center">
                <p className="text-sm text-muted-foreground uppercase tracking-[0.5em] mb-4">Confidential Executive Profile</p>
                <div className="inline-flex gap-8">
                    <Separator orientation="vertical" className="h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">{name.split(' ').pop()} 2026</span>
                    <Separator orientation="vertical" className="h-4" />
                </div>
            </footer>
        </div>
    );
}
