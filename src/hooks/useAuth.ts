import { useState, useEffect, useCallback } from 'react';
import { User, AuthState } from '../types';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  const checkAuth = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setAuthState({
          user: data.user,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      }
    } catch (err: any) {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Failed to login',
        }));
        return false;
      }

      setAuthState({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      return true;
    } catch (err: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Network connection failed. Please try again.',
      }));
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setAuthState((prev) => ({
          ...prev,
          isLoading: false,
          error: data.error || 'Failed to create account',
        }));
        return false;
      }

      setAuthState({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });
      return true;
    } catch (err: any) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Network connection failed. Please try again.',
      }));
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    } finally {
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    }
  };

  return {
    ...authState,
    login,
    signup,
    logout,
    checkAuth,
  };
}
