// hooks/useAuth.js
"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useUser() {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsSignedIn(!!session?.user);
      setLoading(false);
      
      // Set up auth state listener
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        (_event, session) => {
          setUser(session?.user || null);
          setIsSignedIn(!!session?.user);
          setLoading(false);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initializeAuth();
  }, []);
  
  return { user, isSignedIn, loading };
}