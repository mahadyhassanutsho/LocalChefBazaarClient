import { Link } from "react-router";
import { FaClock, FaStar, FaUser } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";

const MealCard = ({ meal }) => {
  return (
    <div className="bg-base-300 max-w-md space-y-4 rounded-box p-6">
      {/* Image + Name */}
      <div className="relative flex flex-col items-center space-y-2">
        <img
          src={meal.image}
          alt={meal.name}
          className="rounded-box aspect-square w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold text-center truncate max-w-2xs">
          {meal.name}
        </h1>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1">
        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <TbCoinTakaFilled className="text-primary w-4" />
            <span className="font-semibold">Price:</span>
          </div>
          <span className="ml-6 font-bold">{meal.price}৳</span>
        </div>

        {/* Estimated Time */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FaClock className="text-primary w-4" />
            <span className="font-semibold">Estimated Delivery Time:</span>
          </div>
          <span className="ml-6">{meal.estimatedDeliveryTime} minutes</span>
        </div>

        {/* Chef */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FaUser className="text-primary w-4" />
            <span className="font-semibold">Chef:</span>
          </div>
          <span className="ml-6">{meal.chef.displayName}</span>
        </div>

        {/* Ratings */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FaStar className="text-primary w-4" />
            <span className="font-semibold">Rating:</span>
          </div>
          <span className="ml-6">
            {meal.avgRating} ({meal.totalReviews} reviews)
          </span>
        </div>
      </div>

      <div className="modal-action">
        <Link to={`/meals/${meal._id}`} className="btn btn-primary">
          See Details
        </Link>
      </div>
    </div>
  );
};

export default MealCard;
