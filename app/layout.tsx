import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SidebarServer from "@/components/sidebar-server";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Multiverse Docs",
  description: "Documentation website with MDX support",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-14 text-gray-1`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          forcedTheme="dark"
        >
          <Header />
          <div className="flex min-h-screen">
            <SidebarServer />
            <main className="flex-1 overflow-y-auto">
              <div className="container max-w-screen-lg py-6 px-4 pt-16 md:pt-24 md:py-12 md:px-12">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
