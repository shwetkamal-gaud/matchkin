import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/context/ThemeContext";
import { SocketContextProvider } from "@/context/SocketContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { ToastContainer } from 'react-toastify';
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${montserrat.variable} antialiased flex flex-col`}
      >
        <AuthContextProvider>
          <SocketContextProvider>
            <ThemeProvider>
              <Navbar />
              <main className="flex-grow h-full flex">
                {children}
              </main>
              <ToastContainer/>
            </ThemeProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
