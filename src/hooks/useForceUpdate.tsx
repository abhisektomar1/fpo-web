import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom hook to trigger re-renders
export const useForceUpdate = () => {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

// Animation variants
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

interface AnimatedWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, delay = 0.2 }) => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    // Trigger animation on mount
    setKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};