import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaTimesCircle,
  FaCheckCircle,
  FaTruck,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";

import useUser from "../../hooks/useUser";
import useAxios from "../../hooks/useAxios";
import Loader from "../../ui/shared/Loader";
import alert from "../../utils/alert";

const OrderRequestsPage = () => {
  const { user, isLoading: userIsLoading } = useUser();
  const axios = useAxios();
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["chef-orders", user],
    queryFn: () =>
      axios.get(`/orders?chef=${user._id}`).then((res) => res.data),
  });

  const handleUpdateStatus = async (order, newStatus) => {
    setUpdatingOrderId(order._id);
    try {
      await axios.patch(`/orders/${order._id}`, { status: newStatus });
      await refetch();
    } catch (err) {
      alert.error("Oops!", err.message || "Something went wrong");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  if (isLoading || userIsLoading) return <Loader />;
  if (isError) throw new Error(error.message);

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">Order Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const {
            _id,
            meal,
            quantity,
            status,
            user,
            createdAt,
            deliveryAddress,
          } = order;

          const totalPrice = meal.price * quantity;

          const isPending = status === "pending";
          const isCancelled = status === "cancelled";
          const isAccepted = status === "accepted";
          const isDelivered = status === "delivered";

          return (
            <div
              key={_id}
              className="bg-base-100 shadow rounded-box p-6 space-y-4 border border-base-300 hover:shadow-xl transition-shadow duration-200"
            >
              {/* Meal */}
              <div className="flex items-center gap-3">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-16 h-16 object-cover rounded-box border border-base-300"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    {meal.name}
                  </h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    Price: <span className="font-medium">৳{meal.price}</span> ×{" "}
                    <span className="font-medium">{quantity}</span> ={" "}
                    <span className="font-semibold">৳{totalPrice}</span>
                  </p>
                </div>
              </div>

              {/* User Info */}
              <p className="text-sm flex items-center gap-2 text-base-content/70">
                <FaUser className="text-base-content/50" /> {user.email}
              </p>
              <p className="text-sm flex items-center gap-2 text-base-content/70">
                <FaMapMarkerAlt className="text-base-content/50" />{" "}
                {deliveryAddress}
              </p>
              <p className="text-sm flex items-center gap-2 text-base-content/70">
                <FaClock className="text-base-content/50" />{" "}
                {new Date(createdAt).toLocaleString()}
              </p>

              {/* Status */}
              <p className="text-sm flex items-center gap-2">
                Status:{" "}
                <span
                  className={`font-semibold capitalize px-2 py-1 rounded-lg ${
                    isCancelled
                      ? "bg-red-100 text-red-600"
                      : isDelivered
                      ? "bg-green-100 text-green-600"
                      : isAccepted
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {status}
                </span>
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-2">
                {/* Cancel */}
                <button
                  className="btn btn-error btn-sm flex-1 flex items-center justify-center gap-1"
                  disabled={
                    isCancelled ||
                    isAccepted ||
                    isDelivered ||
                    updatingOrderId === _id
                  }
                  onClick={() => handleUpdateStatus(order, "cancelled")}
                >
                  <FaTimesCircle /> Cancel
                </button>

                {/* Accept */}
                <button
                  className="btn btn-primary btn-sm flex-1 flex items-center justify-center gap-1"
                  disabled={
                    isPending ||
                    isCancelled ||
                    isAccepted ||
                    isDelivered ||
                    updatingOrderId === _id
                  }
                  onClick={() => handleUpdateStatus(order, "accepted")}
                >
                  <FaCheckCircle /> Accept
                </button>

                {/* Deliver */}
                <button
                  className="btn btn-success btn-sm flex-1 flex items-center justify-center gap-1"
                  disabled={
                    isCancelled ||
                    !isAccepted ||
                    isDelivered ||
                    updatingOrderId === _id
                  }
                  onClick={() => handleUpdateStatus(order, "delivered")}
                >
                  <FaTruck /> Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequestsPage;
