import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { TrendingUp, User } from "lucide-react";
import api from "../../api/api";

function Trending() {
  const { data: trendingBlogs, isLoading } = useQuery({
    queryKey: ["trending", "sidebar"],
    queryFn: async () => {
      const response = await api.get("/blogs?limit=5&sort=popular");
      return response.data.blogs;
    },
  });

  const blogs = trendingBlogs || [];

  const formatDate = (dateString) => {

    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="sticky hidden lg:flex flex-col top-24 w-[30%] h-fit bg-gray-50/50 border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 bg-white">
        <TrendingUp size={18} className="text-gray-900" />
        <h2 className="font-bold text-lg text-gray-900">Trending Now</h2>
      </div>

      <div className="flex flex-col bg-white/50 backdrop-blur-sm">
        {(isLoading ? [1, 2, 3, 4, 5] : blogs).map((blog, index) => (
          <div key={blog._id || index} className="px-6 py-5 flex gap-4 border-b border-gray-100 last:border-0 hover:bg-white transition-colors group">

            <span className={`text-3xl font-serif font-black ${index < 3 ? "text-gray-900" : "text-gray-200"} opacity-20 group-hover:opacity-40 transition-opacity`}>
              {String(index + 1).padStart(2, "0")}
            </span>
            
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-4 h-4 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                  {blog.author?.avatar ? (
                    <img src={blog.author.avatar} alt={blog.author.username} className="w-full h-full object-cover" />
                  ) : (
                    <User size={10} className="text-gray-400 m-auto" />
                  )}
                </div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider truncate">
                  {blog.author?.username || "Anonymous"}
                </span>
                <span className="text-[10px] text-gray-300">•</span>
                <span className="text-[10px] text-gray-400">
                  {blog.createdAt ? formatDate(blog.createdAt) : "Recently"}
                </span>
              </div>
              
              <Link to={`/blogs/${blog._id}`} className="block">
                <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:underline decoration-1 underline-offset-2 transition-all">
                  {blog.title || "Loading amazing story..."}
                </h3>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-gray-50/80 text-center">
        <Link to="/hot" className="text-xs font-bold text-gray-500 hover:text-black transition-colors uppercase tracking-widest">
          See full list
        </Link>
      </div>
    </div>
  );
}

export default Trending;

