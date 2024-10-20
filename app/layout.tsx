
import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import ReactQueryProvider from "./utils/providers/ReactQueryProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: "InvigEx",
  description: "Your comprehensive exam managemnt solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
