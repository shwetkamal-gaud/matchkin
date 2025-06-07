import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'

const Sidebar = () => {
  return (
    <div className='divide-y h-full dark:bg-[#2e2d2b] col-span-4 dark:divide-gray-100 divide-black  dark:shadow-xxl shadow-md rounded-l-lg p-4 flex flex-col'>
      <SearchInput />
      <Conversations />
    </div>
  )
}

export default Sidebar