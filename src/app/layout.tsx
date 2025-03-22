import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/components/navbar.css";
import "./styles/components/features.css";
import "./styles/components/hero.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury Car Rental",
  description: "Book your premium rental car with our luxury service",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DarkModeProvider>
            <div className="main-layout">
              <Navbar />
              <main className="container-base mt-20">
                {children}
              </main>
              <Footer />
            </div>
          </DarkModeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}