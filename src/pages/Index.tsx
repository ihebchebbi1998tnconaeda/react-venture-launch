import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import Features from "../components/Features";

const Index = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Hero />
        <Features />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;