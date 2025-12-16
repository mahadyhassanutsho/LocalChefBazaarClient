import { useRouteError, useNavigate } from "react-router";
import Lottie from "lottie-react";

import errorAnimation from "../assets/animations/error.json";

const errorMessages = {
  404: "Oops! The page you’re looking for doesn’t exist. Try refreshing the page.",
  401: "You are not authorized to view this page. Try refreshing the page.",
  403: "Access denied. You don't have permission. Try refreshing the page.",
  500: "Something broke on our side. We're fixing it! Try refreshing the page.",
  503: "Service is temporarily unavailable. Try again later or refresh the page.",
};

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const status = error?.status || 500;
  const message =
    errorMessages[status] ||
    error?.statusText ||
    error?.message ||
    "Something went wrong!";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-base-200 px-4 text-center">
      <div className="w-72 sm:w-96">
        <Lottie animationData={errorAnimation} loop={true} />
      </div>

      <div className="space-y-1">
        <h1 className="text-6xl font-bold">{status}</h1>
        <p className="text-lg opacity-70 max-w-lg">{message}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button
          className="btn btn-accent"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
