import { useState, useEffect } from 'react';

export interface Car {
    id: number;
    plate_number: string;
    manufacturer: string;
    model: string;
    color: string;
    image_url?: string;
}

interface CarFilterProps {
    cars: Car[];
    onFilter: (filteredCars: Car[]) => void;
}

export default function CarFilter({ cars, onFilter }: CarFilterProps) {
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedManufacturer, setSelectedManufacturer] = useState('');

    const colors = Array.from(new Set(cars.map(c => c.color)));
    const manufacturers = Array.from(new Set(cars.map(c => c.manufacturer)));

    useEffect(() => {
        let filtered = cars;
        if (selectedColor) {
            filtered = filtered.filter(c => c.color === selectedColor);
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
                    <option value="" className="text-black">All Colors</option>
                    {colors.map(color => (
                        <option key={color} value={color} className="text-black">
                            {color}
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
                    <option value="" className="text-black">All Manufacturers</option>
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
