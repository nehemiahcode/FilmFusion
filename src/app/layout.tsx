import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { NavLayout } from "@/components/navigation/side-navigation";
import ReactQueryClientProvider from "@/components/providers/query-client-provider";
import PromptUser from "@/components/prompt-user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FilmFusion",
  description: "Millions of movies, TV shows and people to discover.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryClientProvider >
          <ThemeProvider enableSystem defaultTheme="light"  disableTransitionOnChange={false} attribute="class">
            <NavLayout>
              <PromptUser>
                {children}
              </PromptUser>
            </NavLayout>
          </ThemeProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
