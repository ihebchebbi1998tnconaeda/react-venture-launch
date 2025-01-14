import React from 'react';

const ContentSection = () => {
  return (
    <section className="py-24 px-6" id="features">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Crafted with precision</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="floating-card glass p-8 rounded-2xl w-full max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">Thoughtful Design</h3>
            <p className="text-soft-600">Every detail is carefully considered to create a seamless user experience.</p>
          </div>
          
          <div className="floating-card glass p-8 rounded-2xl w-full max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">Intuitive Interface</h3>
            <p className="text-soft-600">Simple yet powerful interactions that feel natural and effortless.</p>
          </div>
          
          <div className="floating-card glass p-8 rounded-2xl w-full max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">Premium Quality</h3>
            <p className="text-soft-600">Built with the highest standards of quality and attention to detail.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;