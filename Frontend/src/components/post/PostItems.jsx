import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle, Clock, User, ArrowRight } from "lucide-react";

function PostItems({ item: blog }) {
  if (!blog) return null;

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="group border-b border-gray-100 py-10 first:pt-0 hover:bg-gray-50/50 transition-colors">
      <Link to={`/blogs/${blog._id}`} className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
              {blog.author?.avatar ? (
                <img src={blog.author.avatar} alt={blog.author.username} className="w-full h-full object-cover" />
              ) : (
                <User size={14} className="text-gray-400 m-auto mt-1" />
              )}
            </div>
            <span className="text-xs font-bold text-gray-900 capitalize tracking-tight">
              {blog.author?.username || "Anonymous"}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
              <Clock size={12} />
              {formatDate(blog.createdAt)}
            </span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-serif font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
              {blog.title}
            </h2>
            <p className="text-gray-500 font-light leading-relaxed line-clamp-3 text-sm md:text-base">
              {blog.content}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={18} />
                <span className="text-xs font-bold">{blog.likes?.length || 0}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-xs font-bold">Comments</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
              <span>Read More</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="w-full md:w-48 lg:w-64 aspect-[16/10] md:aspect-square rounded-2xl overflow-hidden border border-gray-100 shadow-sm order-first md:order-last bg-gray-50 flex-shrink-0">
          <img 
            src={blog.image || "/placeholder-blog.jpg"} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            alt={blog.title} 
          />
        </div>
      </Link>
    </div>
  );
}

export default PostItems;
