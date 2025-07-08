import { Link } from '@inertiajs/react';

export default function BoostSection() {
    return (
        <section className="relative w-full h-screen bg-[#f9f5ef] overflow-hidden">
            <img
                src="/images/luxury-car.png"
                alt="cool-car"
                className="w-[80%] h-full object-cover"
            />

            <div
                className="absolute top-1/2 left-[65%] transform -translate-y-1/2 translate-x-4
                bg-[#FF3B30] text-white p-10 rounded-md shadow-2xl max-w-md"
            >
                <h2 className="text-4xl font-serif italic decoration-black decoration-2 mb-4 text-center leading-relaxed">
                    Welcome <em>to the page</em><br />
                    of vehicles that actually <em>makes sense</em><br />
                </h2>
                <p className="text-center text-sm mb-4">
                    wanna find out ?
                </p>
                <Link
                    href={route('cars')}
                    className="mt-4 px-6 py-2 bg-black rounded-full hover:bg-gray-800 transition text-white font-semibold w-full block mx-auto max-w-max">
                    POST NOW YOUR VEHICLE
                </Link>
            </div>
        </section >
    );
}
