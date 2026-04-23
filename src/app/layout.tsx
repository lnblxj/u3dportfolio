import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unity3D Portfolio — Virtual Simulation & Digital Twin",
  description: "A portfolio showcasing Unity3D projects in virtual simulation and digital twin directions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
