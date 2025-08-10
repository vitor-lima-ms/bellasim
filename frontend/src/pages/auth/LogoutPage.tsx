import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export function LogoutPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      auth.logout();

      navigate("/login");
    };

    logout();
  }, [auth, navigate]);

  return null;
}
