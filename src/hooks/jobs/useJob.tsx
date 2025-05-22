import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useErrorToast } from '../useErrorToast';
import { IJob } from '@/type/IJob';
import { deleteJobData, getJobs } from '@/services/jobs.service';
import { title } from 'process';
import { formatToYearMonthDay } from '@/utils/helper';
import { jobTypeFormatter } from '@/enum/JobType';

const useJob = () => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const { showError } = useErrorToast();
    const [isLoading, setIsLoading] = useState(false);

    const fetchJobs = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getJobs();
            if (res.statusCode == 201 || res.statusCode == 200) {
                const data = res.data.jobs;
                const formattedJobs: IJob[] = data.map((j: any) => ({
                    _id: j._id,
                    title: j.title,
                    description: j.description,
                    company: j.company,
                    location: j.location,
                    jobType: jobTypeFormatter(j.jobType),
                    salary: j.salary,
                    applicationDeadline: formatToYearMonthDay(j.applicationDeadline),
                }));
                setJobs(formattedJobs);
            } else {
                toast.error(res.message);
            }
            setIsLoading(false);
        } catch (err) {
            showError(err);
            setIsLoading(false);
        }
    }, []);

    const deleteJob = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await deleteJobData(id);
            if (res.statusCode == 201 || res.statusCode == 200) {
                toast.success("Job deleted successfully.");
                await fetchJobs();
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
        fetchJobs();
    }, [fetchJobs])

    return {
        jobs,
        setJobs,
        isLoading,
        deleteJob
    }
}

export default useJob