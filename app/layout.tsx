import type { Metadata } from "next";
import { Geist, Geist_Mono, Literata } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { FontProvider } from "@/contexts/FontContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quy bi chi chu",
  description: "Quy bi chi chu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f4f1e1] text-[#666633] font-[Literata]`}
      >
        <FontProvider>
          <Navbar />
          {children}
        </FontProvider>
      </body>
    </html>
  );
}
