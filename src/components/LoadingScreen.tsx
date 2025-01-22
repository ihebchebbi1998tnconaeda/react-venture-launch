import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="text-center">
        <div className="relative mb-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-['Goudy_Trajan_Pro_Bold'] text-4xl font-bold text-primary"
          >
            ELLES
          </motion.h1>
          <div className="mt-2 flex justify-center">
            {/* CMYK-style loading bars */}
            <div className="relative h-1 w-32">
              {/* Cyan bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
                className="absolute h-full w-full origin-left bg-[#0FA0CE] opacity-80"
              />
              {/* Magenta bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.2,
                }}
                className="absolute h-full w-full origin-left bg-[#D946EF] opacity-80"
              />
              {/* Yellow bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.4,
                }}
                className="absolute h-full w-full origin-left bg-[#F97316] opacity-80"
              />
              {/* Black bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.6,
                }}
                className="absolute h-full w-full origin-left bg-[#222222] opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;