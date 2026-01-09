import { MdGroups, MdRestaurantMenu, MdFavorite } from "react-icons/md";
import { TbCoinTakaFilled } from "react-icons/tb";

const values = [
  {
    icon: <MdGroups size={36} />,
    title: "Community First",
    desc: "We connect local chefs with nearby customers, keeping food and income within the community.",
  },
  {
    icon: <MdRestaurantMenu size={36} />,
    title: "Authentic Home Cooking",
    desc: "Every meal is prepared in small batches with care, not mass-produced in factories.",
  },
  {
    icon: <TbCoinTakaFilled size={36} />,
    title: "Fair Earnings",
    desc: "Chefs earn directly from their skills without unfair platform cuts.",
  },
  {
    icon: <MdFavorite size={36} />,
    title: "Food With Heart",
    desc: "Every dish tells a story, bringing comfort, culture, and flavor together.",
  },
];

const CommunityPromise = () => {
  return (
    <section className="relative overflow-hidden rounded-box bg-base-200 p-10 space-y-6">
      {/* background accent glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 space-y-4 max-w-3xl">
        <h2 className="text-4xl font-black">
          Built for the
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
            {" "}
            Community
          </span>
        </h2>
        <p className="text-lg text-base-content/70">
          LocalChefBazaar exists to empower home chefs, support local kitchens,
          and deliver meals that feel personal — not processed.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((item, i) => (
          <div
            key={i}
            className="group rounded-box bg-base-100 p-6 border border-base-300
                       hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            <div className="text-primary mb-4 group-hover:scale-110 transition">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-base-content/70">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityPromise;
