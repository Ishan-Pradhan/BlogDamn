import React, { useEffect } from "react";
import Header from "../components/Navbar/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogById, clearCurrentBlog } from "../features/blogSlice";
import { Heart, MessageCircle, Share2, Clock, User, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function SingleBlog() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentBlog: blog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogById(id));
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [id, dispatch]);

  if (loading || !blog) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20 animate-pulse">
          <div className="h-12 bg-gray-100 rounded-lg w-3/4 mb-6"></div>
          <div className="flex gap-4 mb-10">
            <div className="w-12 h-12 bg-gray-100 rounded-full"></div>
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-100 rounded w-1/4"></div>
              <div className="h-3 bg-gray-100 rounded w-1/6"></div>
            </div>
          </div>
          <div className="aspect-video bg-gray-100 rounded-3xl w-full mb-10"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pt-12">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-10 transition-colors group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to feed
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-8 leading-[1.1]">
            {blog.title}
          </h1>

          <div className="flex items-center justify-between border-y border-gray-100 py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 ring-2 ring-gray-50">
                {blog.author?.avatar ? (
                  <img src={blog.author.avatar} alt={blog.author.username} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <User size={24} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <span className="block font-semibold text-gray-900 capitalize leading-tight">
                  {blog.author?.username || "Anonymous Writer"}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock size={14} />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" color="secondary" rounded="full" className="p-2 h-10 w-10">
                <Share2 size={20} />
              </Button>
            </div>
          </div>
        </header>

        <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden mb-12 shadow-2xl shadow-gray-200">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <article className="prose prose-lg max-w-none">
          <div className="text-xl leading-relaxed font-light text-gray-800 font-serif whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>

        <footer className="mt-16 pt-10 border-t border-gray-100">
          <div className="flex items-center gap-8 px-2">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors">
                <Heart size={24} className="text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
              <span className="text-sm font-medium text-gray-500 group-hover:text-red-500">{blog.likes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer text-gray-500 hover:text-blue-500 transition-colors">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <MessageCircle size={24} />
              </div>
              <span className="text-sm font-medium">Add comment</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SingleBlog;

