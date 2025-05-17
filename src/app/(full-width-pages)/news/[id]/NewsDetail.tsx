"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import { INews } from "@/type/INews";

// Example static data
const news: INews = {
    _id: "1",
    title: "Next.js 14 Released with Major Performance Improvements",
    content:
        "Next.js 14 introduces server actions, partial pre-rendering, and improved performance across the board. Developers are excited about the speed and flexibility this release brings.",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
}

const NewsDetail = () => {
    const router = useRouter();
    const [newsItem, setNewsItem] = useState<INews | null>(news);

    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderMenus />

            {newsItem && <div className="container mx-auto px-4 py-12 max-w-4xl">
                <img
                    src={newsItem.imageUrl}
                    alt={newsItem.title}
                    className="rounded-lg shadow mb-6 w-full object-cover h-64"
                />
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{newsItem.title}</h1>
                <p className="text-gray-700 text-lg leading-relaxed">{newsItem.content}</p>
            </div>
            }

            <Footer />
        </div>
    );
};

export default NewsDetail;
