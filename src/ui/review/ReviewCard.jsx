import { Link } from "react-router";
import { FaQuoteLeft, FaQuoteRight, FaStar } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const { reviewer, rating, comment, meal, createdAt } = review;

  return (
    <div className="bg-base-200 rounded-box p-4 md:p-6 max-w-md w-full space-y-4 shadow">
      {/* Reviewer */}
      <div className="flex items-center gap-4">
        <img
          src={reviewer.photoURL}
          alt={reviewer.displayName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{reviewer.displayName}</h2>
          <p className="text-sm text-base-content/50">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`w-4 ${
              i < rating ? "text-warning" : "text-base-content/75"
            }`}
          />
        ))}
        <span className="ml-2 font-semibold">{rating} / 5</span>
      </div>

      {/* Comment */}
      <p
        className="flex justify-between items-center gap-2 bg-base-200 px-4 py-3 rounded-xl text-center text-base-content/70"
        title={comment}
      >
        <FaQuoteLeft className="inline text-4xl text-base-content/50" />
        {comment}
        <FaQuoteRight className="inline text-4xl text-base-content/50" />
      </p>

      {/* Meal info */}
      <div className="flex items-center gap-4">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-20 h-20 rounded-box object-cover"
        />
        <div className="flex flex-col gap-1">
          <Link
            to={`/meals/${meal._id}`}
            className="font-semibold text-primary hover:underline"
          >
            {meal.name}
          </Link>
          {/* Meal details */}
          <div className="text-sm text-base-content/70 space-y-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold">Price:</span> {meal.price}৳
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">Chef:</span>{" "}
              {meal.chef.displayName || meal.chef}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
