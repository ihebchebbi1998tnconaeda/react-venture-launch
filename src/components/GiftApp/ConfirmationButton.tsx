import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

interface ConfirmationButtonProps {
  onConfirm: () => void;
  disabled: boolean;
}

const ConfirmationButton = ({ onConfirm, disabled }: ConfirmationButtonProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  let holdTimer: NodeJS.Timeout;

  const startHolding = () => {
    setIsHolding(true);
    let progress = 0;
    holdTimer = setInterval(() => {
      progress += 2;
      setHoldProgress(progress);
      
      if (progress >= 100) {
        clearInterval(holdTimer);
        setIsHolding(false);
        setHoldProgress(0);
        onConfirm();
      }
    }, 20);
  };

  const stopHolding = () => {
    clearInterval(holdTimer);
    setIsHolding(false);
    setHoldProgress(0);
  };

  return (
    <motion.div
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.button
        className={`relative w-full py-4 rounded-xl text-white font-medium overflow-hidden ${
          disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#700100]'
        }`}
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onMouseDown={!disabled ? startHolding : undefined}
        onMouseUp={stopHolding}
        onMouseLeave={stopHolding}
        onTouchStart={!disabled ? startHolding : undefined}
        onTouchEnd={stopHolding}
        disabled={disabled}
      >
        {isHolding && (
          <motion.div
            className="absolute left-0 top-0 h-full bg-[#590000]"
            initial={{ width: 0 }}
            animate={{ width: `${holdProgress}%` }}
          />
        )}
        <span className="relative flex items-center justify-center gap-2">
          <Gift className="w-5 h-5" />
          {disabled ? "Ajoutez des articles" : "Maintenez pour confirmer"}
        </span>
      </motion.button>
      {!disabled && (
        <p className="text-center text-sm text-gray-500 mt-2">
          Maintenez le bouton pour confirmer
        </p>
      )}
    </motion.div>
  );
};

export default ConfirmationButton;