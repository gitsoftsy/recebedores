"use client";

import { User } from "@/utils/types/user";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
}

export interface UserContextType {
  width: number;
  setWidth: (width: number) => void;

  user: User | null;
  setUser: (user: User | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [width, setWidth] = useState<number>(1920);

  useEffect(() => {
    const storedData = localStorage.getItem("userStorage");

    if (storedData != undefined) {
      sessionStorage.setItem("userStorage", JSON.stringify(storedData));
      setUser(JSON.parse(storedData));
    } else {
      const storedUser = sessionStorage.getItem("userStorage");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const values: UserContextType = {
    user,
    setUser,
    width,
    setWidth,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
