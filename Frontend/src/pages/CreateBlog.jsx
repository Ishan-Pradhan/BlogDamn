import React from "react";
import Header from "../components/Navbar/Header";
const CreateBlog = () => {
  return (
    <>
      <Header />
      <div className="container flex flex-col items-center mt-20">
        <div className="flex items-center justify-center border-4 border-gray-300  w-[500px] h-[200px]">
          <span className="text-xl text-gray-400">Blog Banner</span>
        </div>
        <div className="flex justify-start mt-6  w-[500px]">
          <input
            type="text"
            className="border-b-2 border-gray-300 w-full py-3"
            placeholder="Blog Title"
          />
        </div>
        <div className="w-[500px] mt-4">
          <i class="fa-solid fa-plus"></i>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
