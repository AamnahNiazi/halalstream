import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HalalStream",
  description: "Safe Islamic streaming portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}