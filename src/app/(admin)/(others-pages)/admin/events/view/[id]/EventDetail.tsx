"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { getEventById, getEventAttendees, bookEvent } from "@/services/event.service";
import { IEvent, IAttendee } from "@/type/IEvent";
import { ArrowRightIcon, InfoIcon } from "@/icons";

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [event, setEvent] = useState<IEvent | null>(null);
    const [attendees, setAttendees] = useState<IAttendee[]>([]);
    const [activeTab, setActiveTab] = useState<"details" | "attendees">("details");

    /* ── fetchers ─────────────────────────────────────── */
    const fetchEvent = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getEventById(id);
            if (res.statusCode === 200) setEvent(res.data.event);
            else toast.error(res.message);
        } catch {
            toast.error("Failed to load event");
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const fetchAttendees = useCallback(async () => {
        try {
            const res = await getEventAttendees(id);
            if (res.statusCode === 200) setAttendees(res.data);
            else toast.error(res.message);
        } catch {
            toast.error("Failed to load attendees");
        }
    }, [id]);

    const handleBook = async () => {
        try {
            setIsLoading(true);
            localStorage.removeItem("book_event_id");
            const res = await bookEvent(id);
            if (res.statusCode === 200) {
                toast.success("Your booking completed successfully");
                await fetchAttendees();
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong while booking";
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchEvent();
            fetchAttendees();
        }
    }, [id, fetchEvent, fetchAttendees]);

    const fmtDate = (d: string) =>
        new Date(d).toLocaleDateString();
    const fmtTime = (t: string) =>
        new Date(`1970-01-01T${t}:00`).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    if (isLoading || !event) return <p className="p-6">Loading…</p>;

    return (
        <div className="p-4 sm:p-6 w-full overflow-x-hidden">
            {/* header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">{event.title}</h1>
                <button
                    onClick={() => router.push("/admin/events")}
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                    Back
                    <ArrowRightIcon className="h-5 w-5" />
                </button>
            </div>

            {/* tabs */}
            <div className="border-b mb-4">
                {["details", "attendees"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 -mb-px border-b-2 transition ${activeTab === tab
                            ? "border-blue-600 font-semibold text-blue-600"
                            : "border-transparent text-gray-600 hover:text-blue-600"
                            }`}
                    >
                        {tab === "details" ? "Details" : "Attendees"}
                    </button>
                ))}
            </div>

            {/* DETAILS TAB */}
            {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Detail label="Title" value={event.title} />
                    <Detail label="Location" value={event.location} />
                    <Detail label="Start Date" value={fmtDate(event.startDate)} />
                    <Detail label="Start Time" value={fmtTime(event.startTime)} />
                    <Detail label="End Date" value={fmtDate(event.endDate)} />
                    <Detail label="End Time" value={fmtTime(event.endTime)} />
                    <Detail label="Max Attendees" value={event.maxAttendees} />
                    <Detail label="Virtual" value={event.isVirtual ? "Yes" : "No"} />
                    {event.isVirtual && (
                        <Detail
                            label="Meeting Link"
                            value={
                                <a href={event.meetingLink} className="text-blue-600 underline break-all" target="_blank">
                                    {event.meetingLink}
                                </a>
                            }
                        />
                    )}
                    <div className="md:col-span-2">
                        <p className="font-medium mb-1">Description</p>
                        <div
                            className="prose max-w-none border rounded p-4 bg-gray-50"
                            dangerouslySetInnerHTML={{ __html: event.description }}
                        />
                    </div>
                    {event.imageUrl && (
                        <div className="md:col-span-2">
                            <img src={process.env.NEXT_PUBLIC_API_BASE_URL + '/' + event.imageUrl} alt={event.title} className="w-full rounded-lg" />
                        </div>
                    )}

                    <div className="md:col-span-2 flex mt-4">
                        <button
                            onClick={handleBook}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                        >
                            <InfoIcon className="h-5 w-5" />
                            Book Event
                        </button>
                    </div>
                </div>
            )}

            {/* ATTENDEES TAB */}
            {activeTab === "attendees" && (
                attendees.length ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100">
                                <tr>
                                    <Th>#</Th>
                                    <Th>Name</Th>
                                    <Th>Email</Th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {attendees.map((a, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <Td>{i + 1}</Td>
                                        <Td>{a.userId?.name}</Td>
                                        <Td>{a.userId?.email}</Td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>No attendees yet.</p>
                )
            )}
        </div>
    );
};

/* ── helpers ─────────────────────────────────────────── */
const Detail = ({ label, value }: { label: string; value: React.ReactNode }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-lg font-medium break-words">{value}</p>
    </div>
);

const Th: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = (props) => (
    <th {...props} className="px-3 py-2 text-left font-semibold text-gray-700" />
);
const Td: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = (props) => (
    <td {...props} className="px-3 py-2" />
);

export default EventDetail;
