import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recebedores",
  icons: {
    icon: "/favicon.ico", // Ícone padrão
    shortcut: "/favicon-32x32.png", // Ícone para atalhos
    apple: "/apple-touch-icon.png", // Ícone para dispositivos Apple
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
    
      <body>
        <ToastContainer autoClose={3000} />
        {children}
      </body>
    </html>
  );
}
