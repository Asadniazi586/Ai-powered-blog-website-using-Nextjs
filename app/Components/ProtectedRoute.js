'use client';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login'); // 🔁 Fixed redirect path
      } else if (adminOnly && user.role !== 'admin') {
        router.push('/');
      }
    }
  }, [user, loading, router, adminOnly]);

  if (loading || !user || (adminOnly && user.role !== 'admin')) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return children;
}
