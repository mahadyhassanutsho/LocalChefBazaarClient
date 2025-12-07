import { Link, useLocation, useNavigate } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";

import loginAnimation from "../assets/animations/login.json";
import { uploadImage } from "../services/imgbb";
import alert from "../utils/alert";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import useToggle from "../hooks/useToggle";

const RegisterPage = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const password = useWatch({ name: "password", control });
  const navigate = useNavigate();
  const { state } = useLocation();
  const { value: showPassword, toggle: toggleShowPassword } = useToggle();
  const { registerUser, updateUser } = useAuth();
  const axios = useAxios();

  const handleRegister = async (data) => {
    const { email, password, address, displayName, image } = data;
    const role = state?.role || "user";

    try {
      const photoURL = await uploadImage(image[0]);
      await registerUser(email, password);
      await updateUser({ displayName, photoURL });
      await axios.post("/users", {
        email,
        address,
        displayName,
        photoURL,
        role,
      });
      alert.success(
        "Registered!",
        "Your account has been created successfully."
      );
      reset();
      navigate(state?.redirect || "/");
    } catch (error) {
      alert.error(
        "Oops!",
        error.message || "Something went wrong! Please try again."
      );
    }
  };

  return (
    <div className="card p-6 bg-base-200">
      <h1 className="text-3xl font-bold text-center">Create an Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-4 w-full max-w-sm"
        >
          <fieldset className="space-y-4">
            {/* Display Name */}
            <div className="space-y-1">
              <label className="text-base font-semibold">Display Name:</label>
              <input
                {...register("displayName", {
                  required: "Display Name is required",
                })}
                type="text"
                className="input w-full"
                placeholder="Display Name"
              />
              {errors.displayName && (
                <p className="text-error text-xs font-semibold">
                  {errors.displayName.message}
                </p>
              )}
            </div>
            {/* Address */}
            <div className="space-y-1">
              <label className="text-base font-semibold">Address:</label>
              <input
                {...register("address", {
                  required: "Address is required",
                })}
                type="text"
                className="input w-full"
                placeholder="Address"
              />
              {errors.address && (
                <p className="text-error text-xs font-semibold">
                  {errors.address.message}
                </p>
              )}
            </div>
            {/* Email */}
            <div className="space-y-1">
              <label className="text-base font-semibold">Email:</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                className="input w-full"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-error text-xs font-semibold">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Password */}
            <div className="space-y-1">
              <label className="text-base font-semibold">Password:</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 7, message: "At least 7 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                      message:
                        "Must contain uppercase, lowercase, number, and special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className="input w-full"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 h-full btn btn-ghost z-1"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-xs font-semibold">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="text-base font-semibold">
                Confirm Password:
              </label>
              <input
                {...register("confirmPassword", {
                  validate: (value) =>
                    password === value || "Passwords do not match",
                })}
                type="password"
                className="input w-full"
                placeholder="Retype your Password"
              />
              {errors.confirmPassword && (
                <p className="text-error text-xs font-semibold">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* Profile Image */}
            <div className="space-y-1">
              <label className="text-base font-semibold">Profile Image:</label>
              <input
                {...register("image", { required: "Image is Required" })}
                type="file"
                accept="image/*"
                className="file-input w-full"
              />
              {errors.image && (
                <p className="text-error text-xs font-semibold">
                  {errors.image.message}
                </p>
              )}
            </div>
          </fieldset>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-hover">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className={`btn gap-2 w-full ${
              isSubmitting ? "cursor-not-allowed" : "btn-primary"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
            {isSubmitting && (
              <span className="loading loading-xs loading-bars" />
            )}
          </button>
        </form>

        <Lottie
          animationData={loginAnimation}
          loop={true}
          className="w-full hidden md:block"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
