"use client";
import React, { useState } from "react";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import toast from "react-hot-toast";
import HeroSection from "@/components/frontend/HeroSection";
import CustomInput from "@/components/ui/CustomInput";
import { IContactError } from "@/type/IContact";
import CustomTextArea from "@/components/ui/CustomTextArea";
import { createContact } from "@/services/contact.service";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<IContactError>({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleValidation = (data: IContactError) => {
        const errors: IContactError = {
            name: "",
            email: "",
            subject: "",
            message: "",
        };
        if (!data.name.trim()) {
            errors.name = "Name is required";
        }
        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else {
            // basic RFC‑5322–ish pattern
            const emailPattern = /^[\w.+-]+@[a-z\d-]+(\.[a-z\d-]+)*\.[a-z]{2,}$/i;
            if (!emailPattern.test(data.email)) {
                errors.email = "Please enter a valid email address";
            }
        }
        if (!data.subject.trim()) {
            errors.subject = "Subject is required";
        }

        if (data.subject.length <= 4) {
            errors.subject = "Subject is must be greater than 4 character";
        }

        if (!data.message.trim()) {
            errors.message = "Message is required";
        }

        if (data.message.length <= 10) {
            errors.message = "Message must be at least 10 characters long";
        }

        setError(errors);
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = handleValidation(formData);
        const hasErrors = validationErrors.name || validationErrors.email || validationErrors.subject || validationErrors.message;
        if (hasErrors) return;

        try {
            setIsSubmitting(true);
            await createContact(formData);
            toast.success("Message sent successfully");
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            })
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
        <div className="min-h-screen bg-gray-50">
            <HeaderMenus />

            <HeroSection
                title="Contacts"
                description="Get more information about us"
            />

            <div className="container mx-auto px-4 py-16 max-w-3xl">

                <form onSubmit={handleSubmit} className="grid gap-6 bg-white p-8 shadow-md rounded-lg">
                    <div>
                        <CustomInput
                            type="text"
                            label="Name"
                            value={formData.name}
                            onChange={(value) => setFormData({ ...formData, name: value })}
                            error={error?.name}
                            required
                        />
                    </div>

                    <div>
                        <CustomInput
                            type="text"
                            label="Email"
                            value={formData.email}
                            onChange={(value) => setFormData({ ...formData, email: value })}
                            error={error?.email}
                            required
                        />
                    </div>

                    <div>
                        <CustomInput
                            type="text"
                            label="Subject"
                            value={formData.subject}
                            onChange={(value) => setFormData({ ...formData, subject: value })}
                            error={error?.subject}
                            required
                        />
                    </div>

                    <div>
                        <CustomTextArea
                            label="Message"
                            onChange={(value) => setFormData({ ...formData, message: value })}
                            value={formData.message}
                            error={error?.message}
                            required={true}
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition"
                    >
                        {!isSubmitting ? "Send Message" : "Submitting..."}
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
