import {
  FaClock,
  FaListUl,
  FaStar,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";

import alert from "../../utils/alert";
import useAxios from "../../hooks/useAxios";
import useUser from "../../hooks/useUser";
import Loader from "../../ui/shared/Loader";
import MealReviews from "../../ui/review/MealReviews";
import AddReviewForm from "../../ui/review/AddReview";

const MealDetailsPage = () => {
  const { id } = useParams();
  const { user, isLoading: userIsLoading } = useUser();
  const axios = useAxios();
  const { data, error, refetch, isError, isLoading } = useQuery({
    queryKey: ["get-meal", id],
    queryFn: async () => {
      const meal = await axios.get(`/meals/${id}`).then((res) => res.data);
      const favorite = await axios
        .get(`/favorites?meal=${meal._id}&user=${user._id}`)
        .then((res) => res.data);
      const isFavorite = favorite.length > 0;
      return [meal, isFavorite];
    },
  });

  const handleAddToFavorite = async (meal) => {
    await alert.confirm(
      "Are you sure?",
      `You are about to mark "${meal.name}" as a Favorite Meal!`,
      async () => {
        try {
          await axios.post(`/favorites`, { user: user._id, meal: meal._id });
          alert.success(
            "Marked as Favorite!",
            "Meal has been marked as Active."
          );
          await refetch();
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

  const [meal, isFavorite] = data;

  return (
    <div className="flex-1 w-full p-6 bg-base-200 rounded-box space-y-6">
      <h1 className="text-4xl font-bold">{meal.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="space-y-4">
          <img
            src={meal.image}
            alt={meal.name}
            className="rounded-box w-full aspect-square object-cover"
          />
          <div className="flex items-center gap-4">
            <button
              className={`btn ${
                isFavorite
                  ? "btn-disabled pointer-events-none cursor-not-allowed"
                  : "btn-primary cursor-pointer"
              }`}
              onClick={() => !isFavorite && handleAddToFavorite(meal)}
            >
              {isFavorite ? "Added to Favorite" : "Add to Favorite"}
            </button>
            <Link to={`/order/${id}`} className="btn btn-primary">
              Go to Order Page
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          {/* Price */}
          <div>
            <div className="flex items-center gap-2 space-y-1">
              <TbCoinTakaFilled className="text-primary w-4" />
              <span className="font-semibold">Price</span>
            </div>
            <span className="ml-6 text-2xl font-bold">{meal.price}৳</span>
          </div>

          {/* Chef */}
          <div>
            <div className="flex items-center gap-2 space-y-1">
              <FaUser className="text-primary w-4" />
              <span className="font-semibold">Chef</span>
            </div>
            <div className="ml-6 flex items-center gap-3">
              <img
                src={meal.chef.photoURL}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <p>{meal.chef.displayName}</p>
                <p className="text-xs opacity-75">{meal.chef.email}</p>
              </div>
            </div>
          </div>

          {/* Estimated Time */}
          <div>
            <div className="flex items-center gap-2 space-y-1">
              <FaClock className="text-primary w-4" />
              <span className="font-semibold">Estimated Delivery</span>
            </div>
            <span className="ml-6">{meal.estimatedDeliveryTime} minutes</span>
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-center gap-2 space-y-1">
              <FaStar className="text-primary w-4" />
              <span className="font-semibold">Rating</span>
            </div>
            <span className="ml-6">
              {meal.avgRating} ({meal.totalReviews} reviews)
            </span>
          </div>

          {/* Ingredients */}
          <div>
            <div className="flex items-center gap-2 space-y-1">
              <FaListUl className="text-primary w-4" />
              <span className="font-semibold">Ingredients</span>
            </div>
            <ul className="list-outside ml-6 text-sm">
              {meal.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Created Date */}
          <div>
            <div className="flex items-center gap-2 space-y-1">
              <FaCalendarAlt className="text-primary w-4" />
              <span className="font-semibold">Added On</span>
            </div>
            <span className="ml-6">
              {new Date(meal.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <MealReviews meal={id} />

      <AddReviewForm meal={id} />
    </div>
  );
};

export default MealDetailsPage;
