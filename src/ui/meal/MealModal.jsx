import {
  FaClock,
  FaListUl,
  FaStar,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import { TbCoinTakaFilled } from "react-icons/tb";

const MealModal = ({ meal, onClose }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box bg-base-100 max-w-md space-y-4">
        {/* Image + Name */}
        <div className="relative flex flex-col items-center">
          <img
            src={meal.image}
            alt={meal.name}
            className="rounded-xl w-48 h-48 object-cover"
          />

          <h1 className="text-3xl font-bold mt-4 text-center">{meal.name}</h1>
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
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

          {/* Ingredients */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaListUl className="text-primary w-4" />
              <span className="font-semibold">Ingredients:</span>
            </div>
            <ul className="ml-6 list-disc text-sm">
              {meal.ingredients?.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
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

          {/* Created Date */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-primary w-4" />
              <span className="font-semibold">Created At:</span>
            </div>
            <span className="ml-6">
              {new Date(meal.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default MealModal;
