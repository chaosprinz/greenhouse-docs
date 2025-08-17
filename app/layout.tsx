import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greenhouse",
  description: "an open-source greenhouse controll and documentation system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full m-0`}
      >

        <div className="flex flex-col min-h-full font-mono">
          <h1 className="font-bold text-3xl text-center bg-emerald-600">Greenhouse</h1>
      
          <main className="flex flex-1 mt-4 justify-center">
            <div className="w-4/5 pl-6 pr-6">{children}</div>
          </main>
      
          <footer className="mb-4 text-center text-sm">
            powered by <b>NextJS</b> and <b>DrizzleORM</b>
          </footer>
        </div>

      </body>
    </html>
  );
};
