import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useTranslation } from 'react-i18next';

interface ProductDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
  };
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  isOpen,
  onClose,
  product
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-gray-500">{product.description}</p>
          </div>
          <div className="space-y-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-xl font-semibold">{product.price} TND</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;