import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Flame, User } from "lucide-react";
import api from "../../api/api";

function HotSection2() {
  const { data: trendingBlogs, isLoading } = useQuery({
    queryKey: ["trending", "slider"],
    queryFn: async () => {
      const response = await api.get("/blogs?limit=10&sort=popular");
      return response.data.blogs;
    },
  });

  if (!isLoading && (!trendingBlogs || trendingBlogs.length === 0)) {
    return null;
  }

  return (
    <div className="my-10">
      <div className="flex items-center gap-2 mb-6 px-2">
        <Flame className="text-orange-500" fill="currentColor" size={20} />
        <h2 className="text-xl font-bold tracking-tight">Trending Now</h2>
      </div>

      <Splide
        options={{
          perPage: 2.5,
          perMove: 1,
          type: "loop",
          rewind: true,
          pagination: false,
          autoplay: true,
          interval: 4000,
          pauseOnHover: true,
          gap: "1.5rem",
          padding: { right: "10%" },
          breakpoints: {
            1280: { perPage: 2.2 },
            1024: { perPage: 1.8 },
            768: { perPage: 1.2, padding: { right: "0" }, gap: "1rem" },
            480: { perPage: 1, padding: { right: "0" } },
          },
        }}
      >
        {(isLoading ? [1, 2, 3] : trendingBlogs).map((item, index) => (
          <SplideSlide key={item._id || index}>
            {isLoading ? (
              <div className="w-full h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
            ) : (
              <Link to={`/blogs/${item._id}`} className="block relative h-64 group overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <div 
                  className="absolute inset-x-0 bottom-0 h-2/3 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition-all"
                ></div>

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform">
                  <div className="mb-2">
                    <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] uppercase font-bold tracking-widest border border-white/20">
                      {item.category || "Story"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight mb-3 line-clamp-2 drop-shadow-sm">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-full overflow-hidden border border-white/30 bg-gray-500 flex items-center justify-center">
                      {item.author?.avatar ? (
                        <img src={item.author.avatar} alt={item.author.username} className="w-full h-full object-cover" />
                      ) : (
                        <User size={14} />
                      )}
                    </div>
                    <span className="text-xs font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                      {item.author?.username || "Anonymous"}
                    </span>
                  </div>
                </div>

                <img
                  src={item.image || "/placeholder-blog.jpg"}
                  className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700"
                  alt={item.title}
                />
              </Link>
            )}
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

export default HotSection2;
