import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 w-fit">
      <button
        onClick={onDecrement}
        className="p-1 hover:text-[#700100] transition-colors rounded-md hover:bg-white"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
      <button
        onClick={onIncrement}
        className="p-1 hover:text-[#700100] transition-colors rounded-md hover:bg-white"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;