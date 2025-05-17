import Footer from "@/components/frontend/Footer";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import HeroSection from "@/components/frontend/HeroSection";
import Link from "next/link";
import React from "react";

interface Job {
    id: number;
    title: string;
    location: string;
    applicationDeadline: string;
}

const jobs: Job[] = [
    {
        id: 1,
        title: "Frontend Developer",
        location: "New York, NY",
        applicationDeadline: "2025-06-10",
    },
    {
        id: 2,
        title: "Backend Engineer",
        location: "San Francisco, CA",
        applicationDeadline: "2025-06-15",
    },
    {
        id: 3,
        title: "UI/UX Designer",
        location: "Remote",
        applicationDeadline: "2025-06-20",
    },
];

const JobListing = () => {
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
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <Link href={`/jobs/${job.id}`} key={job.id}>
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
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default JobListing;
