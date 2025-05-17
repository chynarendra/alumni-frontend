import React from 'react'
import Profile from './Profile'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const page = () => {
  return (
    <Profile />
  )
}

export default page