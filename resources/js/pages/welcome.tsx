import FAQSection from '@/components/landing/faq-section';
import FeaturesSection from '@/components/landing/features-section';
import LandingFooter from '@/components/landing/footer';
import HeroSection from '@/components/landing/hero-section';
import PricingSection from '@/components/landing/pricing-section';
import TestimonialsSection from '@/components/landing/testimonials-section';
import { Head } from '@inertiajs/react';

export default function Welcome() {

    return (
        <div className="bg-background select-none">
            <Head title="Enterprise Client Portals">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <PricingSection />
            <FAQSection />
            <LandingFooter />
        </div>
    );
}
