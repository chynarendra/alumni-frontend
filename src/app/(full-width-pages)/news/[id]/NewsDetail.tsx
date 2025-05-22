"use client";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import { INews } from "@/type/INews";
import { getNewsById } from "@/services/news.service";
import toast from "react-hot-toast";
import { useErrorToast } from "@/hooks/useErrorToast";
import DOMPurify from "dompurify";
import HeroSection from "@/components/frontend/HeroSection";

const NewsDetail = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [newsItem, setNewsItem] = useState<INews | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showError } = useErrorToast();
    const fetchNews = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await getNewsById(id);
            if (res.statusCode == 201 || res.statusCode == 200) {
                const data = res.data;
                setNewsItem(data);
            } else {
                toast.error('Something went wrong');
            }
            setIsLoading(false);
        } catch (err) {
            showError(err);
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        id && fetchNews(id);
    }, [fetchNews, id])

    return (
        <div className="min-h-screen bg-gray-50">
            <HeaderMenus />

            <HeroSection
                title="News"
                url='/news'
                description={newsItem ? newsItem.title : "Stay updated with the latest news"}
            />

            {newsItem && <div className="container mx-auto px-4 py-12 max-w-4xl">
                <img
                    src={process.env.NEXT_PUBLIC_API_BASE_URL + '/' + newsItem.imageUrl}
                    alt={newsItem.title}
                    className="rounded-lg shadow mb-6 w-full object-cover h-64"
                />
                <h1 className="text-3xl font-bold mb-4 text-gray-800">{newsItem.title}</h1>
                <div
                    className="prose prose-gray max-w-none text-lg leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsItem.content) }}
                />
            </div>
            }

            <Footer />
        </div>
    );
};

export default NewsDetail;
