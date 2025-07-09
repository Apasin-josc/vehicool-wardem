import { useState, useEffect } from 'react';

export interface Color {
    id: number;
    name: string;
    hex: string;
}

export interface Car {
    id: number;
    plate_number: string;
    manufacturer: string;
    model: string;
    image_url?: string;
    color: Color | null;
}

interface CarFilterProps {
    cars: Car[];
    onFilter: (filteredCars: Car[]) => void;
}

export default function CarFilter({ cars, onFilter }: CarFilterProps) {
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');

    // Extraemos solo los nombres de color (sin repetir) y descartamos null
    const colors = Array.from(
        new Set(cars.map(c => c.color?.name || '').filter(name => name))
    );

    const manufacturers = Array.from(
        new Set(cars.map(c => c.manufacturer))
    );

    useEffect(() => {
        let filtered = cars;

        if (selectedColor) {
            filtered = filtered.filter(c => c.color?.name === selectedColor);
        }
        if (selectedManufacturer) {
            filtered = filtered.filter(c => c.manufacturer === selectedManufacturer);
        }

        onFilter(filtered);
    }, [selectedColor, selectedManufacturer, cars, onFilter]);

    return (
        <div className="flex flex-wrap gap-4 mb-6">
            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Filter by Color
                </label>
                <select
                    className="border rounded px-3 py-2 text-black"
                    value={selectedColor}
                    onChange={e => setSelectedColor(e.target.value)}
                >
                    <option value="">All Colors</option>
                    {colors.map(name => (
                        <option key={name} value={name} className="text-black">
                            {name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Filter by Manufacturer
                </label>
                <select
                    className="border rounded px-3 py-2 text-black"
                    value={selectedManufacturer}
                    onChange={e => setSelectedManufacturer(e.target.value)}
                >
                    <option value="">All Manufacturers</option>
                    {manufacturers.map(m => (
                        <option key={m} value={m} className="text-black">
                            {m}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
