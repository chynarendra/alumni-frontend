"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import HeroSection from "@/components/frontend/HeroSection";
import Footer from "@/components/frontend/Footer";
import useNews from "@/hooks/news/useNews";

const NewsList = () => {
  const router = useRouter();
  const { news, isLoading } = useNews();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <HeaderMenus />

      {/* Hero Section */}
      <HeroSection title="Latest News" description="Stay updated with the latest news" />

      {/* News List */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {!isLoading ? news.map((news) => (
            <div
              key={news._id}
              className="border rounded-lg shadow hover:shadow-md cursor-pointer transition overflow-hidden"
              onClick={() => router.push(`/news/${news._id}`)}
            >
              <Image
                src={''}
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
        {news.length <= 0 && <p className="text-gray-600">Data are not available</p>}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsList;
