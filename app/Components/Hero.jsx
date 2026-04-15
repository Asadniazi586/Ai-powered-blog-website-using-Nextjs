'use client';
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Hero = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        headers: { "Content-Type": "multipart/form-data" },
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
  );
};

export default Hero;