import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ProductImageCarouselProps {
  images: string[];
  name: string;
}

const ProductImageCarousel = ({ images, name }: ProductImageCarouselProps) => {
  const filteredImages = images.filter(img => img !== '');

  if (filteredImages.length === 0) return null;

  return (
    <Carousel className="w-full max-w-lg mx-auto">
      <CarouselContent>
        {filteredImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="aspect-square relative bg-white rounded-xl overflow-hidden">
              <img
                src={image}
                alt={`${name} - Image ${index + 1}`}
                className="w-full h-full object-contain mix-blend-normal p-4 transition-transform duration-300 hover:scale-105"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default ProductImageCarousel;