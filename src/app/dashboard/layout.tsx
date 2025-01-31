export default function LayoutDashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <h1>Menu</h1>
        {children}
      </div>
  );
}
