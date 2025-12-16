import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FiCopy, FiCheck } from "react-icons/fi";

import useAxios from "../../hooks/useAxios";
import Loader from "../../ui/shared/Loader";

const PaymentSuccessPage = () => {
  const axios = useAxios();
  const [params] = useSearchParams();
  const [currentCopy, setCurrentCopy] = useState("");
  const session = params.get("session");
  const {
    data: payment,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["update-an-order", session],
    queryFn: () =>
      axios
        .patch("/orders", { session, order: params.get("order") })
        .then((res) => res.data),
  });

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    setCurrentCopy(text);
    setTimeout(() => setCurrentCopy(""), 1500);
  };

  if (isError) throw new Error(error.message);

  if (isLoading) return <Loader />;

  const { success, order } = payment;

  if (!success) throw new Error("The Payment Failed.");

  console.log(order);

  return (
    <div className="flex-1 w-full p-6 bg-base-200 rounded-box space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-4xl font-bold">Payment Successful</h2>
        <p className="text-base text-base-content/75 max-w-xl mx-auto">
          Successfully paid for{" "}
          <span className="font-bold italic">{order.meal.name}</span>
        </p>
      </div>

      {/* Image */}
      <img
        src={order.meal.image}
        alt=""
        className="aspect-video w-full h-auto rounded-box"
      />

      {/* Tracking ID */}
      <div className="space-y-1">
        <p className="font-semibold">Tracking ID:</p>

        <div className="flex items-center gap-2">
          <p className="text-sm break-all">{order.trackingId}</p>
          <div className="tooltip" data-tip="Copy">
            <button
              onClick={() => handleCopy(order.trackingId)}
              className="btn btn-xs"
            >
              {currentCopy === order.trackingId ? <FiCheck /> : <FiCopy />}
            </button>
          </div>
        </div>
      </div>

      {/* Transaction ID */}
      <div className="space-y-1">
        <p className="font-semibold">Transaction ID:</p>

        <div className="flex items-center gap-2">
          <p className="text-sm break-all">{order.transactionId}</p>
          <div className="tooltip" data-tip="Copy">
            <button
              onClick={() => handleCopy(order.transactionId)}
              className="btn btn-xs"
            >
              {currentCopy === order.transactionId ? <FiCheck /> : <FiCopy />}
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="space-y-1">
        <p className="font-semibold">Delivery Address:</p>

        <div className="flex items-center gap-2">
          <p className="break-all">{order.deliveryAddress}</p>
        </div>
      </div>

      {/* Paid At */}
      <div className="space-y-1">
        <p className="font-semibold">Paid At:</p>

        <div className="flex items-center gap-2">
          <p className="break-all">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <Link to="/user/orders" className="btn btn-primary">
        Go to My Orders
      </Link>
    </div>
  );
};

export default PaymentSuccessPage;
