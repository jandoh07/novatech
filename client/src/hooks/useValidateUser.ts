import { useState, useEffect } from "react";
import { useUserStore } from "../zustand/store";

const useValidateUser = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const { user, logout } = useUserStore();

  useEffect(() => {
    const date = new Date();

    if (user && user.expires !== date) {
      const tokenDaysLeft = (
        (new Date(user.expires).getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24)
      ).toFixed(2);

      if (parseFloat(tokenDaysLeft) < 1) {
        
        logout();
        setIsAdmin(false);
        return;
      }



      if (user.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      logout();
      setIsAdmin(false);
    }
  }, [logout, user]);

  return { user, isAdmin, setIsAdmin };
};

export default useValidateUser;