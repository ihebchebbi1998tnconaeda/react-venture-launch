import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/components/cart/CartProvider';
import { useToast } from "@/hooks/use-toast";
import ProductImageCarousel from './ProductImageCarousel';
import ProductInfo from './ProductInfo';
import PersonalizationButton from './PersonalizationButton';
import BoxSelectionDialog from './BoxSelectionDialog';
import SizeSelector from './SizeSelector';
import ProductQuantitySelector from './ProductQuantitySelector';
import ProductActions from './ProductActions';
import GiftBoxSelection from './GiftBoxSelection';
import { getStockForSize } from '@/utils/stockManagement';
import { canItemBePersonalized, getPersonalizationMessage } from '@/utils/personalizationConfig';
import { getPersonalizations } from '@/utils/personalizationStorage';
import { calculateFinalPrice } from '@/utils/productStorage';

interface ProductDetailContainerProps {
  product: Product;
  onProductAdded?: (productName: string) => void;
}

const ProductDetailContainer = ({ product, onProductAdded }: ProductDetailContainerProps) => {
  const [quantity, setQuantity] = useState(1);
  const [personalizationText, setPersonalizationText] = useState(() => {
    const savedPersonalizations = getPersonalizations();
    return savedPersonalizations[product.id] || '';
  });
  const [selectedBoxOption, setSelectedBoxOption] = useState<boolean | null>(null);
  const [isBoxDialogOpen, setIsBoxDialogOpen] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState(() => {
    // Automatically set size to 'unique' for items that don't need size selection
    return ['cravates', 'portefeuilles'].includes(product.itemgroup_product) ? 'unique' : '';
  });

  const canPersonalize = canItemBePersonalized(product.itemgroup_product);
  const personalizationMessage = getPersonalizationMessage(product.itemgroup_product);
  const needsSizeSelection = !['cravates', 'portefeuilles'].includes(product.itemgroup_product);

  console.log('Product itemgroup:', product.itemgroup_product);
  console.log('Can personalize:', canPersonalize);
  console.log('Personalization message:', personalizationMessage);

  const productImages = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  const handleAddToCart = (withBox?: boolean) => {
    if (!selectedSize && needsSizeSelection) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      });
      return;
    }

    const availableStock = needsSizeSelection ? getStockForSize(product, selectedSize) : product.quantity;
    if (quantity > availableStock) {
      toast({
        title: "Stock insuffisant",
        description: needsSizeSelection 
          ? `Il ne reste que ${availableStock} articles en stock pour la taille ${selectedSize}`
          : `Il ne reste que ${availableStock} articles en stock`,
        variant: "destructive",
      });
      return;
    }

    const hasDiscount = product.discount_product !== "" && 
                       !isNaN(parseFloat(product.discount_product)) && 
                       parseFloat(product.discount_product) > 0;
    
    const finalPrice = calculateFinalPrice(product.price, product.discount_product);

    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      originalPrice: hasDiscount ? product.price : undefined,
      quantity: quantity,
      image: product.image,
      size: selectedSize,
      personalization: personalizationText,
      withBox: withBox,
      discount_product: product.discount_product,
    });

    onProductAdded?.(product.name);
  };

  const handleInitialAddToCart = () => {
    if (product.itemgroup_product === 'chemises') {
      if (selectedBoxOption !== null) {
        handleAddToCart(selectedBoxOption);
      } else {
        setIsBoxDialogOpen(true);
      }
    } else {
      handleAddToCart(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="relative">
        <ProductImageCarousel images={productImages} name={product.name} />
      </div>

      <div className="space-y-8">
        <ProductInfo 
          name={product.name}
          description={product.description}
          price={product.price}
          discount={product.discount_product}
        />

        {canPersonalize && (
          <div className="mt-6">
            <PersonalizationButton
              productId={product.id}
              onSave={setPersonalizationText}
              initialText={personalizationText}
            />
          </div>
        )}

        {!canPersonalize && personalizationMessage && (
          <div className="text-sm text-gray-500 italic">
            {personalizationMessage}
          </div>
        )}
        
        <div className="h-px bg-gray-200" />

        <div className="space-y-6">
          {needsSizeSelection && (
            <SizeSelector
              selectedSize={selectedSize}
              sizes={Object.entries(product.sizes)
                .filter(([_, stock]) => stock > 0)
                .map(([size]) => size)}
              onSizeSelect={setSelectedSize}
              isCostume={product.itemgroup_product === 'costumes'}
              itemGroup={product.itemgroup_product}
            />
          )}

          <ProductQuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            selectedSize={selectedSize}
            product={product}
          />

          {product.itemgroup_product === 'chemises' && (
            <GiftBoxSelection
              selectedBoxOption={selectedBoxOption}
              setSelectedBoxOption={setSelectedBoxOption}
            />
          )}

          <ProductActions
            handleInitialAddToCart={handleInitialAddToCart}
            product={product}
            selectedSize={selectedSize}
          />
        </div>
      </div>

      <BoxSelectionDialog
        isOpen={isBoxDialogOpen}
        onClose={() => setIsBoxDialogOpen(false)}
        onConfirm={(withBox) => {
          handleAddToCart(withBox);
          setIsBoxDialogOpen(false);
        }}
      />
    </div>
  );
};

export default ProductDetailContainer;