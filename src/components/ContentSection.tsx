import React from 'react';
import FloatingCard from './FloatingCard';

const ContentSection = () => {
  return (
    <section className="py-24 px-6" id="features">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-soft-600 text-sm tracking-wider uppercase">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Crafted with precision</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FloatingCard
            title="Thoughtful Design"
            description="Every detail is carefully considered to create a seamless user experience."
            delay={200}
          />
          <FloatingCard
            title="Intuitive Interface"
            description="Simple yet powerful interactions that feel natural and effortless."
            delay={400}
          />
          <FloatingCard
            title="Premium Quality"
            description="Built with the highest standards of quality and attention to detail."
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;