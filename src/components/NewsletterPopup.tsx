import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useCart } from './cart/CartProvider';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const NewsletterPopup = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { applyNewsletterDiscount } = useCart();

  useEffect(() => {
    // Check if user has already subscribed
    const hasSubscribed = localStorage.getItem('newsletterSubscribed');
    const subscribedEmail = localStorage.getItem('subscribedEmail');
    const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
    
    // Only show popup if user hasn't subscribed or hasn't used discount
    if (!hasSubscribed && (!subscribedEmail || !usedDiscountEmails.includes(subscribedEmail))) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const usedDiscountEmails = JSON.parse(localStorage.getItem('usedDiscountEmails') || '[]');
      if (usedDiscountEmails.includes(email)) {
        toast({
          variant: "destructive",
          title: t('newsletter.alreadySubscribed'),
          description: t('newsletter.alreadySubscribedMessage'),
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }

      const response = await axios.post('https://www.fioriforyou.com/backfiori/subscribe_email.php', {
        email
      });

      if (response.data.status === 'success') {
        applyNewsletterDiscount();
        toast({
          title: t('newsletter.success'),
          description: t('newsletter.successMessage'),
          duration: 3000,
        });
        setEmail('');
        handleClose();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        variant: "destructive",
        title: t('newsletter.error'),
        description: t('newsletter.errorMessage'),
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        >
          <div 
            className="absolute inset-0 bg-black/40"
            onClick={handleClose}
          />
          
          <motion.div 
            className="relative w-full max-w-[90%] sm:max-w-md glass-effect rounded-xl p-4 sm:p-6 md:p-8 text-white"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            <button
              onClick={handleClose}
              className="absolute right-2 sm:right-4 top-2 sm:top-4 text-white/60 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {t('newsletter.title')}
            </h2>
            
            <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">
              {t('newsletter.description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                required
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 
                          placeholder-white/60 text-white outline-none focus:border-white/40
                          transition-colors text-sm sm:text-base"
              />
              
              <Button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-primary hover:bg-white/90 transition-colors"
              >
                {isLoading ? t('newsletter.loading') : t('newsletter.signUp')}
              </Button>

              <p className="text-[10px] sm:text-xs text-white/60 text-center">
                {t('newsletter.terms')}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NewsletterPopup;
