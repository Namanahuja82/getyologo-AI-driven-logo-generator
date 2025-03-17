// components/AuthButton.js
"use client";
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

export const SignInButton = ({ children, mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      setIsOpen(false);
      window.location.reload(); // Reload to update auth state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (mode === 'modal') {
    return (
      <>
        <div onClick={() => setIsOpen(true)}>
          {children}
        </div>
        
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Sign In</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSignIn}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
                >
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
              </form>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
  
  return (
    <Link href="/sign-in">
      {children}
    </Link>
  );
};

export const SignUpButton = ({ children, mode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      setIsOpen(false);
      alert('Check your email for the confirmation link');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  if (mode === 'modal') {
    return (
      <>
        <div onClick={() => setIsOpen(true)}>
          {children}
        </div>
        
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <form onSubmit={handleSignUp}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600"
                >
                  {loading ? 'Loading...' : 'Sign Up'}
                </button>
              </form>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
  
  return (
    <Link href="/sign-up">
      {children}
    </Link>
  );
};

export const UserButton = ({ afterSignOutUrl = '/' }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = afterSignOutUrl;
  };
  
  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center"
      >
        <span>👤</span>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};