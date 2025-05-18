"use client"
import React from "react";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import HeroSlider from "@/components/frontend/HeroSlider";
import useNews from "@/hooks/news/useNews";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRightIcon } from "@/icons";

const Home = () => {
    const router = useRouter();
    const { news, isLoading } = useNews();
    const events = [
        {
            _id: "1",
            title: "React Conference",
            startDate: "2025-06-10",
            endDate: "2025-06-12",
            location: "New York",
        },
        {
            _id: "2",
            title: "JavaScript Meetup",
            startDate: "2025-07-05",
            endDate: "2025-07-05",
            location: "San Francisco",
        },
        {
            _id: "3",
            title: "React Conference",
            startDate: "2025-06-10",
            endDate: "2025-06-12",
            location: "New York",
        },
        {
            _id: "4",
            title: "JavaScript Meetup",
            startDate: "2025-07-05",
            endDate: "2025-07-05",
            location: "San Francisco",
        },
    ];
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800">
            {/* Header */}
            <HeaderMenus />

            {/* Hero Slider */}
            <HeroSlider />

            {/* Hero */}
            {/* <HeroSection /> */}

            {/* --- Events & News stacked below slider --- */}
            <main className="container mx-auto">
                {/* Events */}
                <section id="events" className="py-16">
                    <h3 className="text-2xl font-semibold mb-4">Events</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {!isLoading
                            ? events.slice(0, 4).map((event) => (
                                <div
                                    key={event._id}
                                    className="p-4 bg-white border rounded-lg shadow hover:shadow-md cursor-pointer transition"
                                    onClick={() => router.push(`/events/${event._id}`)}
                                >
                                    <h2 className="text-xl font-semibold">{event.title}</h2>

                                    <p className="text-gray-600">
                                        🗓️ {new Date(event.startDate).toLocaleDateString()} –{" "}
                                        {new Date(event.endDate).toLocaleDateString()}
                                    </p>

                                    <p className="text-gray-600">📍 {event.location}</p>
                                </div>
                            ))
                            : "Loading..."}
                    </div>

                    <Link
                        href="/events"                 // ← put your target URL here
                        className="mt-8 inline-flex items-center gap-1 p-4 text-green-600 hover:text-green-700 transition"
                    >
                        See&nbsp;all
                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                </section>

                {/* News */}
                <section id="news" className="py-2">
                    <h3 className="text-2xl font-semibold mb-4">News</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {!isLoading ? news.slice(0, 3).map((news) => (
                            <div
                                key={news._id}
                                className="border bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition overflow-hidden"
                                onClick={() => router.push(`/news/${news._id}`)}
                            >
                                <Image
                                    src={'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80'}
                                    alt={news.title}
                                    width={400}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">{news.title}</h2>
                                </div>
                            </div>
                        )) : "Loading..."}
                    </div>
                    <Link
                        href="/news"                 // ← put your target URL here
                        className="mt-8 inline-flex items-center gap-1 p-4 text-green-600 hover:text-green-700 transition"
                    >
                        See&nbsp;all
                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>

                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
