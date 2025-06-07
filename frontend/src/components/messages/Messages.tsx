import React, {  useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '@/hooks/useGetMessages'
import useListenMessages from '@/hooks/useListenMessages'
import LoadingComponent from '../LoadingComponent'

const Messages = () => {
  const { loading, messages } = useGetMessages()
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useListenMessages()
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className='px-4 h-full scrollbar-hidden overflow-y-auto'>
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}

      {loading && <LoadingComponent/>}
      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages