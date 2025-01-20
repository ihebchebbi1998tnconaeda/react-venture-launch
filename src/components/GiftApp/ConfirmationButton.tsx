import React, { useState } from "react";
import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface ConfirmationButtonProps {
  onConfirm: () => void;
  disabled: boolean;
  packType?: string;
  selectedItemsCount?: number;
}

const ConfirmationButton = ({ 
  onConfirm, 
  disabled, 
  packType = '', 
  selectedItemsCount = 0 
}: ConfirmationButtonProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let holdTimer: NodeJS.Timeout;

  const startHolding = () => {
    if (isLoading || disabled) return;
    
    setIsHolding(true);
    let progress = 0;
    holdTimer = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);

      if (progress >= 100) {
        clearInterval(holdTimer);
        setIsHolding(false);
        setHoldProgress(0);
        handleConfirmation();
      }
    }, 20);
  };

  const handleConfirmation = async () => {
    if (isLoading || disabled) return;
    
    // Check if it's Pack Premium and only 2 items are selected
    if (packType === 'Pack Premium' && selectedItemsCount === 2) {
      clearInterval(holdTimer);
      setIsHolding(false);
      setHoldProgress(0);
      
      toast({
        title: "Pack incomplet",
        description: (
          <div className="space-y-2">
            <p>Vous n'avez sélectionné que 2 articles.</p>
            <p>Souhaitez-vous plutôt composer un Pack Duo ?</p>
            <button
              onClick={() => navigate('/gift-universe/packduo')}
              className="mt-2 px-4 py-2 bg-[#700100] text-white rounded-md hover:bg-[#590000] transition-colors w-full"
            >
              Voir le Pack Duo
            </button>
          </div>
        ),
        duration: 5000,
      });
      return;
    }

    // Check if it's Pack Prestige and only 2 items are selected
    if (packType === 'Pack Prestige' && selectedItemsCount === 2) {
      clearInterval(holdTimer);
      setIsHolding(false);
      setHoldProgress(0);
      
      toast({
        title: "Pack incomplet",
        description: (
          <div className="space-y-2">
            <p>Vous n'avez sélectionné que 2 articles.</p>
            <p>Souhaitez-vous plutôt composer un Pack Duo ?</p>
            <button
              onClick={() => navigate('/gift-universe/packduo')}
              className="mt-2 px-4 py-2 bg-[#700100] text-white rounded-md hover:bg-[#590000] transition-colors w-full"
            >
              Voir le Pack Duo
            </button>
          </div>
        ),
        duration: 5000,
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await onConfirm();
    } catch (error) {
      console.error('Error during confirmation:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la confirmation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stopHolding = () => {
    if (!isLoading) {
      clearInterval(holdTimer);
      setIsHolding(false);
      setHoldProgress(0);
    }
  };

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.button
        className={`relative w-full py-4 rounded-xl text-white font-medium overflow-hidden ${
          disabled || isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#700100]"
        }`}
        whileHover={!disabled && !isLoading ? { scale: 1.02 } : {}}
        whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
        onMouseDown={!disabled && !isLoading ? startHolding : undefined}
        onMouseUp={stopHolding}
        onMouseLeave={stopHolding}
        onTouchStart={!disabled && !isLoading ? startHolding : undefined}
        onTouchEnd={stopHolding}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            {isHolding && (
              <motion.div
                className="absolute left-0 top-0 h-full bg-[#590000]"
                initial={{ width: 0 }}
                animate={{ width: `${holdProgress}%` }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              <Gift className="w-5 h-5" />
              {disabled ? "Ajoutez des articles" : "Confirmer le pack"}
            </span>
          </>
        )}
      </motion.button>
      {!disabled && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Maintenez pour confirmer
        </p>
      )}
    </motion.div>
  );
};

export default ConfirmationButton;