// app/types/quiz.ts
export type QuizOption = {
  id: string;
  label: string;
  value?: string;
};


// app/types/quiz.ts
export type QuizStepId =
  | "intro"
  | "pergunta1"
  | "pergunta2"
  | "pergunta3"
  | "beneficios"
  | "ingredientes"
  | "antes_depois"
  | "resultado"
  | "raspadinha"
  | "oferta";
  




export type QuizStep = {
  id: QuizStepId;
  title: string;
  subtitle?: string;
  question?: string;
  options: QuizOption[];
};
