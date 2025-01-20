import React, { Suspense, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { CartProvider } from "./components/cart/CartProvider";
import { usePageTracking } from "./hooks/usePageTracking";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { PageLoader } from "./components/PageLoader";
import { AnimatePresence, motion } from "framer-motion";
import { updateMetaTags } from './utils/seoUtils';

const Index = React.lazy(() => import("./pages/Index"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const GiftUniversePage = React.lazy(() => import("./pages/GiftUniversePage"));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const PaymentSuccessPage = React.lazy(() => import('./pages/PaymentSuccessPage'));
const PaymentFailurePage = React.lazy(() => import('./pages/PaymentFailurePage'));
const PromoCodesPage = React.lazy(() => import('./pages/PromoCodesPage'));
const OrderPreviewPage = React.lazy(() => import('./pages/OrderPreviewPage'));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage'));
const FooterCategoryPage = React.lazy(() => import('./pages/FooterCategoryPage'));
const MondeFioriHistoire = React.lazy(() => import('./pages/MondeFioriHistoire'));
const MondeFioriCollection = React.lazy(() => import('./pages/MondeFioriCollection'));
const MondeFioriDNA = React.lazy(() => import('./pages/MondeFioriDNA'));
const SurMesurePage = React.lazy(() => import('./pages/SurMesurePage'));
const UniversCadeauxPage = React.lazy(() => import('./pages/UniversCadeauxPage'));
const GiftCardsPage = React.lazy(() => import('@/pages/GiftCardsPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Wrapper component to implement tracking and meta updates
const TrackingWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  usePageTracking();

  useEffect(() => {
    // Update meta tags when route changes
    updateMetaTags(location.pathname);
    
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      if (location.pathname === '/new') {
        localStorage.setItem('enteredThroughNew', 'true');
      }
    }
  }, [location.pathname]);

  return <>{children}</>;
};

// Page wrapper with transitions
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <TrackingWrapper>
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Add /new route before the catch-all */}
                  <Route 
                    path="/new" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Index />
                      </Suspense>
                    } 
                  />
                  
                  <Route 
                    path="/" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <Index />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/category/*" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <CategoryPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/univers-cadeaux" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <UniversCadeauxPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/univers-cadeaux/*" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <GiftUniversePage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/product/:id" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <ProductDetailPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/cart" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <CartPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/promo-codes" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PromoCodesPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/order-preview" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <OrderPreviewPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/payment-success" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PaymentSuccessPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/payment-failure" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <PaymentFailurePage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/footer-category/*" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <FooterCategoryPage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/monde-fiori/histoire" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <MondeFioriHistoire />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/monde-fiori/collection" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <MondeFioriCollection />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/monde-fiori/dna" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <MondeFioriDNA />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/sur-mesure" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <SurMesurePage />
                      </Suspense>
                    } 
                  />
                  <Route 
                    path="/gift-cards" 
                    element={
                      <Suspense fallback={<PageLoader />}>
                        <GiftCardsPage />
                      </Suspense>
                    } 
                  />
                  
                  {/* Catch-all route should be last */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
            </TrackingWrapper>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
