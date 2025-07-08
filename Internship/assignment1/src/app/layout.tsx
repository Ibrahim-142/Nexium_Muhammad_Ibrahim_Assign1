import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Separator } from "@/components/ui/separator";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-slate-50 to-gray-100 text-slate-800 min-h-screen flex flex-col`}
      >
        <header className="w-full bg-indigo-600 text-white shadow-md backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome to Muhammad Ibrahim&apos;s Quote Generator
            </h1>
          </div>
        </header>

        <Separator className="bg-indigo-400" />

        <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
          {children}
        </main>

        <footer className="w-full bg-indigo-700 text-white border-t shadow-inner mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm">
            © {new Date().getFullYear()} Muhammad Ibrahim. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
