import NavBar from "@/components/NavBar";
import { UserProvider } from "@/contexts/UserContext";

export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex w-full h-full min-h-screen">
      <UserProvider>
        <NavBar />
        <main className="h-full min-h-screen w-full overflow-auto overflow-x-hidden">
          {children}
        </main>
      </UserProvider>
    </section>
  );
}
