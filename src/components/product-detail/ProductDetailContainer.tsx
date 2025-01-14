import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/components/cart/CartProvider';
import { toast } from '@/hooks/use-toast';
import ProductImageCarousel from './ProductImageCarousel';
import ProductInfo from './ProductInfo';
import { Heart } from 'lucide-react';
import PersonalizationInput from '@/components/cart/PersonalizationInput';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import BoxSelectionDialog from './BoxSelectionDialog';
import { getAvailableStockForSize } from '@/utils/stockValidation';
import GiftBoxSelection from './GiftBoxSelection';
import SizeSelector from './SizeSelector';
import { calculateDiscountedPrice } from '@/utils/priceCalculations';

interface ProductDetailContainerProps {
  product: Product;
  onProductAdded?: (productName: string) => void;
}

const ProductDetailContainer = ({ product, onProductAdded }: ProductDetailContainerProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [personalizationText, setPersonalizationText] = useState('');
  const [selectedBoxOption, setSelectedBoxOption] = useState<boolean | null>(null);
  const [isBoxDialogOpen, setIsBoxDialogOpen] = useState(false);
  const { addToCart } = useCart();

  const productImages = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  const handleQuantityChange = (newQuantity: number) => {
    if (!selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        description: "Une taille doit être sélectionnée avant de modifier la quantité",
        variant: "destructive",
      });
      return;
    }

    const availableStock = getAvailableStockForSize(product, selectedSize);
    console.log(`Available stock for size ${selectedSize}: ${availableStock}`);
    
    if (newQuantity > availableStock) {
      toast({
        title: "Quantité non disponible",
        description: `Stock disponible pour la taille ${selectedSize}: ${availableStock}`,
        duration: 3000,
      });
      setQuantity(availableStock);
      return;
    }

    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(newQuantity);
  };

  const handleAddToCart = (withBox?: boolean) => {
    if (!selectedSize) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      });
      return;
    }

    const availableStock = getAvailableStockForSize(product, selectedSize);
    if (quantity > availableStock) {
      toast({
        title: "Stock insuffisant",
        description: `Il ne reste que ${availableStock} articles en stock pour la taille ${selectedSize}`,
        variant: "destructive",
      });
      return;
    }

    // Calculate the discounted price if a discount exists
    const hasDiscount = product.discount_product !== "" && 
                       !isNaN(parseFloat(product.discount_product)) && 
                       parseFloat(product.discount_product) > 0;
    
    const finalPrice = hasDiscount 
      ? calculateDiscountedPrice(product.price, product.discount_product)
      : product.price;

    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice, // Use the discounted price here
      originalPrice: hasDiscount ? product.price : undefined, // Store original price for reference
      quantity: quantity,
      image: product.image,
      size: selectedSize,
      personalization: product.category_product === "homme" && product.itemgroup_product === "costumes" ? "" : personalizationText,
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

  const availableSizes = product.itemgroup_product === 'costumes' 
    ? Object.entries(product.sizes)
        .filter(([key, stock]) => ['48', '50', '52', '54', '56', '58'].includes(key) && stock > 0)
        .map(([size]) => size)
    : Object.entries(product.sizes)
        .filter(([key, stock]) => ['s', 'm', 'l', 'xl', 'xxl', '3xl'].includes(key.toLowerCase()) && stock > 0)
        .map(([size]) => size.toUpperCase());

  const showPersonalization = !(product.category_product === "homme" && product.itemgroup_product === "costumes");

  return (
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="relative">
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-[#700100] text-[#700100]' : 'text-gray-400'}`} />
        </button>
        <ProductImageCarousel images={productImages} name={product.name} />
      </div>

      <div className="space-y-8">
        <ProductInfo 
          name={product.name}
          description={product.description}
          price={product.price}
          discount={product.discount_product}
        />

        {product.category_product !== "homme" || product.itemgroup_product !== "costumes" ? (
          <div className="mt-6">
            <PersonalizationInput
              itemId={product.id}
              onUpdate={setPersonalizationText}
            />
          </div>
        ) : null}
        
        <div className="h-px bg-gray-200" />

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-gray-900">
                Taille {selectedSize ? `sélectionnée: ${selectedSize} (Stock: ${getAvailableStockForSize(product, selectedSize)})` : ''}
              </span>
              <button className="text-xs text-[#700100] hover:underline">
                Guide des tailles
              </button>
            </div>
            <SizeSelector
              selectedSize={selectedSize}
              sizes={Object.entries(product.sizes)
                .filter(([_, stock]) => stock > 0)
                .map(([size]) => size)}
              onSizeSelect={setSelectedSize}
              isCostume={product.itemgroup_product === 'costumes'}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-gray-900">Quantité</span>
              <span className="text-sm text-gray-600">Stock total: {product.quantity}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 w-fit">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-1 rounded-md text-black text-[38px]"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-1 rounded-md text-black text-[38px]"
                disabled={!selectedSize}
              >
                +
              </button>
            </div>
          </div>

          {product.itemgroup_product === 'chemises' && (
            <GiftBoxSelection 
              selectedBoxOption={selectedBoxOption}
              setSelectedBoxOption={setSelectedBoxOption}
            />
          )}

          <Button
            onClick={handleInitialAddToCart}
            className="w-full h-12 bg-[#700100] hover:bg-[#5a0100] text-white text-lg font-medium transition-all duration-300 rounded-md"
            disabled={!product.quantity || !selectedSize}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {!product.quantity ? "Rupture de stock" : "Ajouter au panier"}
          </Button>
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