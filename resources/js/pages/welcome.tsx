import { Head } from '@inertiajs/react';
import LandingNavBar from '@/components/ui/landing/landing-nav-bar';
import AppFooter from '@/components/ui/app/app-footer';
import BoostSection from '@/components/ui/landing/look-our-cars';
import ContentSection from '@/components/ui/landing/content-section';
import WannaFindOutCarrousel from '@/components/ui/landing/wanna-find-out';

export default function Welcome() {
    return (
        <>
            <Head title="Landing" />
            <div className="flex flex-col h-screen">
                <header className="flex-none top-0 z-20">
                    <LandingNavBar />
                </header>

                <main className="flex-1 bg-gray-100">
                    <div>
                        <BoostSection />
                    </div>
                    <div>
                        <WannaFindOutCarrousel />
                        <ContentSection />
                    </div>
                </main>

                <footer className="flex-none bottom-0 z-20">
                    <AppFooter />
                </footer>
            </div>
        </>
    );
}
