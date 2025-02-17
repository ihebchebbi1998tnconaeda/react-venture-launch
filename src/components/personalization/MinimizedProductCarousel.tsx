import { ProductConfig } from "@/config/products";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface MinimizedProductCarouselProps {
  products: ProductConfig[];
  selectedProduct: string | null;
  onProductSelect: (productId: string) => void;
}

const MinimizedProductCarousel = ({
  products,
  selectedProduct,
  onProductSelect,
}: MinimizedProductCarouselProps) => {
  return (
    <div className="w-full space-y-4 py-4">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => onProductSelect(product.id)}
            className={cn(
              "flex-shrink-0 w-[200px] cursor-pointer rounded-lg overflow-hidden border transition-all duration-300",
              selectedProduct === product.id
                ? "border-primary shadow-lg"
                : "border-gray-200 hover:border-primary/50"
            )}
          >
            <div className="h-[120px] overflow-hidden">
              <img
                src={product.image || "https://placehold.co/800x800"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-sm">{product.name}</h4>
              <p className="text-xs text-primary mt-1">
                À partir de {product.startingPrice} TND
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinimizedProductCarousel;