import { Head, Link } from '@inertiajs/react';
import LandingNavBar from '@/components/ui/landing/landing-nav-bar';
import AppFooter from '@/components/ui/app/app-footer';

export default function Cars() {
    return (
        <>
            <Head title="Landing" />
            <div className="flex flex-col h-screen">
                <header className="flex-none top-0 z-20">
                    <LandingNavBar />
                </header>

                <main className="flex-1 bg-gray-100">
                </main>

                <footer className="flex-none bottom-0 z-20">
                    <AppFooter />
                </footer>
            </div>
        </>
    );
}