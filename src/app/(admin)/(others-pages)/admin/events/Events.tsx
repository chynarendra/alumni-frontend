"use client";
import React, { useState } from "react";
import CustomDataTable from "@/components/tables/CustomDataTable";
import { PlusIcon } from "@/icons";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/ui/modal/ConfirmModal";
import { useAuth } from "@/context/AuthContext";
import useEvents from "@/hooks/events/useEvents";
import { IEvent } from "@/type/IEvent";

const Events = () => {
  const { events, isLoading, deleteEvent } = useEvents();
  const { user } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const eventColumns = [
    {
      label: "SN",
      render: (_: IEvent, index: number) => index + 1,
    },
    {
      label: "Title",
      accessor: "title" as const,
    },
    {
      label: "Image",
      render: (row: IEvent) => (
        row && <img
          src={process.env.NEXT_PUBLIC_API_BASE_URL+'/'+row.imageUrl}
          alt="Event"
          style={{
            width: 100,
            height: 60,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      )
    },
    {
      label: "Start Date",
      accessor: "startDate" as const,
    },
    {
      label: "End Date",
      accessor: "endDate" as const,
    },
    {
      label: "Type",
      render: (row: IEvent) => (row.isVirtual ? "Virtual" : "In-Person"),
    },
    {
      label: "Actions",
      render: (row: IEvent) => (
        <div className="flex gap-2">

          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push(`/admin/events/edit/${row._id}`)}
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
    await deleteEvent(selectedId);
    setOpen(false);
  };

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Events</h1>
          <button
            className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-2 py-0.5 rounded-md"
            onClick={() => router.push("/admin/events/add")}
          >
            Add
            <PlusIcon className="h-5 w-5 mt-[2px]" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {!isLoading ? (
          <CustomDataTable data={events} columns={eventColumns} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <ConfirmModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
        message="Delete this event permanently?"
      />
    </div>
  );
};

export default Events;
