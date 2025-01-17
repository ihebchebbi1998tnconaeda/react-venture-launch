import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { PageLoader } from "@/components/PageLoader";

// Lazy load pages
const Index = React.lazy(() => import("@/pages/Index"));
const CategoryPage = React.lazy(() => import("@/pages/CategoryPage"));
const GiftUniversePage = React.lazy(() => import("@/pages/GiftUniversePage"));
const CartPage = React.lazy(() => import('@/pages/CartPage'));
const PaymentSuccessPage = React.lazy(() => import('@/pages/PaymentSuccessPage'));
const PaymentFailurePage = React.lazy(() => import('@/pages/PaymentFailurePage'));
const PromoCodesPage = React.lazy(() => import('@/pages/PromoCodesPage'));
const OrderPreviewPage = React.lazy(() => import('@/pages/OrderPreviewPage'));
const ProductDetailPage = React.lazy(() => import('@/pages/ProductDetailPage'));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/category/*" element={<CategoryPage />} />
        <Route path="/univers-cadeaux/*" element={<GiftUniversePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/payment-success" element={<PaymentSuccessPage />} />
        <Route path="/payment-failure" element={<PaymentFailurePage />} />
        <Route path="/promo-codes" element={<PromoCodesPage />} />
        <Route path="/order-preview" element={<OrderPreviewPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;