import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import foodDeliveryAnimation from "../../assets/animations/food-delivery.json";

const Hero = () => {
  const navigate = useNavigate();

  const goToChefRegister = () => {
    navigate("/register", { state: { role: "chef" } });
  };

  return (
    <div className="relative min-h-[80vh] md:min-h-[600px] w-full flex items-center justify-center overflow-hidden rounded-box bg-base-300">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 p-8 md:p-16 items-center w-full">
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left order-2 lg:order-1">
          <div className="inline-block px-4 py-1.5 rounded-full bg-accent/30 border border-accent/20 text-base-content font-medium">
            The freshest meals in your neighborhood
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black">
            Homemade{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Meals
            </span>
            <br /> Delivered Fresh.
          </h1>

          <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-base-content/70 leading-relaxed">
            Order delicious home-cooked dishes or earn money by becoming a
            <span className="font-semibold text-base-content"> LocalChef</span>{" "}
            — all from one simple platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/meals"
              className="btn btn-primary btn-lg rounded-box px-10 shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
            >
              Order Food
            </Link>
            <button
              className="btn btn-ghost btn-lg rounded-box px-10 border border-base-content/20 hover:bg-base-content/5 font-bold"
              onClick={goToChefRegister}
            >
              Become a Chef
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 order-1 lg:order-2 relative">
          <div className="relative w-full max-w-[500px] mx-auto group">
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>

            <Lottie
              animationData={foodDeliveryAnimation}
              loop={true}
              className="relative z-10 w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
