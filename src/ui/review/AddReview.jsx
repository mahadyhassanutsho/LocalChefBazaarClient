import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaStar, FaRegStar } from "react-icons/fa";

import useUser from "../../hooks/useUser";
import useAxios from "../../hooks/useAxios";
import Loader from "../shared/Loader";

const AddReviewForm = ({ meal }) => {
  const axios = useAxios();
  const { user, isLoading } = useUser();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { rating: 0 },
  });

  const rating = useWatch({ name: "rating", control });

  const { mutate } = useMutation({
    mutationFn: (data) => axios.post("/reviews", { ...data, meal }),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries(["meal-reviews", meal]);
      queryClient.invalidateQueries(["get-meal", meal]);
    },
  });

  const onSubmit = (data) => {
    mutate({
      rating: Number(data.rating),
      comment: data.comment,
      reviewer: user._id,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <fieldset className="space-y-4">
        {/* Rating */}
        <div className="space-y-1">
          <label className="text-base font-semibold">Rating</label>

          <div className="flex gap-1 text-warning">
            {[1, 2, 3, 4, 5].map((star) =>
              star <= rating ? (
                <FaStar
                  key={star}
                  className="cursor-pointer text-xl"
                  onClick={() => setValue("rating", star)}
                />
              ) : (
                <FaRegStar
                  key={star}
                  className="cursor-pointer text-xl"
                  onClick={() => setValue("rating", star)}
                />
              )
            )}
          </div>

          <input
            type="hidden"
            {...register("rating", {
              validate: (v) => v > 0 || "Please select a rating",
            })}
          />

          {errors.rating && (
            <p className="text-error text-xs font-semibold">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="space-y-1">
          <label className="text-base font-semibold">Comment</label>
          <textarea
            {...register("comment", {
              required: "Comment is required",
              minLength: {
                value: 10,
                message: "At least 10 characters",
              },
            })}
            rows={4}
            className="textarea textarea-bordered w-full"
            placeholder="Write your experience..."
          />
          {errors.comment && (
            <p className="text-error text-xs font-semibold">
              {errors.comment.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`btn w-full ${
          isSubmitting ? "cursor-not-allowed" : "btn-primary"
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
        {isSubmitting && <span className="loading loading-xs loading-bars" />}
      </button>
    </form>
  );
};

export default AddReviewForm;
