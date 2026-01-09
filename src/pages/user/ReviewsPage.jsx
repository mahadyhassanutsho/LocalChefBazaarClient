import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash, FaStar } from "react-icons/fa";

import alert from "../../utils/alert";
import useUser from "../../hooks/useUser";
import useAxios from "../../hooks/useAxios";
import Loader from "../../ui/shared/Loader";
import ReviewModal from "../../ui/review/ReviewModal";

const ReviewsPage = () => {
  const axios = useAxios();
  const { user, isLoading: userIsLoading } = useUser();
  const {
    data: reviews,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-all-reviews"],
    queryFn: () =>
      axios.get(`/reviews?reviewer=${user._id}`).then((res) => res.data),
  });

  const [selectedReview, setSelectedReview] = useState(null);

  const handleViewReview = (review) => {
    setSelectedReview(review);
  };

  const handleDeleteReview = async (review) => {
    await alert.confirm(
      "Are you sure?",
      "This review will be permanently deleted.",
      async () => {
        try {
          await axios.delete(`/reviews/${review._id}`);
          await refetch();
          alert.success("Deleted!", "Review has been deleted.");
        } catch (error) {
          alert.error(
            "Oops!",
            error.message || "Something went wrong! Please try again."
          );
        }
      }
    );
  };

  if (isLoading || userIsLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">Manage Reviews</h2>

      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Meal</th>
              <th>Reviewed On</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review, i) => (
              <tr key={review._id}>
                {/* Index */}
                <td className="font-bold">{i + 1}</td>

                {/* Rating */}
                <td>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-warning" />
                    <span className="font-semibold">{review.rating}</span>
                  </div>
                </td>

                {/* Comment */}
                <td className="max-w-xs truncate">{review.comment}</td>

                {/* Meal */}
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">{review.meal.name}</div>
                      <div className="text-xs opacity-50 truncate max-w-[140px]">
                        {review.meal._id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td>{new Date(review.createdAt).toLocaleDateString()}</td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2 justify-center">
                    {/* View Review */}
                    <button
                      className="btn btn-info btn-xs tooltip"
                      data-tip="View Review"
                      onClick={() => handleViewReview(review)}
                    >
                      <FaEye size={12} />
                    </button>

                    {/* Delete */}
                    <button
                      className="btn btn-error btn-xs tooltip"
                      data-tip="Delete Review"
                      onClick={() => handleDeleteReview(review)}
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsPage;
