"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Your Account
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Success! Please check your email for the confirmation link.
          </div>
        )}
        
        {!success && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
                minLength={6}
              />
              <p className="text-gray-500 text-sm mt-1">
                Password must be at least 6 characters
              </p>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-500 text-white py-3 rounded hover:bg-sky-600 transition"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account? {" "}
            <Link href="/sign-in" className="text-sky-500 hover:text-sky-600">
              Sign in
            </Link>
          </p>
          <Link href="/" className="block mt-2 text-gray-500 hover:text-gray-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}