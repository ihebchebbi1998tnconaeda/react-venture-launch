import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { useCart } from '@/components/cart/CartProvider';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Heart, Info, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductImageCarousel from '@/components/product-detail/ProductImageCarousel';
import ProductInfo from '@/components/product-detail/ProductInfo';
import ProductOptions from '@/components/product-detail/ProductOptions';
import RelatedProducts from '@/components/product-detail/RelatedProducts';
import TopNavbar from '@/components/TopNavbar';
import BrandNavbar from '@/components/BrandNavbar';
import MainNavbar from '@/components/MainNavbar';
import Footer from '@/components/Footer';
import BrandNavbarSection from '@/components/productsPages/BrandNavbarSection';
import MainNavbarProduct from '@/components/productsPages/MainNavbarProduct';
import PersonalizationInput from '@/components/cart/PersonalizationInput';
import { savePersonalization, getPersonalizations } from '@/utils/personalizationStorage';
import MainNavbarProductDetails from '@/components/MainNavbarProductDetails';
import BoxSelectionDialog from '@/components/product-detail/BoxSelectionDialog';
import BoxInfoTooltip from '@/components/product-detail/BoxInfoTooltip';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [personalizationText, setPersonalizationText] = useState('');
  const [selectedBoxOption, setSelectedBoxOption] = useState<boolean | null>(null);
  const [isBoxDialogOpen, setIsBoxDialogOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts,
  });

  const product = products?.find(p => p.id === Number(id));
  const relatedProducts = products?.filter(p => 
    p.id !== Number(id) && p.relatedProducts === product?.relatedProducts
  ).slice(0, 4);

  const availableSizes = product ? Object.entries(product.sizes)
    .filter(([_, quantity]) => quantity > 0)
    .map(([size]) => size.toUpperCase())
    : [];

  const handleAddToCart = (withBox?: boolean) => {
    if (!selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        description: "Une taille doit être sélectionnée avant d'ajouter au panier",
        variant: "destructive",
      });
      return;
    }

    const trimmedText = personalizationText?.trim() || '';
    if (trimmedText) {
      savePersonalization(product!.id, trimmedText);
    }

    const itemName = withBox ? `${product!.name} [+ Box]` : product!.name;

    addToCart({
      id: product!.id,
      name: itemName,
      price: product!.price,
      quantity: quantity,
      image: product!.image,
      size: selectedSize,
      color: product!.colorProduct,
      personalization: trimmedText,
      withBox: withBox
    });

    toast({
      title: "Produit ajouté au panier",
      description: `${quantity}x ${itemName} (${selectedSize}) ajouté avec succès`,
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleInitialAddToCart = () => {
    if (product?.itemgroup_product === 'chemises') {
      if (selectedBoxOption !== null) {
        handleAddToCart(selectedBoxOption);
      } else {
        setIsBoxDialogOpen(true);
      }
    } else {
      handleAddToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#700100]"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <Button onClick={() => navigate('/')}>Retour à l'accueil</Button>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopNavbar />
      <BrandNavbarSection />
      <div className="hidden lg:block">
        <MainNavbarProductDetails />
      </div>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-[#700100] transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Retour aux produits</span>
          </button>

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
              />

              <div className="mt-6">
                <PersonalizationInput
                  itemId={product.id}
                  onUpdate={setPersonalizationText}
                />
              </div>
              <div className="h-px bg-gray-200" />

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">
                      Taille {selectedSize ? `sélectionnée: ${selectedSize}` : ''}
                    </span>
                    <button className="text-xs text-[#700100] hover:underline">
                      Guide des tailles
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 text-sm font-medium rounded-md transition-all duration-200
                          ${selectedSize === size 
                            ? 'bg-[#700100] text-white shadow-md transform scale-105' 
                            : 'bg-white border border-gray-200 text-gray-900 hover:border-[#700100] hover:bg-gray-50'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
  <span className="text-base font-semibold text-gray-900">Quantité</span>
  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 w-fit">
    <button
      onClick={() => setQuantity(q => Math.max(1, q - 1))}
      className="p-1 rounded-md text-black text-lg"
      style={{ fontSize: 40 }} // Increase font size by 20%
    >
      -
    </button>
    <span className="w-8 text-center font-medium text-gray-900">{quantity}</span>
    <button
      onClick={() => setQuantity(q => q + 1)}
      className="p-1 rounded-md text-black text-lg"
      style={{ fontSize: 40 }} // Increase font size by 20%
    >
      +
    </button>
  </div>
</div>

                {product.itemgroup_product === 'chemises' && (
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
                          src="/Menu/Sur musure .png" 
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
                )}

                <Button
                  onClick={handleInitialAddToCart}
                  className="w-full h-12 bg-[#700100] hover:bg-[#5a0100] text-white text-lg font-medium transition-all duration-300 rounded-md"
                  disabled={!product.quantity}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {!product.quantity ? "Rupture de stock" : "Ajouter au panier"}
                </Button>
              </div>
            </div>
          </div>

          {relatedProducts && relatedProducts.length > 0 && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-16 mb-8"
            >
              <h2 className="text-2xl font-['WomanFontBold'] text-[#700100] mb-8">
                Produits similaires
              </h2>
              <RelatedProducts products={relatedProducts} />
            </motion.section>
          )}
        </div>
      </main>
      <Footer />

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

export default ProductDetailPage;