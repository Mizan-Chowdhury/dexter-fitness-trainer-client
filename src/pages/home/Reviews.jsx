import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SectionTitle from "../../shared/SectionTitle";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  return (
    <div className="py-20 max-w-7xl mx-auto">
        <div className="px-4">
            <SectionTitle>Success Stories </SectionTitle>
        </div>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {reviews.map((i) => (
          <SwiperSlide key={i.id}>
            <div className="flex justify-center items-center py-10">
              <div className="text-center">
                <img
                  className="rounded-full w-24 mx-auto"
                  src={i.image}
                  alt=""
                />
                <div className="px-5 md:px-36">
                  <h1 className="font-bold text-xl mb-2">{i.subject}: {i.name}'s stories</h1>
                  <p>{i.review}</p>
                  <p className=""></p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
