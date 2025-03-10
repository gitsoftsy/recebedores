"use client";

import { fetchReceiverData } from "@/utils/receiver";
import { createContext, ReactNode, useEffect, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
  initialReceiver: ReceiverData | null;
}

export interface ReceiverData {
  id: number;
  contaId: number;
  cnpj: string;
  email: string;
}

export interface UserContextType {
  width: number;
  setWidth: (width: number) => void;
  receiver: ReceiverData | null;
  setReceiver: (receiver: ReceiverData | null) => void;
}

export const UserContext = createContext<UserContextType>({
  receiver: null,
  setReceiver: () => {},
  width: 1920,
  setWidth: () => {},
});

export function UserProvider({ children, initialReceiver }: UserProviderProps) {
  const [receiver, setReceiver] = useState<ReceiverData | null>(
    initialReceiver
  );
  const [width, setWidth] = useState<number>(1920);

  // const receiverId = await getReceiverIdFromCookie();
  // const data = await fetchReceiverData("1", "60");

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const values: UserContextType = {
    receiver,
    setReceiver,
    width,
    setWidth,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
