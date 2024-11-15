import React from 'react'
import Header from '../components/Navbar/Header'
import Sidebar from '../components/SideBar/Sidebar'
import HotSection2 from '../components/HotSection/HotSection2'
import Posts from '../components/post/Posts'
import Trending from '../components/Trending/Trending'

const Home = () => {
  return (
 <>
      <Header />
      <div className="container flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col w-full md:ml-72 h-full  ">
          {/* Hot Section */}
          <HotSection2 />
          
          {/* Posts and Trending */}
          <div className="flex gap-6">
            <div className="md:w-[70%]  h-full ">
              <h1 className='font-semibold text-xl border-b pb-4'>Blogs</h1>
              <Posts />
            </div>
            <Trending/>
          </div>
        </div>
      </div>
      </>
  )
}

export default Home
