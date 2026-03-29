import React, { useEffect } from "react";
import PostItems from "./PostItems";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import api from "../../api/api";
import { Loader2, AlertCircle, FileQuestion } from "lucide-react";

function Posts() {
  const { searchQuery, selectedCategory, selectedSort } = useSelector((state) => state.blogs);
  const { ref, inView } = useInView();

  const fetchBlogs = async ({ pageParam = 1 }) => {
    let url = `/blogs?page=${pageParam}&limit=10`;
    if (searchQuery) url += `&search=${searchQuery}`;
    if (selectedCategory && selectedCategory !== "Home") url += `&category=${selectedCategory}`;
    if (selectedSort === "popular") url += `&sort=popular`;
    
    const response = await api.get(url);
    return response.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["blogs", searchQuery, selectedCategory, selectedSort],
    queryFn: fetchBlogs,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === "loading") {
    return (
      <div className="flex flex-col gap-8 w-full">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse flex flex-col gap-4">
            <div className="h-48 bg-gray-100 rounded-2xl w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-1/4"></div>
            <div className="h-6 bg-gray-100 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center pt-20 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-900">Failed to load stories</h3>
        <p className="text-gray-500 max-w-xs mt-2">{error.message || "An unexpected error occurred"}</p>
      </div>
    );
  }

  const allBlogs = data?.pages.flatMap((page) => page.blogs) || [];

  if (allBlogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-20 text-center">
        <FileQuestion size={48} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-bold text-gray-900">No stories found</h3>
        <p className="text-gray-500 max-w-xs mt-2">Try adjusting your filters or search query to find more stories.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 w-full pb-20">
      {allBlogs.map((item) => (
        <PostItems key={item._id} item={item} />
      ))}

      {/* Loading indicator for next page */}
      <div ref={ref} className="w-full py-10 flex justify-center">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Loader2 className="animate-spin" size={20} />
            <span>Loading more stories...</span>
          </div>
        ) : hasNextPage ? (
          <span className="text-gray-400 text-sm">Scroll for more</span>
        ) : (
          <span className="text-gray-300 text-sm italic font-serif">You've reached the end of the universe ✨</span>
        )}
      </div>
    </div>
  );
}

export default Posts;
