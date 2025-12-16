import Hero from "../../ui/home/Hero";
import Meals from "../../ui/home/Meals";
import Newsletter from "../../ui/home/Newsletter";
import Reviews from "../../ui/home/Reviews";

const HomePage = () => {
  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <Hero />
      <Meals />
      <Reviews />
      <Newsletter />
    </div>
  );
};

export default HomePage;
