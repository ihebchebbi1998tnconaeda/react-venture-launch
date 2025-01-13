import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from "../cart/CartProvider";
import { toast } from "@/hooks/use-toast";
import { playTickSound } from "@/utils/audio";
import ProductSelectionPanel from "./ProductSelectionPanel";
import GiftBasket3D from "./GiftBasket3D";
import PackSummary from "./PackSummary";
import ConfirmationButton from "./ConfirmationButton";
import { Product } from "@/types/product";
import { Package2, Gift } from 'lucide-react';

export interface GiftPack {
  items: Product[];
  totalPrice: number;
  note?: string;
}

const GiftApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [packNote, setPackNote] = useState("");
  const [selectedContainerIndex, setSelectedContainerIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Determine pack type from URL
  const packType = React.useMemo(() => {
    const path = location.pathname;
    if (path.includes('packprestige')) return 'Pack Prestige';
    if (path.includes('packpremium')) return 'Pack Premium';
    if (path.includes('packtrio')) return 'Pack Trio';
    if (path.includes('packduo')) return 'Pack Duo';
    if (path.includes('packminiduo')) return 'Pack Mini Duo';
    if (path.includes('packchemise')) return 'Pack Chemise';
    return 'Pack Trio'; // Default
  }, [location]);

  // Get number of containers based on pack type
  const containerCount = React.useMemo(() => {
    if (packType === 'Pack Chemise') return 1;
    return ['Pack Duo', 'Pack Mini Duo'].includes(packType) ? 2 : 3;
  }, [packType]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const validateSelection = () => {
    if (selectedItems.length !== containerCount) {
      toast({
        title: "Sélection incomplète",
        description: `Veuillez sélectionner ${containerCount} articles pour ce pack`,
        variant: "destructive",
      });
      return false;
    }

    // Validate specific pack requirements
    switch (packType) {
      case 'Pack Chemise': {
        const chemises = selectedItems.filter(item => item.itemgroup_product === 'chemises');
        if (chemises.length !== 1) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Chemise doit contenir exactement 1 chemise",
            variant: "destructive",
          });
          return false;
        }
        break;
      }

      case 'Pack Prestige': {
        const chemises = selectedItems.filter(item => item.itemgroup_product === 'chemises');
        const accessoiresCount = selectedItems.filter(item => item.type_product === 'Accessoires').length;
        
        if (chemises.length !== 1) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Prestige doit contenir exactement 1 chemise",
            variant: "destructive",
          });
          return false;
        }
        
        if (accessoiresCount !== 2) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Prestige doit contenir 2 accessoires",
            variant: "destructive",
          });
          return false;
        }
        break;
      }

      case 'Pack Premium': {
        const cravates = selectedItems.filter(item => item.itemgroup_product === 'Cravates');
        const accessoiresCount = selectedItems.filter(item => item.type_product === 'Accessoires').length;
        
        if (cravates.length !== 1) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Premium doit contenir exactement 1 cravate",
            variant: "destructive",
          });
          return false;
        }
        
        if (accessoiresCount !== 2) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Premium doit contenir 2 accessoires",
            variant: "destructive",
          });
          return false;
        }
        break;
      }

      case 'Pack Trio': {
        const hasPortefeuille = selectedItems.some(item => item.itemgroup_product === 'Portefeuilles');
        const hasCeinture = selectedItems.some(item => item.itemgroup_product === 'Ceintures');
        const hasAccessoire = selectedItems.some(item => item.type_product === 'Accessoires');
        if (!hasPortefeuille || !hasCeinture || !hasAccessoire) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Trio doit contenir 1 portefeuille, 1 ceinture et 1 accessoire",
            variant: "destructive",
          });
          return false;
        }
        break;
      }

      case 'Pack Duo': {
        const duoHasPortefeuille = selectedItems.some(item => item.itemgroup_product === 'Portefeuilles');
        const duoHasCeinture = selectedItems.some(item => item.itemgroup_product === 'Ceintures');
        if (!duoHasPortefeuille || !duoHasCeinture) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Duo doit contenir 1 portefeuille et 1 ceinture",
            variant: "destructive",
          });
          return false;
        }
        break;
      }

      case 'Pack Mini Duo': {
        const hasPorteCartes = selectedItems.some(item => item.itemgroup_product === 'Porte-cartes');
        const hasPorteCles = selectedItems.some(item => item.itemgroup_product === 'Porte-clés');
        if (!hasPorteCartes || !hasPorteCles) {
          toast({
            title: "Sélection invalide",
            description: "Le Pack Mini Duo doit contenir 1 porte-cartes et 1 porte-clés",
            variant: "destructive",
          });
          return false;
        }
        break;
      }
    }

    return true;
  };

  const getPackPrice = (packType: string): number => {
    switch (packType) {
      case 'Pack Prestige':
        return 50;
      case 'Pack Premium':
        return 30;
      case 'Pack Trio':
        return 20;
      case 'Pack Duo':
        return 20;
      case 'Pack Mini Duo':
        return 0;
      case 'Pack Chemise':
        return 10; // Example price for Pack Chemise
      default:
        return 0;
    }
  };

  const handleConfirmPack = async () => {
    if (!validateSelection()) {
      return;
    }

    setIsLoading(true);
    const packPrice = getPackPrice(packType);
    
    // First add the pack price as a separate item
    if (packPrice > 0) {
      addToCart({
        id: Date.now(), // Unique ID for the pack charge
        name: `${packType} - Frais de packaging`,
        price: packPrice,
        quantity: 1,
        image: "/Menu/Sur musure .png",
        type_product: "Pack",
        itemgroup_product: "Pack",
      });
    }
    
    // Then add all selected items
    for (const item of selectedItems) {
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart({
        ...item,
        quantity: 1,
        personalization: item.personalization || packNote,
      });
    }

    toast({
      title: "Pack Ajouté au Panier! 🎉",
      description: packPrice > 0 
        ? `Pack et frais de packaging (${packPrice} TND) ajoutés au panier`
        : "Pack ajouté au panier",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });

    setIsLoading(false);
    navigate('/cart');
  };

  const handleItemDrop = (item: Product) => {
    if (selectedItems.length >= containerCount) {
      toast({
        title: "Pack complet",
        description: `Ce pack ne peut contenir que ${containerCount} articles`,
        variant: "destructive",
      });
      return;
    }

    setSelectedItems((prev) => [...prev, item]);
    playTickSound();
    toast({
      title: "Article Ajouté! 🎁",
      description: "N'oubliez pas que vous pouvez ajouter un message personnalisé à votre pack!",
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
    playTickSound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#f6f7f9] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Package2 className="w-8 h-8 text-[#700100]" />
            <h1 className="text-3xl font-['WomanFontBold'] text-[#700100]">
              {packType}
            </h1>
            <Gift className="w-8 h-8 text-[#700100]" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sélectionnez vos articles préférés et créez un pack cadeau unique qui fera plaisir à vos proches.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            className="lg:col-span-4 h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductSelectionPanel 
              onItemDrop={handleItemDrop}
              packType={packType}
              selectedContainerIndex={selectedContainerIndex}
              selectedItems={selectedItems}
            />
          </motion.div>

          <motion.div 
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GiftBasket3D 
              items={selectedItems}
              onItemDrop={handleItemDrop}
              onRemoveItem={handleRemoveItem}
              containerCount={containerCount}
              onContainerSelect={setSelectedContainerIndex}
            />
          </motion.div>

          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PackSummary
              items={selectedItems}
              note={packNote}
              onNoteChange={setPackNote}
            />
            <ConfirmationButton
              onConfirm={handleConfirmPack}
              disabled={selectedItems.length === 0}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GiftApp;
