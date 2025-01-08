import React from 'react';
import { Product } from '@/types/product';
import { Trash2, MoveDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface GiftContainerProps {
  items: Product[];
  maxItems: number;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  containerTitle: string;
  className?: string;
  onItemClick?: (product: Product) => void;
  onRemoveItem?: (index: number) => void;
}

const GiftContainer = ({
  items,
  maxItems,
  onDrop,
  containerTitle,
  className = "",
  onItemClick,
  onRemoveItem
}: GiftContainerProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (items.length < maxItems) {
      e.preventDefault();
    }
  };

  return (
    <div className={className}>
      <div className="p-4">
        <h3 className="text-lg font-medium text-[#6D0201] mb-3 border-b pb-2">{containerTitle}</h3>
        <div
          onDrop={onDrop}
          onDragOver={handleDragOver}
          className="relative min-h-[200px]"
        >
          {/* Background placeholder */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-sm text-gray-500 pointer-events-none">
            <MoveDown className="w-8 h-8 mb-2 text-gray-400" />
            <span>Glissez un article ici</span>
            <span className="text-xs text-gray-400 mt-1">
              {maxItems - items.length} emplacement{maxItems - items.length > 1 ? 's' : ''} disponible{maxItems - items.length > 1 ? 's' : ''}
            </span>
          </div>

          {/* Grid of items */}
          <div className="grid grid-cols-1 gap-4 relative z-10">
            {items.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group"
              >
                <div
                  onClick={() => onItemClick?.(item)}
                  className="bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow flex items-center gap-3"
                >
                  <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {item.size && <span className="mr-2">Taille: {item.size}</span>}
                      {item.color && <span>Couleur: {item.color}</span>}
                    </div>
                  </div>
                </div>
                {onRemoveItem && (
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
                    aria-label="Retirer l'article"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftContainer;