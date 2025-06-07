import useSendMessage from '@/hooks/useSendMessage'
import { Send } from 'lucide-react'
import React, { useState } from 'react'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const {loading, sendMessage} =useSendMessage()
  const handleOnSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!message) return 
    await sendMessage(message)
    setMessage("")
  }
  return (
    <form className='px-4 my-3' onSubmit={handleOnSubmit}>
        <div className='w-full relative'>
              <input type='text' value={message} onChange={(e) => setMessage(e.target.value)}  placeholder='send a message' className='border border-orange-400 text-sm rounded-lg w-full p-2.5 shadow-lg dark:text-white text-black'/>
              <button type='submit' className=' absolute inset-y-0 end-0 flex items-center pe-3'>
                <Send className='text-orange-400'/>
              </button>
        </div>
    </form>
  )
}

export default MessageInput