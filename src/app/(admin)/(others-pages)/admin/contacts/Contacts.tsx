"use client";
import React, { useState } from "react";
import CustomDataTable from "@/components/tables/CustomDataTable";
import { useRouter } from "next/navigation";
import useContacts from "@/hooks/contacts/useContacts";
import { IContact } from "@/type/IContact";

const Contacts = () => {
  const { contacts, isLoading } = useContacts();
  const router = useRouter();

  const contactsColumns = [
    {
      label: "SN",
      render: (_: IContact, index: number) => index + 1,
    },
    {
      label: "Name",
      accessor: "name" as const,
    },
    {
      label: "Email",
      accessor: "email" as const,
    },
    {
      label: "Subject",
      accessor: "subject" as const,
    },
    {
      label: "Message",
      accessor: "message" as const,
    },
    {
      label: "Actions",
      render: (row: IContact) => (
        <div className="flex gap-2">

          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push(`/admin/events/edit/${row._id}`)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Contacts</h1>
        </div>
      </div>

      <div className="overflow-x-auto">
        {!isLoading ? (
          <CustomDataTable data={contacts} columns={contactsColumns} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Contacts;
