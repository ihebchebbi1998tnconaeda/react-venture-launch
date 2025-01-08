import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
  rating?: number;
  reviews?: number;
}

const ProductInfo = ({ name, description, price, rating = 4.7, reviews = 118 }: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-2xl md:text-3xl font-['WomanFontBold'] text-gray-900 leading-tight">
          {name}
        </h1>
        
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-[#700100]">
            {price} TND
          </span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating} ({reviews} reviews)
            </span>
          </div>
        </div>

    <div className="flex flex-col space-y-2">
  {description.split('\n').map((line, index) => (
    <p key={index} className="text-gray-600 py-1">{line.trim()}</p>
  ))}
</div>

      </motion.div>
    </div>
  );
};

export default ProductInfo;
