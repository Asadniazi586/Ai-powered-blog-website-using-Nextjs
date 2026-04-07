import Image from "next/image";
import React, { useState, useEffect } from "react";
import { assets } from "../Assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

const Header = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({
    Lifestyle: 0,
    Politics: 0,
    Wellness: 0,
    Culture: 0
  });
  const { user, logout } = useAuth();

  // Fetch blog counts for each category
  useEffect(() => {
   const fetchCategoryCounts = async () => {
  try {
    const response = await axios.get('/api/blog');
    const blogs = response.data.blogs;
    
    // Helper function to normalize category names
    const normalizeCategory = (cat) => {
      if (!cat) return '';
      const trimmed = cat.trim();
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    };
    
    // Count blogs by category with normalization
    const counts = {
      Lifestyle: blogs.filter(blog => normalizeCategory(blog.category) === 'Lifestyle').length,
      Politics: blogs.filter(blog => normalizeCategory(blog.category) === 'Politics').length,
      Wellness: blogs.filter(blog => normalizeCategory(blog.category) === 'Wellness').length,
      Culture: blogs.filter(blog => normalizeCategory(blog.category) === 'Culture').length
    };
    
    console.log('Category counts:', counts);
    setCategoryCounts(counts);
  } catch (error) {
    console.error('Error fetching category counts:', error);
  }
};
    
    fetchCategoryCounts();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post("/api/blog/email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error("Subscription failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Subscription failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <header className="py-5 px-5 md:px-12 lg:px-28 border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <Image
              src={assets.logo}
              width={180}
              height={40}
              alt="Website Logo"
              className="w-[130px] sm:w-auto"
              priority
            />
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium hover:text-indigo-600 transition-colors"
                >
                  Admin Dashboard
                </Link>
              )}
              <button
                onClick={logout}
                className="flex items-center gap-2 font-medium py-2 px-4 border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 font-medium py-2 px-4 border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Get Started{" "}
              <Image src={assets.arrow} alt="" width={12} height={12} />
            </Link>
          )}
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-xs md:text-sm font-medium text-white/90">THE OFFICIAL BLOG</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              INSIGHT CHRONICLE
            </h1>
            
            {/* Subtitle */}
            <p className="text-base md:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-3">
              WHERE IDEAS MEET PERSPECTIVE
            </p>
            
            {/* Featured Text */}
            <p className="text-sm md:text-base text-white/60 max-w-2xl mx-auto mb-8 md:mb-10 px-4">
              Exploring the battle of the sexes through fashion, business, politics, culture, and entertainment — 
              empowering voices that challenge perspectives and inspire change.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link
                href="/blog"
                className="px-8 md:px-10 py-3 md:py-4 bg-white text-gray-900 font-semibold md:font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl text-sm md:text-base"
              >
                📖 Explore Articles
              </Link>
              <Link
                href="/about"
                className="px-8 md:px-10 py-3 md:py-4 bg-transparent border-2 border-white text-white font-semibold md:font-bold rounded-full hover:bg-white/10 transition-all transform hover:scale-105 text-sm md:text-base"
              >
                📚 Learn More
              </Link>
            </div>

            {/* Email Subscription Section */}
            <div className="max-w-2xl mx-auto px-4 pb-6">
              <p className="text-white text-base md:text-lg mb-3 font-medium">
                ✉️ Subscribe to our newsletter
              </p>
              <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-2.5">
                <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-5 py-4 rounded-xl outline-none text-gray-700 text-base border-2 border-transparent focus:border-indigo-500 transition-all"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="px-8 md:px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 text-base whitespace-nowrap shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe Now →"}
                  </button>
                </form>
              </div>
              <p className="text-white/70 text-xs md:text-sm mt-3">
                📧 No spam, unsubscribe anytime. Get weekly insights directly in your inbox.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section - Reduced gap */}
      <section className="py-8 md:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              Explore by Category
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Discover stories that matter to you
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Lifestyle", icon: "🌿", color: "hover:bg-green-50" },
              { name: "Politics", icon: "🏛️", color: "hover:bg-blue-50" },
              { name: "Wellness", icon: "🧘", color: "hover:bg-teal-50" },
              { name: "Culture", icon: "🎭", color: "hover:bg-purple-50" }
            ].map((category, index) => (
              <Link
                key={index}
                href={`/category/${category.name.toLowerCase()}`}
                className={`group p-6 md:p-8 bg-gray-50 rounded-2xl transition-all duration-300 hover:shadow-xl text-center ${category.color}`}
              >
                <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-base md:text-lg group-hover:text-indigo-600">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  {categoryCounts[category.name]} {categoryCounts[category.name] === 1 ? 'article' : 'articles'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;