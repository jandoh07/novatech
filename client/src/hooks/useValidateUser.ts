import { useState, useEffect } from "react";
import { User } from "../types/User";

const useValidateUser = () => {
  const [user, setUser] = useState<User | null>({
    email: "",
    role: "",
    expires: new Date(),
    name: "",
  });
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const userLocalStorage: User | null = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null;
    const date = new Date();

    if (userLocalStorage && userLocalStorage.expires !== date) {
      const tokenDaysLeft = (
        (new Date(userLocalStorage.expires).getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24)
      ).toFixed(2);

      if (parseFloat(tokenDaysLeft) < 1) {
        localStorage.removeItem("user");
        setUser(null);
        setIsAdmin(false);
        return;
      }


      setUser(userLocalStorage);

      if (userLocalStorage.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, []);

  return { user, isAdmin, setUser, setIsAdmin };
};

export default useValidateUser;