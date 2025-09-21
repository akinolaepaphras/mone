'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
<<<<<<< Updated upstream
import { MonoLogo } from "@/components/mono-logo";
import { ProgressBar } from "@/components/progress-bar";
import { AnimatedVisual } from "@/components/animated-visual";
=======

>>>>>>> Stashed changes
export default function IncomePage() {
  const [income, setIncome] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
<<<<<<< Updated upstream
    // Check if user is authenticated via localStorage (replacing Auth0)
=======
    // Check if user is authenticated via localStorage
>>>>>>> Stashed changes
    const token = localStorage.getItem('google_access_token');
    
    if (!token) {
      router.push('/auth/signin');
      return;
    }
  }, [router]);

  const handleContinue = () => {
    if (income.trim()) {
      localStorage.setItem('monthlyIncome', income.trim());
      router.push('/rent');
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-black flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Visual/Illustration area */}
      <motion.div 
        className="w-1/2 bg-white relative overflow-hidden"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Simple animated visual for now */}
        <div className="h-full flex items-center justify-center">
          <motion.div 
            className="text-8xl text-black/10"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ●
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Content area */}
      <div className="w-1/2 relative">
        {/* Top left logo section */}
        <motion.div 
          className="absolute top-8 left-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-white">
            <span 
              className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif' }}
            >
              mono
            </span>
          </h1>
        </motion.div>

        {/* Centered progress bar - aligned with logo */}
        <motion.div 
          className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center h-10"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Simple progress indicator */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            <div className="w-2 h-2 bg-white/30 rounded-full"></div>
          </div>
        </motion.div>

        {/* Main content area - centered */}
        <div className="flex flex-col justify-center items-center h-full px-16">
          <div className="w-full max-w-md space-y-8">
            {/* Main heading */}
            <motion.div 
              className="text-center space-y-4"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="text-4xl font-light text-white leading-tight">
                How much do you earn monthly{" "}
                <span className="font-semibold">after tax</span>?
              </h1>
            </motion.div>

            {/* Input form */}
            <motion.div 
              className="space-y-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <div className="space-y-2">
                <label 
                  htmlFor="income" 
                  className="block text-base font-medium text-white"
                >
                  Monthly income (after tax)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50 text-lg">$</span>
                  <input
                    id="income"
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 text-base border border-white/30
                             bg-white/10 text-white backdrop-blur-xl
                             focus:border-white/50 focus:bg-white/15 focus:outline-none focus:ring-0
                             rounded-md
                             placeholder:text-white/50"
                    required
                  />
                </div>
              </div>

              <motion.button
                onClick={handleContinue}
                disabled={!income.trim()}
                className="w-full py-3 px-6 text-base font-medium
                         bg-white text-black
                         hover:bg-gray-100
                         disabled:opacity-50 disabled:cursor-not-allowed
                         rounded-md
                         focus:outline-none focus:ring-0
                         transition-all duration-200"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Continue
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}