import React, { useState, Suspense } from 'react';
import { useCart } from '../components/cart/CartProvider';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import TopNavbar from '../components/TopNavbar';
import { useToast } from "@/hooks/use-toast";
import Footer from '@/components/Footer';
import BrandNavbarSection from "@/components/productsPages/BrandNavbarSection";
import { motion } from "framer-motion";
import { UserDetails, getUserDetails } from '@/utils/userDetailsStorage';
import BackButton from '@/components/cart/BackButton';
import EmptyCartMessage from '@/components/cart/EmptyCartMessage';
import WhatsAppPopup from '@/components/WhatsAppPopup';
import { useTranslation } from 'react-i18next';

const UserDetailsForm = React.lazy(() => import('@/components/cart/UserDetailsForm'));
const OrderSummary = React.lazy(() => import('@/components/cart/OrderSummary'));
const CartItemCard = React.lazy(() => import('@/components/cart/CartItemCard'));

const CartPage = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(getUserDetails());
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity);
      toast({
        title: t('cart.notifications.quantityUpdated'),
        description: t('cart.notifications.quantityUpdatedDesc'),
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
      });
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
    toast({
      title: t('cart.notifications.itemRemoved'),
      description: t('cart.notifications.itemRemovedDesc'),
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleEditDetails = () => setIsEditing(true);
  const handleDeleteDetails = () => {
    localStorage.removeItem('userDetails');
    setUserDetails(null);
    toast({
      title: t('cart.notifications.detailsDeleted'),
      description: t('cart.notifications.detailsDeletedDesc'),
      style: {
        backgroundColor: '#700100',
        color: 'white',
        border: '1px solid #590000',
      },
    });
  };

  const handleFormComplete = (details: UserDetails) => {
    setUserDetails(details);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F0FB]">
      <Helmet>
        <title>{t('cart.meta.title')} | Fiori - {t('cart.meta.subtitle')}</title>
        <meta name="description" content={t('cart.meta.description')} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#700100" />
        <meta property="og:title" content={`${t('cart.meta.title')} | Fiori - ${t('cart.meta.subtitle')}`} />
        <meta property="og:description" content={t('cart.meta.description')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.fiori.com/cart" />
      </Helmet>

      <TopNavbar />
      <div className="flex-grow">
        <BrandNavbarSection />
        <div className="container mx-auto px-4 py-2 space-y-4 mt-4 lg:mt-[-4%] mt-[-13%]">
          <BackButton onClick={() => navigate('/')} />
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-serif text-[#1A1F2C] mt-2"
          >
            {t('cart.title')} ({cartItems.length} {t('cart.items')})
          </motion.h1>
          
          {cartItems.length === 0 ? (
            <EmptyCartMessage onNavigate={() => navigate('/')} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
              <div className="lg:col-span-2 space-y-4 md:space-y-6">
                <div className="space-y-4 bg-white/50 p-4 md:p-6 rounded-xl backdrop-blur-sm shadow-sm">
                  <Suspense fallback={
                    <div className="animate-pulse space-y-4">
                      <div className="h-24 bg-gray-200 rounded-lg"></div>
                      <div className="h-24 bg-gray-200 rounded-lg"></div>
                    </div>
                  }>
                    {cartItems.map((item) => (
                      <CartItemCard
                        key={item.id}
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    ))}
                  </Suspense>
                </div>
                
                {(!userDetails || isEditing) && (
                  <div className="bg-white/50 p-4 md:p-6 rounded-xl backdrop-blur-sm shadow-sm">
                    <Suspense fallback={
                      <div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>
                    }>
                      <UserDetailsForm 
                        onComplete={handleFormComplete}
                        initialData={userDetails}
                      />
                    </Suspense>
                  </div>
                )}
              </div>
              
              <div className="lg:sticky lg:top-8">
                <Suspense fallback={
                  <div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>
                }>
                  <OrderSummary
                    userDetails={userDetails}
                    cartItems={cartItems}
                    onEditDetails={!isEditing ? handleEditDetails : undefined}
                    onDeleteDetails={!isEditing ? handleDeleteDetails : undefined}
                  />
                </Suspense>
              </div>
            </div>
          )}
        </div>
      </div>
      <Suspense fallback={null}>
        <WhatsAppPopup />
      </Suspense>
      <Footer />
    </div>
  );
};

export default CartPage;