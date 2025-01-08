import React from 'react';
import { MinusCircle, PlusCircle, Trash2, Tag, Edit2, Package, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartItem } from './CartProvider';
import PersonalizationInput from './PersonalizationInput';

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItemCard = ({ item, onUpdateQuantity, onRemove }: CartItemCardProps) => {
  const packType = sessionStorage.getItem('selectedPackType') || 'aucun';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md border border-gray-100/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-[#F1F0FB] rounded-lg overflow-hidden group">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain mix-blend-multiply p-2 transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-serif text-[#1A1F2C] mb-1 hover:text-[#700100] transition-colors cursor-pointer">
              {item.name}
            </h3>
            {packType !== 'aucun' && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#700100]/10 text-[#700100]">
                <Package size={12} />
                {packType}
              </span>
            )}
            {item.withBox && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#700100]/10 text-[#700100]">
                <Gift size={12} />
                + Box cadeau
              </span>
            )}
          </div>
          <p className="text-[#8E9196] text-sm mb-3">Réf: {item.id.toString().padStart(6, '0')}</p>
          
          {(item.size || item.color) && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.size && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Taille: {item.size}
                </span>
              )}
              {item.color && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  Couleur: {item.color}
                </span>
              )}
            </div>
          )}

          <PersonalizationInput
            itemId={item.id}
            onUpdate={() => {}}
          />

          <div className="flex items-center gap-4 bg-[#F1F0FB] rounded-full px-4 py-1 w-fit mt-3">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="text-[#8E9196] hover:text-[#700100] transition-colors"
              aria-label="Diminuer la quantité"
            >
              <MinusCircle size={20} />
            </button>
            <span className="w-8 text-center font-medium text-[#1A1F2C]">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="text-[#8E9196] hover:text-[#700100] transition-colors"
              aria-label="Augmenter la quantité"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-medium text-[#1A1F2C] mb-2">
            {(item.price * item.quantity).toFixed(2)} TND
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="text-[#8E9196] hover:text-red-600 transition-colors group"
            aria-label="Supprimer l'article"
          >
            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItemCard;