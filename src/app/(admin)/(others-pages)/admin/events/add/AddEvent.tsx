"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import CustomInput from "@/components/ui/CustomInput";
import CustomDatePickerInput from "@/components/ui/CustomDatePickerInput";
import TextEditorInput from "@/components/ui/TextEditorInput";
import { ArrowRightIcon } from "@/icons";
import { IEventCreate, IEventError } from "@/type/IEvent";
import { createEvent } from "@/services/event.service";
import CustomFileUpload from "@/components/ui/CustomFileUpload";
import CustomTimePickerInput from "@/components/ui/CustomTimePickerInput";

const AddEvent = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<IEventError>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    maxAttendees: '',
    startTime: '',
    endTime: ''
  });
  const [formData, setFormData] = useState<IEventCreate>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    isVirtual: false,
    meetingLink: '',
    maxAttendees: 0,
    imageUrl: null,
    startTime: '',
    endTime: ''
  });

  const handleValidation = (data: IEventCreate): IEventError => {
    const errors: IEventError = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      maxAttendees: '',
      startTime: '',
      endTime: ''
    };

    if (!data.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!data.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!data.startDate.trim()) {
      errors.startDate = 'Start date is required';
    }

    if (!data.endDate.trim()) {
      errors.endDate = 'End date is required';
    } else if (data.endDate < data.startDate) {
      errors.endDate = 'End date cannot be before start date';
    }

    if (!data.startTime.trim()) errors.startTime = 'Start time is required';
    if (!data.endTime.trim()) {
      errors.endTime = 'End time is required';
    } else if (
      data.startDate === data.endDate &&   // only compare times when on same day
      data.endTime < data.startTime
    ) {
      errors.endTime = 'End time cannot be before start time';
    }

    if (!data.location.trim()) {
      errors.location = 'Location is required';
    }

    if (data.maxAttendees <= 0) {
      errors.maxAttendees = 'Enter a positive number';
    }

    setError(errors);
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = handleValidation(formData);
    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) return;

    try {
      setIsSubmitting(true);

      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("startDate", formData.startDate);
      form.append("endDate", formData.endDate);
      form.append("location", formData.location);
      form.append("isVirtual", String(formData.isVirtual));
      form.append("meetingLink", formData.meetingLink);
      form.append("maxAttendees", String(formData.maxAttendees));
      form.append("startTime",String(formData.startTime));
      form.append("endTime",String(formData.endTime));

      if (formData.imageUrl) {
        form.append("image", formData.imageUrl);
      }

      await createEvent(form);
      toast.success("Event created successfully");
      router.push("/admin/events");
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
          <h1 className="text-2xl font-bold">Add Event</h1>
          <button
            className="flex items-center gap-1 text-blue-600 hover:underline"
            onClick={() => router.push("/admin/events")}
          >
            Back
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6 w-full max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomInput
            type="text"
            label="Title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            required
            error={error.title}
          />

          <CustomInput
            type="text"
            label="Location"
            value={formData.location}
            onChange={(value) => setFormData({ ...formData, location: value })}
            required
            error={error.location}
          />

          <CustomDatePickerInput
            label="Start Date"
            value={formData.startDate}
            onChange={(value) => setFormData({ ...formData, startDate: value })}
            required
            error={error.startDate}
          />

          <CustomTimePickerInput
            label="Start Time"
            value={formData.startTime}
            onChange={(val) => setFormData({ ...formData, startTime: val })}
            error={error.startTime}
            required
          />

          <CustomDatePickerInput
            label="End Date"
            value={formData.endDate}
            onChange={(value) => setFormData({ ...formData, endDate: value })}
            required
            error={error.endDate}
          />

          <CustomTimePickerInput
            label="End Time"
            value={formData.endTime}
            onChange={(val) => setFormData({ ...formData, endTime: val })}
            error={error.endTime}
            required
          />

          <CustomInput
            type="number"
            label="Max Attendees"
            value={formData.maxAttendees.toString()}
            onChange={(value) =>
              setFormData({ ...formData, maxAttendees: parseInt(value) || 0 })
            }
            required
            error={error.maxAttendees}
          />

          <CustomFileUpload
            label="Image"
            onFileChange={(file) =>
              setFormData((prev) => ({ ...prev, imageUrl: file }))
            }
          />

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={formData.isVirtual}
              onChange={(e) =>
                setFormData({ ...formData, isVirtual: e.target.checked })
              }
            />
            <label className="text-sm">Is Virtual Event?</label>
          </div>

          {formData.isVirtual && (
            <CustomInput
              type="text"
              label="Meeting Link"
              value={formData.meetingLink}
              onChange={(val) =>
                setFormData({ ...formData, meetingLink: val })
              }
            />
          )}

        </div>

        <TextEditorInput
          label="Description"
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          required
          error={error.description}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
