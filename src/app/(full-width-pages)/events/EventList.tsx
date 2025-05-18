"use client"
import React from "react";
import { useRouter } from "next/navigation";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import HeroSection from "@/components/frontend/HeroSection";
import Footer from "@/components/frontend/Footer";
import useEvents from "@/hooks/events/useEvents";

const EventList = () => {
    const router = useRouter();
    const { events, isLoading } = useEvents();

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <HeaderMenus />

            {/* Hero */}
            <HeroSection
                title="Events"
                description="Discover and book events"
            />

            {/* Jobs */}
            <section id="jobs" className="py-16 container mx-auto px-4">
                <div className="grid gap-4">
                    {!isLoading ? events.map((event) => (
                        <div
                            key={event._id}
                            className="p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition"
                            onClick={() => router.push(`/events/${event._id}`)}
                        >
                            <h2 className="text-xl font-semibold">{event.title}</h2>
                            <p className="text-gray-600">
                                🗓️ {new Date(event.startDate).toLocaleDateString()} -{" "}
                                {new Date(event.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">📍 {event.location}</p>
                        </div>
                    )) : "Loading..."}
                </div>
                {events.length <= 0 && <p className="text-gray-600">Data are not available</p>}
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default EventList;
