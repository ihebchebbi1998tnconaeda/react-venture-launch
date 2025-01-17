import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from 'framer-motion';
import { Package2, X } from 'lucide-react';

interface BoxOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (withBox: boolean) => void;
}

const BoxOptionModal = ({ isOpen, onClose, onSelect }: BoxOptionModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white rounded-xl overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-serif text-[#1A1F2C] text-center">
            Souhaitez-vous un emballage cadeau ?
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 grid grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(true)}
            className="bg-white border border-[#700100] rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-[#700100]/10 rounded-full flex items-center justify-center mb-4">
              <Package2 className="w-12 h-12 text-[#700100]" />
            </div>
            <h3 className="text-lg font-medium text-[#700100] mb-2">Avec boîte</h3>
            <p className="text-sm text-gray-500 text-center">
              Emballage cadeau élégant pour votre chemise
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(false)}
            className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col items-center"
          >
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <X className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Sans boîte</h3>
            <p className="text-sm text-gray-500 text-center">
              Livraison standard sans emballage cadeau
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BoxOptionModal;