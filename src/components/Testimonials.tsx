const testimonials = [
  {
    quote: "This platform has transformed how we build web applications. Highly recommended!",
    author: "Sarah Johnson",
    role: "Tech Lead",
  },
  {
    quote: "The best development experience I've had in years. Simply amazing.",
    author: "Michael Chen",
    role: "Senior Developer",
  },
  {
    quote: "Incredible tools and support. Can't imagine going back to our old workflow.",
    author: "Emily Rodriguez",
    role: "Product Manager",
  },
];

export const Testimonials = () => {
  return (
    <div className="py-24 bg-secondary">
      <div className="container px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};