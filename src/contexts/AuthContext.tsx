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
    // TEST MODE: Use mock data for frontend development
    const mockUsers: Record<string, User> = {
      'patient@example.com': {
        id: '00000000-0000-0000-0000-000000000001',
        email: 'patient@example.com',
        name: 'John Doe',
        role: 'patient',
        age: 28,
        emergencyContactEmail: 'emergency@example.com',
        emergencyContactRelation: 'parent',
        verified: true
      },
      'therapist@example.com': {
        id: '00000000-0000-0000-0000-000000000002',
        email: 'therapist@example.com',
        name: 'Dr. Sarah Smith',
        role: 'therapist',
        specialization: 'Cognitive Behavioral Therapy',
        hourlyRate: 120,
        licenseNumber: 'LIC123456',
        experience: '8 years',
        phone: '+1 (555) 234-5678',
        bio: 'Experienced therapist specializing in CBT with a passion for helping patients overcome anxiety and depression.',
        verified: true
      },
      'admin@example.com': {
        id: '00000000-0000-0000-0000-000000000003',
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        verified: true
      }
    };

    const mockUser = mockUsers[email];

    if (mockUser && password === 'password') {
      setUser(mockUser);
      localStorage.setItem('mindcare_user', JSON.stringify(mockUser));
      localStorage.setItem('mindcare_token', 'test-jwt-token-' + mockUser.role);
      toast.success('Login successful! (Test Mode)');
      return true;
    }

    toast.error('Invalid credentials. Use: patient@example.com / password');
    return false;
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
