import NavBar from "@/components/NavBar";
import NavBarResponsive from "@/components/NavBarResponsive";
import { ReceiverData, UserProvider } from "@/contexts/UserContext";
import { getReceiverIdFromCookie } from "@/utils/receiver";

export default async function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dataRecebedor = await getReceiverIdFromCookie();

  const receiver: ReceiverData  = JSON.parse(dataRecebedor);

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
