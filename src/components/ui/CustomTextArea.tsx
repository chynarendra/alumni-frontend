import React from 'react';

interface CustomAreaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    required?: boolean;
}

const CustomTextArea: React.FC<CustomAreaProps> = ({ label, value, onChange, error, required }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={4}
                className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'
                    } rounded px-3 py-2 resize-none focus:outline-none focus:ring ${error ? 'focus:border-red-500' : 'focus:border-blue-400'
                    }`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default CustomTextArea;
