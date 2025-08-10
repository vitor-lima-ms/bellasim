import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const apiClient = axios.create({
  withCredentials: true,
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = "/api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      await apiClient.get(`${API_URL}/status`);

      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    await apiClient.post(`${API_URL}/login`, {
      email,
      password,
    });

    setIsAuthenticated(true);

    setIsLoading(false);
  };

  const logout = async () => {
    await apiClient.post(`${API_URL}/logout`);

    setIsAuthenticated(false);

    setIsLoading(false);
  };

  const value = { isAuthenticated, isLoading, login, logout };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </Container>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider!");
  }

  return context;
}
