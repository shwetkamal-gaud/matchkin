import { useSocketContext } from '@/context/SocketContext'
import useConverstion from '@/store/useConversation'
import { Conversation } from '@/types/types'
import Image from 'next/image'
import React from 'react'

const ConversationJsx = ({ conversation }: { conversation: Conversation, lastIdx: boolean }) => {
    const { selectedConversation, setSelectedConverstion } = useConverstion()

    const isSelected = selectedConversation?._id === conversation._id
    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id)
    return (
        <>
            <button onClick={() => setSelectedConverstion(conversation)} className={`${isSelected ? 'bg-orange-400' : ''} flex gap-2 items-center hover:bg-orange-400 w-full rounded p-2 py-1 cursor-pointer`}>
                <Image className="w-10 h-10 rounded-full" src={conversation.profilePicture} alt="Rounded avatar" width={100} height={100} />
                <div className='flex flex-col items-start w-full'>
                    <p className='font-bold text-gray-900 dark:text-white/80 '>{conversation.name}</p>
                    <span className=' text-gray-500 dark:text-white/60 '>{isOnline ? 'Online' : 'offline'}</span>
                </div>
            </button>
        </>
    )
}

export default ConversationJsx