"use client";
import CustomDatePickerInput from "@/components/ui/CustomDatePickerInput";
import CustomInput from "@/components/ui/CustomInput";
import CustomSelect from "@/components/ui/CustomSelect";
import TextEditorInput from "@/components/ui/TextEditorInput";
import { useErrorToast } from "@/hooks/useErrorToast";
import { ArrowRightIcon } from "@/icons";
import { getJobById, updateJob } from "@/services/jobs.service";
import { IJobCreate, IJobError } from "@/type/IJob";
import { getJobTypeOptions } from "@/utils/helper";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditJob = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const jobTypeOptions = getJobTypeOptions();
    const [isLoading, setIsLoading] = useState(false);
    const { showError } = useErrorToast();
    const [error, setError] = useState<IJobError>({
        title: '',
        description: '',
        company: '',
        location: '',
        jobType: '',
        applicationDeadline: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<IJobCreate>({
        title: '',
        description: '',
        company: '',
        location: '',
        jobType: '',
        salary: '',
        applicationDeadline: ''
    });

    const fetchJobs = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await getJobById(id);
            if (res.statusCode == 201 || res.statusCode == 200) {
                const data = res.data.job;
                setFormData({
                    title: data.title,
                    description: data.description,
                    company: data.company,
                    location: data.location,
                    jobType: data.jobType,
                    salary: data.salary,
                    applicationDeadline: data.applicationDeadline
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
        id && fetchJobs(id);
    }, [fetchJobs, id])

    const handleJobValidation = (data: IJobCreate): IJobError => {
        const errors: IJobError = {
            title: '',
            description: '',
            company: '',
            location: '',
            jobType: '',
            applicationDeadline: '',
        };

        if (!data.title.trim()) {
            errors.title = "Title is required";
        }
        if (!data.description.trim()) {
            errors.description = "Description is required";
        }
        if (!data.company.trim()) {
            errors.company = "Company is required";
        }
        if (!data.location.trim()) {
            errors.location = "Location is required";
        }
        if (!data.jobType.trim()) {
            errors.jobType = "Job type is required";
        }
        if (!data.applicationDeadline.trim()) {
            errors.applicationDeadline = "Application deadline is required";
        }

        setError(errors);
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = handleJobValidation(formData);
        const hasErrors = Object.values(validationErrors).some((val) => val !== "");
        if (hasErrors) {
            setError(validationErrors);
            return;
        }

        try {
            setIsSubmitting(true);
            await updateJob(id, formData)
            toast.success("Job updated successfully");
            router.push("/admin/jobs");
        } catch (err: any) {
            if (err.response?.status === 403) {
                toast.error(err.response.data.message || "You are not authorized to perform this action");
            } else {
                toast.error(err.response?.data?.message || "Unable to save data");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 w-full overflow-x-hidden">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">Edit job</h1>
                    <button
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                        onClick={() => router.push("/admin/jobs")}
                    >
                        Back
                        <ArrowRightIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                {!isLoading ? <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-lg shadow-md space-y-6 w-full max-w-full"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <CustomInput
                            type="text"
                            label="Title"
                            value={formData.title}
                            onChange={(value) => setFormData({ ...formData, title: value })}
                            error={error?.title}
                            required
                        />

                        <CustomInput
                            type="text"
                            label="Company"
                            value={formData.company}
                            onChange={(value) => setFormData({ ...formData, company: value })}
                            error={error?.company}
                            required
                        />

                        <CustomInput
                            type="text"
                            label="Location"
                            value={formData.location}
                            onChange={(value) => setFormData({ ...formData, location: value })}
                            error={error?.location}
                            required
                        />

                        <CustomInput
                            type="text"
                            label="Salary"
                            value={formData.salary}
                            onChange={(value) => setFormData({ ...formData, salary: value })}
                            error={''}
                        />

                        <div className="sm:col-span-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <CustomSelect
                                    label="Job Type"
                                    value={formData.jobType}
                                    onChange={(value) => setFormData({ ...formData, jobType: value })}
                                    options={jobTypeOptions}
                                    required
                                    error={error?.jobType}
                                />

                                <CustomDatePickerInput
                                    label="Start Date"
                                    value={formData.applicationDeadline}
                                    onChange={(value) =>
                                        setFormData({ ...formData, applicationDeadline: value })
                                    }
                                    required
                                    error={error.applicationDeadline}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <TextEditorInput
                            label="Description"
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            required
                            error={error?.description}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form> : "Loading...."
                }

            </div>
        </div>
    );
};

export default EditJob;
