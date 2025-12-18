// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./components/quiz/css/shine.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ofertas em Off - Quizz",
  description: "Quizz de ofertas exclusivo para você economizar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* UTMify - Captura de UTMs */}
        <Script
          id="utmify-latest"
          strategy="afterInteractive"
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          async
          defer
          data-utmify-prevent-xcod-sck
          data-utmify-prevent-subids
        />

        {/* UTMify Pixel (Meta/Facebook) */}
        <Script id="utmify-pixel-id" strategy="afterInteractive">
          {`window.pixelId = "693cb0c062e38f668b3c9d84";`}
        </Script>

        <Script
          id="utmify-pixel"
          strategy="afterInteractive"
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          async
          defer
        />

        {children}
      </body>
    </html>
  );
}
