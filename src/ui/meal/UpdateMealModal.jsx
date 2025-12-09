import { useForm } from "react-hook-form";

import { uploadImage } from "../../services/imgbb";
import alert from "../../utils/alert";
import useAxios from "../../hooks/useAxios";

const UpdateMealModal = ({ meal, onClose, refetch }) => {
  const axios = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: meal.name,
      ingredients: meal.ingredients.join(", "),
      price: meal.price,
      estimatedDeliveryTime: meal.estimatedDeliveryTime,
    },
  });

  const handleMealUpdate = async (data) => {
    try {
      const ingredients = data.ingredients.split(",").map((i) => i.trim());
      const { name, price, estimatedDeliveryTime } = data;

      let image = meal.image;

      if (data.image.length > 0) {
        image = await uploadImage(data.image[0]);
      }

      const updatedMeal = {
        name,
        price,
        estimatedDeliveryTime,
        ingredients,
        image,
      };

      await axios.patch(`/meals/${meal._id}`, updatedMeal);

      alert.success("Updated!", "Meal updated successfully!");
      refetch?.();
      reset();
      onClose();
    } catch (error) {
      alert.error("Oops!", error.message || "Something went wrong!");
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Update Meal</h1>

        <form onSubmit={handleSubmit(handleMealUpdate)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-base font-semibold">Name:</label>
            <input
              {...register("name", { required: "Meal Name is required" })}
              type="text"
              className="input w-full"
            />
            {errors.name && (
              <p className="text-error text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Existing Image */}
          <div className="space-y-1">
            <label className="text-base font-semibold">Current Image:</label>
            <img
              src={meal.image}
              alt="preview"
              className="w-full rounded-box border"
            />
          </div>

          {/* New Image */}
          <div className="space-y-1">
            <label className="text-base font-semibold">New Image:</label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="file-input w-full"
            />
          </div>

          {/* Ingredients */}
          <div className="space-y-1">
            <label className="text-base font-semibold">Ingredients:</label>
            <input
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              type="text"
              className="input w-full"
            />
            {errors.ingredients && (
              <p className="text-error text-xs">{errors.ingredients.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="text-base font-semibold">Price:</label>
            <input
              {...register("price", { required: "Price is required" })}
              type="number"
              className="input w-full"
            />
            {errors.price && (
              <p className="text-error text-xs">{errors.price.message}</p>
            )}
          </div>

          {/* Estimated Delivery Time */}
          <div className="space-y-1">
            <label className="text-base font-semibold">
              Estimated Delivery Time:
            </label>
            <input
              {...register("estimatedDeliveryTime", {
                required: "Required",
              })}
              type="number"
              className="input w-full"
            />
            {errors.estimatedDeliveryTime && (
              <p className="text-error text-xs">
                {errors.estimatedDeliveryTime.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn gap-2 w-full ${
              isSubmitting ? "cursor-not-allowed" : "btn-primary"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Meal"}
            {isSubmitting && (
              <span className="loading loading-xs loading-bars" />
            )}
          </button>
        </form>

        {/* Close */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateMealModal;
