import { Link } from '@inertiajs/react';

export default function ContentSection() {
    return (
        <section className="bg-[#f9f5ef] py-24 px-6 flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#FF3B30] leading-relaxed max-w-4xl">
                <span className="relative inline-block">
                    <em className="italic">Trust, Vehicool is the OPTION</em>
                    <span className="absolute bottom-0 left-0 w-full h-[8px]">
                        <svg
                            viewBox="0 0 100 10"
                            className="w-full h-full"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M2,5 C20,10 80,0 98,5"
                                stroke="black"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                </span>
            </h2>

            <Link
                href={route('cars')}
                className="mt-10 px-10 py-4 bg-[#FF3B30] text-white text-sm tracking-widest font-semibold rounded-full hover:bg-red-600 transition">
                TAKE MY CAR TO NEXT LEVEL
            </Link>
        </section>
    );
}
