import { createContext, useContext, useState } from 'react';
import API from '../api/axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('inkwell_user'))
  );

  const register = async (name, email, password) => {
    const { data } = await API.post('/auth/register', { name, email, password });
    localStorage.setItem('inkwell_user', JSON.stringify(data));
    setUser(data);
  };

  const login = async (email, password) => {
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('inkwell_user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem('inkwell_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}