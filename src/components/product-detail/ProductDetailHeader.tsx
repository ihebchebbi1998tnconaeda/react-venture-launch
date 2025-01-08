import React from 'react';
import { X } from 'lucide-react';

interface ProductDetailHeaderProps {
  onClose: () => void;
  name: string;
  price: number;
  status: string;
}

const ProductDetailHeader = ({ onClose, name, price, status }: ProductDetailHeaderProps) => {
  return (
    <div className="relative border-b border-gray-100 p-6">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>
      
      <div className="pr-10">
        <h2 className="text-2xl font-bold text-gray-900 font-['WomanFontBold']">{name}</h2>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold text-[#700100]">{price} TND</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            status === 'En stock' 
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHeader;