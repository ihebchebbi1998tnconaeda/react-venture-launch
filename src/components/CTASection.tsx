import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <div className="bg-primary py-16">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-white/80 mb-8">
          Join thousands of developers building amazing applications
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="bg-white text-primary hover:bg-white/90"
        >
          Start Building Now
        </Button>
      </div>
    </div>
  );
};

export default CTASection;