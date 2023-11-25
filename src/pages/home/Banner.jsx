import "swiper/css";
import "swiper/css/pagination";
// import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Banner = () => {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    fetch("banner.json")
      .then((res) => res.json())
      .then((data) => {
        setBanner(data);
      });
  }, []);

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="max-w-xl md:max-w-3xl lg:max-w-[1515px]"
      >
        {banner.map((i) => (
          <SwiperSlide key={i.id}>
            <div
              className="min-h-screen"
              style={{
                backgroundImage: `url(${i.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: 'center'
              }}
            >
              <div className="hero-overlay bg-opacity-40"></div>
              <div className=" text-white flex items-center h-screen">
                <div className="w-2/3 md:w-1/2 ml-10">
                  <h1 className="mb-5 text-5xl font-bold">{i.title}</h1>
                  <p className="mb-5">{i.description}</p>
                  <Link to={"/classes"}>
                    <button className="btn font-bold">Our Classes</button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
