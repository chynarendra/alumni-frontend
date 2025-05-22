import Link from 'next/link';
import React from 'react'

interface HeroSectionProps {
    title?: string;
    description?: string;
    url?: string
}

const HeroSection = ({ title, url, description }: HeroSectionProps) => {
    return (
        <section className="text-center py-20 bg-gradient-to-br from-green-100 to-green-300">
            <h2 className="text-4xl font-bold mb-4"><Link href={url ? url : "/"}>{title ? title : "Welcome to MyCompany"}</Link></h2>
            <p className="text-lg text-gray-700 max-w-xl mx-auto">
                {description ? description : "Discover job opportunities, upcoming events, news, and more."}
            </p>
        </section>
    )
}

export default HeroSection