import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Lottie from "lottie-react";

import loginAnimation from "../../assets/animations/login.json";
import alert from "../../utils/alert";
import useAuth from "../../hooks/useAuth";
import useToggle from "../../hooks/useToggle";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { loginUser } = useAuth();
  const { value: showPassword, toggle: toggleShowPassword } = useToggle();

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = async (data) => {
    const { email, password } = data;
    try {
      await loginUser(email, password);
      alert.success("Logged In!", "You’ve signed in successfully.");
      reset();
      navigate(state?.redirect || "/dashboard/profile");
    } catch (error) {
      alert.error(
        "Oops!",
        error.message || "Something went wrong! Please try again."
      );
    }
  };

  return (
    <div className="flex-1 w-full card p-6 bg-base-200">
      <h1 className="text-3xl font-bold text-center">Login to Your Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-4 w-full max-w-sm"
        >
          <fieldset className="space-y-4">
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
          </fieldset>

          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="link link-hover">
              Register
            </Link>
          </p>

          <button
            type="submit"
            className={`btn gap-2 w-full ${
              isSubmitting ? "cursor-not-allowed" : "btn-primary"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
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

export default LoginPage;
