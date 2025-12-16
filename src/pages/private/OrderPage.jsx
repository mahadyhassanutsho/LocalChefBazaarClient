import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";

import alert from "../../utils/alert";
import useAxios from "../../hooks/useAxios";
import useUser from "../../hooks/useUser";
import Loader from "../../ui/shared/Loader";

const OrderPage = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user, isLoading: userIsLoading } = useUser();

  const {
    data: meal,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-a-meal", id],
    queryFn: () => axios.get(`/meals/${id}`).then((res) => res.data),
  });

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = useWatch({ name: "quantity", control }) || 1;
  const totalPrice = meal ? meal.price * quantity : 0;

  const handleOrder = async (data) => {
    await alert.confirm(
      "Confirm Order",
      `Your total price is ৳${totalPrice}. Do you want to confirm the order?`,
      async () => {
        try {
          await axios
            .post("/orders", {
              quantity: Number(data.quantity),
              deliveryAddress: data.deliveryAddress,
              meal: meal._id,
              user: user._id,
            })
            .then((res) => res.data);
          alert.success(
            "Order Placed!",
            "Your order has been placed successfully."
          );
          reset();
          // window.location.href = payment.url;
        } catch (err) {
          alert.error(
            "Oops!",
            err.message || "Something went wrong. Please try again."
          );
        }
      }
    );
  };

  if (isLoading || userIsLoading) return <Loader />;

  if (isError) throw new Error(error.message);

  return (
    <div className="flex-1 w-full p-6 bg-base-200 rounded-box space-y-6">
      <h1 className="text-4xl font-bold text-center">Place Your Order</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center">
        {/* Order Form */}
        <form onSubmit={handleSubmit(handleOrder)} className="space-y-4 w-full">
          {/* Meal Name */}
          <div className="space-y-1">
            <label className="font-semibold">Meal Name</label>
            <input
              value={meal.name}
              readOnly
              className="input w-full bg-base-200"
            />
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="font-semibold">Price (per item)</label>
            <input
              value={`৳${meal.price}`}
              readOnly
              className="input w-full bg-base-200"
            />
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <label className="font-semibold">Quantity</label>
            <input
              type="number"
              min={1}
              {...register("quantity", { required: true, min: 1 })}
              className="input w-full"
            />
            {errors.quantity && (
              <p className="text-error text-xs font-semibold">
                Quantity must be at least 1
              </p>
            )}
          </div>

          {/* User Email */}
          <div className="space-y-1">
            <label className="font-semibold">Your Email</label>
            <input
              value={user.email}
              readOnly
              className="input w-full bg-base-200"
            />
          </div>

          {/* Delivery Address */}
          <div className="space-y-1">
            <label className="font-semibold">Delivery Address</label>
            <textarea
              {...register("deliveryAddress", {
                required: "Delivery address is required",
              })}
              className="textarea textarea-bordered w-full"
              placeholder="Enter your delivery address"
            />
            {errors.deliveryAddress && (
              <p className="text-error text-xs font-semibold">
                {errors.deliveryAddress.message}
              </p>
            )}
          </div>

          {/* Total Price */}
          <div className="text-lg font-bold">Total Price: ৳{totalPrice}</div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn w-full ${
              isSubmitting ? "cursor-not-allowed" : "btn-primary"
            }`}
          >
            {isSubmitting ? "Placing Order..." : "Confirm Order"}
            {isSubmitting && (
              <span className="loading loading-xs loading-bars" />
            )}
          </button>
        </form>

        {/* Meal Image */}
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full rounded-xl shadow-lg hidden md:block"
        />
      </div>
    </div>
  );
};

export default OrderPage;
