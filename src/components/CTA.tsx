import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <div className="bg-primary-dark text-white py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-8 text-gray-300">
          Join thousands of users who are already enjoying our platform.
        </p>
        <Button variant="outline" className="bg-white text-primary-dark hover:bg-gray-100">
          Start Free Trial
        </Button>
      </div>
    </div>
  );
};