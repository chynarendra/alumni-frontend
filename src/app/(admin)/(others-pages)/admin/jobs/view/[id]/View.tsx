"use client";
import { useErrorToast } from '@/hooks/useErrorToast';
import { getJobById } from '@/services/jobs.service';
import { IJob } from '@/type/IJob';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import ApplyJob from './ApplyJob';
import Applications from './Applications';

const View = () => {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useErrorToast();
    const [job, setJob] = useState<IJob | null>(null);
    const [activeTab, setActiveTab] = useState<'details' | 'apply'>('details');

    const fetchJobs = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await getJobById(id);
            if (res.statusCode === 200 || res.statusCode === 201) {
                setJob(res.data.job);
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
        id && fetchJobs(id);
    }, [fetchJobs, id]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex space-x-4 border-b mb-4">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'details' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('details')}
                >
                    Job Details
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'apply' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                    onClick={() => setActiveTab('apply')}
                >
                    Applications
                </button>
            </div>

            {!isLoading ? (
                job && (
                    <>
                        {activeTab === 'details' && (
                            <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                                <h2 className="text-2xl font-bold text-green-700">{job.title}</h2>
                                <p className="text-gray-700"><strong>Company:</strong> {job.company}</p>
                                <p className="text-gray-700"><strong>Location:</strong> {job.location}</p>
                                <p className="text-gray-700"><strong>Job Type:</strong> {job.jobType}</p>
                                <p className="text-gray-700"><strong>Salary:</strong> {job.salary}</p>
                                <p className="text-gray-700"><strong>Application Deadline:</strong> {new Date(job.applicationDeadline).toLocaleDateString()}</p>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold">Job Description</h3>
                                    <div
                                        className="text-gray-600"
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
                                    />
                                </div>

                                <ApplyJob id={job._id} />
                            </div>
                        )}

                        {activeTab === 'apply' && (
                            <div className="bg-white shadow-md rounded-lg p-6">
                                <Applications id={job._id} />
                            </div>
                        )}
                    </>
                )
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default View;
