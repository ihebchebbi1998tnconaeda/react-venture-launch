export const ProductShowcase = () => {
  return (
    <section className="py-24 bg-pearl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block px-3 py-1 mb-4 text-sm bg-sand/20 text-graphite rounded-full">
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
            Crafted with Precision
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 hover:shadow-xl transition-all duration-300 animate-float"
            >
              <div className="aspect-square rounded-xl bg-neutral-light mb-6" />
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">
                Product {item}
              </h3>
              <p className="text-neutral-dark/70">
                Experience unparalleled quality and design innovation.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};