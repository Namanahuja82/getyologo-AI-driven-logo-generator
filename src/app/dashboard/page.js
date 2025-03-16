"use client";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Dashboard() {
  const [businessName, setBusinessName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      // Fetch the image
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      
      // Set the download filename
      const fileName = `${businessName.trim() ? businessName.replace(/\s+/g, '-').toLowerCase() : 'logo'}.png`;
      a.download = fileName;
      
      // Append to body, trigger click, and clean up
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
    // Keep the same business name and keywords, but trigger a new generation
    handleGenerateLogo();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between py-4 px-6 shadow-sm bg-white">
        <Link href="/" className="text-2xl font-bold text-sky-500">
          GetYoLogo
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="px-4 py-2 text-sky-500 border border-sky-500 rounded hover:bg-sky-50"
          >
            Home
          </Link>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center px-4 py-12 bg-sky-50">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Generate Your Logo
          </h1>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Enter Keywords (e.g., modern, professional, creative)"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              onClick={handleGenerateLogo}
              disabled={loading}
              className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition font-medium shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                "Generate Logo"
              )}
            </button>
          </div>
          
          {logoUrl ? (
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Generated Logo</h2>
              <div className="border border-gray-200 rounded-lg p-4 shadow-md">
                <img
                  src={logoUrl}
                  alt="Generated Logo"
                  className="w-full h-auto rounded"
                />
              </div>
              <div className="mt-4 flex justify-center space-x-4">
                <button 
                  onClick={handleDownloadLogo}
                  className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition"
                >
                  Download Logo
                </button>
                <button 
                  onClick={handleGenerateNewVersion}
                  className="px-4 py-2 border border-sky-500 text-sky-500 rounded hover:bg-sky-50 transition"
                >
                  Generate New Version
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-8 p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center">
              <p className="text-gray-500 text-center">
                Your logo will appear here after generation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}