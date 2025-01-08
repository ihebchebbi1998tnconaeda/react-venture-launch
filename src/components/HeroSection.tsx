import { AnimatedText } from "./AnimatedText";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-light/30 to-transparent -z-10" />
      
      <AnimatedText
        text="Master Any Language"
        className="text-4xl md:text-6xl font-bold mb-6"
      />
      
      <AnimatedText
        text="Unlock your potential with AI-powered language learning"
        className="text-xl md:text-2xl text-gray-600 mb-12"
        delay={200}
      />
      
      <AnimatedText
        text=""
        delay={400}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          size="lg"
          className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-6 rounded-full"
        >
          Start Learning
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="border-2 px-8 py-6 rounded-full"
        >
          Explore Languages
        </Button>
      </AnimatedText>
    </div>
  );
};