import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center gradient-bg">
      <div className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          Welcome to Your Amazing App
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
          Build something incredible with modern tools and beautiful design
        </p>
        <div className="flex gap-4 justify-center animate-fade-in">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};