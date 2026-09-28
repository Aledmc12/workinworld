import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LegalNoticeGate } from "@/components/layout/LegalNoticeGate";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Work in World · Orientación laboral para Colombia",
    template: "%s · Work in World",
  },
  description:
    "Orientación laboral gratuita para quienes trabajan en Colombia y para quienes contratan. Calculadoras de liquidación e indemnización con los valores de 2026.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: "Work in World",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#07121F" },
  ],
};

const themeScript = `(function(){var t=null;try{t=localStorage.getItem('wiw.theme')}catch(e){}if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;else document.documentElement.dataset.theme=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <Header />
          <LegalNoticeGate />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
