import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory, setSelectedSort } from "../../features/blogSlice";
import { Home, Flame, Clock, Hash } from "lucide-react";

function Sidebar() {
  const dispatch = useDispatch();
  const { selectedCategory, selectedSort } = useSelector((state) => state.blogs);

  const categories = [
    "Anime", "Sports", "Technology", "Travel", "Games", "Food", "Music"
  ];

  const handleCategoryClick = (cat) => {
    dispatch(setSelectedCategory(cat));
    dispatch(setSelectedSort("newest")); // Reset sort when changing category usually
  };

  const handleSortClick = (sort) => {
    dispatch(setSelectedSort(sort));
    dispatch(setSelectedCategory("Home")); // Reset category when clicking Home/Hot/New usually, or keep it? 
    // Usually Home/Hot/New are global filters.
  };

  const isActive = (type, value) => {
    if (type === "category") return selectedCategory === value;
    if (type === "sort") return selectedSort === value;
    return false;
  };

  return (
    <div className="hidden md:flex md:w-64 h-full relative">
      <aside className="w-64 border-r fixed h-[calc(100vh-64px)] top-16 border-gray-100 flex flex-col pt-8 pb-10 overflow-y-auto bg-white pr-4">
        <div className="flex flex-col gap-1 mb-8">
          <button
            onClick={() => handleSortClick("newest")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              selectedSort === "newest" && selectedCategory === "Home" 
                ? "bg-black text-white" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Home size={18} />
            <span>Home</span>
          </button>
          <button
            onClick={() => handleSortClick("popular")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              selectedSort === "popular" 
                ? "bg-black text-white" 
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Flame size={18} />
            <span>Hot</span>
          </button>
          <button
            onClick={() => handleSortClick("newest")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              selectedSort === "newest" && selectedCategory !== "Home"
                ? "text-gray-600 hover:bg-gray-100" // New is just newest
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Clock size={18} />
            <span>New</span>
          </button>
        </div>

        <div className="px-4 mb-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</span>
        </div>

        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                selectedCategory === cat 
                  ? "bg-black text-white shadow-lg shadow-gray-200" 
                  : "text-gray-500 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <Hash size={16} className={selectedCategory === cat ? "text-gray-400" : "text-gray-300"} />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;

