import { Rocket, Shield, Zap } from "lucide-react";

const features = [
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Lightning Fast",
    description: "Built with performance in mind for the best user experience",
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Secure by Default",
    description: "Enterprise-grade security built into every layer",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Powerful Features",
    description: "Everything you need to build amazing applications",
  },
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Amazing Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white shadow-lg card-hover animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};