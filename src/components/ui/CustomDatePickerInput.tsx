import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomDatePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const CustomDatePickerInput: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  required,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={(date: Date | null) => onChange(date?.toISOString().split("T")[0] || "")}
        dateFormat="yyyy-MM-dd"
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded px-3 py-2 focus:outline-none focus:ring ${
          error ? "focus:border-red-500" : "focus:border-blue-400"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomDatePickerInput;
