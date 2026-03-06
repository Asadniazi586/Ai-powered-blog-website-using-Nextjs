'use client';
import { useAuth } from '@/app/context/AuthContext';
import { usePathname } from 'next/navigation';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';

// Dynamically import components to prevent circular dependencies
const LoginPage = dynamic(() => import("./auth/login/page"), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>
});

const SignupPage = dynamic(() => import("./auth/signup/page"), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>
});

const HomePage = dynamic(() => import("./Homepage.client"), {
  loading: () => <div className="flex justify-center p-4">Loading...</div>
});

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