import React from 'react';
import BoxInfoTooltip from './BoxInfoTooltip';

interface GiftBoxSelectionProps {
  selectedBoxOption: boolean | null;
  setSelectedBoxOption: (value: boolean) => void;
}

const GiftBoxSelection = ({ selectedBoxOption, setSelectedBoxOption }: GiftBoxSelectionProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-base font-semibold text-gray-900">Boîte Cadeau</span>
        <BoxInfoTooltip />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSelectedBoxOption(true)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
            ${selectedBoxOption === true 
              ? 'border-[#700100] bg-[#700100]/5 text-[#700100]' 
              : 'border-gray-200 hover:border-[#700100] text-gray-600 hover:text-[#700100]'
            }`}
        >
          <img 
            src="/BoxToSelected.png" 
            alt="With Box" 
            className="w-12 h-12 object-cover rounded"
          />
          <span className="font-medium">Avec boîte</span>
        </button>
        <button
          onClick={() => setSelectedBoxOption(false)}
          className={`p-4 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-2
            ${selectedBoxOption === false 
              ? 'border-[#700100] bg-[#700100]/5 text-[#700100]' 
              : 'border-gray-200 hover:border-[#700100] text-gray-600 hover:text-[#700100]'
            }`}
        >
          <div className="w-12 h-12 flex items-center justify-center text-current">
            <span className="text-2xl">✗</span>
          </div>
          <span className="font-medium">Sans boîte</span>
        </button>
      </div>
    </div>
  );
};

export default GiftBoxSelection;