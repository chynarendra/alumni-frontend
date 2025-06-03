"use client";
import React, { useState } from "react";
import CustomDataTable from "@/components/tables/CustomDataTable";
import { useRouter } from "next/navigation";
import useContacts from "@/hooks/contacts/useContacts";
import { IContact } from "@/type/IContact";
import { PlusIcon } from "@/icons";
import { useAuth } from "@/context/AuthContext";
import { ConfirmModal } from "@/components/ui/modal/ConfirmModal";

const Contacts = () => {
  const { contacts, isLoading, deleteContact } = useContacts();
  const { user } = useAuth();
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteContact(selectedId);
  };

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
          {user?.userType == "Student" && <button
            className="text-red-600 hover:underline"
            onClick={() => {
              setSelectedId(row._id);
              setOpen(true);
            }}
          >
            Delete
          </button>
          }
        </div>
      ),
    }
  ];

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">Contacts</h1>
          {user?.userType == "Student" && <button
            className="flex items-center gap-1 text-white bg-green-600 hover:bg-green-700 px-2 py-0.5 rounded-md"
            onClick={() => router.push('/admin/contacts/add')}
          >
            Add
            <PlusIcon className="h-5 w-5 mt-2" />
          </button>
          }
        </div>
      </div>

      <div className="overflow-x-auto">
        {!isLoading ? (
          <CustomDataTable data={contacts} columns={contactsColumns} />
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <ConfirmModal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDelete}
        message="Delete this item permanently?"
      />
    </div>
  );
};

export default Contacts;
