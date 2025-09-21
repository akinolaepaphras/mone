'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export function WelcomeForm() {
  const [firstName, setFirstName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [parent] = useAutoAnimate();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim()) {
      // Store the name in localStorage
      localStorage.setItem('userFirstName', firstName.trim());
      // Navigate to the next step in onboarding flow
      router.push('/income');
    }
  };

  const handleContinue = () => {
    if (firstName.trim()) {
      handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  return (
    <motion.div 
      ref={parent}
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Question */}
      <motion.div 
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <p className="text-lg text-white/70 font-normal">
          What should we call you?
        </p>
      </motion.div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.label
            htmlFor="firstName"
            className="block text-base font-medium text-white"
            animate={{ 
              color: isFocused ? 'white' : 'rgb(255 255 255 / 0.8)' 
            }}
          >
            Name
          </motion.label>
          <motion.div className="relative">
            <motion.input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Your first name"
              className="w-full px-4 py-3 text-base border border-white/30
                       bg-white/10 text-white backdrop-blur-xl
                       focus:border-white/50 focus:bg-white/15 focus:outline-none focus:ring-0
                       rounded-md
                       placeholder:text-white/50
                       transition-all duration-200"
              whileFocus={{ 
                scale: 1.02,
                borderColor: 'rgb(255 255 255 / 0.5)',
                boxShadow: '0 0 0 3px rgb(255 255 255 / 0.1)'
              }}
              required
            />
            {firstName && (
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.button
          type="submit"
          onClick={handleContinue}
          disabled={!firstName.trim()}
          className="w-full py-3 px-6 text-base font-medium
                   bg-white text-black
                   hover:bg-gray-100
                   disabled:opacity-50 disabled:cursor-not-allowed
                   rounded-md
                   focus:outline-none focus:ring-0
                   transition-all duration-200"
          whileHover={{ 
            scale: firstName.trim() ? 1.02 : 1,
            backgroundColor: firstName.trim() ? 'rgb(243 244 246)' : undefined
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.span
            animate={{ 
              opacity: firstName.trim() ? 1 : 0.7,
            }}
          >
            Continue
          </motion.span>
        </motion.button>
      </form>
    </motion.div>
  );
}
