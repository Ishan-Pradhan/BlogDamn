import React from 'react'

function Trending() {
  return (
    <div className="sticky hidden md:flex flex-col top-24 w-[30%] max-h-96 bg-[#F1F1F1] border border-line rounded-xl">
<span className='flex justify-center font-semibold text-lg border-b border-line py-2' >Trending</span>
<div className="px-6">
<div className='flex gap-3  py-4 w-full items-center border-b border-line'>
  <span className='text-5xl font-bold text-gray-500'>01</span>
  <div className="flex flex-col  w-full">
    <div className='flex justify-between'>
    <span className='text-[11px] font-semibold text-gray-800'>AnimeHerneManxey</span>
    <span className='text-[11px] font-normal text-gray-700'>July 1</span>
    </div>
    <span className='font-bold tracking-wide'>Chris Paul to Spurs</span>
 
</div>
</div>
</div>
    </div>
  )
}

export default Trending
