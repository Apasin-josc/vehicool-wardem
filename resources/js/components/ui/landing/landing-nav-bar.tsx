import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export default function LandingNavBar() {
    const { auth } = usePage<SharedData>().props;

    return (
        <nav className="p-4 flex items-center justify-between bg-gray-400 shadow">
            <Link
                href={route('home')}
                className="text-[#FF3B30] font-bold text-xl"
            >
                Vehicool
            </Link>
            {/* <div className="flex space-x-4">
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route('login')}
                            className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-black transition"
                        >
                            Login
                        </Link>
                        <Link
                            href={route('register')}
                            className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-black transition"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div> */}
            <div className="flex space-x-4">
                <>
                    <Link
                        href={route('cars')}
                        className="px-4 py-2 border border-white rounded text-white hover:bg-white hover:text-black transition"
                    >
                        Cars
                    </Link>
                </>
            </div>
        </nav>
    );
}
