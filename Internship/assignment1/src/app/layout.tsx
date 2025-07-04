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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <header className="w-full shadow p-4 bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto text-xl font-bold text-gray-800 text-center">
          Welcome to Muhammad Ibrahim&apos;s Assignment 1
        </div>
      </header>
       <Separator />

        {children}
            <footer className="w-full bg-white/80 backdrop-blur border-t mt-8 py-4">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Muhammad Ibrahim. All rights reserved.
        </div>
      </footer>
      </body>
   
    </html>
  );
}
