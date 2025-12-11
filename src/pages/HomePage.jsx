import Hero from "../ui/home/Hero";
import Meals from "../ui/home/Meals";
import Newsletter from "../ui/home/Newsletter";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <Hero />
      <Meals />
      <Newsletter />
    </div>
  );
};

export default HomePage;
