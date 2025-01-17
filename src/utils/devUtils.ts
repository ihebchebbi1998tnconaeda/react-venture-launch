const ENABLE_CACHE_CLEAR = false; // Set to true to enable cache clearing

export const clearDevCache = () => {
  if (!ENABLE_CACHE_CLEAR) return;
  
  console.log('Clearing development cache...');
  
  try {
    // Clear localStorage
    localStorage.clear();
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear all caches
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    
    console.log('Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};