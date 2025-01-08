export const FeatureGrid = () => {
  const features = [
    "Premium Design",
    "Intuitive Interface",
    "Seamless Integration",
    "Advanced Technology",
  ];

  return (
    <section className="py-24 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-sm bg-sage/10 text-sage rounded-full">
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
            Why Choose Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature}
              className="group p-8 rounded-2xl bg-white hover:shadow-xl transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-neutral-dark mb-4">
                {feature}
              </h3>
              <p className="text-neutral-dark/70">
                Experience the perfect blend of form and function with our
                innovative solutions.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};