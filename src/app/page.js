"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

// Navbar Component
// Updated Navbar Component
const Navbar = () => {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between py-4 px-6 shadow-sm bg-white">
      <div className="flex items-center">
        <Link href="/" className="text-2xl font-bold text-sky-500">
          GetYoLogo
        </Link>
      </div>
      <div className="hidden md:flex space-x-6">
        <Link href="#features" className="text-gray-600 hover:text-sky-500">
          Features
        </Link>
        <Link href="#testimonials" className="text-gray-600 hover:text-sky-500">
          Testimonials
        </Link>
      </div>
      <div className="flex space-x-4">
        {isSignedIn ? (
          <>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sky-500 border border-sky-500 rounded hover:bg-sky-50"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sky-500 border border-sky-500 rounded hover:bg-sky-50">
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 text-white bg-sky-500 rounded hover:bg-sky-600">
                Sign up
              </button>
            </SignUpButton>
          </>
        )}
      </div>
    </nav>
  );
};

// Features Component
const Features = () => {
  const features = [
    {
      title: "AI-Powered Generation",
      description:
        "Cutting-edge AI creates unique, professional logos tailored to your business identity.",
      icon: "💡",
    },
    {
      title: "Instant Results",
      description:
        "Get your logo in seconds, not days. Perfect for businesses that need to move quickly.",
      icon: "⚡",
    },
    {
      title: "Unlimited Variations",
      description:
        "Not satisfied? Generate multiple options until you find the perfect match for your brand.",
      icon: "🔄",
    },
    {
      title: "High-Resolution Downloads",
      description:
        "Download your logo in various formats suitable for both print and digital use.",
      icon: "📱",
    },
    {
      title: "Brand Consistency",
      description:
        "Create logos that align perfectly with your existing brand identity and guidelines.",
      icon: "🎨",
    },
    {
      title: "Affordable Pricing",
      description:
        "Professional logo design at a fraction of the cost of traditional design services.",
      icon: "💰",
    },
  ];

  return (
    <div id="features" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose GetYoLogo?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-sky-50 p-6 rounded-lg transition-transform duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      text: "I absolutely love how versatile GetYoLogo is! The AI-generated logo perfectly captured my brand's essence. Its intuitive design has truly enhanced my business identity, making it more professional and memorable.",
      name: "Remy Sharp",
      position: "Senior Engineer",
      company: "Sydi",
    },
    {
      text: "One of the standout features of GetYoLogo is the exceptional quality. In my experience, the system has been quick to generate and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
      name: "Travis Howard",
      position: "Lead Product Designer",
      company: "Bern",
    },
    {
      text: "The level of simplicity and user-friendliness in GetYoLogo has significantly simplified my branding journey. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.",
      name: "Cindy Baker",
      position: "CTO",
      company: "Montreal",
    },
    {
      text: "I appreciate the attention to detail in the designs from GetYoLogo. The small touches make a big difference, and it's evident that the creators focused on delivering a premium experience.",
      name: "Julia Stewart",
      position: "Senior Engineer",
      company: "Terra",
    },
    {
      text: "I've tried other similar logo generators, but GetYoLogo stands out for its innovative features. It's clear that the makers put a lot of thought into creating a solution that truly addresses user needs.",
      name: "John Smith",
      position: "Product Designer",
      company: "Colorado",
    },
    {
      text: "The quality of logos from GetYoLogo exceeded my expectations. They're durable, well-designed, and built to last. Definitely worth the investment for any business looking to elevate their brand!",
      name: "Daniel Wolf",
      position: "CDO",
      company: "Ankara",
    },
  ];

  return (
    <div id="testimonials" className="py-16 px-6 bg-sky-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Testimonials
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          See what our customers love about our products. Discover how we excel
          in efficiency, quality, and satisfaction. Join us for innovation and
          reliable support.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center text-sky-700 font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">
                    {testimonial.position}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-400">GetYoLogo</h3>
            <p className="text-gray-400">
              Powering businesses with AI-generated professional logos that make
              a lasting impression.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-sky-400">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-sky-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Support
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400">Email: info@getyologo.com</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-sky-400">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-sky-400">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} GetYoLogo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Create Your Perfect Logo in 69 Seconds
            </h1>
            <p className="text-lg mb-8">
              Harness the power of AI to generate professional, unique logos
              tailored to your business. No design skills required - just
              describe your vision and watch it come to life.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <SignUpButton mode="modal">
                <button className="bg-white text-sky-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 text-center w-full sm:w-auto">
                  Get Started Free
                </button>
              </SignUpButton>
              <Link
                href="#features"
                className="bg-transparent border-2 border-white py-3 px-6 rounded-lg hover:bg-white/10 text-center"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="aspect-w-16 aspect-h-9 rounded-lg flex items-center justify-center h-64 relative">
                <Image
                  src="/logo-preview.png" // Make sure to add this image to your public folder
                  alt="AI-Generated Logo Preview"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Home/Landing Page
export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  if (isSignedIn === undefined) {
    // Loading state
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // Landing page for non-signed in users
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
