import { IOption } from '@/type/IOption';
import React from 'react';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: IOption[];
  error?: string;
  required?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  error,
  required,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded px-3 py-2 focus:outline-none focus:ring ${
          error ? 'focus:border-red-500' : 'focus:border-blue-400'
        }`}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomSelect;
