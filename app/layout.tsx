import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
