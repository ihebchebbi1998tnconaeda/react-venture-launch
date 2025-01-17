import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from './components/cart/CartProvider';
import mainRoutes from './routes/mainRoutes';
import './i18n';
import { useTranslation } from 'react-i18next';

const App = () => {
  const queryClient = new QueryClient();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Load preferred language from localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={mainRoutes} />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
};

export default App;
