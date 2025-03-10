import NavBar from "@/components/NavBar";
import NavBarResponsive from "@/components/NavBarResponsive";
import { UserProvider } from "@/contexts/UserContext";
import { fetchReceiverData } from "@/utils/receiver";

export default async function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const receiver = await fetchReceiverData("1", "60");

  return (
    <section className="w-full h-full min-h-screen flex md:flex-row flex-col">
      <UserProvider initialReceiver={receiver}>
        <div className="hidden md:block">
          <NavBar />
        </div>
        <div className="block md:hidden">
          <NavBarResponsive />
        </div>
        <main className=" min-h-screen w-full overflow-auto overflow-x-hidden">
          {children}
        </main>
      </UserProvider>
    </section>
  );
}
