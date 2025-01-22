import { useState, useEffect } from 'react';
import { Layout } from './Layout';
import LoadingScreen from './LoadingScreen';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: PageWrapperProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('PageWrapper: Loading started');
    setIsLoading(true);
    
    // Simulate minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log('PageWrapper: Loading completed');
    }, 1000);

    return () => clearTimeout(timer);
  }, [children]); // Reset loading state when children (content) changes

  return (
    <Layout>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        children
      )}
    </Layout>
  );
};

export default PageWrapper;