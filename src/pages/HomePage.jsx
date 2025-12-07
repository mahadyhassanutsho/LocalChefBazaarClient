import Hero from "../ui/home/Hero";
import Newsletter from "../ui/home/Newsletter";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4">
      <Hero />
      <Newsletter />
    </div>
  );
};

export default HomePage;
