import { FaStar, FaCalendarAlt, FaUtensils } from "react-icons/fa";

const ReviewModal = ({ review, onClose }) => {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Review Details</h2>

        {/* Rating */}
        <div className="flex items-center gap-2 justify-center">
          <FaStar className="text-warning" />
          <span className="text-xl font-semibold">{review.rating}</span>
        </div>

        {/* Comment */}
        <div>
          <h3 className="font-semibold">Comment:</h3>
          <p className="bg-base-200 p-4 rounded-box">{review.comment}</p>
        </div>

        {/* Meal */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FaUtensils className="text-primary" />
            <span className="font-semibold">Meal ID:</span>
          </div>
          <p className="ml-6 text-sm text-base-content/75">{review.meal}</p>
        </div>

        {/* Date */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            <span className="font-semibold">Reviewed On:</span>
          </div>
          <p className="ml-6">{new Date(review.createdAt).toLocaleString()}</p>
        </div>

        {/* Close */}
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ReviewModal;
