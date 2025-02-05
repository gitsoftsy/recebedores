import { UserContext, UserContextType } from "@/contexts/UserContext";
import { useContext } from "react";

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
