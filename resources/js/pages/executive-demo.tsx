import { ExecutiveProfile } from '@/components/executive-profile';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function ExecutiveDemo() {
    const executiveData = {
        name: 'Alexander J. Sterling',
        title: 'Chief Operating Officer',
        email: 'a.sterling@laracollab.com',
        phone: '+1 (555) 942-0188',
        location: 'New York City, NY',
        summary:
            'Strategic operations leader with over 15 years of experience in scaling enterprise SaaS platforms. Proven track record in optimizing cross-functional workflows and driving sustainable EBITDA growth through technological innovation and human-centric management.',
        achievements: [
            {
                title: 'Revenue Growth',
                value: '$42M+',
                description: 'Directed international market expansion resulting in a 300% ARR increase over 24 months.',
            },
            {
                title: 'Operational Efficiency',
                value: '45%',
                description: 'Implemented AI-driven resource allocation tools, reducing operational overhead significantly.',
            },
            {
                title: 'Client Retention',
                value: '98.5%',
                description: 'Established the Global Success Framework, achieving industry-leading NRR metrics.',
            },
        ],
        experiences: [
            {
                company: 'Global Tech Solutions',
                role: 'Senior VP of Operations',
                period: '2020 — Present',
                description:
                    'Leading a global team of 200+ employees. Orchestrated a full-scale digital transformation of the logistics division, integrating blockchain for supply chain transparency and reducing delivery latency by 18%.',
            },
            {
                company: 'Innovate Digital Corp',
                role: 'Director of Strategic Planning',
                period: '2015 — 2020',
                description:
                    'Spearheaded the M&A integration of three boutique agencies into the parent company. Developed a unified reporting system that provided real-time visibility into project profitability across all business units.',
            },
            {
                company: 'Sterling & Associates',
                role: 'Operations Manager',
                period: '2010 — 2015',
                description:
                    'Managed day-to-day operations for a high-growth consulting firm. Automated billing and invoicing processes, improving cash flow by 30% and reducing administrative manual labor.',
            },
        ],
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Executive Profile', href: '/executive-demo' }]}>
            <Head title="Executive Profile - LaraCollab" />
            <div className="bg-muted/30 dark:bg-background min-h-screen">
                <div className="py-12">
                    <ExecutiveProfile {...executiveData} />
                </div>
            </div>
        </AppLayout>
    );
}
