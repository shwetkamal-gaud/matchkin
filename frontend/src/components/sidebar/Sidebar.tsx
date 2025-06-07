import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

const Sidebar = () => {
  return (
    <div className='divide-y h-full col-span-4 dark:divide-gray-100 divide-black  shadow-lg rounded-l-lg p-4 flex flex-col'>
      <SearchInput />
      <Conversations />
    </div>
  )
}

export default Sidebar