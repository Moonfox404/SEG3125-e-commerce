import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { CartProvider } from "./context/CartContext";
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Furniture Forest",
  description: "Quality furniture to grow your home. Find furniture essentials at afforable prices. \
    Est. 2025, we are here to bring high-quality, stylish, and sustainable furniture to Canadian homes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-fit p-2 text-center bg-accent text-accent-content text-sm">
          CANADA DAY SALE - ADDITIONAL 10% OFF STORE WIDE
        </div>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
