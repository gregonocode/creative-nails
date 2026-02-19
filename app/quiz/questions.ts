// app/quiz/questions.ts
export type QuizAnswer = {
  moneyIntent: "ja_pensei" | "nunca_pensei" | "to_pensando_agora" | "quero_morar";
  buildFor: "morar" | "alugar" | "vender" | "planejando";
  priority: "mais_espaco" | "mais_bonito" | "mais_barato" | "todas";
};

export type QuizOption<T extends string> = {
  label: string;
  value: T;
};

export type QuizQuestion = {
  id: keyof QuizAnswer;
  title: string;
  subtitle?: string;
  options: QuizOption<any>[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "moneyIntent",
    title: "Já pensou em ganhar dinheiro com kitinetes?",
    subtitle: "Só pra eu entender seu objetivo.",
    options: [
      { label: "Já pensei", value: "ja_pensei" },
      { label: "Nunca pensei", value: "nunca_pensei" },
      { label: "Tô pensando agora", value: "to_pensando_agora" },
      { label: "Quero pra morar mesmo", value: "quero_morar" },
    ],
  },
  {
    id: "buildFor",
    title: "Você quer construir pra…",
    options: [
      { label: "Morar", value: "morar" },
      { label: "Alugar", value: "alugar" },
      { label: "Vender", value: "vender" },
      { label: "Ainda planejando", value: "planejando" },
    ],
  },
  {
    id: "priority",
    title: "Qual é sua prioridade #1?",
    subtitle: "Escolhe a que mais pesa pra você.",
    options: [
      { label: "Mais espaço", value: "mais_espaco" },
      { label: "Mais bonito", value: "mais_bonito" },
      { label: "Mais barato", value: "mais_barato" },
      { label: "Todas as opções", value: "todas" },
    ],
  },
];
