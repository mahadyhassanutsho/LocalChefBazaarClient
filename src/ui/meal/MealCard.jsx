import { Link } from "react-router";
import { FaClock, FaHashtag, FaStar, FaUser } from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";

const MealCard = ({ meal }) => {
  return (
    <div className="bg-base-300 max-w-md space-y-4 rounded-box p-4 md:p-6">
      {/* Image + Name */}
      <div className="space-y-2">
        <img
          src={meal.image}
          alt={meal.name}
          className="rounded-box aspect-square w-full h-auto object-cover"
        />

        <h1 className="text-3xl font-bold truncate max-w-2xs">{meal.name}</h1>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2">
        {/* Price */}
        <div className="flex items-center gap-2">
          <TbCoinTakaFilled className="text-primary w-4" />
          <span className="font-semibold">Price: </span>
          <span>{meal.price}৳</span>
        </div>

        {/* Estimated Time */}
        <div className="flex items-center gap-2">
          <FaClock className="text-primary w-4" />
          <span className="font-semibold">Est. Delivery Time: </span>
          <span>{meal.estimatedDeliveryTime} minutes</span>
        </div>

        {/* Chef */}
        <div>
          <div className="flex items-center gap-2">
            <FaUser className="text-primary w-4" />
            <span className="font-semibold">Chef: </span>
            <span>{meal.chef.displayName}</span>
          </div>
          <p className="ml-6">(# {meal.chef._id})</p>
        </div>

        {/* Ratings */}
        <div className="flex items-center gap-2">
          <FaStar className="text-primary w-4" />
          <span className="font-semibold">Rating: </span>
          <span>
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
