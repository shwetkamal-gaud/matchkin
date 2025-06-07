import { useAuthContext } from '@/context/AuthContext'
import { extractTime } from '@/lib/extractTime'
import useConverstion from '@/store/useConversation'
import { Messages } from '@/types/types'
import Image from 'next/image'
import React from 'react'

const Message = ({ message }: { message: Messages }) => {
    const { selectedConversation } = useConverstion()
    const {authUser} = useAuthContext()
    const forMe = message.senderId === authUser?._id
    const chatClass = forMe ? 'justify-end ' : 'justify-start'
    const profilePic = forMe ? authUser?.profilePic : selectedConversation?.profilePicture ?? ''
    const bgColor = forMe ? '' : 'bg-orange-500 text-white'
    return (
        <div className='flex flex-col gap-1 dark:text-white text-gray-600'>
            <div className={`flex ${chatClass} w-full gap-2`}>
                <div className={`${bgColor} rounded-full p-2 shadow-md`}>{message?.message}</div>
                <Image width={100} height={100} className="w-10 h-10 rounded-full" src={profilePic} alt="Rounded avatar" />
            </div>
            <div className={`flex ${chatClass} w-full`}>{extractTime(message.timestamp)}</div>
        </div>
    )
}

export default Message