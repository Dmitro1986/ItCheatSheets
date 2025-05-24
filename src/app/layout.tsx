/** @format */
import "../app/globals.css";
import type { ReactNode } from "react";
import { TheHeader } from "../components/TheHeader";
import { TheFooter } from "../components/TheFooter";
import DrawerMenu from "../components/DrawerMenu";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col h-full bg-gray-100">
        <TheHeader />
        <DrawerMenu />
        <main className="flex-1 pb-16">{children}</main>
        <TheFooter />
      </body>
    </html>
  );
}
