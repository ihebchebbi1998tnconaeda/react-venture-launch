import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description: "Share your interests, values, and what makes you unique."
  },
  {
    number: "02",
    title: "Connect Through Conversation",
    description: "Chat with matches based on personality compatibility."
  },
  {
    number: "03",
    title: "Build Real Connections",
    description: "Get to know each other before seeing photos."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-love-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-love-500 font-bold text-xl mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button className="bg-love-500 hover:bg-love-600 text-lg px-8 py-6">
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;