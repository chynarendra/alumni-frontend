import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useErrorToast } from '../useErrorToast';
import { IContact } from '@/type/IContact';
import { deleteContactData, getContacts, getPersonalContacts } from '@/services/contact.service';
import { useAuth } from '@/context/AuthContext';

const useContacts = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);
    const { showError } = useErrorToast();
    const [isLoading, setIsLoading] = useState(false);
    const { user, isAuthLoading } = useAuth();

    const fetchContacts = useCallback(async (userType: string) => {
        try {
            setIsLoading(true);
            if (userType == "Student") {

                const res = await getPersonalContacts();
                if (res.statusCode === 200 || res.statusCode === 201) {
                    const data = res.data;
                    setContacts(data);
                } else {
                    toast.error(res.message);
                }
            } else {
                const res = await getContacts();
                if (res.statusCode === 200 || res.statusCode === 201) {
                    const data = res.data;
                    setContacts(data);
                } else {
                    toast.error(res.message);
                }
            }

        } catch (err) {
            showError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteContact = useCallback(async (id: string) => {
        try {
            setIsLoading(true);
            if (!user) {
                toast.error("User not found");
                return;
            }
            const res = await deleteContactData(id);
            if (res.statusCode === 201 || res.statusCode === 200) {
                toast.success("Contact deleted successfully.");
                await fetchContacts(user?.userType);
            } else {
                toast.error(res.message);
            }
        } catch (err: any) {
            if (err?.response?.status === 401 || err?.statusCode === 401) {
                toast.error("Unauthorized access. Please log in again.");
                // Optionally redirect to login page if needed
            } else {
                showError(err); // your existing error handler
            }
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!isAuthLoading && user) {
            console.log("user in contact=", user);
            fetchContacts(user.userType);
        }
    }, [fetchContacts, user, isAuthLoading]);

    return {
        contacts,
        setContacts,
        isLoading,
        deleteContact,
        user
    }
}

export default useContacts