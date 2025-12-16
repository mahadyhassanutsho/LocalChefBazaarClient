import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaTrash, FaCircle, FaCreditCard } from "react-icons/fa";

import alert from "../../utils/alert";
import useAxios from "../../hooks/useAxios";
import useUser from "../../hooks/useUser";
import Loader from "../../ui/shared/Loader";
import OrderModal from "../../ui/order/OrderModal";

const OrdersPage = () => {
  const axios = useAxios();
  const { user, isLoading: userIsLoading } = useUser();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["get-all-orders", user],
    queryFn: () =>
      axios.get(`/orders?user=${user._id}`).then((res) => res.data),
  });

  const handleViewOrder = (id) => {
    setSelectedOrder(orders.find((order) => order._id === id));
  };

  const handleCancelOrder = async (order) => {
    await alert.confirm(
      "Cancel Order?",
      "Are you sure you want to cancel this order?",
      async () => {
        try {
          await axios.delete(`/orders/${order._id}`);
          await refetch();
          alert.success("Cancelled", "Your order has been cancelled.");
        } catch (err) {
          alert.error(
            "Oops!",
            err.message || "Something went wrong. Please try again."
          );
        }
      }
    );
  };

  const handlePay = (paymentUrl) => {
    window.open(paymentUrl, "_self");
  };

  if (isLoading || userIsLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">My Orders</h2>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Meal</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Ordered At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, i) => {
              const totalPrice = order.quantity * order.meal.price;

              return (
                <tr key={order._id}>
                  {/* Index */}
                  <td className="font-bold">{i + 1}</td>

                  {/* Meal */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-rounded w-12 h-12 rounded-box">
                          <img src={order.meal.image} alt={order.meal.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{order.meal.name}</div>
                        <div className="text-xs opacity-50 truncate max-w-[140px]">
                          {order.meal._id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Quantity */}
                  <td>{order.quantity}</td>

                  {/* Total Price */}
                  <td>৳{totalPrice}</td>

                  {/* Status */}
                  <td className="capitalize">
                    <div className="flex items-center gap-2">
                      <FaCircle
                        size={10}
                        className={
                          order.status === "pending"
                            ? "text-warning"
                            : order.status === "paid"
                            ? "text-info"
                            : "text-success"
                        }
                      />
                      {order.status}
                    </div>
                  </td>

                  {/* Date */}
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                  {/* Actions */}
                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        className="btn btn-info btn-xs tooltip"
                        data-tip="View Order"
                        onClick={() => handleViewOrder(order._id)}
                      >
                        <FaEye size={12} />
                      </button>
                      {order.status === "pending" && (
                        <>
                          <button
                            className="btn btn-primary btn-xs tooltip"
                            data-tip="Pay Now"
                            onClick={() => handlePay(order.paymentUrl)}
                          >
                            <FaCreditCard />
                          </button>

                          <button
                            className="btn btn-error btn-xs tooltip"
                            data-tip="Cancel Order"
                            onClick={() => handleCancelOrder(order)}
                          >
                            <FaTrash size={12} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
