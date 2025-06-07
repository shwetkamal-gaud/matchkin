import useGetConversation from '@/hooks/useGetConverstion'
import useConverstion from '@/store/useConversation'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

const SearchInput = () => {
  const [search, setSearch] = useState('')
  const {setSelectedConverstion} = useConverstion()
  const {conversations} =useGetConversation()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!search) return
    const conversation = conversations.find((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    if(conversation){
      setSelectedConverstion(conversation)
      setSearch('')
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2 border-b-gray-500 py-2'>
          <input value={search} onChange={(e)=> setSearch(e.target.value)} className='px-4 py-2 border border-orange-400 w-full text-gray-600 dark:text-white/80 bg-transparent focus:outline-none focus:border-orange-500 rounded-full' type='text' placeholder='Search...'/>
          <button type='submit' className='bg-orange-200 dark:bg-orange-500  dark:shadow-lg rounded-full p-2  text-white'>
            <Search className='text-white'/>
          </button>
    </form>
  )
}

export default SearchInput