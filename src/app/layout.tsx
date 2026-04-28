import type { Metadata } from "next";
import "./globals.scss";
import { AuthProvider } from "./provider";

export const metadata: Metadata = {
  title: "rop-frontend",
  description: "route-optimize-frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
