import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

const BoxInfoTooltip = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="p-1 hover:text-[#700100] transition-colors">
            <Info className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="w-80 p-4 bg-white shadow-xl border border-gray-200">
          <div className="space-y-3">
            <img 
              src="/BoxToSelected.png" 
              alt="Gift Box" 
              className="w-full h-32 object-cover rounded-lg"
            />
            <div>
              <h4 className="font-medium text-[#700100] mb-1">Boîte Cadeau Élégante</h4>
              <p className="text-sm text-gray-600">
                Ajoutez une touche spéciale à votre chemise avec notre boîte cadeau luxueuse. 
                Parfaite pour les cadeaux ou pour conserver votre chemise en parfait état.
              </p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BoxInfoTooltip;