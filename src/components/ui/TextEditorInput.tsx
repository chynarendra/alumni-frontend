'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import React from 'react';

// --- 1. Load ReactQuill on the client only -------------------------
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface CustomAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
}

const CustomTextArea: React.FC<CustomAreaProps> = ({
  label,
  value,
  onChange,
  error,
  required,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>

    {/*  call onChange, not setValue  */}
    <ReactQuill theme="snow" value={value} onChange={onChange} />

    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

export default CustomTextArea;
