import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { api, setAuthToken, getAuthToken } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'therapist' | 'admin';
  status?: 'pending' | 'approved' | 'rejected';
  profilePicture?: string;
  profilePhotoUrl?: string;
  emergencyContactEmail?: string;
  emergencyContactRelation?: string;
  age?: number;
  specialization?: string;
  experience?: string;
  location?: string;
  hourlyRate?: number;
  licenseNumber?: string;
  verified?: boolean;
  phone?: string;
  bio?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: User) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'therapist';
  emergencyContactEmail?: string;
  emergencyContactRelation?: string;
  age?: number;
  specialization?: string;
  experience?: string;
  hourlyRate?: number;
  licenseNumber?: string;
  phone?: string;
  bio?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('mindcare_user');
    const token = getAuthToken();

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    try {
      const response = await api.auth.login(email, password, role);

      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('mindcare_user', JSON.stringify(response.user));
        toast.success('Login successful!');
        return true;
      }

      toast.error('Login failed');
      return false;
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await api.auth.register(userData);

      if (response.success && response.user) {
        setUser(response.user);
        localStorage.setItem('mindcare_user', JSON.stringify(response.user));

        await api.analytics.trackEvent({
          type: 'user_registration',
          userId: response.user.id,
          data: {
            name: response.user.name,
            email: response.user.email,
            role: response.user.role
          },
          timestamp: new Date()
        });

        if (userData.role === 'therapist') {
          await api.analytics.trackEvent({
            type: 'therapist_registration',
            therapistId: response.user.id,
            data: {
              name: response.user.name,
              specialization: [userData.specialization || 'General Therapy']
            },
            timestamp: new Date()
          });
        }

        toast.success('Registration successful!');
        return true;
      }

      toast.error('Registration failed');
      return false;
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    api.auth.logout();
    localStorage.removeItem('mindcare_user');
    toast.success('Logged out successfully');
  };

  const updateUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('mindcare_user', JSON.stringify(userData));

    api.users.update(userData.id, userData).catch(err => {
      console.error('Failed to update user on server:', err);
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
