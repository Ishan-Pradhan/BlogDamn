import React from 'react'

function Sidebar() {
  return (
    <div className='hidden md:flex md:max-w-2xl h-full '>
    <aside className='md:w-60  border-r fixed h-full  md:top-14 border-line flex flex-col gap-5 justify-items-center pr-10  overflow-y-auto'>
        <div className='flex flex-col gap-3 border-b py-10'>
            
      <span className='border px-4 rounded py-1 bg-line font-semibold hover:bg-gray-100 hover:cursor-pointer'>🏠 Home</span>
      <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer '>🔥 Hot</span>
      <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'>🆕 New</span>
        </div>

        <div className='flex flex-col gap-4 pb-20'>
        <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'>Anime</span>
        <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'>Sports</span>
        <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'>Technology</span>
        <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'>Travel</span>
        <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'>Games</span>
        <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'>Food</span>
        <span className=' px-4 rounded py-1 font-semibold hover:bg-gray-100 hover:cursor-pointer'> Music</span>
     
        </div>
      
    </aside>
    </div>
  )
}

export default Sidebar
