import React, { useContext, useState, ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';
import { IUserLoginResponse, IUserEntity } from 'blog-common-1.0';
import { AuthContext } from './AuthContext'; // Correct import path

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const storedInfo = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null;

  const [user, setUser] = useState<IUserEntity | null>(storedInfo);
  const [token, setToken] = useState<string | null>(storedInfo?.token || null);
  // const navigate = useNavigate();

  const login = (data: IUserLoginResponse) => {
    setUser(data.user);
    setToken(data.accessToken);
    // localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', data.accessToken);
    // navigate('/');
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    // localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    // navigate('/login');
  };

  const valueReturn = {
    user,
    accessToken: token,
    login,
    logOut,
  };

  console.log('this is the user from auth provider', valueReturn.user);
  console.log('this is the JWT from auth provider', valueReturn.accessToken);

  return (
    <AuthContext.Provider value={valueReturn}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
