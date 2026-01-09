import BecomeChefCTA from "../../ui/home/BecomeChefCTA";
import TrustSafety from "../../ui/home/TrustSafety";
import CommunityPromise from "../../ui/home/CommunityPromise";
import FAQ from "../../ui/home/FAQ";
import Hero from "../../ui/home/Hero";
import HowItWorks from "../../ui/home/HowItWorks";
import Meals from "../../ui/home/Meals";
import Newsletter from "../../ui/home/Newsletter";
import Reviews from "../../ui/home/Reviews";
import WhyLocalChefBazaar from "../../ui/home/WhyLocalChefBazaar";

const HomePage = () => {
  return (
    <div className="flex-1 w-full flex flex-col gap-6">
      <Hero />
      <HowItWorks />
      <WhyLocalChefBazaar />
      <CommunityPromise />
      <Meals />
      <Reviews />
      <TrustSafety />
      <BecomeChefCTA />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default HomePage;
