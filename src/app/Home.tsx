import React from "react";
import Link from "next/link";
import { ChevronDownIcon } from "@/icons";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import HeroSection from "@/components/frontend/HeroSection";
import Footer from "@/components/frontend/Footer";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <HeaderMenus />

            {/* Hero */}
            <HeroSection />

            {/* Jobs */}
            <section id="jobs" className="py-16 container mx-auto px-4">
                <h3 className="text-2xl font-semibold mb-4">Jobs</h3>
                <div className="bg-white rounded-lg shadow p-4">Job listings...</div>
            </section>

            {/* Events */}
            <section id="events" className="py-16 container mx-auto px-4 bg-gray-100">
                <h3 className="text-2xl font-semibold mb-4">Events</h3>
                <div className="bg-white rounded-lg shadow p-4">Event details...</div>
            </section>

            {/* News */}
            <section id="news" className="py-16 container mx-auto px-4">
                <h3 className="text-2xl font-semibold mb-4">News</h3>
                <div className="bg-white rounded-lg shadow p-4">News articles...</div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
