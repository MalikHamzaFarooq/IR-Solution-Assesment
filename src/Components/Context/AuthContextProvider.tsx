import React, { useContext, useState, ReactNode } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

interface User {
  username: string;
  [key: string]: any;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setError(null);
      console.log("Login successful:", response.data);
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Invalid username or password.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => useContext(AuthContext);
