import React from 'react';

interface CustomFileUploadProps {
    label: string;
    onFileChange: (file: File | null) => void;
}

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({ label, onFileChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => onFileChange(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
        </div>
    );
};

export default CustomFileUpload;
