"use client";
import React from "react";
import { useRouter } from "next/navigation";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import Image from "next/image";
import HeroSection from "@/components/frontend/HeroSection";

const event = {
    id: "1",
    title: "React Conference",
    description:
        "Join the largest React conference with top speakers from the industry. Learn, network, and grow your skills!",
    startDate: "2025-06-10",
    endDate: "2025-06-12",
    location: "New York",
    isVirtual: false,
    meetingLink: "",
    maxAttendees: 200,
    imageUrl:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
};

const EventDetail = () => {
    const router = useRouter();

    const handleBook = () => {
        router.push("/signin");
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <HeaderMenus />

            <HeroSection
                title="Event"
                description="Discover and book events"
            />

            <main className="container mx-auto px-4 py-10 max-w-4xl">
                {/* Banner Image */}
                <div className="mb-6 rounded overflow-hidden">
                    <Image
                        src={event.imageUrl}
                        alt={event.title}
                        width={1200}
                        height={500}
                        className="rounded-lg object-cover w-full h-64"
                    />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-2">{event.title}</h1>

                {/* Date & Location */}
                <p className="text-gray-600 mb-2">
                    🗓️ {new Date(event.startDate).toLocaleDateString()} -{" "}
                    {new Date(event.endDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mb-2">📍 {event.location}</p>

                {/* Is Virtual */}
                <p className="text-gray-600 mb-2">
                    {event.isVirtual ? "🔗 Virtual Event" : "🏢 In-Person Event"}
                </p>

                {/* Meeting Link (if virtual) */}
                {event.isVirtual && (
                    <p className="text-blue-600 underline mb-2">
                        Meeting Link:{" "}
                        <a href={event.meetingLink} target="_blank" rel="noopener noreferrer">
                            {event.meetingLink}
                        </a>
                    </p>
                )}

                {/* Max Attendees */}
                <p className="text-gray-600 mb-6">
                    👥 Max Attendees: {event.maxAttendees}
                </p>

                {/* Description */}
                <div className="prose max-w-none mb-10">
                    <p>{event.description}</p>
                </div>

                {/* Book Button */}
                <button
                    onClick={handleBook}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                >
                    Book Event
                </button>
            </main>

            <Footer />
        </div>
    );
};

export default EventDetail;
