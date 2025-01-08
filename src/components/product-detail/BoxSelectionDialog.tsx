import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface BoxSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (withBox: boolean) => void;
}

const BoxSelectionDialog = ({ isOpen, onClose, onConfirm }: BoxSelectionDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-serif text-[#700100]">
            Souhaitez-vous ajouter une boîte cadeau ?
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Ajoutez une touche spéciale à votre chemise avec notre boîte cadeau élégante
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 p-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onConfirm(true)}
            className="flex flex-col items-center p-4 rounded-lg border-2 border-[#700100] bg-white hover:bg-[#700100]/5 transition-colors"
          >
            <Package className="w-12 h-12 mb-2 text-[#700100]" />
            <span className="text-sm font-medium text-[#700100]">Avec boîte</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onConfirm(false)}
            className="flex flex-col items-center p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 mb-2 flex items-center justify-center text-gray-400">
              <Package className="w-12 h-12" />
            </div>
            <span className="text-sm font-medium text-gray-600">Sans boîte</span>
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoxSelectionDialog;