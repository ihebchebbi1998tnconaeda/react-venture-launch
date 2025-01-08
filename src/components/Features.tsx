import { Code, Palette, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Fast Development",
    description: "Quick iterations with hot reload and modern development tools.",
    icon: <Zap className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "Beautiful Design",
    description: "Stunning UI components and responsive layouts out of the box.",
    icon: <Palette className="w-10 h-10 text-purple-500" />,
  },
  {
    title: "Clean Code",
    description: "Well-structured TypeScript code following best practices.",
    icon: <Code className="w-10 h-10 text-pink-500" />,
  },
];

const Features = () => {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-card">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;