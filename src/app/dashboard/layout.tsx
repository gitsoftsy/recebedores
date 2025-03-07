"use client";



import NavBar from "@/components/NavBar";
import NavBarResponsive from "@/components/NavBarResponsive";
import { UserProvider } from "@/contexts/UserContext";
import { useEffect, useState } from "react";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isClient = typeof window !== "undefined";
  const [width, setWidth] = useState<number>(
    isClient ? window.innerWidth : 768
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={`w-full h-full min-h-screen ${width >= 768 ? 'flex' : ''}`}>

      <UserProvider>
        {width >= 768 ? <NavBar /> : <NavBarResponsive />}
        <main className=" min-h-screen w-full overflow-auto overflow-x-hidden">
          {children}
        </main>
      </UserProvider>
    </section>
  );
}
