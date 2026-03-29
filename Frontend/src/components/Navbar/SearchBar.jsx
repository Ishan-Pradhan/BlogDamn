import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../features/blogSlice";
import { Search, X } from "lucide-react";

function SearchBar() {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.blogs);

  const onToggle = () => {
    setIsClicked((prevState) => !prevState);
    if (isClicked) {
      dispatch(setSearchQuery(""));
    }
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div
      className={
        isClicked
          ? "absolute bg-white top-0 left-0 w-full flex justify-center items-center h-16 z-50 px-4 shadow-md"
          : "relative w-full max-w-sm border border-gray-100 bg-gray-50 rounded-full px-4 flex items-center h-10 group focus-within:border-black focus-within:bg-white transition-all shadow-sm"
      }
    >
      <Search size={18} className="text-gray-400 group-focus-within:text-black mr-2 min-w-[18px]" />
      <input
        className={`${
          isClicked ? "flex" : "hidden"
        } md:flex bg-transparent focus:outline-none w-full text-sm font-medium placeholder:text-gray-400`}
        placeholder="Search stories, topics..."
        type="text"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="md:hidden ml-auto">
        {isClicked ? (
          <X size={20} className="text-gray-500 cursor-pointer" onClick={onToggle} />
        ) : (
          <Search size={20} className="text-gray-500 cursor-pointer" onClick={onToggle} />
        )}
      </div>
    </div>
  );
}

export default SearchBar;

