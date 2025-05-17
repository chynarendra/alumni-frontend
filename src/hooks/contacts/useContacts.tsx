import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useErrorToast } from '../useErrorToast';
import { IContact } from '@/type/IContact';
import { getContacts } from '@/services/contact.service';

const useContacts = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);
    const { showError } = useErrorToast();
    const [isLoading, setIsLoading] = useState(false);

    const fetchContacts = useCallback(async () => {
        try {
            setIsLoading(true);

            const res = await getContacts();
            if (res.statusCode === 200 || res.statusCode === 201) {
                const data = res.data.contacts;
                setContacts(data);
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            showError(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContacts();
    }, [fetchContacts])

    return {
        contacts,
        setContacts,
        isLoading,
    }
}

export default useContacts