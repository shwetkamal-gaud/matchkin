import { MessageCircle } from 'lucide-react'
import React from 'react'

const NotSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
          <div className='px-4 text-center sm:text-lg md:text-xl dark:text-white text-black font-semibold flex flex-col items-center gap-2'>
            <p>Welcome John DOe</p>
            <p>Select a chat to start a messaging </p>
            <MessageCircle className='text-orange-500 text-7xl' size={60}/>
          </div>
    </div>
  )
}

export default NotSelected