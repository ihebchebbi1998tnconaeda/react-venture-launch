const ENABLE_CACHE_CLEAR = false;

export const clearDevCache = () => {
  if (!ENABLE_CACHE_CLEAR) return;
  
  try {
    localStorage.clear();
    sessionStorage.clear();
    
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
  } catch (error) {
    throw error;
  }
};