import React, { createContext, useState, useEffect, ReactNode, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";

// --------------------
// Types
// --------------------
interface User {
  id?: string;
  name?: string;
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  userToken: string | null;
  loading: boolean;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

// --------------------
// Create context
// --------------------
export const AuthContext = createContext<AuthContextType>({
  user: null,
  userToken: null,
  loading: true,
  login: async () => { },
  logout: async () => { },
});

// --------------------
// AuthProvider component
// --------------------
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      const loadStorage = async () => {
        setLoading(true); 
        try {
          const token = await AsyncStorage.getItem("token");
          const userData = await AsyncStorage.getItem("user");
          console.log('ava');
          
          if (token) setUserToken(token);
          if (userData) setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Auth load error:", error);
        } finally {
          setLoading(false);
        }
      };

      loadStorage();
    }, [])
  );


  const login = async (token: string, userData: User) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUserToken(token);
      setUser(userData);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      setUserToken(null);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userToken, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
