import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Trident Square — Digital Solutions",
  description: "Intelligent digital solutions. Web, app, and product development.",
  icons: {
    icon: [{ url: "/trident-remove-bg.png", type: "image/png" }],
    apple: "/trident-remove-bg.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement,s=localStorage.getItem('trident-theme');var dark=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);d.classList.toggle('dark',dark);})();`,
          }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased bg-bg text-fg bg-vignette`}>
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
      <Analytics />
      <GoogleAnalytics gaId="G-5Q3QKNZVZ4" />
    </html>
  );
}
