import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash, FaStar } from "react-icons/fa";

import alert from "../../utils/alert";
import useUser from "../../hooks/useUser";
import useAxios from "../../hooks/useAxios";
import Loader from "../../ui/shared/Loader";
import MealModal from "../../ui/meal/MealModal";

const FavoritesPage = () => {
  const axios = useAxios();
  const { user, isLoading: userIsLoading } = useUser();
  const {
    data: favorites,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["get-all-favorites"],
    queryFn: () =>
      axios.get(`/favorites?user=${user._id}`).then((res) => res.data),
  });

  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleViewMeal = (meal) => {
    setSelectedMeal(meal);
  };

  const handleDeleteReview = async (favorite) => {
    await alert.confirm(
      "Are you sure?",
      "This meal will be permanently deleted from your favorites.",
      async () => {
        try {
          await axios.delete(`/favorites/${favorite}`);
          await refetch();
          alert.success("Deleted!", "Favorite has been deleted.");
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

      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Index</th>
              <th>Meal</th>
              <th>Rating</th>
              <th>Marked On</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {favorites.map((favorite, i) => (
              <tr key={favorite._id}>
                {/* Index */}
                <td className="font-bold">{i + 1}</td>

                {/* Reviewer */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-10 h-10">
                        <img
                          src={favorite.meal.image}
                          alt={favorite.meal.name}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{favorite.meal.name}</div>
                      <div className="text-xs opacity-50 truncate max-w-[120px]">
                        {favorite.meal.price}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Rating */}
                {/* Rating */}
                <td>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-warning" />
                    <span className="font-semibold">
                      {favorite.meal.avgRating}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td>{new Date(favorite.createdAt).toLocaleDateString()}</td>

                {/* Actions */}
                <td>
                  <div className="flex gap-2 justify-center">
                    {/* View Review */}
                    <button
                      className="btn btn-info btn-xs text-white tooltip"
                      data-tip="View Review"
                      onClick={() => handleViewMeal(favorite.meal)}
                    >
                      <FaEye size={12} />
                    </button>

                    {/* Delete */}
                    <button
                      className="btn btn-error btn-xs text-white tooltip"
                      data-tip="Delete Review"
                      onClick={() => handleDeleteReview(favorite._id)}
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

export default FavoritesPage;
