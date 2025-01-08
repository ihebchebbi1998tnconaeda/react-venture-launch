import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";

// Static list of products with images
const PRODUCTS = [
  {
    name: "Lunettes de soleil aviateur",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
  },
  {
    name: "Montre classique",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
  },
  {
    name: "Sac en cuir",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
  },
];

const CITIES = [
  "Tunis", "Sfax", "Sousse", "Kairouan", "Medenine", "Bizerte",
  "Gabès", "Nabeul", "Tataouine", "Kasserine"
];

const NAMES = [
  "Ahmed", "Mohamed", "Sami", "Hassan", "Amine", "Youssef", 
  "Mouna", "Leila", "Aisha", "Sahar"
];


const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomInterval = () => {
  // Only return 5000, 10000, or 15000 (5, 10, or 15 seconds)
  const intervals = [15000, 30000, 60000];
  return intervals[Math.floor(Math.random() * intervals.length)];
};

const SalesPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSale, setCurrentSale] = useState({
    name: "",
    city: "",
    product: PRODUCTS[0]
  });

  useEffect(() => {
    const createNewSale = () => {
      setCurrentSale({
        name: getRandomItem(NAMES),
        city: getRandomItem(CITIES),
        product: getRandomItem(PRODUCTS)
      });
      setIsVisible(true);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 7000);
    };

    // Initial sale
    createNewSale();

    // Set up interval for new sales
    const interval = setInterval(() => {
      createNewSale();
    }, getRandomInterval());

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: -100 }}
          className="fixed bottom-8 left-8 z-50"
        >
          <div className="bg-gradient-to-b from-red-800/70 via-red-800/60 to-red-800/70 backdrop-blur-sm border-t border-b border-red-500/30 shadow-lg rounded-lg px-8 py-4 flex items-center gap-4 max-w-md">
            <Avatar className="h-12 w-12 border-2 border-white/20">
              <AvatarImage src={currentSale.product.image} alt="Product" />
            </Avatar>
            
            <div className="flex flex-col items-start">
              <p className="text-white text-sm">
                <span className="font-semibold">{currentSale.name}</span>
                <span className="text-white/80"> de </span>
                <span className="font-semibold">{currentSale.city}</span>
              </p>
              <p className="text-white/60 text-xs">
                vient d'acheter {currentSale.product.name}
              </p>
              <p className="text-white/40 text-xs mt-1">
                Il y a quelques instants
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SalesPopup;