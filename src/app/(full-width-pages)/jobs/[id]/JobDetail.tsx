"use client"
import Footer from '@/components/frontend/Footer';
import HeaderMenus from '@/components/frontend/HeaderMenus'
import HeroSection from '@/components/frontend/HeroSection'
import { useErrorToast } from '@/hooks/useErrorToast';
import { getJobById } from '@/services/jobs.service';
import { IJob } from '@/type/IJob';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import DOMPurify from "dompurify";

const JobDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useErrorToast();
    const [job, setJob] = useState<IJob | null>(null);
    const fetchJobs = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await getJobById(id);
            if (res.statusCode == 201 || res.statusCode == 200) {
                const data = res.data.job;
                setJob(data);
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
    }, [fetchJobs, id])

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <HeaderMenus />

            {/* Hero */}
            <HeroSection
                title="Jobs"
                url='/jobs'
                description={job ? job.title : "Discover job opportunities"}
            />

            <section id="job-detail" className="py-16 container mx-auto px-4 max-w-3xl">
                {!isLoading ? (job && <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                    <h2 className="text-2xl font-bold text-green-700">{job.title}</h2>
                    <p className="text-gray-700">
                        <strong>Company:</strong> {job.company}
                    </p>
                    <p className="text-gray-700">
                        <strong>Location:</strong> {job.location}
                    </p>
                    <p className="text-gray-700">
                        <strong>Job Type:</strong> {job.jobType}
                    </p>
                    <p className="text-gray-700">
                        <strong>Salary:</strong> {job.salary}
                    </p>
                    <p className="text-gray-700">
                        <strong>Application Deadline:</strong>{" "}
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Job Description</h3>
                        <div
                            className="text-gray-600"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.description) }}
                        />
                    </div>
                </div>) : ("Loading....")
                }
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default JobDetail