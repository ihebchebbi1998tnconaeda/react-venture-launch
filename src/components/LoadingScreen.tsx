import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = memo(({ onLoadingComplete }: LoadingScreenProps) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'transition' | 'complete'>('loading');
  const [showCircle, setShowCircle] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setShowCircle(false);
    setTimeout(() => {
      setPhase('transition');
      setTimeout(() => {
        setPhase('complete');
        onLoadingComplete();
      }, 1000);
    }, 500);
  }, [onLoadingComplete]);

  useEffect(() => {
    const duration = 2500;
    const steps = 30;
    const interval = duration / steps;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const step = Math.floor((progress / duration) * steps);
      
      if (step <= steps) {
        setCount(step);
        if (step < steps) {
          requestAnimationFrame(animate);
        } else {
          handleLoadingComplete();
        }
      }
    };

    requestAnimationFrame(animate);

    return () => {
      startTime = 0;
    };
  }, [handleLoadingComplete]);

  const circleVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const doorVariants = {
    initial: { x: 0 },
    animate: { 
      x: '-100%',
      transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {phase !== 'complete' && (
          <>
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-40"
              style={{ backgroundColor: '#591C1C' }}
            >
              {showCircle && (
                <motion.div
                  variants={circleVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="fixed inset-0 z-50 flex items-center justify-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/30 to-red-900/30 blur-xl" />
                    <div className="relative backdrop-blur-md rounded-full p-6 bg-gradient-to-b from-white/10 to-transparent border border-white/10 shadow-2xl">
                      <motion.svg
                        className="w-16 h-16"
                        viewBox="0 0 100 100"
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 15,
                          ease: "linear",
                          repeat: Infinity,
                        }}
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.08)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#progressGradient)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${(count / 30) * 283} 283`}
                          transform="rotate(-90 50 50)"
                          className="filter drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
                        />
                        <defs>
                          <linearGradient
                            id="progressGradient"
                            gradientTransform="rotate(90)"
                          >
                            <stop offset="0%" stopColor="#dc2626" />
                            <stop offset="50%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#b91c1c" />
                          </linearGradient>
                        </defs>
                      </motion.svg>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                          className="text-2xl font-bold text-white tracking-wider"
                        >
                          {count}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {phase === 'transition' && (
                <>
                  <motion.div
                    variants={doorVariants}
                    initial="initial"
                    animate="animate"
                    className="fixed inset-0 z-50 w-1/2 bg-gradient-to-r from-[#591C1C] to-[#4a1717]"
                    style={{
                      boxShadow: '10px 0 20px rgba(0,0,0,0.3)',
                      borderRight: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[url('/logo.png')] bg-center bg-no-repeat bg-contain opacity-10"
                    />
                  </motion.div>
                  <motion.div
                    variants={doorVariants}
                    initial={{ x: 0 }}
                    animate={{ x: '100%' }}
                    transition={{
                      duration: 1,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                    className="fixed inset-0 z-50 w-1/2 left-1/2 bg-gradient-to-l from-[#591C1C] to-[#4a1717]"
                    style={{
                      boxShadow: '-10px 0 20px rgba(0,0,0,0.3)',
                      borderLeft: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[url('/logo.png')] bg-center bg-no-repeat bg-contain opacity-10"
                    />
                  </motion.div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';

export default LoadingScreen;