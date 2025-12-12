// app/types/caso-bia-quiz.ts
import type { QuizOption } from "./quiz";

export type CasoBiaQuizStepId =
  | "intro"        // Promotor se apresentando
  | "briefing"     // Mais informações do caso
  | "perfil"       // Perfil do jogador/investigador
  | "investigacao" // Como a pessoa gosta de investigar / jogar
  | "pistas"       // Etapa que pode levar à raspadinha
  | "raspadinha"   // Usa o componente ScratchCard já existente
  | "resultado"    // Feedback do "perfil investigativo"
  | "oferta";      // Chamada pro PDF/jogo completo

export type CasoBiaQuizStep = {
  id: CasoBiaQuizStepId;
  title: string;
  subtitle?: string;
  question?: string;
  options: QuizOption[];
};
