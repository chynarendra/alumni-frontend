"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import HeroSection from "@/components/frontend/HeroSection";
import Footer from "@/components/frontend/Footer";

const newsList = [
  {
    id: "1",
    title: "Next.js 14 Released with Major Performance Improvements",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "2",
    title: "React Conf 2025 Announced",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "3",
    title: "Tech Companies Investing in AI Training",
    imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
  },
];

const NewsList = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <HeaderMenus />

      {/* Hero Section */}
      <HeroSection title="Latest News" description="Stay updated with the latest tech news" />

      {/* News List */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="border rounded-lg shadow hover:shadow-md cursor-pointer transition overflow-hidden"
              onClick={() => router.push(`/news/${news.id}`)}
            >
              <Image
                src={news.imageUrl}
                alt={news.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{news.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsList;
