import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from "../cart/CartProvider";
import { toast } from "@/hooks/use-toast";
import { playTickSound } from "@/utils/audio";
import ProductSelectionPanel from "./ProductSelectionPanel";
import GiftBasket3D from "./GiftBasket3D";
import PackSummary from "./PackSummary";
import ConfirmationButton from "./ConfirmationButton";
import { Product } from "@/types/product";
import PackTypeHeader from "./components/PackTypeHeader";
import { validatePackSelection } from "./components/PackValidation";
import { getPackPrice, getPackImage } from "@/config/packPrices";

export interface GiftPack {
  items: Product[];
  totalPrice: number;
  note?: string;
}

const GiftApp = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);
  const [packNote, setPackNote] = useState("");
  const [selectedContainerIndex, setSelectedContainerIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const packType = sessionStorage.getItem('selectedPackType') || 'Pack Trio';

  const containerCount = React.useMemo(() => {
    if (['Pack Chemise', 'Pack Ceinture', 'Pack Cravatte', 'Pack Malette'].includes(packType)) return 1;
    return ['Pack Duo', 'Pack Mini Duo'].includes(packType) ? 2 : 3;
  }, [packType]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleConfirmPack = useCallback(async () => {
    if (isSubmitting) {
      console.log('Submission already in progress, preventing double submission');
      return;
    }

    if (!validatePackSelection(selectedItems, containerCount, packType)) {
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);

    try {
      const packPrice = getPackPrice(packType);
      const packImage = getPackImage(packType);
      
      if (packPrice > 0) {
        addToCart({
          id: Date.now(),
          name: `${packType} - ${t('giftApp.notifications.packAndFees', { price: packPrice })}`,
          price: packPrice,
          quantity: 1,
          image: packImage,
          type_product: "Pack",
          itemgroup_product: "Pack",
          size: "-",
          color: "-",
          personalization: "-",
          pack: "aucun",
        });
      }

      selectedItems.forEach(item => {
        const itemToAdd = {
          ...item,
          quantity: 1,
          personalization: item.personalization || '-',
          pack: packType,
          size: item.size || '-',
          color: item.color || '-',
          fromPack: true
        };
        addToCart(itemToAdd);
      });

      toast({
        title: t('giftApp.notifications.packAdded'),
        description: packPrice > 0 
          ? t('giftApp.notifications.packAndFees', { price: packPrice })
          : t('giftApp.notifications.packOnly'),
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });

      navigate('/cart');
    } catch (error) {
      console.error('Error adding pack to cart:', error);
      toast({
        title: t('giftApp.notifications.error'),
        description: t('giftApp.notifications.errorMessage'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  }, [isSubmitting, selectedItems, containerCount, packType, addToCart, navigate, t]);

  const handleItemDrop = (item: Product, size: string, personalization: string) => {
    if (selectedItems.length >= containerCount) {
      toast({
        title: t('giftApp.notifications.packFull'),
        description: t('giftApp.notifications.packFullMessage', { count: containerCount }),
        variant: "destructive",
      });
      return;
    }

    const itemWithDetails = {
      ...item,
      fromPack: true,
      pack: packType,
      size: size,
      personalization: personalization || '-'
    };

    setSelectedItems((prev) => [...prev, itemWithDetails]);
    playTickSound();
    
    toast({
      title: t('giftApp.notifications.itemAdded'),
      description: t('giftApp.notifications.itemAddedMessage'),
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prev => {
      const newItems = [...prev];
      newItems.splice(index, 1);
      return newItems;
    });
    
    toast({
      title: t('giftApp.notifications.itemRemoved'),
      description: t('giftApp.notifications.itemRemovedMessage'),
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
    playTickSound();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b bg-[#f6f7f9] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <PackTypeHeader packType={packType} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 h-full">
            <ProductSelectionPanel 
              onItemDrop={handleItemDrop}
              packType={packType}
              selectedContainerIndex={selectedContainerIndex}
              selectedItems={selectedItems}
            />
          </div>

          <div className="lg:col-span-5">
            <GiftBasket3D 
              items={selectedItems}
              onItemDrop={handleItemDrop}
              onRemoveItem={handleRemoveItem}
              containerCount={containerCount}
              onContainerSelect={setSelectedContainerIndex}
            />
          </div>

          <div className="lg:col-span-3">
            <PackSummary
              items={selectedItems}
              note={packNote}
              onNoteChange={setPackNote}
            />
            <ConfirmationButton
              onConfirm={handleConfirmPack}
              disabled={selectedItems.length === 0 || isSubmitting}
              packType={packType}
              selectedItemsCount={selectedItems.length}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftApp;