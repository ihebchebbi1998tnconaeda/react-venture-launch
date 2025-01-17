import { motion } from "framer-motion";

export const PageLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="min-h-screen flex items-center justify-center p-4"
  >
    <div className="relative">
      <motion.div
        className="w-12 h-12 border-4 border-[#700100] border-t-transparent rounded-full"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  </motion.div>
);