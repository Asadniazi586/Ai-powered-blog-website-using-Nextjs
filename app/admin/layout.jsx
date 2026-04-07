'use client';

import Image from "next/image";
import Sidebar from "../Components/AdminComponents/Sidebar";
import { assets } from "../Assets/assets";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "@/app/Components/ProtectedRoute";
import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";

export default function Layout({ children }) {
  const { logout } = useAuth();

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="flex">
        <ToastContainer theme="dark" />
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col w-full bg-gray-50 min-h-screen">

          {/* Top Navbar */}
          <div className="flex items-center justify-between w-full py-3.5 max-h-[60px] px-12 border-b bg-white shadow-sm">
            <h3 className="font-medium text-gray-800">Admin Panel</h3>

            <div className="flex gap-4 items-center">
              <Link 
                href="/" 
                className="text-sm font-medium py-1 px-3 border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
              >
                User Dashboard
              </Link>

              <button 
                onClick={logout} 
                className="text-sm font-medium py-1 px-3 border border-gray-300 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}