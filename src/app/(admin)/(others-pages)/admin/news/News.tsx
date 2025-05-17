"use client"
import React, { useState } from 'react'
import CustomDataTable from '@/components/tables/CustomDataTable';
import { PlusIcon } from '@/icons';
import useNews from '@/hooks/news/useNews';
import { useRouter } from 'next/navigation';
import { INews } from '@/type/INews';
import { ConfirmModal } from '@/components/ui/modal/ConfirmModal';
import { htmlToText } from '@/utils/helper';

const News = () => {
    const { news, isLoading, deleteNews } = useNews();
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>('');
    const newsColumns = [
        {
            label: "SN",
            render: (_: INews, index: number) => index + 1,
        },
        {
            label: "Image",
            render: (row: INews) => (
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
            label: 'Content',
            render: (row: INews) => {
                const plain = htmlToText(row.content);
                return plain.length > 100 ? plain.slice(0, 100) + '…' : plain;
            },
        },
        {
            label: "Actions",
            render: (row: INews) => (
                <div className="flex gap-2">
                    <button
                        className="text-blue-600 hover:underline"
                        onClick={() => router.push(`/admin/news/edit/${row._id}`)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-600 hover:underline"
                        onClick={() => {
                            setSelectedId(row._id);
                            setOpen(true);
                        }}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const handleDelete = async () => {
        await deleteNews(selectedId);
    };
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

            <ConfirmModal
                isOpen={open}
                onCancel={() => setOpen(false)}
                onConfirm={handleDelete}
                message="Delete this item permanently?"
            />

        </div>
    );
}

export default News