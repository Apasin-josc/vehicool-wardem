import { useState, useEffect } from 'react';

interface Color {
    id: number;
    name: string;
    hex: string;
}

interface CarFormProps {
    onCreated: () => void;
}

const placeholders: Record<string, string> = {
    plate_number: 'e.g. 1234 ABC',
    manufacturer: 'e.g. Toyota',
    model: 'e.g. Corolla',
};

export default function CarForm({ onCreated }: CarFormProps) {
    const [form, setForm] = useState({
        plate_number: '',
        manufacturer: '',
        model: '',
        color_id: '',
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [submitting, setSubmitting] = useState(false);

    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
        fetch('/api/colors')
            .then(res => res.json())
            .then(setColors)
            .catch(console.error);
    }, []);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setErrors(prev => ({ ...prev, [name]: [] }));
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const localErrors: Record<string, string[]> = {};
        if (!form.plate_number.trim()) {
            localErrors.plate_number = ['This field is required.'];
        }
        if (!form.manufacturer.trim()) {
            localErrors.manufacturer = ['This field is required.'];
        }
        if (!form.model.trim()) {
            localErrors.model = ['This field is required.'];
        }
        if (!form.color_id) {
            localErrors.color_id = ['You must select a color.'];
        }

        const platePattern = /^\d{4}\s?[A-Z]{3}$/;
        if (form.plate_number && !platePattern.test(form.plate_number)) {
            localErrors.plate_number = [
                'Plate must be 4 digits and 3 uppercase letters (e.g. 1234 ABC).'
            ];
        }

        if (Object.keys(localErrors).length) {
            setErrors(localErrors);
            return;
        }

        setSubmitting(true);
        setErrors({});
        try {
            const res = await fetch('/api/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const payload = await res.json();

            if (!res.ok) {
                setErrors(payload.errors || {});
                throw new Error(payload.message || 'Validation error');
            }

            setForm({ plate_number: '', manufacturer: '', model: '', color_id: '' });
            onCreated();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-8 bg-white p-6 rounded-lg shadow space-y-4 max-w-md mx-auto"
        >
            <h2 className="text-2xl font-semibold text-black mb-2">
                Post your Vehicle!
            </h2>

            {(['plate_number', 'manufacturer', 'model'] as const).map(field => (
                <div key={field}>
                    <label className="block text-sm font-medium text-black mb-1">
                        {field.replace('_', ' ').toUpperCase()}
                    </label>
                    <input
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        disabled={submitting}
                        placeholder={placeholders[field]}
                        className="w-full border rounded px-3 py-2 text-black"
                    />
                    {errors[field] && (
                        <p className="text-red-600 text-sm mt-1">{errors[field][0]}</p>
                    )}
                </div>
            ))}

            <div>
                <label className="block text-sm font-medium text-black mb-1">
                    Color
                </label>
                <select
                    name="color_id"
                    value={form.color_id}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full border rounded px-3 py-2 text-black"
                >
                    <option value="">— Select a color —</option>
                    {colors.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                {errors.color_id && (
                    <p className="text-red-600 text-sm mt-1">{errors.color_id[0]}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
            >
                {submitting ? 'Submitting…' : 'Create Vehicle'}
            </button>
        </form>
    );
}
