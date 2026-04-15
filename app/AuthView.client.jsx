'use client';
import { useAuth } from '@/app/context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';

// Dynamic imports
const HomePage = dynamic(() => import("./Homepage.client"), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>
});

const LoginPage = dynamic(() => import("./auth/login/page"), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>
});

const SignupPage = dynamic(() => import("./auth/signup/page"), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>
});

export default function App() {
  const { loading } = useAuth();
  
  // Get current path in a way that works with Next.js App Router
  const path = typeof window !== 'undefined' ? window.location.pathname : '';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show login page only when on /login route
  if (path === '/login') {
    return (
      <>
        <ToastContainer theme="dark" />
        <LoginPage />
      </>
    );
  }

  // Show signup page only when on /signup route
  if (path === '/signup') {
    return (
      <>
        <ToastContainer theme="dark" />
        <SignupPage />
      </>
    );
  }

  // For EVERYTHING else (including /), show the dashboard
  return (
    <>
      <ToastContainer theme="dark" />
      <HomePage />
    </>
  );
}