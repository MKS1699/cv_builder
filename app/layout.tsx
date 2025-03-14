import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  Footer,
  GetStoredResume,
  GlobalElementTracker,
  NavBar,
} from "./components";
import StoreProvider from "./redux/store/StoreProvider";
import HotToast from "./components/HotToast";
import Script from "next/script";
import clsx from "clsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="/libs/pdfkit.standalone.js" strategy="beforeInteractive" />
      </head>
      <body
        className={clsx(geistSans.variable, geistMono.variable, "antialiased")}
      >
        <StoreProvider>
          <GlobalElementTracker />
          <NavBar />
          {children}
          <Footer />
          <HotToast />
          <GetStoredResume />
        </StoreProvider>
      </body>
    </html>
  );
}
