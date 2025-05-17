"use client";
import React, { useState } from "react";
import HeaderMenus from "@/components/frontend/HeaderMenus";
import Footer from "@/components/frontend/Footer";
import toast from "react-hot-toast";
import HeroSection from "@/components/frontend/HeroSection";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            toast.error("All fields are required.");
            return;
        }

        // Simulate sending form data
        toast.success("Your message has been sent!");
        setFormData({ name: "", email: "", subject: "", message: "" });
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
                        <label className="block font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            name="message"
                            rows={5}
                            className="w-full border border-gray-300 rounded px-4 py-2"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;
