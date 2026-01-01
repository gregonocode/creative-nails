'use client';

import { useMemo, useState } from 'react';
import FunnelShell from '@/app/components/quiz/funil/FunnelShell';
import StepAudio from '@/app/components/quiz/funil/StepAudio';
import StepGoal from '@/app/components/quiz/funil/StepGoal';
import StepAmount from '@/app/components/quiz/funil/StepAmount';
import StepName from '@/app/components/quiz/funil/StepName';
import StepLoading from '@/app/components/quiz/funil/StepLoading';

type Goal = "casa" | "viagem" | "carro" | "tranquilidade" | "outro";
type Amount = 10000 | 20000 | 40000 | 100000;

type FunnelAnswers = {
  goal: Goal | null;
  amount: Amount | null;
  name: string;
};

type StepKey = "audio" | "goal" | "amount" | "name" | "loading";

export default function FunilPage() {
  const [step, setStep] = useState<StepKey>("audio");
  const [answers, setAnswers] = useState<FunnelAnswers>({
    goal: null,
    amount: null,
    name: "",
  });

  const progress = useMemo(() => {
    const order: StepKey[] = ["audio", "goal", "amount", "name", "loading"];
    return (order.indexOf(step) + 1) / order.length;
  }, [step]);

  return (
    <FunnelShell progress={progress}>
      {step === "audio" && (
        <StepAudio
          src="/introm.mp3"
          onNext={() => setStep("goal")}
        />
      )}

      {step === "goal" && (
        <StepGoal
          value={answers.goal}
          onBack={() => setStep("audio")}
          onSelect={(goal) => {
            setAnswers((p) => ({ ...p, goal }));
            setStep("amount");
          }}
        />
      )}

      {step === "amount" && (
        <StepAmount
          value={answers.amount}
          onBack={() => setStep("goal")}
          onSelect={(amount) => {
            setAnswers((p) => ({ ...p, amount }));
            setStep("name");
          }}
        />
      )}

      {step === "name" && (
        <StepName
          value={answers.name}
          onBack={() => setStep("amount")}
          onSubmit={(name) => {
            setAnswers((p) => ({ ...p, name }));
            setStep("loading");
          }}
        />
      )}

      {step === "loading" && (
        <StepLoading
          answers={answers}
          seconds={3}
          // aqui você pode gerar a tabela / registrar lead / etc.
        />
      )}
    </FunnelShell>
  );
}
