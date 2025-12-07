import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";

import foodDeliveryAnimation from "../../assets/animations/food-delivery.json";

const Hero = () => {
  const navigate = useNavigate();

  const goToChefRegister = () => {
    navigate("/register", { state: { role: "chef" } });
  };

  return (
    <div className="p-6 bg-accent/50 rounded-box grid grid-cols-1 md:grid-cols-2 place-items-center">
      <div className="order-2 md:order-1 space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold">
          Homemade Meals, Delivered Fresh by Local Chefs
        </h1>
        <p className="text-lg text-base-content/60">
          Order delicious home-cooked dishes or earn money by becoming a
          LocalChef — all from one simple platform.
        </p>
        <div className="flex flex-col md:flex-row gap-3 justify-center md:justify-start">
          <Link to="/meals" className="btn btn-primary">
            Order Food
          </Link>
          <button
            className="btn btn-primary btn-outline font-bold"
            onClick={goToChefRegister}
          >
            Become a Chef
          </button>
        </div>
      </div>

      <Lottie
        animationData={foodDeliveryAnimation}
        loop={true}
        className="order-1 md:order-2 w-full h-auto aspect-square"
      />
    </div>
  );
};

export default Hero;
