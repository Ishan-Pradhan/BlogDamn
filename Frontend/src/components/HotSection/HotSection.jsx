import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../index.css";

import { Pagination, Navigation } from "swiper/modules";

function HotSection() {
  return (
    <div className="w-full flex relative border-b border-line pb-10 my-10 ">
      <div className="overflow-hidden relative rounded-xl">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1360: {
              slidesPerView: 2.4,
              spaceBetween: 30,
            },
            1494: {
              slidesPerView: 2.2,
              spaceBetween: 30,
            },
          }}
          spaceBetween={30}
          loop={true}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper sm:slidesPerView-1 md:slidesPerView-2 lg:slidesPerView-3"
        >
          <SwiperSlide>
            <div className="relative cursor-pointer">
              <span className="absolute right-2 top-2">🔥</span>
              <div
                className="absolute rounded-xl  h-full w-full flex flex-col p-5  justify-end text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)",
                }}
              >
                <h2 className="text-3xl font-semibold mb-2 tracking-wide">
                  Demon Slayer Trilogy
                </h2>
                <p className="font-light text-[16px] mb-3 tracking-wide">
                  Demon Slayer: Kimesu no Yaiba Infinity Arc trai...
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="../../images/avatar.jpg"
                    className="h-8 w-8 object-contain border rounded-full"
                    alt=""
                  />
                  <span className="text-xs font-semibold tracking-wide">
                    Jhau Lagyo
                  </span>
                </div>
              </div>
              <img
                src="images/photo1.jpg"
                className="rounded-xl h-60 object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative cursor-pointer">
              <span className="absolute right-2 top-2">🔥</span>
              <div
                className="absolute rounded-xl h-full w-full flex flex-col p-5  justify-end text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)",
                }}
              >
                <h2 className="text-3xl font-semibold mb-2 tracking-wide">
                  Demon Slayer Trilogy
                </h2>
                <p className="font-light text-[16px] mb-3 tracking-wide">
                  Demon Slayer: Kimesu no Yaiba Infinity Arc trai...
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="../../images/avatar.jpg"
                    className="h-8 w-8 object-contain border rounded-full"
                    alt=""
                  />
                  <span className="text-xs font-semibold tracking-wide">
                    Jhau Lagyo
                  </span>
                </div>
              </div>
              <img
                src="images/photo1.jpg"
                className="rounded-xl h-60 object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative cursor-pointer">
              <span className="absolute  right-2 top-2">🔥</span>
              <div
                className="absolute rounded-xl  h-full w-full flex flex-col p-5  justify-end text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)",
                }}
              >
                <h2 className="text-3xl font-semibold mb-2 tracking-wide">
                  Demon Slayer Trilogy
                </h2>
                <p className="font-light text-[16px] mb-3 tracking-wide">
                  Demon Slayer: Kimesu no Yaiba Infinity Arc trai...
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="../../images/avatar.jpg"
                    className="h-8 w-8 object-contain border rounded-full"
                    alt=""
                  />
                  <span className="text-xs font-semibold tracking-wide">
                    Jhau Lagyo
                  </span>
                </div>
              </div>
              <img
                src="images/photo1.jpg"
                className="rounded-xl h-60 object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative cursor-pointer">
              <span className="absolute right-2 top-2">🔥</span>
              <div
                className="absolute rounded-xl h-full w-full flex flex-col p-5  justify-end text-white"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.54) 60%, rgba(0, 0, 0, 0.6) 100%)",
                }}
              >
                <h2 className="text-3xl font-semibold mb-2 tracking-wide">
                  Demon Slayer Trilogy
                </h2>
                <p className="font-light text-[16px] mb-3 tracking-wide">
                  Demon Slayer: Kimesu no Yaiba Infinity Arc trai...
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="../../images/avatar.jpg"
                    className="h-8 w-8 object-contain border rounded-full"
                    alt=""
                  />
                  <span className="text-xs font-semibold tracking-wide">
                    Jhau Lagyo
                  </span>
                </div>
              </div>
              <img
                src="images/photo1.jpg"
                className="rounded-xl h-60 object-cover"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default HotSection;
