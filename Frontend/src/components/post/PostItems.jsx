import React from 'react'

function PostItems() {
  return (
    <div className='flex px-2 py-10 gap-6 items-center border-b border-line h-full'>
      <div className='flex flex-col w-full h-full'>
        <div className='flex gap-2 items-center mb-2'>
            <img src="images/avatar.jpg" className='h-8 w-8 rounded-full' alt="" />
            <span className='text-base'>Eh Horaa</span>
        </div>
       <span className='text-lg font-bold mb-1'>Demon slayer is slaying demon</span>
       <p className='text-sm font-thin line-clamp-2 mb-2'>The "Demon Slayer" series has captured the hearts of fans worldwide with its gripping narrative, stunning animation, and unforgettable characters. As the saga continues, the excitement reaches new heights with the upcoming release of "Demon Slayer: Infinity Castle."</p>
       <span className='text-gray-600 text-xs '>20h ago</span>
      </div>
      <div className='w-1/2 h-full object-cover rounded-xl'><img src="images/photo2.jpg" className='rounded-xl h-full border border-line' alt="" /></div>
    </div>
  )
}

export default PostItems
