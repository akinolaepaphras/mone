'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { WelcomeForm } from "@/components/welcome-form";
<<<<<<< Updated upstream
import { ProgressBar } from "@/components/progress-bar";
import { AnimatedVisual } from "@/components/animated-visual";
=======
>>>>>>> Stashed changes

export default function WelcomePage() {
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

  return (
    <motion.div 
      className="min-h-screen bg-black flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side - Visual/Illustration area (like YNAB's green section) */}
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
                First things first, people call us{" "}
                <span className="font-semibold">"mono"</span>.
              </h1>
            </motion.div>

            {/* Form section - appears after heading */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <WelcomeForm />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
