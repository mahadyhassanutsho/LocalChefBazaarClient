import { useQuery } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";

import useAxios from "../../hooks/useAxios";
import Loader from "../shared/Loader";

const MealReviews = ({ meal }) => {
  const axios = useAxios();

  const {
    data: reviews,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["meal-reviews", meal],
    queryFn: () => axios.get(`/reviews?meal=${meal}`).then((res) => res.data),
  });

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  if (reviews.length === 0) {
    return <p className="opacity-75 font-bold text-xl">No reviews yet.</p>;
  }

  console.log(reviews);

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="p-4 border border-base-300 rounded-box bg-base-100"
        >
          {/* User + Rating */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <img
                src={review.reviewer.photoURL}
                alt={review.reviewer.displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="font-semibold">{review.reviewer.displayName}</p>
            </div>

            {/* Stars */}
            <div className="flex gap-1 text-warning">
              {[1, 2, 3, 4, 5].map((star) =>
                star <= review.rating ? (
                  <FaStar key={star} />
                ) : (
                  <FaRegStar key={star} />
                )
              )}
            </div>
          </div>

          {/* Comment */}
          <p className="text-sm leading-relaxed">{review.comment}</p>

          {/* Date */}
          <p className="text-xs opacity-60 mt-2">
            {new Date(review.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MealReviews;
