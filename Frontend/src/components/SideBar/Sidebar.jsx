import React from 'react'

function Sidebar() {
  return (
    <div className='hidden md:flex md:max-w-2xl   '>
    <aside className='md:w-60  border-r  overflow-y-auto  md:top-10 border-line flex flex-col gap-5 justify-items-center pr-10'>
        <div className='flex flex-col gap-3 border-b py-10'>
            
      <span className='border px-4 rounded py-1'>🏠 Home</span>
      <span className=' px-4 rounded py-1'>🔥 Hot</span>
      <span className=' px-4 rounded py-1'>🆕 New</span>
        </div>

        <div className='flex flex-col gap-4'>
        <span className=' px-4 rounded py-1'>Anime</span>
        <span className=' px-4 rounded py-1'>Sports</span>
        <span className=' px-4 rounded py-1'>Technology</span>
        <span className=' px-4 rounded py-1'>Travel</span>
        <span className=' px-4 rounded py-1'>Games</span>
        <span className=' px-4 rounded py-1'>Food</span>
        <span className=' px-4 rounded py-1'> Music</span>
     
        </div>
      
    </aside>
    </div>
  )
}

export default Sidebar
