// app/components/AuthWrapper.jsx
'use client';
import { useAuth } from '@/app/context/AuthContext';

export default function AuthWrapper({ authenticated, unauthenticated, loading }) {
  const { user, loading: authLoading } = useAuth();

  if (authLoading) return loading;
  return user ? authenticated : unauthenticated;
}