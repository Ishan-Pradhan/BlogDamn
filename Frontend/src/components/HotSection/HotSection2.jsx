import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';


function HotSection2() {
  return (
    <div className='my-10 rounded-xl overflow-hidden'>

    <Splide options={ {
       perPage: 2.2,
        perMove:1,
        rewind:true,
        breakpoints: {
            1200:{ perPage: 2, gap:'1rem'},
            640: { perPage: 1, height: '14rem' },
           
          },
        gap   : '1rem',
        height: '18rem',
        pagination: false,
    } } aria-label="My Favorite Images">
    <SplideSlide>
    <span className='absolute right-2 top-2'>🔥</span>
                <div className='absolute rounded-xl  h-full w-full flex flex-col p-5  justify-end text-white' style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)'}}>
<h2 className='text-3xl font-semibold mb-2 tracking-wide'>Demon Slayer Trilogy</h2>
<p className='font-light text-[16px] mb-3 tracking-wide'>Demon Slayer: Kimesu no Yaiba Infinity Arc trai...</p>
<div className='flex items-center gap-2'>
    <img src="../../images/avatar.jpg" className='h-8 w-8 object-contain border rounded-full' alt="" />
    <span className='text-xs font-semibold tracking-wide'>Jhau Lagyo</span>
</div>

                </div>
      <img src="images/photo1.jpg" className="h-full w-full object-cover rounded-xl border border-line" alt="Image 1"/>
    </SplideSlide>
    <SplideSlide>
    <span className='absolute right-2 top-2'>🔥</span>
                <div className='absolute rounded-xl  h-full w-full flex flex-col p-5  justify-end text-white' style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)'}}>
<h2 className='text-3xl font-semibold mb-2 tracking-wide'>Demon Slayer Trilogy</h2>
<p className='font-light text-[16px] mb-3 tracking-wide'>Demon Slayer: Kimesu no Yaiba Infinity Arc trai...</p>
<div className='flex items-center gap-2'>
    <img src="../../images/avatar.jpg" className='h-8 w-8 object-contain border rounded-full' alt="" />
    <span className='text-xs font-semibold tracking-wide'>Jhau Lagyo</span>
</div>

                </div>
        
      <img src="images/photo2.jpg"  className="h-full w-full object-cover rounded-xl border border-line" alt="Image 2"/>
    </SplideSlide>
    <SplideSlide>
    <span className='absolute right-2 top-2'>🔥</span>
                <div className='absolute rounded-xl  h-full w-full flex flex-col p-5  justify-end text-white' style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)'}}>
<h2 className='text-3xl font-semibold mb-2 tracking-wide'>Demon Slayer Trilogy</h2>
<p className='font-light text-[16px] mb-3 tracking-wide'>Demon Slayer: Kimesu no Yaiba Infinity Arc trai...</p>
<div className='flex items-center gap-2'>
    <img src="../../images/avatar.jpg" className='h-8 w-8 object-contain border rounded-full' alt="" />
    <span className='text-xs font-semibold tracking-wide'>Jhau Lagyo</span>
</div>

                </div>
      <img src="images/photo2.jpg"  className="h-full w-full object-cover rounded-xl" alt="Image 2"/>
    </SplideSlide>
    <SplideSlide>
    <span className='absolute right-2 top-2'>🔥</span>
                <div className='absolute rounded-xl  h-full w-full flex flex-col p-5  justify-end text-white' style={{background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)'}}>
<h2 className='text-3xl font-semibold mb-2 tracking-wide'>Demon Slayer Trilogy</h2>
<p className='font-light text-[16px] mb-3 tracking-wide'>Demon Slayer: Kimesu no Yaiba Infinity Arc trai...</p>
<div className='flex items-center gap-2'>
    <img src="../../images/avatar.jpg" className='h-8 w-8 object-contain border rounded-full' alt="" />
    <span className='text-xs font-semibold tracking-wide'>Jhau Lagyo</span>
</div>

                </div>
      <img src="images/photo2.jpg"  className="h-full w-full object-cover rounded-xl" alt="Image 2"/>
    </SplideSlide>
  </Splide>
</div>
  )
}

export default HotSection2
