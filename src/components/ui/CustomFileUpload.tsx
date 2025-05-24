import React, { useState } from 'react';

interface CustomFileUploadProps {
  label: string;
  onFileChange: (file: File | null) => void;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ label, onFileChange }) => {
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only JPG, JPEG, and PNG files are allowed");
        e.target.value = ""; // Clear the file input
        onFileChange(null);
        return;
      }
    }

    setError(""); // Clear previous errors
    onFileChange(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default CustomFileUpload;
