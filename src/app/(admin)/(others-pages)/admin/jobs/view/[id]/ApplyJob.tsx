import { applyJob } from '@/services/jobs.service';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ApplyJob = ({ id }: { id: string }) => {
    const [formData, setFormData] = useState({
        cv: null as File | null,
    });

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState<string | null>(null); // Error state

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (name === 'cv' && files?.length) {
            const file = files[0];
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];

            if (!allowedTypes.includes(file.type)) {
                setError('Only PDF or DOC files are allowed.');
                (e.target as HTMLInputElement).value = '';
                setFormData({ ...formData, cv: null });
                return;
            }

            setError(null); // Clear error
            setFormData({ ...formData, cv: file });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.cv) {
            setError('Please upload your CV.');
            return;
        }

        setError(null);

        try {
            console.log("form data=",formData);
            const form = new FormData();
            form.append("resume", formData.cv);

            setIsLoading(true);
            const res = await applyJob(form, id);
            if (res.statusCode === 200 || res.statusCode === 201) {
                toast.success('Application submitted successfully!');
            } else {
                toast.error(res.message);
            }

            setFormData({ cv: null });
            const fileInput = document.getElementById('cv') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (err: any) {
            if (err.response?.status === 403) {
                toast.error(err.response.data.message || "");
            } else {
                toast.error(err.response?.data?.message || "");
            }
        } finally {
            setIsLoading(false);
            localStorage.removeItem("job_id")
        }
    };

    return (
        <>
            <h3 className="text-2xl font-bold text-green-700 mb-4 border-b border-gray-300 pb-2">
                Apply Now
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="w-1/3">
                    <label htmlFor="cv" className="block mb-1 font-medium">
                        Upload CV (PDF/DOC)
                    </label>
                    <input
                        id="cv"
                        type="file"
                        name="cv"
                        accept=".pdf,.doc,.docx"
                        onChange={handleChange}
                        className={`border ${error ? 'border-red-500' : 'border-gray-300'
                            } rounded px-3 py-2 w-full`}
                    />
                    {error && (
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </>
    );
};

export default ApplyJob;
