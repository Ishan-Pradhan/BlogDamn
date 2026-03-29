import React, { useEffect } from "react";
import Header from "../components/Navbar/Header";
import Sidebar from "../components/SideBar/Sidebar";
import HotSection2 from "../components/HotSection/HotSection2";
import Posts from "../components/post/Posts";
import Trending from "../components/Trending/Trending";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, fetchTrendingBlogs } from "../features/blogSlice";


const Home = () => {
  return (
    <>
      <Header />

      <div className="container flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col w-full md:ml-[17.2rem] h-full  ">
          {/* Hot Section */}
          <HotSection2 />

          {/* Posts and Trending */}
          <div className="flex w-full  md:gap-6 mt-8">
            <div className="w-full lg:w-[70%]  h-full ">
              <h1 className="font-bold text-2xl mb-6 pb-2 border-b">Latest Stories</h1>
              <Posts />
            </div>
            <Trending />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

