"use client";
import React from "react";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import HeroSection from "@/components/frontend/HeroSection";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <HeaderMenus />

            <HeroSection
                title="About us"
                description="Discover who we are"
            />

            <section className="container mx-auto px-4 py-16 max-w-4xl">
                <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
                    About Our Company
                </h1>

                <p className="text-lg mb-6">
                    <strong>MyCompany</strong> is a forward-thinking organization dedicated to providing top-notch job opportunities, exciting events, and the latest news in the tech industry. Founded in 2020, we have quickly grown into a trusted platform for professionals and organizations alike.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600">Our Mission</h2>
                <p className="mb-6">
                    To empower individuals and businesses through meaningful connections, skill-building opportunities, and up-to-date industry insights.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600">What We Do</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>Provide a curated list of job openings across multiple sectors.</li>
                    <li>Host events to help people network, learn, and grow.</li>
                    <li>Deliver reliable news and updates from the tech world.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600">Our Values</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li><strong>Integrity:</strong> We maintain transparency and trust in everything we do.</li>
                    <li><strong>Innovation:</strong> We embrace new ideas and technologies to serve our community better.</li>
                    <li><strong>Community:</strong> We believe in the power of connections and collaboration.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-green-600">Contact Us</h2>
                <p>
                    Have questions or feedback? Visit our <a href="/contact" className="text-blue-600 underline">Contact Page</a> and get in touch.
                </p>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
