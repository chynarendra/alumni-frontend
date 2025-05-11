"use client"
import { useAuth } from '@/context/AuthContext'
import React from 'react'

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <div>Welcome {user?.name}</div>
    )
}

export default Dashboard