import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white py-6 text-center shadow-inner">
            <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} MyCompany. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer