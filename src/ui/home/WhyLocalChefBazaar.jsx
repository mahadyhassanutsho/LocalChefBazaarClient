import { MdHome, MdVerified, MdEco } from "react-icons/md";

const reasons = [
  {
    icon: <MdHome size={36} />,
    title: "Home-Cooked Authenticity",
    desc: "Real meals cooked in real kitchens by passionate local chefs.",
  },
  {
    icon: <MdVerified size={36} />,
    title: "Verified Chefs",
    desc: "Every chef is reviewed, rated, and approved before joining.",
  },
  {
    icon: <MdEco size={36} />,
    title: "Fresh & Sustainable",
    desc: "Small-batch cooking means fresher food and less waste.",
  },
];

const WhyLocalChefBazaar = () => {
  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-black border-l-4 pl-4 border-accent">
        Why LocalChefBazaar
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reasons.map((item, i) => (
          <div
            key={i}
            className="relative p-8 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 hover:scale-105 transition-transform shadow-lg"
          >
            <div className="text-accent mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-base-content/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyLocalChefBazaar;
