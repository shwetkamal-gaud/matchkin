'use client'
import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '@/hooks/useGetConverstion'
import LoadingComponent from '../LoadingComponent'

const Conversations = () => {
  const { loading, conversations } = useGetConversation()
  return (
    <div className='py-2 flex flex-col h-full w-full overflow-auto'>
      {loading ? <LoadingComponent/>:
        <div className='divide-y-1 divide-amber-500 py-1'>

          {conversations.map((item, idx) => (
            <Conversation key={item._id}
              conversation={item}
              lastIdx={conversations.length - 1 === idx}
            />
          ))}
        </div>
      }
    </div>
  )
}

export default Conversations