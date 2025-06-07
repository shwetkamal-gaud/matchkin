'use client'
import MessageComponent from '@/components/messages/MessageComponent'
import Sidebar from '@/components/sidebar/Sidebar'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ChatPage = () => {
   
    const {authUser, loading} = useAuthContext()
    const router = useRouter();
    useEffect(() => {
        if (!authUser && !loading) {
            router.push('/login');
        }
    }, [authUser, router, loading]);

    if (!authUser) return null;
    return (
        <div className='grid grid-cols-12 items-start w-full md:px-18 md:py-9 p-8'>
            <Sidebar />
            <MessageComponent />
        </div>
    )
}

export default ChatPage