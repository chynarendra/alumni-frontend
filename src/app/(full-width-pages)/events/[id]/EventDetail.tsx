"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import Image from "next/image";
import HeroSection from "@/components/frontend/HeroSection";
import { getEventById } from "@/services/event.service";
import toast from "react-hot-toast";
import { useErrorToast } from "@/hooks/useErrorToast";
import { IEvent } from "@/type/IEvent";
import DOMPurify from "dompurify";

const EventDetail = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    const { showError } = useErrorToast();
    const [event, setEvent] = useState<IEvent | null>(null);

    const fetchEvent = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getEventById(id);
            if (res.statusCode === 200 || res.statusCode === 201) {
                const data = res.data.event;
                setEvent(data);
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            showError(err);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if (id) fetchEvent();
    }, [fetchEvent, id]);

    const handleBook = () => {
        router.push("/signin");
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            <HeaderMenus />

            <HeroSection
                title="Event"
                url="/events"
                description={event ? event.title : "Discover and book events"}
            />

            {event && <main className="container mx-auto px-4 py-10 max-w-4xl">
                {/* Banner Image */}
                {event.imageUrl != '' && <div className="mb-6 rounded overflow-hidden">
                    <Image
                        src={process.env.NEXT_PUBLIC_API_BASE_URL + '/' + event.imageUrl}
                        alt={event.title}
                        width={1200}
                        height={500}
                        className="rounded-lg object-cover w-full h-64"
                    />
                </div>
                }

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
                    <div
                    className="prose prose-gray max-w-none text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(event.description) }}
                />
                </div>

                {/* Book Button */}
                <button
                    onClick={handleBook}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                >
                    Book Event
                </button>
            </main>
            }

            <Footer />
        </div>
    );
};

export default EventDetail;
