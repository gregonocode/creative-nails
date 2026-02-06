// app/mx/ingles-para-la-copa/lib/steps.ts

export type StepKind = "question" | "info" | "name";

export type Option = {
  id: string;
  label: string;
  value: string;
};

export type FunnelStep =
  | {
      kind: "question";
      id: string;
      title: string;
      subtitle?: string;
      options: Option[];
      storageKey: "nivel" | "dificuldade" | "objetivo";
    }
  | {
      kind: "info";
      id: string;
      title: string;
      subtitle?: string;
      bullets?: string[];
      // aqui você vai colocar imagens depois (paths do /public)
      images?: Array<{ src: string; alt: string }>;
      ctaLabel?: string; // texto do botão
    }
  | {
      kind: "name";
      id: string;
      title: string;
      subtitle?: string;
      placeholder?: string;
      storageKey: "nome";
      ctaLabel?: string;
    };

export const FUNNEL_STEPS: FunnelStep[] = [
  // 1) Pergunta: nível
  {
    kind: "question",
    id: "nivel",
    title: "¿Cuál es tu nivel de inglés?",
    subtitle: "Selecciona la opción que más se parece a ti.",
    storageKey: "nivel",
    options: [
      { id: "nivel-1", label: "Sé muy poco", value: "muy_poco" },
      { id: "nivel-2", label: "Entiendo algunas cosas", value: "entiendo_algunas" },
      { id: "nivel-3", label: "Intermedio", value: "intermedio" },
      { id: "nivel-4", label: "Avanzado", value: "avanzado" },
    ],
  },

  // 2) Info (não tem problema… 200 palavras)
  {
    kind: "info",
    id: "info-200",
    title: "No pasa nada 🙌",
    subtitle:
      "Inglés para la Copa fue creado para que aprendas las 200 palabras más usadas del inglés — con foco en situaciones reales.",
    bullets: [
      "Aprendizaje rápido y directo al punto",
      "Ideal para viajar, atender turistas y vender más",
      "Diseñado para que lo uses todos los días",
    ],
    images: [
      // depois você troca/coloca imagens reais no /public
      { src: "/mx/ingles-copa/mock-1.webp", alt: "Ejemplo de checklist" },
      { src: "/mx/ingles-copa/mock-2.webp", alt: "Ejemplo de frases" },
    ],
    ctaLabel: "Continuar",
  },

  // 3) Pergunta: dificuldade
  {
    kind: "question",
    id: "dificuldade",
    title: "¿Qué tan difícil te parece el inglés?",
    subtitle: "Tu respuesta nos ayuda a personalizar tu ritmo.",
    storageKey: "dificuldade",
    options: [
      { id: "dif-1", label: "Me parece fácil", value: "facil" },
      { id: "dif-2", label: "Más o menos", value: "medio" },
      { id: "dif-3", label: "Un poco difícil", value: "dificil" },
    ],
  },

  // 4) Info (pode escolher palavras por dia + áudios + cenas)
  {
    kind: "info",
    id: "info-ritmo",
    title: "Perfecto ✅",
    subtitle:
      "Con el pack puedes elegir cuántas palabras aprender por día y entender todo con contexto real.",
    bullets: [
      "Escucha la pronunciación en audio",
      "Aprende con escenas (contexto real)",
      "Ritmo flexible: 5, 10 o 20 palabras por día",
    ],
    images: [
      { src: "/mx/ingles-copa/mock-3.webp", alt: "Audio y pronunciación" },
      { src: "/mx/ingles-copa/mock-4.webp", alt: "Escenas y contexto" },
    ],
    ctaLabel: "Continuar",
  },

  // 5) Pergunta: objetivo
  {
    kind: "question",
    id: "objetivo",
    title: "¿Cuál es tu objetivo al aprender inglés?",
    subtitle: "Elige una opción.",
    storageKey: "objetivo",
    options: [
      { id: "obj-1", label: "Interactuar con turistas", value: "turistas" },
      { id: "obj-2", label: "Vender más (negocio)", value: "ventas" },
      { id: "obj-3", label: "Viajar con más confianza", value: "viajar" },
      { id: "obj-4", label: "Entender películas/música", value: "entretenimiento" },
      { id: "obj-5", label: "Todas las opciones anteriores", value: "todas" },
    ],
  },

  // 6) Nome
  {
    kind: "name",
    id: "nome",
    title: "Para personalizar tu plan…",
    subtitle: "¿Cómo te llamas?",
    placeholder: "Escribe tu nombre aquí",
    storageKey: "nome",
    ctaLabel: "Generar mi plan",
  },
];

// número total de passos (útil pro progresso)
export const FUNNEL_TOTAL_STEPS = FUNNEL_STEPS.length;

// mapeia step (1..N) -> objeto
export function getStepByIndex(stepIndex1Based: number) {
  const idx = stepIndex1Based - 1;
  return FUNNEL_STEPS[idx] ?? null;
}
