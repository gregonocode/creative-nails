'use client';

import { useMemo, useState } from 'react';

import FunnelShellES from '@/app/components/quiz/funil_es/FunnelShellES';
import StepGoalES from '@/app/components/quiz/funil_es/StepGoalES';
import StepAmountES from '@/app/components/quiz/funil_es/StepAmountES';
import StepNameES from '@/app/components/quiz/funil_es/StepNameES';
import StepLoadingES from '@/app/components/quiz/funil_es/StepLoadingES';

type Goal = 'casa' | 'viagem' | 'carro' | 'tranquilidade' | 'outro';
type Amount = 10000 | 20000 | 40000 | 100000;

type FunnelAnswers = {
  goal: Goal | null;
  amount: Amount | null;
  name: string;
};

type StepKey = 'goal' | 'amount' | 'name' | 'loading';

export default function FunilEsPage() {
  const [step, setStep] = useState<StepKey>('goal');

  const [answers, setAnswers] = useState<FunnelAnswers>({
    goal: null,
    amount: null,
    name: '',
  });

  const progress = useMemo(() => {
    const order: StepKey[] = ['goal', 'amount', 'name', 'loading'];
    return (order.indexOf(step) + 1) / order.length;
  }, [step]);

  return (
    <FunnelShellES progress={progress}>
      {step === 'goal' && (
        <StepGoalES
          value={answers.goal}
          onBack={() => setStep('goal')}
          onSelect={(goal) => {
            setAnswers((p) => ({ ...p, goal }));
            setStep('amount');
          }}
        />
      )}

      {step === 'amount' && (
        <StepAmountES
          value={answers.amount}
          onBack={() => setStep('goal')}
          onSelect={(amount) => {
            setAnswers((p) => ({ ...p, amount }));
            setStep('name');
          }}
        />
      )}

      {step === 'name' && (
        <StepNameES
          value={answers.name}
          onBack={() => setStep('amount')}
          onSubmit={(name) => {
            setAnswers((p) => ({ ...p, name }));
            setStep('loading');
          }}
        />
      )}

      {step === 'loading' && <StepLoadingES answers={answers} seconds={3} />}
    </FunnelShellES>
  );
}
