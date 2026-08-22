import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  PATIENT: {
    id: 101,
    username: 'alex.ross@example.com',
    name: 'Alexander Ross',
    role: 'PATIENT',
    token: 'demo-jwt-patient',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
  },
  DOCTOR: {
    id: 1,
    username: 'dr.sarah@medicare.org',
    name: 'Dr. Sarah Jenkins',
    role: 'DOCTOR',
    specialization: 'Cardiology',
    token: 'demo-jwt-doctor',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200'
  },
  ADMIN: {
    id: 999,
    username: 'admin@hospital.org',
    name: 'Chief Administrator (Piyush)',
    role: 'ADMIN',
    token: 'demo-jwt-admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_USERS.PATIENT;
      }
    }
    return DEMO_USERS.PATIENT; // Default to Patient persona for immediate interactive browsing
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || 'demo-token');

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_profile');
    }
  }, [user]);

  const login = async (username, password) => {
    const res = await authService.login({ username, password });
    if (res.success) {
      let role = 'PATIENT';
      if (username.toLowerCase().includes('admin')) role = 'ADMIN';
      else if (username.toLowerCase().includes('doctor')) role = 'DOCTOR';

      const userObj = {
        id: res.data.userId || 101,
        username: username,
        name: username.split('@')[0],
        role: role,
        token: res.data.token || 'jwt-active-token'
      };
      setUser(userObj);
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      return { success: true, user: userObj };
    }
    return { success: false, error: 'Authentication failed' };
  };

  const register = async (userData) => {
    const res = await authService.signup(userData);
    if (res.success) {
      const userObj = {
        id: res.data.id,
        username: userData.username,
        name: userData.name || userData.username,
        role: userData.roles && userData.roles.length > 0 ? Array.from(userData.roles)[0] : 'PATIENT',
        token: 'new-reg-jwt-token'
      };
      setUser(userObj);
      return { success: true, user: userObj };
    }
    return { success: false, error: 'Registration failed' };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
  };

  const switchDemoRole = (roleKey) => {
    const demo = DEMO_USERS[roleKey];
    if (demo) {
      setUser(demo);
      setToken(demo.token);
      localStorage.setItem('token', demo.token);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        role: user?.role || 'GUEST',
        isPatient: user?.role === 'PATIENT',
        isDoctor: user?.role === 'DOCTOR',
        isAdmin: user?.role === 'ADMIN',
        login,
        register,
        logout,
        switchDemoRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};