import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ZoomIn, ZoomOut } from 'lucide-react';

interface ProductImageCarouselProps {
  images: string[];
  name: string;
}

const ProductImageCarousel = ({ images, name }: ProductImageCarouselProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  
  const filteredImages = images.filter(img => img !== '');

  if (filteredImages.length === 0) return null;

  const zoomIn = () => setZoomLevel(prevZoom => Math.min(prevZoom + 0.25, 3));
  const zoomOut = () => setZoomLevel(prevZoom => Math.max(prevZoom - 0.25, 1));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMagnifierPosition({ x, y });

    // Calculate the position for the background image
    // Using a higher zoom factor (4.5x) for better magnification
    const zoomFactor = 4.5;
    
    // Calculate the background position as a percentage
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;

    const magnifier = document.querySelector('.magnifier-content') as HTMLElement;
    if (magnifier) {
      // Center the zoom on the cursor position
      magnifier.style.backgroundPosition = `${bgX}% ${bgY}%`;
      magnifier.style.backgroundSize = `${zoomFactor * 100}%`;
    }
  };

  return (
    <div className="flex gap-4 h-[600px]">
      <div className="flex flex-col gap-2 w-24 h-full justify-between">
        {filteredImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`
              relative w-24 h-[142px] rounded-lg overflow-hidden border-2 
              ${selectedImage === index ? 'border-[#700100]' : 'border-gray-200'}
              hover:border-[#700100]/50 transition-all duration-300
            `}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={image}
              alt={`${name} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-black/10" />
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex-1 relative">
        <div 
          ref={imageRef}
          className="relative h-full bg-white rounded-xl overflow-hidden shadow-lg cursor-none"
          onMouseEnter={() => setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={filteredImages[selectedImage]}
            alt={`${name} - Image ${selectedImage + 1}`}
            className="w-full h-full object-contain p-4"
            loading="eager"
            decoding="async"
          />
          {showMagnifier && (
            <div 
              className="absolute w-32 h-32 pointer-events-none rounded-full border-2 border-[#700100] overflow-hidden bg-white"
              style={{
                left: magnifierPosition.x - 64,
                top: magnifierPosition.y - 64,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px rgba(0,0,0,0.2)',
              }}
            >
              <div 
                className="magnifier-content absolute w-full h-full"
                style={{
                  backgroundImage: `url(${filteredImages[selectedImage]})`,
                  backgroundRepeat: 'no-repeat'
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/95">
          <div className="w-full h-full flex items-center justify-center p-4">
            <motion.img
              src={filteredImages[selectedImage]}
              alt={name}
              className="max-w-full max-h-[80vh] object-contain"
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button onClick={zoomOut} className="p-2 bg-white rounded-full">
              <ZoomOut className="w-5 h-5 text-gray-700" />
            </button>
            <button onClick={zoomIn} className="p-2 bg-white rounded-full">
              <ZoomIn className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductImageCarousel;