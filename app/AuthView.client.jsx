'use client';
import { useAuth } from '@/app/context/AuthContext';
import { usePathname } from 'next/navigation';
import LoginPage from "./auth/login/page";
import SignupPage from "./auth/signup/page";
import HomePage from "./HomePage.client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthView() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (user) {
    return <HomePage />;
  }

  return (
    <>
      <ToastContainer theme="dark" />
      {pathname === '/auth/signup' ? <SignupPage /> : <LoginPage />}
    </>
  );
}