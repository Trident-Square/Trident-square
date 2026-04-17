import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ContactEngagementModal from "@/components/layout/ContactEngagementModal";
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
            __html: `(function(){try{var k='trident-theme';var s=localStorage.getItem(k);var dark;if(s==='light')dark=false;else if(s==='dark')dark=true;else dark=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${outfit.variable} font-sans antialiased text-fg bg-vignette overflow-x-clip`}>
        <ThemeProvider>
          <div className="relative z-[1] flex min-h-0 w-full min-w-0 flex-col">
            <Header />
            <main className="w-full min-w-0">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <ContactEngagementModal />
          </div>
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId="G-5Q3QKNZVZ4" />
      </body>
    </html>
  );
}
