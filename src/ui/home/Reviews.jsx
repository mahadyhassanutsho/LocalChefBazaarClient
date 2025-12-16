import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import useAxios from "../../hooks/useAxios";
import Loader from "../shared/Loader";
import ReviewCard from "../review/ReviewCard";

const Reviews = () => {
  const axios = useAxios();
  const {
    data: reviews,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-reviews"],
    queryFn: () =>
      axios
        .get("/reviews?limit=6&sort=rating&order=desc")
        .then((res) => res.data),
  });

  if (isLoading) return <Loader />;
  if (isError) throw new Error(error.message);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="border-l-4 pl-4 rounded-box border-accent text-4xl font-bold">
          Reviews
        </h2>
        <p className="text-base-content/75">
          Read what our Customers got to say about us.
        </p>
      </div>

      <Swiper
        effect="coverflow"
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          modifier: 1,
          scale: 0.75,
          slideShadows: true,
        }}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={2}
        pagination={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <ReviewCard review={review} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
