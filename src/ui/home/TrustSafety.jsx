import { MdSecurity, MdHealthAndSafety, MdSupportAgent } from "react-icons/md";

const trustItems = [
  {
    icon: <MdHealthAndSafety size={40} />,
    title: "Hygiene First",
    desc: "Strict hygiene and food safety for all chefs.",
  },
  {
    icon: <MdSecurity size={40} />,
    title: "Secure Payments",
    desc: "Encrypted payments and protected user data.",
  },
  {
    icon: <MdSupportAgent size={40} />,
    title: "Reliable Support",
    desc: "Responsive help for customers and chefs.",
  },
];

const TrustSafety = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-black border-l-4 pl-4 border-accent">
        Trust & Quality Promise
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {trustItems.map((item, i) => (
          <div
            key={i}
            className="flex-1 flex gap-4 items-start p-6 bg-base-100 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="text-success mt-1">{item.icon}</div>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-base-content/70">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSafety;
