import { ChevronDownIcon } from '@/icons'
import Link from 'next/link'
import React from 'react'

const HeaderMenus = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-green-600 hover:text-green-700 transition">
                    MyCompany
                </Link>

                <div className="flex items-center space-x-6">
                    <ul className="flex items-center space-x-6 font-medium relative">
                        <li>
                            <Link href="/about-us">About Us</Link>
                        </li>

                        {/* Services Dropdown */}
                        <li className="relative group">
                            <button className="flex items-center gap-1 hover:text-green-600 transition">
                                Services
                                <ChevronDownIcon className="w-4 h-4" />
                            </button>
                            <ul className="absolute hidden group-hover:block bg-white shadow-lg rounded mt-2 py-2 w-40 text-sm z-10">
                                <li>
                                    <Link href="/jobs" className="block px-4 py-2 hover:bg-gray-100">
                                        Jobs
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/events" className="block px-4 py-2 hover:bg-gray-100">
                                        Events
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/news" className="block px-4 py-2 hover:bg-gray-100">
                                        News
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <Link href="/contact">Contact</Link>
                        </li>
                    </ul>

                    {/* Login Button */}
                    <Link href="/signup">
                        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                            Login
                        </button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default HeaderMenus