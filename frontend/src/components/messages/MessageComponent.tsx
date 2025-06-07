import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import NotSelected from './NotSelected'
import useConverstion from '@/store/useConversation'


const MessageComponent = () => {
  const { selectedConversation } = useConverstion()
  return (
    <div className='col-span-8 flex flex-col h-full shadow-md rounded-r-lg '>
      {
        !selectedConversation ? <NotSelected /> :
          <>
            <div className='rounded-b-lg shadow-md px-4 py-2 mb-2'>
              <span className='dark:text-white text-black'>{selectedConversation.name}</span>
            </div>
            <Messages />
            <MessageInput />
          </>
      }
    </div>
  )
}

export default MessageComponent