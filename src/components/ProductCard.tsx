import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types/product';
import { calculateFinalPrice, formatPrice } from '@/utils/priceCalculations';
import { PenLine } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const hasDiscount = product.discount_product !== "" && 
                     !isNaN(parseFloat(product.discount_product)) && 
                     parseFloat(product.discount_product) > 0;

  const finalPrice = calculateFinalPrice(
    product.price,
    product.discount_product,
    product.itemgroup_product,
    product.personalization ? true : false
  );

  return (
    <div 
      ref={ref}
      className="h-full hover:shadow-lg hover:transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="h-[300px] bg-transparent overflow-hidden mb-3 relative">
        {hasDiscount && parseFloat(product.discount_product) > 0 && (
          <div className="absolute top-2 right-2 bg-[#700100] text-white px-2 py-1 rounded-full text-sm font-medium z-10">
            -{product.discount_product}%
          </div>
        )}
        <div className={`w-full h-full transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {inView && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-normal"
              loading="lazy"
              decoding="async"
              fetchPriority="auto"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          )}
          {(!imageLoaded || !inView) && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse" />
          )}
        </div>
      </div>
      <div className="p-2 md:p-4">
        <div className="text-base font-['WomanFontRegular'] text-[#591C1C]">
          {product.name}
        </div>
        <div className="text-sm text-gray-600 uppercase">
          {product.material}<br />
          {product.color}
        </div>
        <div className="mt-2 font-['WomanFontRegular']">
          {hasDiscount && parseFloat(product.discount_product) > 0 ? (
            <div className="space-y-1">
              <span className="text-[#700100] font-bold">
                {formatPrice(finalPrice)} TND
              </span>
              <span className="text-gray-500 line-through block">
                {formatPrice(product.price)} TND
              </span>
            </div>
          ) : (
            <span className="text-black">
              {formatPrice(finalPrice)} TND
            </span>
          )}
          {product.personalization && product.itemgroup_product === 'chemises' && (
            <div className="flex items-center gap-1 text-xs text-[#700100] mt-1">
              <PenLine size={12} />
              Personnalisation: +30 TND
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;