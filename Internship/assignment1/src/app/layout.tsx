import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Separator } from "@/components/ui/separator"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assignment 1",
  description: "Made by Muhammad Ibrahim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
         <header className="w-full shadow p-4 bg-orange-200 backdrop-blur">
        <div className="max-w-4xl mx-auto text-xl font-bold text-blue-950 text-center">
          Welcome to Muhammad Ibrahim&apos;s Quote Generator
        </div>
      </header>
       <Separator />

        {children}
    <footer className="w-full bg-orange-200 backdrop-blur border-t py-5 mt-14">
  <div className="max-w-4xl mx-auto text-center text-xs text-gray-500 leading-tight mt-2">
    © {new Date().getFullYear()} Muhammad Ibrahim. All rights reserved.
  </div>
</footer>


      </body>
   
    </html>
  );
}