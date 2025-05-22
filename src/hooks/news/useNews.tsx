import { deleteNewsData, getNews } from '@/services/news.service';
import { INews } from '@/type/INews'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useErrorToast } from '../useErrorToast';

const useNews = () => {
    const [news, setNews] = useState<INews[]>([]);
    const { showError } = useErrorToast();
    const [isLoading, setIsLoading] = useState(false);

    const fetchNews = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getNews();
            if (res.statusCode == 201 || res.statusCode == 200) {
                const data = res.data;
                setNews(data);
            } else {
                toast.error(res.message);
            }
            setIsLoading(false);
        } catch (err) {
            showError(err);
            setIsLoading(false);
        }
    }, []);

    const deleteNews = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await deleteNewsData(id);
            if (res.statusCode == 201 || res.statusCode == 200) {
                toast.success("News deleted successfully.");
                await fetchNews();
            } else {
                toast.error(res.message);
            }
            setIsLoading(false);
        } catch (err) {
            showError(err);
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNews();
    }, [fetchNews])

    return {
        news,
        setNews,
        isLoading,
        deleteNews
    }
}

export default useNews