import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { calculateDiscountedPrice, formatPrice } from '@/utils/priceCalculations';

interface ProductInfoProps {
  name: string;
  description: string;
  price: number;
  discount: string;
  rating?: number;
  reviews?: number;
}

const ProductInfo = ({ 
  name, 
  description, 
  price, 
  discount, 
  rating = 4.7, 
  reviews = 118 
}: ProductInfoProps) => {
  
  const hasDiscount = discount !== "" && !isNaN(parseFloat(discount)) && parseFloat(discount) > 0;
  const discountedPrice = hasDiscount ? calculateDiscountedPrice(price, discount) : price;


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
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-[#700100]">
                    {formatPrice(discountedPrice)} TND
                  </span>
                  <span className="text-sm font-medium  bg-[#700100] text-white px-2 py-1 rounded">
                    - {discount}%
                  </span>
                </div>
                <span className="text-lg text-gray-500 line-through">
                  {formatPrice(price)} TND
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold text-[#700100]">
                {formatPrice(price)} TND
              </span>
            )}
          </div>
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
          {description?.split('\n').map((line, index) => (
            <p key={index} className="text-gray-600 py-1">{line.trim()}</p>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;