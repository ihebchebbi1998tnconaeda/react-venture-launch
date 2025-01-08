import { Sparkles, Brain, Clock, Globe } from "lucide-react";
import { AnimatedText } from "./AnimatedText";

const features = [
  {
    icon: <Sparkles className="w-8 h-8 text-accent" />,
    title: "Intuitive Learning",
    description: "Learn naturally through immersive experiences",
  },
  {
    icon: <Brain className="w-8 h-8 text-accent" />,
    title: "AI-Powered",
    description: "Personalized learning path adapted to your needs",
  },
  {
    icon: <Clock className="w-8 h-8 text-accent" />,
    title: "Learn Faster",
    description: "Achieve fluency in half the time",
  },
  {
    icon: <Globe className="w-8 h-8 text-accent" />,
    title: "Global Community",
    description: "Connect with native speakers worldwide",
  },
];

export const FeaturesGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <AnimatedText
          key={feature.title}
          text=""
          delay={index * 100}
          className="glass-card rounded-xl p-6 flex flex-col items-center text-center gap-4"
        >
          {feature.icon}
          <h3 className="text-lg font-semibold">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </AnimatedText>
      ))}
    </div>
  );
};