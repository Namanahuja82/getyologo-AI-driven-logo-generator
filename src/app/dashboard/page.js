"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs"; // Assuming Clerk is used for auth

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col">
      {/* Navbar */}
      <nav className="w-full py-4 px-6 flex justify-between items-center bg-gray-950 shadow-lg">
        <h1 className="text-white text-2xl font-bold">LogoMaker</h1>
        <UserButton afterSignOutUrl="/" />
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-gray-950 shadow-2xl rounded-xl p-8 w-full max-w-lg border border-gray-800">
          <h1 className="text-3xl font-bold text-center text-white mb-6">
            Generate Your Logo
          </h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />

            <input
              type="text"
              placeholder="Enter Keywords"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleGenerateLogo}
              disabled={loading}
              className="w-full bg-sky-600 text-white py-3 rounded-lg hover:bg-sky-500 transition font-medium shadow-md"
            >
              {loading ? "Generating..." : "Generate Logo"}
            </button>
          </div>

          {logoUrl && (
            <div className="mt-6 text-center">
              <h2 className="text-lg font-semibold text-white">Generated Logo:</h2>
              <img
                src={logoUrl}
                alt="Generated Logo"
                className="w-full h-auto mt-4 border border-gray-700 rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
