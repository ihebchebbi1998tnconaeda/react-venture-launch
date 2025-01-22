import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of developers building amazing applications
        </p>
        <Button
          variant="secondary"
          size="lg"
          className="bg-white text-purple-600 hover:bg-purple-50"
        >
          Start Building Now
        </Button>
      </div>
    </div>
  );
};