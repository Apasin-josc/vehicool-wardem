import { useState } from 'react';

interface CarFormProps {
    onCreated: () => void;
}

const placeholders: Record<string, string> = {
    plate_number: 'e.g. 1234 ABC',
    manufacturer: 'e.g. Toyota',
    model: 'e.g. Corolla',
    color: 'e.g. Red',
};

export default function CarForm({ onCreated }: CarFormProps) {
    const [form, setForm] = useState({
        plate_number: '',
        manufacturer: '',
        model: '',
        color: '',
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [submitting, setSubmitting] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setErrors(prev => ({ ...prev, [e.target.name]: [] }));
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const localErrors: Record<string, string[]> = {};
        (['plate_number', 'manufacturer', 'model', 'color'] as const).forEach(field => {
            if (!form[field].trim()) {
                localErrors[field] = ['This field is required.'];
            }
        });

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

            setForm({ plate_number: '', manufacturer: '', model: '', color: '' });
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
                Post a your Vehicle!
            </h2>

            {(['plate_number', 'manufacturer', 'model', 'color'] as const).map(field => (
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

            <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#FF3B30] text-white py-2 rounded hover:bg-red-600 transition disabled:opacity-50"
            >
                {submitting ? 'Submitting…' : 'Create Vehicle'}
            </button>
        </form>
    );
}
