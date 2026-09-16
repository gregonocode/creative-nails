'use client';

import React from 'react';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  HeartPulse, 
  Apple, 
  PersonStanding,
  Activity
} from 'lucide-react';

export default function ExerciciosCoordenacaoPage() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800 scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section className="bg-white py-12 md:py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[#1B4D3E]"> {/* Verde marinho */}
              Recupere o Equilíbrio, a Firmeza e a Confiança do Seu Corpo em Casa!
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 font-medium">
              Um programa simples e prático de exercícios de coordenação criado para mulheres que desejam viver sem limitações, com mais disposição e segurança em cada passo.
            </p>
            <a 
              href="#oferta" 
              className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 shadow-lg w-full md:w-auto"
            >
              EU QUERO RECUPERAR MEU EQUILÍBRIO
              <ArrowRight size={24} />
            </a>
          </div>
          
          <div className="flex-1 w-full">
            <img
              src="/rose/mockupcurso.webp"
              alt="Mockup do curso de exercícios de coordenação"
              className="w-full h-auto md:h-[400px] rounded-2xl border-4 border-teal-100 shadow-xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* 2. PARA QUEM É E BENEFÍCIOS */}
      <section className="py-16 px-6 bg-teal-50">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-[#1B4D3E]">Para quem é este programa?</h2>
            <p className="text-lg text-neutral-700">
              Perfeito para <strong>mulheres acima de 40, 50, 60 anos ou mais</strong> que sentem que o corpo já não tem a mesma firmeza, que tropeçam com facilidade ou que desejam fortalecer as pernas e a coordenação para prevenir acidentes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto text-teal-700">
                <PersonStanding size={28} />
              </div>
              <h3 className="font-bold text-xl text-neutral-800">Mais Equilíbrio</h3>
              <p className="text-neutral-600">Chega de sentir tontura ou insegurança ao levantar. Firmeza total nos seus passos.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto text-teal-700">
                <HeartPulse size={28} />
              </div>
              <h3 className="font-bold text-xl text-neutral-800">Vitalidade Corporal</h3>
              <p className="text-neutral-600">Exercícios focados em destravar suas articulações, trazendo o bem-estar de volta.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
              <div className="bg-teal-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto text-teal-700">
                <Activity size={28} />
              </div>
              <h3 className="font-bold text-xl text-neutral-800">Mais Mobilidade</h3>
              <p className="text-neutral-600">Volte a realizar suas atividades diárias, como agachar e caminhar, sem dores e sem medo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. O QUE VOCÊ VAI RECEBER */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <img
              src="/rose/oquevaireceber.webp"
              alt="Conteúdo incluído no curso"
              className="w-full h-auto md:h-[350px] rounded-2xl border border-neutral-200 object-contain"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-[#1B4D3E]">O que você vai receber?</h2>
            <p className="text-lg text-neutral-600">
              Você não estará sozinha! O programa é composto por <strong>aulas em vídeo práticas e direto ao ponto</strong>.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-teal-600 shrink-0 mt-1" />
                <span className="text-neutral-700">Vídeos de exercícios passo a passo para fazer <strong>junto com a instrutora</strong>.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-teal-600 shrink-0 mt-1" />
                <span className="text-neutral-700">Aulas curtas, que se encaixam no seu dia a dia, sem precisar de equipamentos caros.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="text-teal-600 shrink-0 mt-1" />
                <span className="text-neutral-700">Pode ser feito no conforto da sua sala ou quarto, no seu próprio ritmo.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. ESCASSEZ E BÔNUS */}
      <section className="py-16 px-6 bg-rose-50 border-y border-rose-100">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm mb-2">
              <Clock size={18} />
              ATENÇÃO: OFERTA POR TEMPO LIMITADO
            </div>
            <h2 className="text-3xl font-bold text-neutral-800">
              Comprando nos próximos 10 minutos, você ganha acesso <span className="text-red-600">AINDA HOJE</span> a estes Bônus Exclusivos:
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bônus 1 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-teal-500 shadow-sm flex gap-4">
              <ShieldCheck className="text-teal-500 shrink-0 w-10 h-10" />
              <div>
                <h3 className="font-bold text-lg">Bônus 1: Treino de Equilíbrio Anti-Quedas</h3>
                <p className="text-sm text-neutral-600 mt-2">
                  Exercícios específicos para fortalecer a base e evitar quedas, prevenindo fraturas de ossos (como o fêmur) e garantindo a sua independência e mobilidade total.
                </p>
              </div>
            </div>
            {/* Bônus 2 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-orange-500 shadow-sm flex gap-4">
              <Apple className="text-orange-500 shrink-0 w-10 h-10" />
              <div>
                <h3 className="font-bold text-lg">Bônus 2: Guia de Alimentos Pró-Energia</h3>
                <p className="text-sm text-neutral-600 mt-2">
                  Um cardápio simples para adicionar na sua rotina alimentos poderosos que dão energia, combatem a fraqueza muscular e melhoram sua disposição diária.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-6">
            <a 
              href="#oferta" 
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-lg"
            >
              EU QUERO MEUS BÔNUS AGORA
            </a>
          </div>
        </div>
      </section>

      {/* 5. SEÇÃO DE OFERTA */}
      <section id="oferta" className="py-20 px-6 bg-[#1B4D3E]">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-teal-700 text-white text-center py-6">
            <h2 className="text-3xl font-bold">Tudo que você precisa para uma vida ativa</h2>
          </div>
          <div className="p-8 md:p-12 space-y-8">
            <div>
              <p className="font-bold text-neutral-800 mb-4 text-lg">O que você está levando hoje:</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-neutral-700">
                  <CheckCircle2 className="text-green-500" size={20} /> Programa Completo Exercícios de Coordenação
                </li>
                <li className="flex items-center gap-3 text-neutral-700">
                  <CheckCircle2 className="text-green-500" size={20} /> Aulas em vídeo para fazer junto com a instrutora
                </li>
                <li className="flex items-center gap-3 text-neutral-700 font-medium">
                  <CheckCircle2 className="text-green-500" size={20} /> Bônus 1: Treino de Equilíbrio Anti-Quedas
                </li>
                <li className="flex items-center gap-3 text-neutral-700 font-medium">
                  <CheckCircle2 className="text-green-500" size={20} /> Bônus 2: Guia de Alimentos Pró-Energia
                </li>
                <li className="flex items-center gap-3 text-neutral-700 font-medium">
                  <CheckCircle2 className="text-green-500" size={20} /> Acesso vitalicio aos exercicios
                </li>
                <li className="flex items-center gap-3 text-neutral-700 font-medium">
                  <CheckCircle2 className="text-green-500" size={20} /> Pagamento unico acesso para sempre
                </li>
              </ul>
            </div>

            <div className="text-center border-t border-b border-neutral-100 py-8">
              <p className="text-neutral-500 line-through mb-1">De R$ 97,00 por apenas</p>
              <div className="flex items-center justify-center text-5xl font-extrabold text-neutral-800">
                <span className="text-2xl mr-2">R$</span> 19,90
              </div>
              <p className="text-sm text-neutral-500 mt-2">Pagamento único. Acesso imediato.</p>
            </div>

            <a 
              href="https://pay.sereja.com.br/checkout/StZx2TCM" 
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-5 px-8 rounded-xl transition-all hover:scale-[1.02] shadow-lg w-full"
            >
              COMPRAR AGORA POR R$ 19,90
            </a>
            
            <div className="flex items-center justify-center gap-2 text-neutral-400 text-sm">
              <ShieldCheck size={16} /> Compra 100% Segura e Criptografada
            </div>
          </div>
        </div>
      </section>

      {/* 6. SOBRE A PRODUTORA */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <img
            src="/rose/perfil%20rose.webp"
            alt="Rose, instrutora do curso"
            className="w-48 h-48 md:w-64 md:h-64 rounded-full shrink-0 border-4 border-teal-100 object-contain bg-white"
          />
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold text-[#1B4D3E]">Conheça a Rose</h2>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Com <strong>60 anos de idade</strong>, Rose é a prova viva de que a idade é apenas um número quando cuidamos do nosso corpo da maneira certa. Especialista em exercícios de coordenação, ela dedicou sua jornada a ajudar outras mulheres a recuperarem a autonomia, prevenirem dores e viverem a melhor fase da vida com total independência.
            </p>
          </div>
        </div>
      </section>

      {/* 7. GARANTIA E CTA FINAL */}
      <section className="py-16 px-6 bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <ShieldCheck className="w-20 h-20 text-teal-400 mx-auto" />
          <h2 className="text-3xl font-bold">Garantia Incondicional de 7 Dias</h2>
          <p className="text-lg text-neutral-300">
            Seu risco é ZERO. Você tem 7 dias inteiros para testar as aulas de coordenação, fazer os exercícios junto com a Rose e ver como o seu corpo reage. Se você não sentir uma melhora na sua disposição e firmeza, nós devolvemos 100% do seu dinheiro. Sem perguntas.
          </p>
          <div className="pt-8">
            <a 
              href="#oferta" 
              className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold py-4 px-10 rounded-full transition-transform hover:scale-105 shadow-lg"
            >
              QUERO GARANTIR MINHA VAGA COM RISCO ZERO
            </a>
          </div>
        </div>
      </section>
      
    </div>
  );
}
