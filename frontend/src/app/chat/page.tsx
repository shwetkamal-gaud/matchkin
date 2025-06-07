'use client'
import MessageComponent from '@/components/messages/MessageComponent'
import Sidebar from '@/components/sidebar/Sidebar'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ChatPage = () => {
   
    const {authUser} = useAuthContext()
    const router = useRouter();
    useEffect(() => {
        if (!authUser) {
            router.push('/login');
        }
    }, [authUser, router]);

    if (!authUser) return null;
    return (
        <div className='grid grid-cols-12 items-start  w-full px-20 py-10'>
            <Sidebar />
            <MessageComponent />
        </div>
    )
}

export default ChatPage