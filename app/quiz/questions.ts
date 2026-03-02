// app/quiz/questions.ts

export type QuizAnswer = {
  alvenariaEconomica: "nunca_ouvi" | "ja_ouvi";
  qtdQuitinetes: "uma" | "mais_de_duas" | "ainda_planejar";
  comoConstruir:
    | "recursos_proprios"
    | "financiamento"
    | "dois_juntos"
    | "ainda_ver";
};

export type QuizOption<T extends string> = {
  label: string;
  value: T;
};

export type QuizQuestion<K extends keyof QuizAnswer = keyof QuizAnswer> = {
  id: K;
  title: string;
  subtitle?: string;

  /**
   * ✅ Importante pro futuro (tracking):
   * - `value` vira o que você salva no banco (ex: "ja_ouvi")
   * - `label` é só pra UI (você pode salvar também se quiser, mas não é necessário)
   */
  options: QuizOption<QuizAnswer[K]>[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "alvenariaEconomica",
    title: "Você conhece a alvenaria econômica?",
    options: [
      { label: "Nunca ouvi falar", value: "nunca_ouvi" },
      { label: "Sim, já ouvi falar", value: "ja_ouvi" },
    ],
  },
  {
    id: "qtdQuitinetes",
    title: "Quantas quitinetes você pretende começar?",
    options: [
      { label: "Quero começar por uma", value: "uma" },
      { label: "Mais de duas", value: "mais_de_duas" },
      { label: "Ainda vou planejar", value: "ainda_planejar" },
    ],
  },
  {
    id: "comoConstruir",
    title: "Como você deseja construir?",
    options: [
      { label: "Recursos próprios", value: "recursos_proprios" },
      { label: "Financiamento", value: "financiamento" },
      { label: "Os dois juntos", value: "dois_juntos" },
      { label: "Ainda vou ver", value: "ainda_ver" },
    ],
  },
];