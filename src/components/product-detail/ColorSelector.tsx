import React from 'react';
import { cn } from "@/lib/utils";

interface ColorSelectorProps {
  selectedColor: string;
  colors: Record<string, string>;
  onColorSelect: (color: string) => void;
}

const ColorSelector = ({ selectedColor, colors, onColorSelect }: ColorSelectorProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-900">Couleur:</span>
          <div 
            className={cn(
              "w-5 h-5 rounded-full border border-gray-200",
              selectedColor === "Brown" && "ring-2 ring-[#700100] ring-offset-2"
            )}
            style={{ backgroundColor: colors[selectedColor] || "#8B4513" }}
            title={selectedColor}
          />
          <span className="text-sm text-gray-600">{selectedColor}</span>
        </div>
      </div>
      <div className="flex gap-1.5">
        {Object.entries(colors).map(([colorName, colorCode]) => (
          <button
            key={colorName}
            onClick={() => onColorSelect(colorName)}
            className={cn(
              "w-7 h-7 rounded-full transition-all duration-200 hover:scale-110",
              selectedColor === colorName ? 'ring-2 ring-[#700100] ring-offset-2' : 'ring-1 ring-gray-200'
            )}
            style={{ backgroundColor: colorCode }}
            title={colorName}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;