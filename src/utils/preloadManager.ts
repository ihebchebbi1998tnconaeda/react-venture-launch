export const preloadImages = async (imagePaths: string[]): Promise<void> => {
  const loadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = src;
    });
  };

  try {
    await Promise.all(imagePaths.map(loadImage));
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};