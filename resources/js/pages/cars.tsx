import { Head } from '@inertiajs/react';
import LandingNavBar from '@/components/ui/landing/landing-nav-bar';
import AppFooter from '@/components/ui/app/app-footer';
import { useEffect, useState } from 'react';
import CarFilter, { Car } from '@/components/ui/cars/car-filter';
import CarForm from '@/components/ui/cars/car-form';
import { Car as CarIcon } from 'lucide-react';
import WannaFindOutCarrousel from '@/components/ui/landing/wanna-find-out';

interface Meta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Cars() {
    const [allCars, setAllCars] = useState<Car[]>([]);
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<Meta>({
        current_page: 1,
        last_page: 1,
        per_page: 5,
        total: 0,
    });

    function fetchCars(p: number) {
        setLoading(true);
        fetch(`/api/cars?page=${p}`)
            .then(res => res.json())
            .then(json => {
                setAllCars(json.data);
                setCars(json.data);
                setMeta(json.meta);
                setPage(p);
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchCars(1);
    }, [refresh]);

    return (
        <>
            <Head title="Cars Listing" />
            <div className="flex flex-col h-screen">
                <header className="flex-none top-0 z-20">
                    <LandingNavBar />
                </header>

                <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                    <div className="max-w-4xl mx-auto">
                        <CarForm onCreated={() => setRefresh(r => !r)} />

                        <WannaFindOutCarrousel />

                        <br />

                        <h1 className="text-3xl font-bold mb-4 text-center text-black">
                            Registered Vehicles
                        </h1>

                        <CarFilter cars={allCars} onFilter={setCars} />

                        {loading ? (
                            <p className="text-center py-8 text-black">Loading vehicles…</p>
                        ) : cars.length === 0 ? (
                            <p className="text-center py-8 text-black">No vehicles found.</p>
                        ) : (
                            <>
                                <ul className="space-y-4">
                                    {cars.map(car => (
                                        <li
                                            key={car.id}
                                            className="bg-white rounded shadow p-4 flex items-center space-x-4"
                                        >
                                            {!car.image_url && (
                                                <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded">
                                                    <CarIcon className="w-8 h-8 text-gray-500" />
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="text-lg font-semibold text-black">
                                                    {car.manufacturer} {car.model}
                                                </h3>
                                                <p className="text-black">
                                                    <strong>Plate:</strong> {car.plate_number}
                                                </p>
                                                <p className="text-black">
                                                    <strong>Color:</strong> {car.color}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex justify-center items-center mt-6 space-x-4">
                                    <button
                                        onClick={() => fetchCars(page - 1)}
                                        disabled={page === 1}
                                        className="px-4 py-2 bg-red-500 rounded disabled:opacity-50"
                                    >
                                        Prev
                                    </button>
                                    <span className="text-black">
                                        Page {meta.current_page} of {meta.last_page}
                                    </span>
                                    <button
                                        onClick={() => fetchCars(page + 1)}
                                        disabled={page === meta.last_page}
                                        className="px-4 py-2 bg-red-500 rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </main>

                <footer className="flex-none bottom-0 z-20">
                    <AppFooter />
                </footer>
            </div>
        </>
    );
}