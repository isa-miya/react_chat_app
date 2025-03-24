import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext({
  error: null,
  signup: () => { },
  verifyEmail: () => { },
  login: () => { },
  isLoggedIn: false,
  signout: () => { },
  resetMail: () => { },
  resetPassword: () => { },
  getProfile: () => { },
  editProfile: () => { },
  user: null
});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/check-auth`, { withCredentials: true });
      setUser(response.data.user);
      setIsLoggedIn(true);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const signup = async (formData, navigate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formData, {
        withCredentials: true,
      });
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'サインアップに失敗しました');
    }
  };

  const verifyEmail = async (token, navigate) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-email`, { token });
      alert('メール認証が完了しました。ログインページに移動します。');
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || '認証に失敗しました');
    }
  };

  const login = async (formData, navigate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, formData, { withCredentials: true });
      setUser({ userId: response.data.user.id, name: response.data.user.name });
      setIsLoggedIn(true);
      navigate('/chat-rooms');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'ログインに失敗しました');
    }
  };

  const signout = async (navigate) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'サインアウトに失敗しました');
    }
  }

  const resetMail = async (email) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/forgot-password`, { email });
      alert(`${response.data.message}`);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "パスワードリセットに失敗しました");
    }
  };

  const resetPassword = async (token, newPassword, navigate) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, { token, newPassword });
      console.log('response =>', response);

      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "パスワードリセットに失敗しました");
    }
  };

  const getProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, { withCredentials: true });
      return response.data.user;
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'ユーザー情報が取得できませんでした');
      return null;
    }
  };

  const editProfile = async (formData, navigate) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/auth/profile`, formData, { withCredentials: true });
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || '編集に失敗しました');
    }
  };

  return (
    // # valueにuserを追加
    <AuthContext.Provider value={{ error, signup, verifyEmail, login, isLoggedIn, signout, resetMail, resetPassword, getProfile, editProfile, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);