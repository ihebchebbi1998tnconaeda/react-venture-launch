import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from './components/cart/CartProvider';
import { LanguageProvider } from './components/language/LanguageProvider';
import AppRoutes from './routes/mainRoutes';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <CartProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster />
          </BrowserRouter>
        </CartProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;