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
  title: "IdleNet - Distributed Computing Network",
  description: "Upload your workloads and pay 80% less than AWS. Distributed computing network for JavaScript, Python, and WebAssembly code. Processing starts immediately.",
  keywords: ["distributed computing", "cloud computing", "serverless", "aws alternative", "cheap computing"],
  openGraph: {
    title: "IdleNet - Distributed Computing Network",
    description: "Pay 80% less than AWS for distributed computing",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
