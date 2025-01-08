import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-light to-transparent opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 max-w-4xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-3 py-1 mb-6 text-sm font-medium bg-neutral-900 text-white rounded-full"
        >
          Welcome
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
        >
          Create something
          <span className="text-neutral-500"> beautiful</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto"
        >
          Craft exceptional digital experiences with precision and elegance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-x-4"
        >
          <button className="px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white text-neutral-900 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors">
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;