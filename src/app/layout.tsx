import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../styles/globals.css";
import AuthProvider from "../context/AuthProvider";
import Sidebar from "@/components/Sidebar";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Social App",
  description: "Created by Elias Grinwis Plaat Stultjes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Sidebar />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
