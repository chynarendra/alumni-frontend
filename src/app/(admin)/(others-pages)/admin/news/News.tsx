"use client"
import React from 'react'
import CustomDataTable from '@/components/tables/CustomDataTable';
import { PlusIcon } from '@/icons';
import useNews from '@/hooks/news/useNews';
import { useRouter } from 'next/navigation';

export type News = {
    title: string;
    content: string;
    imageUrl: string;
};

const News = () => {
    const { news, isLoading } = useNews();
    const router = useRouter();
    const newsColumns = [
        {
            label: "SN",
            render: (_: News, index: number) => index + 1,
        },
        {
            label: "Image",
            render: (row: News) => (
                <img
                    src={row.imageUrl}
                    alt="News"
                    style={{
                        width: 100,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 4,
                    }}
                />
            ),
        },
        {
            label: "Title",
            accessor: "title" as const,
        },
        {
            label: "Content",
            render: (row: News) =>
                row.content.length > 100
                    ? row.content.slice(0, 100) + "..."
                    : row.content,
        },
        {
            label: "Actions",
            render: (row: News) => (
                <div className="flex gap-2">
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => console.log("Edit", row)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-600 hover:underline"
                        onClick={() => console.log("Delete", row)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div className="p-4 sm:p-6 w-full overflow-x-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">News</h1>
                    <button
                        className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-2 py-0.5 rounded-md"
                        onClick={() => router.push('/admin/news/add')}
                    >
                        Add
                        <PlusIcon className="h-5 w-5 mt-2" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                {!isLoading ? <CustomDataTable data={news} columns={newsColumns} /> : <p>loading...</p>}
            </div>
        </div>
    );
}

export default News