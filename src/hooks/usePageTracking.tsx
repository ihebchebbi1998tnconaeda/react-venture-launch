import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '../utils/visitorTracking';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const currentPage = location.pathname === '/' ? 'Accueil' : location.pathname.slice(1);
    trackVisitor(currentPage).catch(error => {
      console.error('Failed to track page view:', error);
    });
  }, [location]);
};