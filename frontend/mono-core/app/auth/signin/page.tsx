'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function SignInPage() {
<<<<<<< Updated upstream
  useEffect(() => {
    // Check if user is already authenticated via localStorage
    const token = localStorage.getItem('google_access_token');
    if (token) {
      window.location.href = '/welcome';
    }
  }, []);

  const handleGoogleSignIn = () => {
    // Direct redirect to our backend Google OAuth endpoint
    window.location.href = 'http://127.0.0.1:8000/auth/google/login';
  };

  return (
    <motion.div
      className="min-h-screen bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Full-width centered content */}
      <div className="w-full max-w-md mx-auto text-center space-y-12">
        {/* Animated "Welcome to Mono" with glowing effect */}
        <motion.div
          className="space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.h1 
            className="text-5xl font-light text-white leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Welcome to{" "}
            <motion.span 
              className="font-semibold relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Glowing "Mono" text */}
              <motion.span
                className="relative z-10 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.1)",
                    "0 0 15px rgba(255,255,255,0.5), 0 0 25px rgba(255,255,255,0.3), 0 0 35px rgba(255,255,255,0.2)",
                    "0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2), 0 0 30px rgba(255,255,255,0.1)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Mono
              </motion.span>
              
              {/* Subtle background glow effect */}
              <motion.div
                className="absolute inset-0 bg-white/10 blur-xl rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-white/60"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Your financial journey starts here.
          </motion.p>
        </motion.div>

        {/* Animated Sign-in Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <motion.button
            onClick={handleGoogleSignIn}
            className="group relative w-full py-4 px-8 text-base font-medium
                     bg-white/10 text-white border border-white/20
                     hover:bg-white/20 hover:border-white/30
                     rounded-lg backdrop-blur-sm
                     focus:outline-none focus:ring-2 focus:ring-white/30
                     transition-all duration-300 flex items-center justify-center space-x-3
                     overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            {/* Google Icon (simplified to white) */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
            </svg>
            
            <span className="relative z-10 text-white group-hover:text-white transition-colors duration-300">
              Continue with Google
            </span>
          </motion.button>
        </motion.div>

        {/* Subtle footer text */}
        <motion.p 
          className="text-xs text-white/40 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          Simple. Focused. Minimal.
        </motion.p>
      </div>
    </motion.div>
=======
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem('google_access_token');
    if (token) {
      router.push('/welcome');
    }
  }, [router]);

  const handleGoogleSignIn = () => {
    // Redirect to backend Google OAuth endpoint
    window.location.href = 'http://localhost:8000/auth/google/login';
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <motion.div 
        className="relative z-10 flex flex-col items-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Header section with tight spacing */}
        <div className="text-center space-y-2">
          <motion.p
            className="text-sm text-white/50 font-light tracking-[0.2em] uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Welcome to
          </motion.p>
          
          {/* mono with better proportions and effects */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            {/* Subtle glow effect behind text */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white blur-sm select-none"
                style={{ fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif' }}
              >
                mono
              </div>
            </motion.div>
            
            {/* Main mono text */}
            <motion.h1
              className="relative text-5xl md:text-6xl lg:text-7xl font-bold select-none"
              style={{ 
                fontFamily: '"Inter", "SF Pro Display", system-ui, -apple-system, sans-serif',
                background: 'linear-gradient(145deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '0.05em'
              }}
              animate={{
                filter: [
                  'drop-shadow(0 0 8px rgba(255,255,255,0.2))',
                  'drop-shadow(0 0 12px rgba(255,255,255,0.3))',
                  'drop-shadow(0 0 8px rgba(255,255,255,0.2))'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              mono
            </motion.h1>
          </motion.div>
        </div>

        {/* Subtitle with better spacing */}
        <motion.p
          className="text-white/60 text-lg font-light max-w-sm text-center leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Your financial journey starts here.
        </motion.p>

        {/* Modern glassmorphism button */}
        <motion.div
          className="pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          <motion.button
            onClick={handleGoogleSignIn}
            className="group relative px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl
                     hover:bg-white/10 hover:border-white/20 transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black
                     flex items-center space-x-3 min-w-[280px] justify-center overflow-hidden"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 10px 40px rgba(255,255,255,0.1)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer effect - contained within button */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1
              }}
            />
            
            {/* Google icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="white"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="white"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="white"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="white"/>
            </svg>
            
            <span className="text-white font-medium group-hover:text-white transition-colors duration-300">
              Continue with Google
            </span>
          </motion.button>
        </motion.div>

      </motion.div>
    </div>
>>>>>>> Stashed changes
  );
}