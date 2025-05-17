import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useErrorToast } from '../useErrorToast';
import { deleteJobData, getJobs } from '@/services/jobs.service';
import { formatToYearMonthDay } from '@/utils/helper';
import { IEvent } from '@/type/IEvent';
import { getEvents } from '@/services/event.service';

const useEvents = () => {
    const [events, setEvents] = useState<IEvent[]>([]);
    const { showError } = useErrorToast();
    const [isLoading, setIsLoading] = useState(false);

    const fetchEvents = useCallback(async () => {
        try {
            setIsLoading(true);

            const res = await getEvents();          // <-- your API call
            if (res.statusCode === 200 || res.statusCode === 201) {
            const data = res.data.events;                // assume array coming back

            const formattedEvents: IEvent[] = data.map((e: any) => ({
                _id: e._id,
                title: e.title,
                description: e.description,
                startDate: formatToYearMonthDay(e.startDate),
                endDate: formatToYearMonthDay(e.endDate),
                location: e.location,
                isVirtual: Boolean(e.isVirtual),
                meetingLink: e.meetingLink ?? '',
                maxAttendees: Number(e.maxAttendees ?? 0),
                imageUrl: e.imageUrl ?? '',
            }));

            setEvents(formattedEvents);           // <-- use the right state setter
            } else {
            toast.error(res.message);
            }
        } catch (err) {
            showError(err);
        } finally {
            setIsLoading(false);
        }
        }, []);

    const deleteEvent = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            const res = await deleteJobData(id);
            if (res.statusCode == 201 || res.statusCode == 200) {
                toast.success("Events deleted successfully.");
                await fetchEvents();
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
        fetchEvents();
    }, [fetchEvents])

    return {
        events,
        setEvents,
        isLoading,
        deleteEvent
    }
}

export default useEvents