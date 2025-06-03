import { useAuth } from '@/context/AuthContext';
import { useErrorToast } from '@/hooks/useErrorToast';
import { getJobApplications } from '@/services/jobs.service';
import { IJobApplication } from '@/type/IJobApplication';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Applications = ({ id }: { id: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [applications, setApplications] = useState<IJobApplication[]>([]);
    const { showError } = useErrorToast();
    const { user } = useAuth();

    const fetchJobs = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await getJobApplications(id);
            if (res.statusCode === 200 || res.statusCode === 201) {
                setApplications(res.data.applicants);
            } else {
                toast.error(res.message);
            }
            setIsLoading(false);
        } catch (err) {
            showError(err);
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchJobs(id);
    }, [id, fetchJobs]);

    return (
        <div>
            <h3 className="text-2xl font-bold text-green-700 mb-4 border-b border-gray-300 pb-2">
                Applications
            </h3>

            {!isLoading ? (
                applications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 bg-white text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border px-4 py-2">SN</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Apply Date</th>
                                    <th className="border px-4 py-2">CV</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app, index) => (
                                    <>
                                        {user?.userType == "Student" ? (app.applicant._id == user._id &&
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2">{index + 1}</td>
                                                <td className="border px-4 py-2">{app.applicant.name}</td>
                                                <td className="border px-4 py-2">{new Date(app.applicationDate).toLocaleDateString()}</td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        href={app.resume ? process.env.NEXT_PUBLIC_API_BASE_URL + '/' + app.resume : ''}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        View CV
                                                    </Link>
                                                </td>
                                            </tr>) : (
                                            <tr key={index} className="hover:bg-gray-50">
                                                <td className="border px-4 py-2">{index + 1}</td>
                                                <td className="border px-4 py-2">{app.applicant.name}</td>
                                                <td className="border px-4 py-2">{new Date(app.applicationDate).toLocaleDateString()}</td>
                                                <td className="border px-4 py-2">
                                                    <Link
                                                        href={app.resume ? process.env.NEXT_PUBLIC_API_BASE_URL + '/' + app.resume : ''}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        View CV
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                        }
                                    </>
                                ))}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-600">No applications found.</p>
                )
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
        </div>
    );
};

export default Applications;
