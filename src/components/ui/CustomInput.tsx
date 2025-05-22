import React from 'react';

interface CustomInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
  error?: string; // optional error message
  required?:boolean
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  type,
  error,
  required
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded px-3 py-2 focus:outline-none focus:ring ${
          error ? 'focus:border-red-500' : 'focus:border-blue-400'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomInput;
