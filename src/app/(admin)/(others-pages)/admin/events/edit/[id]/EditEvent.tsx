"use client";
import CustomDatePickerInput from "@/components/ui/CustomDatePickerInput";
import CustomFileUpload from "@/components/ui/CustomFileUpload";
import CustomInput from "@/components/ui/CustomInput";
import TextEditorInput from "@/components/ui/TextEditorInput";
import { useErrorToast } from "@/hooks/useErrorToast";
import { ArrowRightIcon } from "@/icons";
import { getEventById, updateEvent } from "@/services/event.service";
import { IEventCreate, IEventError } from "@/type/IEvent";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { showError } = useErrorToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<IEventError>({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    maxAttendees: '',
  });
  const [formData, setFormData] = useState<IEventCreate>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    isVirtual: false,
    meetingLink: "",
    maxAttendees: 0,
    imageUrl: null
  });

  const fetchEvent = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getEventById(id);
      if (res.statusCode === 200 || res.statusCode === 201) {
        const data = res.data.event;
        setFormData({
          title: data.title,
          description: data.description,
          startDate: data.startDate,
          endDate: data.endDate,
          location: data.location,
          isVirtual: data.isVirtual,
          meetingLink: data.meetingLink,
          maxAttendees: data.maxAttendees,
          imageUrl: data.imageUrl,
        });
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      showError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) fetchEvent();
  }, [fetchEvent, id]);

  const handleValidation = (data: IEventCreate): IEventError => {
    const errors: IEventError = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      maxAttendees: '',
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
      if (formData.imageUrl) {
        form.append("image", formData.imageUrl);
      }

      await updateEvent(id, form);
      toast.success("Event updated successfully");
      router.push("/admin/events");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Unable to update event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full overflow-x-hidden">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <button
          className="flex items-center gap-1 text-blue-600 hover:underline"
          onClick={() => router.push("/admin/events")}
        >
          Back
          <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        {!isLoading ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-md space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                type="text"
                label="Title"
                value={formData.title}
                onChange={(val) => setFormData({ ...formData, title: val })}
                required
              />
              <CustomInput
                type="text"
                label="Location"
                value={formData.location}
                onChange={(val) => setFormData({ ...formData, location: val })}
                required
              />
              <CustomDatePickerInput
                label="Start Date"
                value={formData.startDate}
                onChange={(val) => setFormData({ ...formData, startDate: val })}
                required
              />
              <CustomDatePickerInput
                label="End Date"
                value={formData.endDate}
                onChange={(val) => setFormData({ ...formData, endDate: val })}
                required
              />
              <CustomInput
                type="number"
                label="Max Attendees"
                value={formData.maxAttendees.toString()}
                onChange={(val) =>
                  setFormData({ ...formData, maxAttendees: Number(val) })
                }
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
              onChange={(val) => setFormData({ ...formData, description: val })}
              required
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Update Event"}
            </button>
          </form>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
};

export default EditEvent;
