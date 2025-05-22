import React from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

interface CustomTimePickerProps {
  label: string;
  value: string;                 // "HH:mm"
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const CustomTimePickerInput: React.FC<CustomTimePickerProps> = ({
  label,
  value,
  onChange,
  error,
  required,
}) => {
  // "HH:mm" -> Date (dummy date 1970‑01‑01 in local tz)
  const strToDate = (t: string) =>
    t ? new Date(`1970-01-01T${t}:00`) : null;

  // Date -> "HH:mm" **in local time**
  const dateToStr = (d: Date | null) =>
    d ? format(d, "HH:mm") : "";

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <DatePicker
        selected={strToDate(value)}
        onChange={(date) => onChange(dateToStr(date))}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="hh:mm aa"          // show 12‑hour clock with AM/PM
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

export default CustomTimePickerInput;
