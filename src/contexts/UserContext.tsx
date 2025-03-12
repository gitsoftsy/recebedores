"use client";

import { createContext, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/receiver";
export interface ReceiverData {
  id: number;
  contaId: number;
  nome: string;
}

interface UserContextType {
  receiver: ReceiverData | null;
  handleLogout: () => void;
}

export const UserContext = createContext<UserContextType>({
  receiver: null,
  handleLogout: () => {},
});

export function UserProvider({
  children,
  initialReceiver,
}: {
  children: ReactNode;
  initialReceiver: ReceiverData | null;
}) {
  const [receiver, setReceiver] = useState<ReceiverData | null>(initialReceiver);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    setReceiver(null);
    router.push("/"); 
  };

  return (
    <UserContext.Provider value={{ receiver, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}