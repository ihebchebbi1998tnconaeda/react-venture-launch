import React, { useState, useEffect, Suspense, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import MainNavbarIndex from '@/components/MainNavbarIndex';

const TopNavbar = React.lazy(() => import('../components/TopNavbar'));
const BrandNavbar = React.lazy(() => import('../components/BrandNavbar'));
const MainNavbar = React.lazy(() => import('../components/MainNavbar'));
const Hero = React.lazy(() => import('../components/Hero'));
const Products = React.lazy(() => import('../components/Products'));
const Men = React.lazy(() => import('../components/Men'));
const BrandIntro = React.lazy(() => import('../components/BrandIntro'));
const NewCollection = React.lazy(() => import('../components/NewCollection'));
const BrandLocation = React.lazy(() => import('../components/BrandLocation'));
const Footer = React.lazy(() => import('../components/Footer'));
const LoadingScreen = React.lazy(() => import('../components/LoadingScreen'));
const GiftCollection = React.lazy(() => import('../components/GiftCollection'));
const WhatsAppPopup = React.lazy(() => import('../components/WhatsAppPopup'));
const SalesPopup = React.lazy(() => import('../components/SalesPopup'));
const NewsletterPopup = React.lazy(() => import('../components/NewsletterPopup'));

const LoadingFallback = () => (
  <div className="w-full h-24 animate-pulse">
    <Skeleton className="w-full h-full" />
  </div>
);

const Index = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if this is the first visit
    const hasVisited = sessionStorage.getItem('hasVisitedIndex');
    return !hasVisited;
  });
  const [isInView, setIsInView] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Mark that user has visited the index page
    sessionStorage.setItem('hasVisitedIndex', 'true');
    
    const handleScroll = () => {
      startTransition(() => {
        if (window.scrollY > 100) {
          setIsInView(true);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Suspense fallback={<LoadingFallback />}>
            <LoadingScreen onLoadingComplete={() => {
              startTransition(() => {
                setIsLoading(false);
              });
            }} />
          </Suspense>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
              staggerChildren: 0.1
            }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <TopNavbar />
              <BrandNavbar />
              <div className="hidden lg:block">
                <MainNavbarIndex />
              </div>
              
              <Hero />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 1.8 }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <Products />
                </Suspense>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 2 }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <NewCollection />
                </Suspense>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 2.6 }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <GiftCollection />
                </Suspense>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 2.8 }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <BrandLocation />
                </Suspense>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 3 }}
              >
                <Suspense fallback={<LoadingFallback />}>
                  <Footer />
                </Suspense>
              </motion.div>

              <Suspense fallback={null}>
                <WhatsAppPopup />
                <NewsletterPopup />
              </Suspense>
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;