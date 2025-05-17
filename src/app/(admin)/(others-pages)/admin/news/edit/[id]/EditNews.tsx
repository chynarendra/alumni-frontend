"use client";
import CustomFileUpload from "@/components/ui/CustomFileUpload";
import CustomInput from "@/components/ui/CustomInput";
import TextEditorInput from "@/components/ui/TextEditorInput";
import { useErrorToast } from "@/hooks/useErrorToast";
import { ArrowRightIcon } from "@/icons";
import { getNewsById, updateNews } from "@/services/news.service";
import { INews, INewsCreate, INewsError } from "@/type/INews";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditNews = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useErrorToast();
    const [news, setNews] = useState<INews | null>(null);
    const [error, setError] = useState<INewsError>({ title: '', content: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<INewsCreate>({
        title: '',
        content: '',
        image: null,
        summary: ''
    });

    const fetchNews = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await getNewsById(id);
            if (res.statusCode == 201 || res.statusCode == 200) {
                const data = res.data;
                setNews(data);
                setFormData({
                    title: data.title,
                    content: data.content,
                    image: null,          // keep null until user selects a new file
                    summary: data.summary ?? '',
                });
            } else {
                toast.error(res.message);
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

    const handleValidation = (data: INewsCreate) => {
        const errors: INewsError = { title: '', content: '' };
        if (!data.title.trim()) {
            errors.title = "Title is required";
        }
        if (!data.content.trim()) {
            errors.content = "Content is required";
        }
        setError(errors);
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = handleValidation(formData);
        const hasErrors = validationErrors.title || validationErrors.content;
        if (hasErrors) return;

        try {
            setIsSubmitting(true);

            const form = new FormData();
            form.append("title", formData.title);
            form.append("content", formData.content);
            if (formData.image) {
                form.append("image", formData.image);
            }

            if (!id) {
                toast.error("Id not found");
                return;
            }

            const res = await updateNews(id, form); // Pass the form data

            if (res.statusCode === 200 || res.statusCode === 201) {
                toast.success("News created successfully");
                router.push("/admin/news");
            } else {
                toast.error(res.message || "Something went wrong");
            }
        } catch (err: any) {
            toast.error("Unable to save data");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 w-full overflow-x-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Edit News</h1>
                    <button
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                        onClick={() => router.push("/admin/news")}
                    >
                        Back
                        <ArrowRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                {!isLoading ? <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-full"
                >
                    <CustomInput
                        type="text"
                        label="Title"
                        value={formData.title}
                        onChange={(value) => setFormData({ ...formData, title: value })}
                        error={error?.title}
                        required
                    />

                    <div className="mb-4">
                        <TextEditorInput
                            label="Description"
                            value={formData.content}
                            onChange={(value) => setFormData({ ...formData, content: value })}
                            required
                        />
                    </div>

                    <div className="mt-8">
                        <CustomFileUpload
                            label="Image"
                            onFileChange={(file) =>
                                setFormData((prev) => ({ ...prev, image: file }))
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form> : "Loading..."
                }
            </div>
        </div>
    );
};

export default EditNews;
