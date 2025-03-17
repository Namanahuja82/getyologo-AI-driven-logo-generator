// app/dashboard/page.js
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Dashboard() {
  const [businessName, setBusinessName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsSignedIn(!!session);
      setAuthLoading(false);
      
      if (!session) {
        router.replace("/sign-in");
      }
    };
    
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsSignedIn(!!session);
        if (!session) {
          router.replace("/sign-in");
        }
      }
    );

    return () => authListener.subscription?.unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsSignedIn(false);
    router.replace('/');
  };

  const handleGenerateLogo = async () => {
    if (!businessName || !keywords) {
      setError("Please enter both Business Name and Keywords.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/logogen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, keywords }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate logo");
      }
      setLogoUrl(data.logoUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadLogo = async () => {
    if (!logoUrl) return;
    
    try {
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      const fileName = `${businessName.trim() ? businessName.replace(/\s+/g, '-').toLowerCase() : 'logo'}.png`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError("Failed to download logo. Please try again.");
      console.error("Download error:", err);
    }
  };

  const handleGenerateNewVersion = () => {
    handleGenerateLogo();
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between py-4 px-6 shadow-sm bg-white">
        <Link href="/" className="text-2xl font-bold text-sky-500">
          GetYoLogo
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/" className="px-4 py-2 text-sky-500 border border-sky-500 rounded hover:bg-sky-50">
            Home
          </Link>
          <button onClick={handleSignOut} className="w-10 h-10 rounded-full bg-sky-100 text-sky-500 hover:bg-sky-200">
            <span className="sr-only">Sign out</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </nav>
      <div className="flex flex-1 justify-center items-center px-4 py-12 bg-sky-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Generate Your Logo
          </h1>
          <div className="space-y-4">
            <input type="text" placeholder="Enter Business Name" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            <input type="text" placeholder="Enter Keywords (e.g., modern, professional, creative)" value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none" />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button onClick={handleGenerateLogo} disabled={loading} className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition font-medium shadow-md">
              {loading ? "Generating..." : "Generate Logo"}
            </button>
            {logoUrl && (
              <>
                <img src={logoUrl} alt="Generated Logo" className="w-full h-auto rounded-lg border border-gray-200 mt-4" />
                <button onClick={handleDownloadLogo} className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-medium shadow-md mt-4">
                  Download Logo
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
