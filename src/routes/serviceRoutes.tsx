import React from 'react';
import { Route } from "react-router-dom";

const SurMesurePage = React.lazy(() => import('@/pages/SurMesurePage'));
const UniversCadeauxPage = React.lazy(() => import('@/pages/UniversCadeauxPage'));
const GiftCardsPage = React.lazy(() => import('@/pages/GiftCardsPage'));
const ServicesPage = React.lazy(() => import('@/pages/ServicesPage'));
const FooterCategoryPage = React.lazy(() => import('@/pages/FooterCategoryPage'));

export const serviceRoutes = [
  {
    path: "/sur-mesure",
    element: <SurMesurePage />
  },
  {
    path: "/univers-cadeaux",
    element: <UniversCadeauxPage />
  },
  {
    path: "/gift-cards",
    element: <GiftCardsPage />
  },
  {
    path: "/services",
    element: <ServicesPage />
  },
  {
    path: "/footer-category/*",
    element: <FooterCategoryPage />
  }
];