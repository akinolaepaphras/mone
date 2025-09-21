'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
<<<<<<< Updated upstream
import { MonoLogo } from "@/components/mono-logo";
import { ProgressBar } from "@/components/progress-bar";
import { AnimatedVisual } from "@/components/animated-visual";
const options = [
  'Cutting my monthly spending',
  'Saving for a specific goal (e.g., vacation, down payment)',
  'Understanding where my money is going',
  'Optimizing my subscriptions'
];
=======
>>>>>>> Stashed changes

export default function OnboardingPage() {
  const [firstName, setFirstName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
<<<<<<< Updated upstream
    // Check if user is authenticated via localStorage (replacing Auth0)
    const token = localStorage.getItem('google_access_token');
=======
    // Check if user is authenticated via localStorage
    const token = localStorage.getItem('google_access_token');
    const email = localStorage.getItem('user_email');
>>>>>>> Stashed changes
    
    if (!token) {
      router.push('/auth/signin');
      return;
    }
<<<<<<< Updated upstream
  }, [router]);

  const handleContinue = () => {
    if (selectedOption) {
      // Store the selection and move to next step
      localStorage.setItem('monoGoal', selectedOption);
      router.push('/income');
=======
    
    setUserEmail(email || '');
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim()) {
      // Store the name in localStorage
      localStorage.setItem('userFirstName', firstName.trim());
      // Navigate to the welcome page with success
      router.push('/welcome');
>>>>>>> Stashed changes
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-8 max-w-lg px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {/* mono logo */}
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            <span 
              className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif' }}
            >
              mono
            </span>
          </h1>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-light text-white leading-tight">
              First things first, people call us{" "}
              <span className="font-semibold">"mono"</span>.
            </h2>
            <p className="text-lg text-white/70">
              What should we call you?
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Your first name"
              className="w-full px-6 py-4 text-lg bg-white/10 border border-white/20 rounded-2xl
                       text-white placeholder-white/60 backdrop-blur-xl
                       focus:bg-white/15 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20
                       transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!firstName.trim()}
            className="w-full py-4 px-8 text-lg font-semibold rounded-2xl
                     bg-white text-black
                     hover:bg-gray-100 disabled:bg-white/30 disabled:text-white/50
                     disabled:cursor-not-allowed
                     transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100"
          >
            Continue
          </button>
        </motion.form>

        {/* Email confirmation */}
        {userEmail && (
          <motion.p 
            className="text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Connected as {userEmail}
          </motion.p>
        )}
      </div>
    </div>
  );
}
