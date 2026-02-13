export type IgrejaOption =
  | "Assembleia de Deus"
  | "Congregação Cristã"
  | "Igreja Universal"
  | "Igreja do Evangelho Quadrangular"
  | "Igreja Adventista"
  | "Convenção Batista"
  | "Outras";

export type ObjetivoOption =
  | "Deixar o culto mais divertido"
  | "Trazer jovens para a igreja"
  | "Unir mais a igreja"
  | "Quebrar o gelo em grupos/células"
  | "Ajudar a memorizar a Bíblia"
  | "Integrar visitantes"
  | "Fortalecer comunhão entre equipes";

export type FunilDinamicasData = {
  igreja?: IgrejaOption;
  objetivo?: ObjetivoOption;
  nome?: string;
};

const KEY = "funil_dinamicas_v1";

export function readFunil(): FunilDinamicasData {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as FunilDinamicasData) : {};
  } catch {
    return {};
  }
}

export function writeFunil(patch: Partial<FunilDinamicasData>) {
  if (typeof window === "undefined") return;
  const current = readFunil();
  const next = { ...current, ...patch };
  sessionStorage.setItem(KEY, JSON.stringify(next));
}

export function clearFunil() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(KEY);
}
