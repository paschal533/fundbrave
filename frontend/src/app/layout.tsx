import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers/WalletProvider";
import { FundraiserProvider } from "@/context/FundraiserContext";
import { ToastContainer } from "@/services/toast";
import { ProfileProvider } from "@/context/ProfileContext";
import { AuthProvider } from "@/context/AuthContext";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "FundBrave",
  description:
    "A decentralized platform for governance, media archiving, and transparent funding.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <ChakraProvider>
          <AuthProvider>
            <FundraiserProvider>
              <ProfileProvider>
                <body className={inter.className}>{children}</body>
              </ProfileProvider>
            </FundraiserProvider>
          </AuthProvider>
        </ChakraProvider>
        <Toaster />
      </Providers>
    </html>
  );
}
