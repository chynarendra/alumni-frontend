import Footer from '@/components/frontend/Footer';
import HeaderMenus from '@/components/frontend/HeaderMenus'
import HeroSection from '@/components/frontend/HeroSection'
import React from 'react'

const job = {
    id: 1,
    title: "Frontend Developer",
    description: "We are looking for a passionate Frontend Developer to join our team and help us build modern web applications.",
    company: "Tech Solutions Inc.",
    location: "New York, NY",
    jobType: "Full-Time",
    salary: "$80,000 - $100,000",
    applicationDeadline: "2025-06-10",
};

const JobDetail = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <HeaderMenus />

            {/* Hero */}
            <HeroSection
                title="Jobs"
                description="Discover job opportunities"
            />

            <section id="job-detail" className="py-16 container mx-auto px-4 max-w-3xl">
                <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
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
                        <p className="text-gray-600">{job.description}</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default JobDetail