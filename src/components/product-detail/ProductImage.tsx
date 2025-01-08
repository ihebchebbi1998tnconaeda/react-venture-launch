import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ProductImageProps {
  image: string;
  name: string;
}

const ProductImage = ({ image, name }: ProductImageProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => setIsZoomed(!isZoomed);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      <AnimatePresence>
        {isZoomed ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={toggleZoom}
          >
            <motion.img
              src={image}
              alt={name}
              className="max-w-full max-h-full object-contain"
              layoutId="product-image"
            />
            <button
              className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              onClick={toggleZoom}
            >
              <ZoomOut className="w-6 h-6 text-white" />
            </button>
          </motion.div>
        ) : (
          <div className="group relative">
            <motion.div
              className="aspect-square bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              layoutId="product-image"
              onClick={toggleZoom}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-contain mix-blend-normal p-4 transition-transform duration-300 group-hover:scale-105"
              />
            </motion.div>
            <button
              className="absolute bottom-4 right-4 p-2 bg-black/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={toggleZoom}
            >
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </button>
            <div className="mt-2 text-center text-sm text-gray-500">
              Cliquez pour zoomer
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductImage;