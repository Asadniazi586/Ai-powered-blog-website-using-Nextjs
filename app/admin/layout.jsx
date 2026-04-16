'use client';

import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import Sidebar from "../Components/AdminComponents/Sidebar";
import { useState } from "react";

export default function Layout({ children }) {
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="flex min-h-screen bg-gray-50">
        <ToastContainer theme="dark" position="top-right" />
        
        {/* Sidebar - Desktop relative, matches content height */}
        <div className={`
          fixed lg:relative z-50
          transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar onMobileClose={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Top Navbar with Hamburger */}
          <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3">
              
              {/* Left side - Hamburger Menu Button + Title */}
              <div className="flex items-center gap-3">
                {/* Hamburger Menu Button - Mobile Only */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Toggle menu"
                >
                  <span className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-out my-1.5 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-5 h-0.5 bg-gray-700 rounded-full transition-all duration-300 ease-out ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>

                {/* Admin Title */}
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-1.5 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Admin Dashboard</h3>
                </div>
              </div>

              {/* Right side buttons */}
              <div className="flex gap-2 sm:gap-3">
                <Link 
                  href="/" 
                  className="text-sm font-medium py-1.5 px-3 sm:py-2 sm:px-4 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <span className="hidden sm:inline">View Site</span>
                  <span className="sm:hidden">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                </Link>
                <button 
                  onClick={logout} 
                  className="text-sm font-medium py-1.5 px-3 sm:py-2 sm:px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <span className="sm:hidden">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 sm:p-6">
            {children}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}