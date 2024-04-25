import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import { Button, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./(app)/NavBar";
import SessionContext from "@/components/SessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auction4Good",
  description: "An online charity auction platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionContext>
          <Theme>{children}</Theme>
        </SessionContext>
      </body>
    </html>
  );
}
