import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaPencilAlt, FaEye, FaTrash } from "react-icons/fa";

import alert from "../../utils/alert";
import useAxios from "../../hooks/useAxios";
import Loader from "../../ui/shared/Loader";
import MealModal from "../../ui/meal/MealModal";
import UpdateMealModal from "../../ui/meal/UpdateMealModal";

const MealsPage = () => {
  const axios = useAxios();

  const {
    data: meals,
    error,
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-all-meals"],
    queryFn: () =>
      axios.get("/meals?sort=createdAt&order=desc").then((res) => res.data),
  });

  const [selectedMeal, setSelectedMeal] = useState(null);
  const [editingMeal, setEditingMeal] = useState(null);

  const handleDelete = async (meal) => {
    const { _id: id, name } = meal;

    await alert.confirm(
      "Delete Meal?",
      `Are you sure you want to delete the meal "${name}"?`,
      async () => {
        try {
          await axios.delete(`/meals/${id}`);
          await refetch();
          alert.success("Deleted!", "Meal has been deleted.");
        } catch (error) {
          alert.error(
            "Oops!",
            error.message || "Something went wrong! Please try again."
          );
        }
      }
    );
  };

  if (isLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">My Meals</h2>

      {editingMeal && (
        <UpdateMealModal
          meal={editingMeal}
          onClose={() => setEditingMeal(null)}
          refetch={refetch}
        />
      )}

      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Meal</th>
              <th>Price</th>
              <th>Delivery Time</th>
              <th>Rating</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {meals.map((meal, i) => (
              <tr key={meal._id}>
                {/* Index */}
                <td className="font-bold">{i + 1}</td>

                {/* Image + Name */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-square w-14 h-14 rounded-box">
                        <img src={meal.image} alt={meal.name} />
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold">{meal.name}</div>
                      <div className="text-xs opacity-50 max-w-[150px] truncate">
                        {meal._id}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td>৳{meal.price}</td>

                {/* Delivery time */}
                <td>{meal.estimatedDeliveryTime} min</td>

                {/* Rating */}
                <td>
                  {meal.avgRating?.toFixed(1)} ({meal.totalReviews})
                </td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2 justify-center">
                    {/* View */}
                    <button
                      className="btn btn-info btn-xs text-white tooltip"
                      data-tip="View Meal"
                      onClick={() => setSelectedMeal(meal)}
                    >
                      <FaEye size={12} />
                    </button>

                    {/* Update */}
                    <button
                      className="btn btn-warning btn-xs text-white tooltip"
                      data-tip="Update Meal"
                      onClick={() => setEditingMeal(meal)}
                    >
                      <FaPencilAlt />
                    </button>

                    {/* Delete */}
                    <button
                      className="btn btn-error btn-xs text-white tooltip"
                      data-tip="Delete Meal"
                      onClick={() => handleDelete(meal)}
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

export default MealsPage;
