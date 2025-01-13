import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

interface CheckoutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}

const CheckoutConfirmationModal = ({ isOpen, onClose, productName }: CheckoutConfirmationModalProps) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 bg-white rounded-lg overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-center text-[#700100]">
            Article ajouté au panier !
          </DialogTitle>
        </DialogHeader>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 space-y-6"
        >
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              {productName} a été ajouté à votre panier avec succès.
            </p>
            <p className="text-sm text-gray-500">
              Que souhaitez-vous faire ?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCheckout}
              className="flex-1 bg-[#700100] hover:bg-[#590000] text-white py-6 rounded-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Voir le panier
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-[#000] hover:bg-[#700100] text-white py-6 rounded-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Continuer mes achats
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutConfirmationModal;