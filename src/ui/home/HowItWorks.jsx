import { MdRestaurantMenu, MdDeliveryDining, MdPayment } from "react-icons/md";

const steps = [
  {
    icon: <MdRestaurantMenu size={40} />,
    title: "Choose a Meal",
    desc: "Browse home-cooked meals from verified local chefs near you.",
  },
  {
    icon: <MdPayment size={40} />,
    title: "Place Your Order",
    desc: "Order securely with transparent pricing and no hidden fees.",
  },
  {
    icon: <MdDeliveryDining size={40} />,
    title: "Fresh Delivery",
    desc: "Enjoy freshly prepared meals delivered straight to your door.",
  },
];

const HowItWorks = () => {
  return (
    <section className="relative space-y-6">
      <h2 className="text-4xl font-black text-center border-l-4 pl-4 border-accent inline-block">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`flex-1 p-8 rounded-box bg-base-200 relative overflow-hidden group`}
          >
            {/* accent bar */}
            <div className="absolute top-0 left-0 h-full w-1 bg-primary/40 group-hover:bg-accent transition-all"></div>

            <div className="flex flex-col items-center text-center space-y-4 z-10 relative">
              <div className="text-primary">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-base-content/70">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
