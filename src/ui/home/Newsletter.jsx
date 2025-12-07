import pizzaImage from "../../assets/images/pizza.avif";
import alert from "../../utils/alert";

const Newsletter = () => {
  const handleSubscription = (e) => {
    e.preventDefault();
    alert.success("Subscribed!", "We'll keep you updated with Fresh Meals.");
  };

  return (
    <div className="relative p-6 md:py-12 flex items-center justify-center bg-neutral text-neutral-content rounded-box">
      <div className="absolute inset-0 overflow-hidden rounded-box">
        <div className="absolute inset-0 bg-linear-to-b from-black/15 to-black/50"></div>
        <img
          src={pizzaImage}
          alt="Pizza"
          className="w-full h-full object-cover"
        />
      </div>

      <form
        className="flex flex-col items-center gap-6 z-1"
        onSubmit={handleSubscription}
      >
        <h2 className="text-center text-3xl font-bold">
          Subscribe to our Newsletter for
          <br />
          Fresh Menu Drops and Delicious Offers
        </h2>
        <div className="relative w-full">
          <input
            type="email"
            className="input input-lg px-6 w-full rounded-full text-base-content text-base"
            required
            placeholder="Enter Your Email"
          />
          <button className="absolute top-0 right-1 translate-y-1 btn btn-primary rounded-full z-2">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};

export default Newsletter;
