import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      image: 'banner.png',
      title: 'Univers cadeau'
    },
    {
      image: 'banner2.png',
      title: 'Nouvelle collection'
    },
    {
      image: 'banner3.png',
      title: 'Le sur mesure'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[95vh] overflow-hidden"> {/* Changed from h-screen to h-[90vh] */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${banners[currentIndex].image}')`,
            willChange: 'transform'
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute bottom-6 w-full px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center lg:items-start">
          <div className="flex justify-center lg:justify-start gap-4">
            {banners.map((banner, index) => (
              <div
                key={index}
                className="flex flex-col items-center lg:items-start"
                style={{ minWidth: '100px' }}
              >
                <motion.h2
                  className={`text-xs md:text-sm font-medium mb-1 text-center lg:text-left transition-colors duration-300 ${
                    currentIndex === index ? 'text-white' : 'text-gray-400'
                  }`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {banner.title}
                </motion.h2>
                
                <div className="w-full h-[1px] bg-gray-600 rounded-full">
                  {currentIndex === index && (
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: 8,
                        ease: 'linear',
                        repeat: 0
                      }}
                      key={`progress-${currentIndex}`}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;