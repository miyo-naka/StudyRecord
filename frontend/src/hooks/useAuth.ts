import fetchUser from "@/services/auth/FetchUser";
import Login from "@/services/auth/Login";
import logout from "@/services/auth/Logout";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const user = await fetchUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    await Login(email, password);
    await getUser();
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

  return { user, loading, handleLogin, handleLogout };
};
