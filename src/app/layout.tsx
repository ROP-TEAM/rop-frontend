import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./../styles/globals.scss";
import { AuthProvider } from "./provider";
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';

export const metadata: Metadata = {
  title: "soroutetion",
  description: "route-optimize-program",
};
const noto = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // เลือกน้ำหนักที่ใช้
  variable: "--font-noto-sans-thai",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <AuthProvider>
          <MantineProvider>{children}</MantineProvider>
          </AuthProvider>
      </body>
    </html>
  );
}
