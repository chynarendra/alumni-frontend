"use client"
import React, { useState } from 'react'
import CustomDataTable from '@/components/tables/CustomDataTable';
import { PlusIcon } from '@/icons';
import { useRouter } from 'next/navigation';
import { IJob } from '@/type/IJob';
import { ConfirmModal } from '@/components/ui/modal/ConfirmModal';
import useJob from '@/hooks/jobs/useJob';
import { useAuth } from '@/context/AuthContext';
import { UserType } from '@/enum/UserType';

const Jobs = () => {
  const { jobs, isLoading, deleteJob } = useJob();
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>('');

  const jobColumns = [
    {
      label: "SN",
      render: (_: IJob, index: number) => index + 1,
    },
    {
      label: "Title",
      accessor: "title" as const,
    },
    {
      label: "Company",
      accessor: "company" as const,
    },
    {
      label: "Location",
      accessor: "location" as const,
    },
    {
      label: "Job Type",
      accessor: "jobType" as const,
      // optionally format jobType to readable label here if you want
    },

    {
      label: "Application Deadline",
      accessor: "applicationDeadline" as const,
    },
    {
      label: "Actions",
      render: (row: IJob) => (
        <div className="flex gap-2">

          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push(`/admin/jobs/view/${row._id}`)}
          >
            View
          </button>

          {user?.userType == UserType.Alumni && <><button
            className="text-blue-600 hover:underline"
            onClick={() => router.push(`/admin/jobs/edit/${row._id}`)}
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
          </>
          }
        </div>
      ),
    },
  ];

  const handleDelete = async () => {
    await deleteJob(selectedId);
    setOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Jobs</h1>
          {user?.userType == UserType.Alumni && <button
            className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-2 py-0.5 rounded-md"
            onClick={() => router.push('/admin/jobs/add')}
          >
            Add
            <PlusIcon className="h-5 w-5 mt-2" />
          </button>
          }
        </div>
      </div>

      <div className="overflow-x-auto">
        {!isLoading ? <CustomDataTable data={jobs} columns={jobColumns} /> : <p>Loading...</p>}
      </div>

      <ConfirmModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
        message="Delete this job permanently?"
      />
    </div>
  );
}

export default Jobs;
