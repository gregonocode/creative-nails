import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/dezreceitas",
    name: "Duts Receitas",
    short_name: "Duts Receitas",
    description: "Dez receitas doces explicadas passo a passo para preparar e vender.",
    start_url: "/dezreceitas",
    scope: "/dezreceitas",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#fff9f5",
    theme_color: "#ff6b45",
    lang: "pt-BR",
    categories: ["food", "education", "lifestyle"],
    icons: [
      {
        src: "/icon/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "Ver todas as receitas",
        short_name: "Receitas",
        description: "Abrir a lista com as dez receitas.",
        url: "/dezreceitas",
        icons: [
          {
            src: "/icon/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],
  };
}
