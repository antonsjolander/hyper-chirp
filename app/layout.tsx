import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hyper Chirp API",
  description: "En Twitter-liknande API för Hyper Island",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body>{children}</body>
    </html>
  );
}
