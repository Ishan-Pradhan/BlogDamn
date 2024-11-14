import React from 'react'
import Header from '../components/Navbar/Header'
import Sidebar from '../components/SideBar/Sidebar'
import HotSection from '../components/HotSection/HotSection'

const Home = () => {
  return (
    <>
    <Header/>
   <div className='container flex gap-10 relative ' style={{height: 'calc(100vh - 4rem)'}}>
    <Sidebar/>
    <div className='flex flex-col w-full overflow-hidden'>
   <HotSection/>
   
   <div className='flex'>
    <div className='w-[70%] border'>post</div>
    <div>trending</div>
   </div>
   
    </div>
  
  
   </div>
    </>
  )
}

export default Home
