import { FaTimes, FaCircle, FaCreditCard } from "react-icons/fa";

const STATUS_COLOR = {
  pending: "text-warning",
  paid: "text-info",
  "in-delivery": "text-primary",
  delivered: "text-success",
  cancelled: "text-error",
};

const OrderModal = ({ order, onClose }) => {
  const { meal, quantity, status, deliveryAddress, createdAt, paymentUrl } =
    order;

  const totalPrice = meal.price * quantity;

  const handlePay = () => {
    window.location.href = paymentUrl;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-base-100 rounded-box w-full max-w-2xl shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h3 className="text-2xl font-bold">Order Details</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Meal Info */}
          <div className="flex gap-4">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-28 h-28 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="text-xl font-semibold">{meal.name}</h4>
              <p className="text-sm opacity-70">By {meal.chef.displayName}</p>
              <p className="text-sm opacity-70">
                Est. Delivery: {meal.estimatedDeliveryTime} mins
              </p>
            </div>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="opacity-60">Quantity</p>
              <p className="font-medium">{quantity}</p>
            </div>

            <div>
              <p className="opacity-60">Total Price</p>
              <p className="font-medium">৳{totalPrice}</p>
            </div>

            <div>
              <p className="opacity-60">Status</p>
              <div className="flex items-center gap-2 capitalize">
                <FaCircle size={10} className={STATUS_COLOR[status]} />
                <span className="font-medium">{status}</span>
              </div>
            </div>

            <div>
              <p className="opacity-60">Ordered At</p>
              <p className="font-medium">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <p className="opacity-60 text-sm mb-1">Delivery Address</p>
            <p className="font-medium">{deliveryAddress}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-between items-center">
          <div className="text-sm opacity-70">Order ID: {order._id}</div>

          {status === "pending" && (
            <button onClick={handlePay} className="btn btn-primary gap-2">
              <FaCreditCard />
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
