import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./../styles/globals.scss";
import { AuthProvider } from "./provider";
export const metadata: Metadata = {
  title: "rop-frontend",
  description: "route-optimize-frontend",
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
