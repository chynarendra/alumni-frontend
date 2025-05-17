"use client"
import React from "react";
import { useRouter } from "next/navigation";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import HeroSection from "@/components/frontend/HeroSection";
import Footer from "@/components/frontend/Footer";

const events = [
    {
        id: "1",
        title: "React Conference",
        startDate: "2025-06-10",
        endDate: "2025-06-12",
        location: "New York",
    },
    {
        id: "2",
        title: "JavaScript Meetup",
        startDate: "2025-07-05",
        endDate: "2025-07-05",
        location: "San Francisco",
    },
    // Add more events or fetch from API
];

const EventList = () => {
    const router = useRouter();

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
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="p-4 border rounded-lg shadow hover:shadow-md cursor-pointer transition"
                            onClick={() => router.push(`/events/${event.id}`)}
                        >
                            <h2 className="text-xl font-semibold">{event.title}</h2>
                            <p className="text-gray-600">
                                🗓️ {new Date(event.startDate).toLocaleDateString()} -{" "}
                                {new Date(event.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">📍 {event.location}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default EventList;
