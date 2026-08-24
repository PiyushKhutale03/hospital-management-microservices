import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export const DEMO_USERS = {
  PATIENT: {
    id: 101,
    username: 'rahul.deshmukh@gmail.com',
    name: 'Rahul Deshmukh',
    role: 'PATIENT',
    token: 'demo-jwt-patient',
    bloodGroup: 'O+',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'
  },
  DOCTOR: {
    id: 1,
    username: 'dr.rajesh@medicare.in',
    name: 'Dr. Rajesh Sharma',
    role: 'DOCTOR',
    specialization: 'Cardiology',
    token: 'demo-jwt-doctor',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200'
  },
  ADMIN: {
    id: 999,
    username: 'admin@medicareplus.in',
    name: 'Chief Administrator (Piyush Khutale)',
    role: 'ADMIN',
    token: 'demo-jwt-admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
  }
};

export const DEFAULT_ACCOUNTS = {
  ADMIN: {
    username: 'admin@medicareplus.in',
    password: 'Admin@123',
    name: 'Chief Administrator (Piyush Khutale)',
    role: 'ADMIN',
    badge: 'Hospital SuperAdmin'
  },
  DOCTOR: {
    username: 'dr.rajesh@medicare.in',
    password: 'Doctor@123',
    name: 'Dr. Rajesh Sharma',
    role: 'DOCTOR',
    badge: 'Cardiology Specialist'
  },
  PATIENT: {
    username: 'rahul.deshmukh@gmail.com',
    password: 'Patient@123',
    name: 'Rahul Deshmukh',
    role: 'PATIENT',
    badge: 'Registered Patient'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null; // Strict Authentication: Unauthenticated by default until user logs in
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user_profile', JSON.stringify(user));
    } else {
      localStorage.removeItem('user_profile');
    }
  }, [user]);

  const login = async (username, password) => {
    const normalizedUser = (username || '').trim().toLowerCase();
    const trimmedPass = (password || '').trim();

    // 1. Try real backend API if online
    try {
      const res = await authService.login({ username: normalizedUser, password: trimmedPass });
      if (res.success && res.data && res.data.token) {
        let role = 'PATIENT';
        if (normalizedUser.includes('admin')) role = 'ADMIN';
        else if (normalizedUser.includes('doctor') || normalizedUser.includes('dr.')) role = 'DOCTOR';

        const userObj = {
          id: res.data.userId || 101,
          username: username,
          name: username.split('@')[0],
          role: role,
          token: res.data.token
        };
        setUser(userObj);
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        return { success: true, user: userObj };
      }
    } catch (e) {
      // Backend offline, fallback to strict credentials check
    }

    // 2. Validate Default Verified Accounts
    if ((normalizedUser === 'admin@medicareplus.in' || normalizedUser === 'admin') && trimmedPass === 'Admin@123') {
      const adminUser = DEMO_USERS.ADMIN;
      setUser(adminUser);
      setToken(adminUser.token);
      localStorage.setItem('token', adminUser.token);
      return { success: true, user: adminUser };
    }

    if ((normalizedUser === 'dr.rajesh@medicare.in' || normalizedUser === 'doctor') && trimmedPass === 'Doctor@123') {
      const docUser = DEMO_USERS.DOCTOR;
      setUser(docUser);
      setToken(docUser.token);
      localStorage.setItem('token', docUser.token);
      return { success: true, user: docUser };
    }

    if ((normalizedUser === 'rahul.deshmukh@gmail.com' || normalizedUser === 'patient') && trimmedPass === 'Patient@123') {
      const patientUser = DEMO_USERS.PATIENT;
      setUser(patientUser);
      setToken(patientUser.token);
      localStorage.setItem('token', patientUser.token);
      return { success: true, user: patientUser };
    }

    // 3. Reject invalid credentials
    return { 
      success: false, 
      error: 'Invalid email or password. Please use the verified demo credentials provided below.' 
    };
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