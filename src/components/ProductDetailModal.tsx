import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Heart } from 'lucide-react';
import { useCart } from './cart/CartProvider';
import { useToast } from "@/hooks/use-toast";
import { playTickSound } from '../utils/audio';
import { motion } from 'framer-motion';
import ColorSelector from './product-detail/ColorSelector';
import SizeSelector from './product-detail/SizeSelector';
import QuantitySelector from './product-detail/QuantitySelector';
import PersonalizationButton from './product-detail/PersonalizationButton';
import { getPersonalizations } from '@/utils/personalizationStorage';
import ProductDetailHeader from './product-detail/ProductDetailHeader';
import ProductDetailContent from './product-detail/ProductDetailContent';
import ProductDetailActions from './product-detail/ProductDetailActions';
import GiftBoxSelection from './product-detail/GiftBoxSelection';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    material: string;
    color: string;
    price: number;
    image: string;
    description: string;
    status: string;
    itemgroup_product: string;
  };
}

const ProductDetailModal = ({ isOpen, onClose, product }: ProductDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedBoxOption, setSelectedBoxOption] = useState<boolean | null>(null);
  const [personalization, setPersonalization] = useState(() => {
    const savedPersonalizations = getPersonalizations();
    return savedPersonalizations[product.id] || '';
  });
  
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        description: "Une taille doit être sélectionnée avant d'ajouter au panier",
        variant: "destructive",
      });
      return;
    }

    if (product.itemgroup_product === 'chemises' && selectedBoxOption === null) {
      toast({
        title: "Sélection requise",
        description: "Veuillez choisir si vous souhaitez une boîte cadeau",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: selectedSize,
      color: product.color,
      personalization: personalization,
      withBox: selectedBoxOption || false
    });

    playTickSound();
    toast({
      title: "Produit ajouté au panier",
      description: `${quantity} x ${product.name} (${selectedSize}) ajouté avec succès`,
      duration: 3000,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[1000px] p-0 bg-white rounded-lg shadow-xl overflow-hidden mx-auto">
        <div className="flex flex-col lg:flex-row h-[90vh] lg:h-auto">
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 relative bg-gray-50 p-6">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute right-4 top-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors z-10"
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#700100] text-[#700100]' : 'text-gray-400'}`} />
            </button>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="h-full flex items-center justify-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
            <ProductDetailHeader
              onClose={onClose}
              name={product.name}
              price={product.price}
              status={product.status}
            />

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex flex-col space-y-2">
                  {product.description.split('\\n').map((line, index) => (
                    <p key={index} className="text-gray-600 py-1">{line.trim()}</p>
                  ))}
                </div>
              </div>

              <div className="p-6 space-y-6">
                <SizeSelector
                  selectedSize={selectedSize}
                  sizes={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
                  onSizeSelect={setSelectedSize}
                />

                <div className="space-y-2">
                  <span className="text-sm font-medium text-gray-900">Quantité</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrement={() => setQuantity(q => q + 1)}
                    onDecrement={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                  />
                </div>

                {product.itemgroup_product === 'chemises' && (
                  <GiftBoxSelection
                    selectedBoxOption={selectedBoxOption}
                    setSelectedBoxOption={setSelectedBoxOption}
                  />
                )}

                <PersonalizationButton
                  productId={product.id}
                  onSave={setPersonalization}
                  initialText={personalization}
                />
              </div>
            </div>

            <ProductDetailActions
              onAddToCart={handleAddToCart}
              status={product.status}
              showBoxOption={false}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;