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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Tag (gtag.js) - base */}
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-10810473655"
        />

        {/* Configuração da tag */}
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10810473655');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
