"use client";

import { createContext, ReactNode, useState } from "react";

export interface ReceiverData {
  id: number;
  contaId: number;
  nome: string;
}

interface UserContextType {
  receiver: ReceiverData | null;
}

export const UserContext = createContext<UserContextType>({ receiver: null });

export function UserProvider({
  children,
  initialReceiver,
}: {
  children: ReactNode;
  initialReceiver: ReceiverData | null;
}) {
  return (
    <UserContext.Provider value={{ receiver: useState(initialReceiver)[0] }}>
      {children}
    </UserContext.Provider>
  );
}
