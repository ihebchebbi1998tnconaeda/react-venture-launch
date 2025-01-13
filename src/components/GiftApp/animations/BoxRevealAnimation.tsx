import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BoxRevealAnimationProps {
  containerCount: number;
}

const BoxRevealAnimation = ({ containerCount }: BoxRevealAnimationProps) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Changed to 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.2,
            transition: {
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
          className="absolute inset-0 z-50 flex items-center justify-center w-full h-full bg-black/95 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.5,
                delay: 0.2
              }
            }}
            exit={{
              scale: 1.5,
              opacity: 0,
              transition: {
                duration: 0.8
              }
            }}
            className="w-48 h-48 flex items-center justify-center"
          >
            <img
              src="/logowhite.svg"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BoxRevealAnimation;