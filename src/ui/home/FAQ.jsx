const FAQ = () => {
  const faqs = [
    {
      q: "Are the chefs verified?",
      a: "Yes. Every chef goes through identity and quality verification.",
    },
    {
      q: "How is food quality ensured?",
      a: "Through ratings, reviews, and continuous monitoring.",
    },
    {
      q: "Can I become a chef without experience?",
      a: "Absolutely. Passion and hygiene matter more than formal training.",
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-4xl font-black border-l-4 pl-4 border-accent">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="collapse collapse-arrow border border-base-300 rounded-lg bg-base-200"
          >
            <input type="checkbox" />
            <div className="collapse-title font-semibold text-lg">{item.q}</div>
            <div className="collapse-content text-base-content/70">
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
