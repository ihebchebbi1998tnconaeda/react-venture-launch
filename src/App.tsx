import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./components/cart/CartProvider";
import { usePageTracking } from "./hooks/usePageTracking";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load pages
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center p-4">
    <div className="w-full max-w-md space-y-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

// Wrapper component to implement tracking
const TrackingWrapper = ({ children }: { children: React.ReactNode }) => {
  usePageTracking();
  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <TrackingWrapper>
              <Routes>
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
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </TrackingWrapper>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
