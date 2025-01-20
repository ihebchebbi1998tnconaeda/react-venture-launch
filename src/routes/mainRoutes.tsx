import React from 'react';
import { Route, Navigate } from "react-router-dom";
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

export const mainRoutes = [
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/category/*",
    element: <CategoryPage />
  },
  {
    path: "/univers-cadeaux/*",
    element: <GiftUniversePage />
  },
  {
    path: "/cart",
    element: <CartPage />
  },
  {
    path: "/payment-success",
    element: <PaymentSuccessPage />
  },
  {
    path: "/payment-failure",
    element: <PaymentFailurePage />
  },
  {
    path: "/promo-codes",
    element: <PromoCodesPage />
  },
  {
    path: "/order-preview",
    element: <OrderPreviewPage />
  },
  {
    path: "/product/:id",
    element: <ProductDetailPage />
  },
  {
    path: "*",
    element: <Navigate to="/" replace />
  }
];