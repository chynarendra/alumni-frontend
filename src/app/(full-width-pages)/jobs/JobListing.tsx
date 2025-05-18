"use client"
import Footer from "@/components/frontend/Footer";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import HeroSection from "@/components/frontend/HeroSection";
import useJob from "@/hooks/jobs/useJob";
import Link from "next/link";
import React from "react";

const JobListing = () => {
    const { jobs, isLoading } = useJob();
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <HeaderMenus />

            {/* Hero */}
            <HeroSection
                title="Jobs"
                description="Discover job opportunities"
            />

            {/* Jobs */}
            <section id="jobs" className="py-16 container mx-auto px-4">
                {!isLoading ? <div className="grid gap-4">
                    {jobs.map((job) => (
                        <Link href={`/jobs/${job._id}`} key={job._id}>
                            <div className="p-4 border rounded-lg shadow hover:shadow-md transition cursor-pointer hover:bg-gray-50">
                                <h2 className="text-xl font-semibold">{job.title}</h2>
                                <p className="text-gray-600">📍 {job.location}</p>
                                <p className="text-sm text-gray-500">
                                    🗓️ Apply by:{" "}
                                    {new Date(job.applicationDeadline).toLocaleDateString()}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div> : "Loading...."
                }
                {jobs.length <= 0 && <p className="text-gray-600">Data are not available</p>}
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default JobListing;
