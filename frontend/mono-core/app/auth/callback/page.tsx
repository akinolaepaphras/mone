'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AuthCallbackPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
<<<<<<< Updated upstream
    const handleAuthCallback = async () => {
      try {
        // Extract token and user info from URL parameters (from our backend)
=======
    const handleGoogleCallback = async () => {
      try {
        // Get parameters from URL
>>>>>>> Stashed changes
        const token = searchParams.get('token');
        const userId = searchParams.get('user_id');
        const email = searchParams.get('email');
        const name = searchParams.get('name');
<<<<<<< Updated upstream

        if (!token || !userId || !email || !name) {
          throw new Error('Missing authentication data');
        }

        setMessage('Setting up your account...');

        // Store authentication data in localStorage
        localStorage.setItem('google_access_token', token);
        localStorage.setItem('user_id', userId);
        localStorage.setItem('email', email);
        localStorage.setItem('name', decodeURIComponent(name));

        console.log('✅ Google OAuth successful:', {
          userId,
          email,
          name: decodeURIComponent(name)
        });

        setStatus('success');
        setMessage('Welcome! Redirecting to your dashboard...');

        // Quick redirect to welcome page
        setTimeout(() => {
          router.push('/welcome');
        }, 500); // Much faster redirect

      } catch (error) {
        console.error('❌ Authentication callback error:', error);
        setStatus('error');
        setMessage('Authentication failed. Please try again.');
=======
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage('Authentication failed. Please try again.');
          setTimeout(() => {
            router.push('/auth/signin');
          }, 3000);
          return;
        }

        if (token && userId && email) {
          setStatus('loading');
          setMessage('Setting up your account...');

          // Store user data in localStorage
          localStorage.setItem('google_access_token', token);
          localStorage.setItem('user_id', userId);
          localStorage.setItem('user_email', email);
          if (name) localStorage.setItem('user_name', name);

          console.log('User authenticated:', { userId, email, name });

          setStatus('success');
          setMessage('Welcome! Redirecting to your dashboard...');

                 // Redirect to name entry page
                 setTimeout(() => {
                   router.push('/welcome');
                 }, 2000);
        } else {
          setStatus('error');
          setMessage('Missing authentication data. Please try again.');
          setTimeout(() => {
            router.push('/auth/signin');
          }, 3000);
        }
      } catch (err) {
        console.error('Callback processing error:', err);
        setStatus('error');
        setMessage('Failed to complete authentication setup.');
>>>>>>> Stashed changes
        setTimeout(() => {
          router.push('/auth/signin');
        }, 3000);
      }
    };

<<<<<<< Updated upstream
    handleAuthCallback();
=======
    handleGoogleCallback();
>>>>>>> Stashed changes
  }, [router, searchParams]);

  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        );
      case 'success':
        return (
          <div className="text-green-400 text-6xl flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="text-red-400 text-6xl flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center space-y-6">
        {getStatusIcon()}
        
        <div>
          <h1 className="text-3xl font-light text-white leading-tight">
            {status === 'loading' && "Just a moment..."}
            {status === 'success' && "Welcome to Mono!"}
            {status === 'error' && "Oops! Something went wrong"}
          </h1>
          <p className="text-lg text-white/70 mt-2">
            {message}
          </p>
        </div>

        {/* Loading progress for visual feedback */}
        {status === 'loading' && (
          <div className="w-64 bg-white/20 rounded-full h-2 mx-auto">
            <motion.div
              className="bg-white h-2 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}