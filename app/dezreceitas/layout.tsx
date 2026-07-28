import type { Metadata, Viewport } from "next";
import PwaRegister from "./PwaRegister";

export const metadata: Metadata = {
  applicationName: "Duts Receitas",
  appleWebApp: {
    capable: true,
    title: "Duts Receitas",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/icon/icon-180.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ff6b45",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RecipesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <PwaRegister />
      {children}
    </>
  );
}
