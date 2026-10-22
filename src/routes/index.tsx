import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Check,
  Copy,
  Lock,
  Phone,
  Mail,
  Download,
  Share2,
  ChevronLeft,
  Flame,
  X,
  Star,
  Camera,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: PoliticalFunnel,
});

type Step = "candidate" | "scenario" | "upload" | "loading" | "offer" | "delivered";

interface Candidate {
  id: "lula" | "flavio";
  name: string;
  fullName: string;
  number: string;
  party: string;
  role: string;
  image: string;
  colorTheme: {
    bgBadge: string;
    textBadge: string;
    borderActive: string;
    btnBg: string;
    btnHover: string;
    ringColor: string;
    accentText: string;
  };
}

const CANDIDATES: Candidate[] = [
  {
    id: "lula",
    name: "Lula",
    fullName: "Luiz Inácio Lula da Silva",
    number: "13",
    party: "PT",
    role: "Presidente da República",
    image: "/lula-13.jpg",
    colorTheme: {
      bgBadge: "bg-red-600",
      textBadge: "text-white",
      borderActive: "border-red-500",
      btnBg: "bg-gradient-to-r from-red-600 to-rose-700",
      btnHover: "hover:from-red-500 hover:to-rose-600",
      ringColor: "ring-red-500/40",
      accentText: "text-red-500",
    },
  },
  {
    id: "flavio",
    name: "Flávio Bolsonaro",
    fullName: "Flávio Bolsonaro",
    number: "22",
    party: "PL",
    role: "Senador da República",
    image: "/flavio-bolsonaro-22.jpg",
    colorTheme: {
      bgBadge: "bg-yellow-400 text-slate-950 font-black",
      textBadge: "text-slate-950",
      borderActive: "border-yellow-400",
      btnBg: "bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600",
      btnHover: "hover:from-emerald-500 hover:to-blue-500",
      ringColor: "ring-yellow-400/50",
      accentText: "text-yellow-400",
    },
  },
];

interface Scenario {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

// Opções exclusivas para Flávio Bolsonaro fornecidas pelo usuário
const FLAVIO_SCENARIOS: Scenario[] = [
  {
    id: "flavio-selfie-22",
    title: "Selfie com Flávio (Sinal 22)",
    description: "",
    image: "/flavio-cenario-selfie.jpg",
    tag: "Mais Escolhida 🔥",
  },
  {
    id: "flavio-abraco",
    title: "Abraço com Flávio",
    description: "",
    image: "/flavio-cenario-abraco.jpg",
    tag: "Emocionante 💛",
  },
];

// Opções para Lula fornecidas pelo usuário
const LULA_SCENARIOS: Scenario[] = [
  {
    id: "lula-selfie-l",
    title: "Selfie com Lula (Fazendo o L)",
    description: "",
    image: "/lula-cenario-selfie-l.jpg",
    tag: "Mais Escolhida 🔥",
  },
  {
    id: "lula-abraco",
    title: "Abraço com Lula",
    description: "",
    image: "/lula-cenario-abraco.jpg",
    tag: "Emocionante ❤️",
  },
];

interface Review {
  id: string;
  name: string;
  city: string;
  avatar: string;
  stars: number;
  time: string;
  text: string;
  verified: boolean;
  imagePreview?: string;
}

const LULA_REVIEWS: Review[] = [
  {
    id: "l1",
    name: "Carlos Eduardo Mendes",
    city: "São Paulo, SP",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 18 minutos",
    text: "Ficou muito perfeito! Mandei no grupo da família e todo mundo achou que eu realmente estive com o Lula em Brasília. A iluminação e os detalhes ficaram impecáveis!",
    verified: true,
    imagePreview: "/lula-cenario-selfie-l.jpg",
  },
  {
    id: "l2",
    name: "Maria de Fátima Alencar",
    city: "Salvador, BA",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 42 minutos",
    text: "Fiz de surpresa pro meu pai que é fã do Lula desde 1989. Quando ele viu a foto dele abraçando o presidente, até chorou de emoção! Vale cada centavo.",
    verified: true,
    imagePreview: "/lula-cenario-abraco.jpg",
  },
  {
    id: "l3",
    name: "Rodrigo Nogueira",
    city: "Belo Horizonte, MG",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 1 hora",
    text: "Coloquei como foto no meu status do WhatsApp e bombou de gente perguntando onde tirei essa foto com o homem! Entrega no WhatsApp foi super rápida, menos de 2 minutos.",
    verified: true,
  },
  {
    id: "l4",
    name: "Patrícia Lima",
    city: "Recife, PE",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 2 horas",
    text: "A qualidade em altíssima resolução me surpreendeu. Dá até pra mandar imprimir e colocar num porta-retrato. O gesto do L ficou muito nítido e natural!",
    verified: true,
  },
];

const FLAVIO_REVIEWS: Review[] = [
  {
    id: "f1",
    name: "Marcos Vinícius Silveira",
    city: "Curitiba, PR",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 12 minutos",
    text: "Sensacional! Imagem extremamente nítida e muito realista. Todo mundo elogiou no meu WhatsApp parecendo mesmo que estive no gabinete com o Senador Flávio Bolsonaro. Muito top!",
    verified: true,
    imagePreview: "/flavio-cenario-selfie.jpg",
  },
  {
    id: "f2",
    name: "Eduardo Guimarães",
    city: "Goiânia, GO",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 35 minutos",
    text: "Mandei pros amigos do grupo do trabalho e ninguém acreditou que era montagem de tão perfeita. O sinal do 22 com a mão ficou certinho, padrão de qualidade excelente!",
    verified: true,
    imagePreview: "/flavio-cenario-abraco.jpg",
  },
  {
    id: "f3",
    name: "Luciana Ferreira",
    city: "Joinville, SC",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 1 hora",
    text: "Comprei de presente pro meu marido que é apoiador do 22 raiz. Ele colocou como foto de perfil e imprimiu pra colocar no escritório dele. Recomendo demais!",
    verified: true,
  },
  {
    id: "f4",
    name: "André Meirelles",
    city: "Rio de Janeiro, RJ",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    stars: 5,
    time: "Há 2 horas",
    text: "Muito prático e seguro. Paguei no PIX e recebi o arquivo original no WhatsApp imediatamente sem compressão. Vale muito a pena para fortalecer o nosso lado!",
    verified: true,
  },
];

function PoliticalFunnel() {
  const [step, setStep] = useState<Step>("offer");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(CANDIDATES[0]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(LULA_SCENARIOS[0]);
  const [reviewTab, setReviewTab] = useState<"lula" | "flavio">("lula");

  // Contadores de fotos em tempo real para gerar rivalidade
  const [lulaCount, setLulaCount] = useState(14832);
  const [flavioCount, setFlavioCount] = useState(14705);

  useEffect(() => {
    const timer = setInterval(() => {
      if (Math.random() > 0.5) {
        setLulaCount((prev) => prev + 1);
      } else {
        setFlavioCount((prev) => prev + 1);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Foto do usuário
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  // Progresso do loading
  const [bar1, setBar1] = useState(0);
  const [bar2, setBar2] = useState(0);
  const [bar3, setBar3] = useState(0);

  // Contato
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [showContactModal, setShowContactModal] = useState(false);
  const [modalStage, setModalStage] = useState<"contact" | "pix">("contact");

  // Checkout & PIX
  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Delivered animation
  const [genStage, setGenStage] = useState(1);
  const [genComplete, setGenComplete] = useState(false);

  // Cenários ativos de acordo com o candidato selecionado
  const activeScenarios = selectedCandidate.id === "flavio" ? FLAVIO_SCENARIOS : LULA_SCENARIOS;

  // Cronômetro
  useEffect(() => {
    if (step === "offer" || showContactModal) {
      const timer = setInterval(() => {
        setTimeLeft((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step, showContactModal]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handlePhoneMask = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 11);
    let formatted = raw;
    if (raw.length > 2) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length > 7) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    setWhatsapp(formatted);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulação de Loading
  const startLoading = () => {
    setStep("loading");
    setBar1(0);
    setBar2(0);
    setBar3(0);

    let p1 = 0;
    const i1 = setInterval(() => {
      p1 += 5;
      if (p1 >= 100) {
        p1 = 100;
        clearInterval(i1);

        let p2 = 0;
        const i2 = setInterval(() => {
          p2 += 5;
          if (p2 >= 100) {
            p2 = 100;
            clearInterval(i2);

            let p3 = 0;
            const i3 = setInterval(() => {
              p3 += 5;
              if (p3 >= 100) {
                p3 = 100;
                clearInterval(i3);
                setTimeout(() => setStep("offer"), 500);
              }
              setBar3(p3);
            }, 50);
          }
          setBar2(p2);
        }, 50);
      }
      setBar1(p1);
    }, 50);
  };

  const handlePaymentConfirmed = () => {
    setStep("delivered");
    setGenStage(1);
    setGenComplete(false);

    setTimeout(() => setGenStage(2), 2000);
    setTimeout(() => setGenStage(3), 4000);
    setTimeout(() => setGenComplete(true), 6500);
  };

  const currentPrice = 27.9;
  const pixCodeString = `00020126580014br.gov.bcb.pix0136clique-${selectedCandidate.id}-pay20265204000053039865405${currentPrice.toFixed(2)}5802BR5920FOTO OFICIAL6009SAO PAULO62070503***6304`;

  const handleCopyPix = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(pixCodeString);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = pixCodeString;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch {
      // Fallback para ambientes restritos de iframe
    }
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const totalCount = lulaCount + flavioCount;
  const lulaPct = ((lulaCount / totalCount) * 100).toFixed(1);
  const flavioPct = ((flavioCount / totalCount) * 100).toFixed(1);
  const diffCount = Math.abs(lulaCount - flavioCount);

  return (
    <div className="min-h-screen bg-[#090807] text-white flex flex-col items-center justify-between font-sans selection:bg-amber-400 selection:text-black">
      {/* Container Principal Mobile-First */}
      <main className="w-full max-w-[440px] px-3.5 py-4 flex-1 flex flex-col items-center justify-between min-h-screen">
        {/* ========================================================================= */}
        {/* ABA 1: ESCOLHA DO CANDIDATO COM PLACAR DE DISPUTA AO VIVO                */}
        {/* ========================================================================= */}
        {step === "candidate" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              {/* Badge de Duelo */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600/30 via-amber-400/20 to-yellow-500/30 border border-amber-400/40 text-amber-300 px-3 py-1 rounded-full text-[11px] font-black mb-2 shadow-lg">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                <span>DISPUTA AO VIVO DO DIA</span>
              </div>

              {/* Título de Impacto */}
              <h1 className="text-2xl sm:text-[26px] font-black text-white tracking-tight leading-tight">
                Qual eleitorado está <br />
                <span className="text-amber-400">gerando mais fotos?</span>
              </h1>
              <p className="text-xs text-white/70 mt-1 mb-3">
                Toque no seu líder para apoiar seu lado e não deixar o outro vencer o placar:
              </p>

              {/* Placar Comparativo em Tempo Real */}
              <div className="w-full bg-neutral-900/95 border border-white/15 rounded-2xl p-3 mb-4 shadow-2xl">
                <div className="flex items-center justify-between text-xs mb-1.5 font-black">
                  <div className="flex items-center gap-1.5 text-red-500">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>Lula: {lulaCount.toLocaleString("pt-BR")}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded border border-amber-400/30">
                    {diffCount} fotos de diferença!
                  </span>
                  <div className="flex items-center gap-1.5 text-yellow-400">
                    <span>Flávio: {flavioCount.toLocaleString("pt-BR")}</span>
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                  </div>
                </div>

                {/* Barra Visual de Duelo */}
                <div className="w-full h-3 rounded-full bg-neutral-800 overflow-hidden flex shadow-inner border border-white/10">
                  <div
                    className="bg-red-600 h-full transition-all duration-700 ease-out"
                    style={{ width: `${lulaPct}%` }}
                  />
                  <div
                    className="bg-yellow-400 h-full transition-all duration-700 ease-out"
                    style={{ width: `${flavioPct}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-[11px] text-white/70 mt-1.5 font-bold">
                  <span className="text-red-400">{lulaPct}% do total</span>
                  <span className="text-[10px] text-white/50">Disputa voto a voto</span>
                  <span className="text-yellow-400">{flavioPct}% do total</span>
                </div>
              </div>

              {/* 2 Cartões Grandes Clicáveis com as Imagens Fornecidas */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Opção Lula 13 */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCandidate(CANDIDATES[0]);
                      setSelectedScenario(LULA_SCENARIOS[0]);
                      setStep("scenario");
                    }}
                    className="group relative rounded-2xl overflow-hidden border-2 border-red-600/80 bg-neutral-950 aspect-[3/4.4] flex flex-col justify-end text-left transition-all active:scale-95 hover:border-red-500 hover:shadow-2xl hover:shadow-red-600/30 focus:outline-none focus:ring-4 focus:ring-red-500/40"
                  >
                    <img
                      src="/lula-13.jpg"
                      alt="Lula 13"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg border border-red-400">
                      PT • 13
                    </div>

                    <div className="relative p-2.5 z-10">
                      <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">
                        Presidente
                      </span>
                      <strong className="text-base sm:text-lg font-black text-white leading-tight block">
                        LULA 13
                      </strong>
                      <div className="mt-1.5 w-full py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs text-center shadow-md shadow-red-700/50">
                        ESCOLHER LULA
                      </div>
                    </div>
                  </button>

                  <div className="mt-2 bg-red-950/80 border border-red-500/40 rounded-xl p-2.5 text-center shadow-inner">
                    <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
                      <span className="text-white/80">Fotos geradas:</span>
                      <span className="text-red-400">{lulaCount.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="w-full bg-red-900/60 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: `${lulaPct}%` }} />
                    </div>
                    <p className="text-[10px] text-red-200 font-bold leading-tight">
                      ⚠️ O Flávio 22 está colado na disputa! Crie sua foto agora para manter o Lula na liderança!
                    </p>
                  </div>
                </div>

                {/* Opção Flávio Bolsonaro 22 */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCandidate(CANDIDATES[1]);
                      setSelectedScenario(FLAVIO_SCENARIOS[0]);
                      setStep("scenario");
                    }}
                    className="group relative rounded-2xl overflow-hidden border-2 border-yellow-400/80 bg-neutral-950 aspect-[3/4.4] flex flex-col justify-end text-left transition-all active:scale-95 hover:border-yellow-300 hover:shadow-2xl hover:shadow-yellow-500/30 focus:outline-none focus:ring-4 focus:ring-yellow-400/40"
                  >
                    <img
                      src="/flavio-bolsonaro-22.jpg"
                      alt="Flávio Bolsonaro 22"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    <div className="absolute top-2.5 left-2.5 bg-yellow-400 text-black text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg border border-yellow-300">
                      PL • 22
                    </div>

                    <div className="relative p-2.5 z-10">
                      <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider block">
                        Senador
                      </span>
                      <strong className="text-base sm:text-lg font-black text-white leading-tight block">
                        FLÁVIO 22
                      </strong>
                      <div className="mt-1.5 w-full py-2 rounded-xl bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs text-center shadow-md shadow-yellow-500/50">
                        ESCOLHER FLÁVIO
                      </div>
                    </div>
                  </button>

                  <div className="mt-2 bg-yellow-950/80 border border-yellow-500/40 rounded-xl p-2.5 text-center shadow-inner">
                    <div className="flex items-center justify-between text-[11px] font-extrabold mb-1">
                      <span className="text-white/80">Fotos geradas:</span>
                      <span className="text-yellow-400">{flavioCount.toLocaleString("pt-BR")}</span>
                    </div>
                    <div className="w-full bg-yellow-900/60 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${flavioPct}%` }} />
                    </div>
                    <p className="text-[10px] text-yellow-200 font-bold leading-tight">
                      ⚠️ O Lula 13 está à frente por apenas {diffCount} fotos! Gere a sua foto agora para virar o placar!
                    </p>
                  </div>
                </div>
              </div>

              {/* Prova de Confiança */}
              <div className="mt-5 p-3 rounded-xl bg-white/5 border border-white/10 text-left w-full flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-white block">
                    Gere sua foto e fortaleça seu lado
                  </strong>
                  <span className="text-[11px] text-white/60">
                    Sua foto é produzida em alta definição profissional e conta automaticamente no placar do dia.
                  </span>
                </div>
              </div>

              {/* Seção de Feedbacks / Avaliações dos Dois Lados */}
              <div className="w-full mt-6 text-left">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div>
                    <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                      <span>💬</span>
                      <span>O que os eleitores estão dizendo:</span>
                    </h3>
                    <p className="text-[11px] text-white/60">
                      Depoimentos reais de quem já garantiu a sua montagem
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-full text-[10px] font-bold text-amber-300">
                    <span>★ 4.9/5</span>
                  </div>
                </div>

                {/* Abas para alternar feedbacks de Lula e Flávio */}
                <div className="grid grid-cols-2 gap-2 mb-3 bg-black/60 p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setReviewTab("lula")}
                    className={`py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      reviewTab === "lula"
                        ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>Eleitores Lula (13)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewTab("flavio")}
                    className={`py-2 px-3 rounded-lg text-xs font-black transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      reviewTab === "flavio"
                        ? "bg-yellow-400 text-black shadow-md shadow-yellow-500/30"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Eleitores Flávio (22)</span>
                  </button>
                </div>

                {/* Lista de Feedbacks */}
                <div className="flex flex-col gap-2.5">
                  {(reviewTab === "lula" ? LULA_REVIEWS : FLAVIO_REVIEWS).map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-neutral-900/90 border border-white/10 rounded-xl p-3 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <strong className="text-xs font-bold text-white block">
                                {rev.name}
                              </strong>
                              {rev.verified && (
                                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                                  ✓ Verificado
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-white/50 block">
                              {rev.city} • {rev.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex text-amber-400 text-[11px] shrink-0">
                          {"★".repeat(rev.stars)}
                        </div>
                      </div>

                      <p className="text-[11px] text-white/80 leading-relaxed italic">
                        "{rev.text}"
                      </p>

                      {rev.imagePreview && (
                        <div className="mt-2.5 flex items-center gap-2.5 bg-black/50 p-2 rounded-lg border border-white/10">
                          <img
                            src={rev.imagePreview}
                            alt="Montagem"
                            className="w-14 h-11 object-cover rounded border border-white/20 shrink-0"
                          />
                          <div className="text-left">
                            <span className="text-[10px] text-amber-300 font-bold block leading-tight">
                              Foto em Alta Resolução entregue
                            </span>
                            <span className="text-[9px] text-white/50 block">
                              Enviada no WhatsApp do cliente
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <footer className="mt-5 pt-3 pb-2 text-center text-xs text-white/40 w-full border-t border-white/10">
              <p className="text-[11px]">
                Placar atualizado a cada minuto • Entrega imediata em alta definição no seu WhatsApp
              </p>
            </footer>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 2: ESCOLHA DO CENÁRIO (APENAS AS 2 FOTOS PARA FLÁVIO)                 */}
        {/* ========================================================================= */}
        {step === "scenario" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              {/* Botão Voltar */}
              <button
                onClick={() => setStep("candidate")}
                className="self-start text-xs text-amber-400 flex items-center gap-1 mb-2 hover:opacity-80 transition font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Trocar candidato ({selectedCandidate.name})</span>
              </button>

              <h1 className="text-2xl font-black text-white tracking-tight leading-snug">
                Escolha o estilo da foto <br />
                com <span className={selectedCandidate.colorTheme.accentText}>{selectedCandidate.name}</span>
              </h1>
              <p className="text-xs text-white/70 mt-1 mb-4">
                Selecione uma das duas montagens oficiais abaixo:
              </p>

              {/* Lista com as 2 opções em proporção completa para exibir todas as mãos */}
              <div className="flex flex-col gap-4 w-full">
                {activeScenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc);
                      setStep("upload");
                    }}
                    className={`w-full rounded-2xl overflow-hidden border-2 border-white/20 bg-neutral-950 text-left transition-all active:scale-98 focus:outline-none focus:ring-4 shadow-xl ${
                      selectedCandidate.id === "lula"
                        ? "hover:border-red-500 hover:shadow-red-600/20 focus:ring-red-500"
                        : "hover:border-amber-400 hover:shadow-amber-500/20 focus:ring-amber-400"
                    }`}
                  >
                    {/* Imagem em proporção 1024x853 sem cortes laterais */}
                    <div className="relative aspect-[1024/853] w-full bg-black overflow-hidden">
                      <img
                        src={sc.image}
                        alt={sc.title}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-md border border-amber-400/40">
                        {sc.tag}
                      </div>
                    </div>

                    {/* Barra de título e botão */}
                    <div className="p-3 bg-neutral-900 flex items-center justify-between gap-3 border-t border-white/10">
                      <strong className="text-sm font-black text-white block">
                        {sc.title}
                      </strong>
                      <div
                        className={`px-4 py-2 rounded-xl font-black text-xs text-center shadow-md ${
                          selectedCandidate.id === "lula"
                            ? "bg-red-600 hover:bg-red-500 text-white shadow-red-700/50"
                            : "bg-amber-400 hover:bg-amber-300 text-black shadow-amber-500/50"
                        }`}
                      >
                        ESCOLHER
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 3: ENVIO DA SUA FOTO                                                  */}
        {/* ========================================================================= */}
        {step === "upload" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              <button
                onClick={() => setStep("scenario")}
                className="self-start text-xs text-amber-400 flex items-center gap-1 mb-2 hover:opacity-80 transition font-bold"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar às opções de foto</span>
              </button>

              <h1 className="text-2xl font-black text-white tracking-tight leading-snug">
                Agora, envie a sua foto
              </h1>
              <p className="text-xs text-white/70 mt-1 mb-4">
                Envie uma foto de rosto ou selfie. Vamos colocar o seu rosto perfeitamente na montagem escolhida (
                <strong className={selectedCandidate.colorTheme.accentText}>{selectedScenario.title}</strong>).
              </p>

              {/* Slot de Upload com Preview */}
              <div className="w-full">
                <label className="relative aspect-[3/3.8] rounded-2xl border-2 border-dashed border-amber-400/40 bg-amber-400/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-amber-400 transition active:scale-98">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                  {userPhoto ? (
                    <div className="relative w-full h-full">
                      <img src={userPhoto} alt="Sua foto" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                        <span className="text-xs font-bold text-white bg-black/70 px-3 py-1.5 rounded-lg">
                          TROCAR FOTO
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-4">
                      <div className="w-16 h-16 rounded-full bg-amber-400/10 text-amber-400 flex items-center justify-center text-3xl font-light mb-2">
                        +
                      </div>
                      <span className="text-sm font-bold text-white tracking-wide">
                        TOQUE PARA ENVIAR SUA FOTO
                      </span>
                      <span className="text-xs text-white/50 mt-1">
                        Selfie comum, foto de frente ou perfil
                      </span>
                    </div>
                  )}
                </label>
              </div>

              {/* Dica de Privacidade */}
              <p className="text-[12px] text-white/60 mt-3 flex items-center gap-1.5 justify-center">
                <span>🔒</span> Suas fotos são usadas estritamente para criar a sua montagem personalizada.
              </p>

              {/* Botão de Avançar */}
              <button
                disabled={!userPhoto}
                onClick={startLoading}
                className={`w-full mt-5 py-4 rounded-xl font-black text-sm sm:text-base tracking-wide transition shadow-lg ${
                  userPhoto
                    ? `${selectedCandidate.colorTheme.btnBg} text-white active:scale-98 animate-pulse`
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                CRIAR MINHA FOTO COM {selectedCandidate.name.toUpperCase()}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 4: LOADING / PROCESSAMENTO EM TEMPO REAL                              */}
        {/* ========================================================================= */}
        {step === "loading" && (
          <div className="w-full flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-300 py-6">
            <div className="w-full flex flex-col items-center">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-1">
                Criando sua foto com {selectedCandidate.name}…
              </h1>
              <p className="text-xs text-white/70 mb-6">
                Estamos reconhecendo seu rosto e ajustando a iluminação na montagem
              </p>

              {/* Dois avatares se aproximando */}
              <div className="relative flex items-center justify-center gap-4 mb-8">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-xl">
                  <img src={userPhoto || ""} alt="Você" className="w-full h-full object-cover" />
                </div>
                <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-amber-400/60 filter blur-[2px] animate-ping" />
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-amber-400 shadow-xl shadow-amber-400/20">
                  <img src={selectedScenario.image} alt={selectedCandidate.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Barras de Progresso */}
              <div className="w-full flex flex-col gap-3.5 max-w-[340px]">
                <div className="w-full text-left">
                  <div className="flex justify-between text-xs font-semibold text-white/80 mb-1">
                    <span>Reconhecendo traços faciais</span>
                    <span className="text-amber-400">{bar1}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all duration-100" style={{ width: `${bar1}%` }} />
                  </div>
                </div>

                <div className="w-full text-left">
                  <div className="flex justify-between text-xs font-semibold text-white/80 mb-1">
                    <span>Encaixando no estilo ({selectedScenario.title})</span>
                    <span className="text-amber-400">{bar2}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all duration-100" style={{ width: `${bar2}%` }} />
                  </div>
                </div>

                <div className="w-full text-left">
                  <div className="flex justify-between text-xs font-semibold text-white/80 mb-1">
                    <span>Finalizando em alta resolução</span>
                    <span className="text-amber-400">{bar3}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-100" style={{ width: `${bar3}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 5: OFERTA / CHECKOUT IDENTICA AO MODELO                               */}
        {/* ========================================================================= */}
        {step === "offer" && (
          <div className="w-full flex-1 flex flex-col items-center justify-start text-center animate-in fade-in duration-300">
            {/* Faixa Superior 50% OFF */}
            <div className="w-full bg-[#5a0b12] text-amber-300 py-1.5 px-3 rounded-t-xl text-center text-xs font-black tracking-wide border-b border-red-500/20 shadow-inner">
              🎁 50% OFF aplicado
            </div>

            {/* Alternador de Candidato na tela de pagamento */}
            <div className="w-full flex items-center justify-between my-2 px-1">
              <button
                type="button"
                onClick={() => setStep("candidate")}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold transition cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Início</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const otherCandidate = selectedCandidate.id === "lula" ? CANDIDATES[1] : CANDIDATES[0];
                  setSelectedCandidate(otherCandidate);
                  setSelectedScenario(otherCandidate.id === "flavio" ? FLAVIO_SCENARIOS[0] : LULA_SCENARIOS[0]);
                }}
                className="text-[11px] bg-white/10 hover:bg-white/20 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-white/15 transition cursor-pointer flex items-center gap-1"
              >
                <span>Alternar para {selectedCandidate.id === "lula" ? "Flávio 22 💛" : "Lula 13 ❤️"}</span>
              </button>
            </div>

            {/* Teaser Borrado da Foto com Cadeado */}
            <div className="w-full rounded-2xl overflow-hidden relative aspect-[16/10] border border-white/15 my-3 bg-black shadow-2xl">
              <img
                src={selectedScenario.image}
                alt="Prévia da montagem"
                className="w-full h-full object-cover filter blur-[6px] brightness-75 scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border-2 border-amber-400/80 backdrop-blur-md flex items-center justify-center shadow-lg shadow-amber-500/30">
                  <Lock className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>

            {/* Headline Principal */}
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug px-1">
              Você está a 1 passo de ver essa lembrança ganhar vida
            </h1>
            <div className="flex items-center justify-center gap-1.5 text-xs text-white/80 mt-1 mb-4">
              <span className="text-amber-400 text-sm">★</span>
              <span className="font-extrabold text-white">4,9/5</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300 font-bold">milhares de eleitores</span>
              <span className="text-white/70">impressionados</span>
            </div>

            {/* Card: FALTA SÓ O PAGAMENTO */}
            <div className="w-full bg-[#131010] border border-red-950/80 rounded-2xl p-4 shadow-2xl relative mb-5">
              <div className="w-full text-center mb-3">
                <span className="inline-block bg-[#4d0b13] border border-red-600/40 text-amber-300 text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md">
                  FALTA SÓ O PAGAMENTO
                </span>
              </div>

              {/* Tabela de Preço */}
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex items-center justify-between text-white/85">
                  <span>Foto com {selectedCandidate.name} em Alta Definição</span>
                  <span className="font-mono">R$ 55,80</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400">
                  <span>Desconto de hoje (50%)</span>
                  <span className="font-mono font-bold">- R$ 27,90</span>
                </div>
                <div className="flex items-center justify-between text-white/50">
                  <span className="flex items-center gap-1">
                    Taxa de serviço
                    <span className="text-[10px] opacity-70">ⓘ</span>
                  </span>
                  <span className="font-mono">R$ 0,00</span>
                </div>
              </div>

              <div className="border-t border-white/10 my-3" />

              {/* Linha Total */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <span className="text-base font-black text-white block leading-tight">Total hoje</span>
                  <span className="text-[10px] text-white/50 block">pagamento único • PIX</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight font-mono">
                  R$ 27,90
                </div>
              </div>

              {/* Botão CTA Laranja */}
              <button
                type="button"
                onClick={() => {
                  setShowContactModal(true);
                  if (!whatsapp || !email) {
                    setModalStage("contact");
                  }
                }}
                className="w-full py-4 px-4 rounded-xl font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-[#ff6b3d] via-[#ff5722] to-[#e64a19] hover:from-[#ff7b50] hover:to-[#f4511e] text-white shadow-xl shadow-orange-600/30 active:scale-98 transition transform cursor-pointer flex items-center justify-center gap-2"
              >
                <span>QUERO MINHA FOTO OFICIAL</span>
              </button>

              <p className="text-[11px] text-white/60 mt-2.5 text-center flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Pagamento seguro via PIX • aprovação na hora</span>
              </p>
            </div>

            {/* O que você recebe */}
            <div className="w-full text-left mb-6 px-1">
              <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <span>✨</span>
                <span>O que você recebe</span>
              </h3>

              <ul className="space-y-2.5 text-xs text-white/90">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-black mt-0.5">✓</span>
                  <span>
                    📸 <strong className="text-white">Foto de você ao lado de {selectedCandidate.name}</strong>, em altíssima resolução
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-black mt-0.5">✓</span>
                  <span>
                    🎵 <strong className="text-white">Sem marca d'água</strong> e pronta para postar no Instagram, WhatsApp e redes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-black mt-0.5">✓</span>
                  <span>
                    📱 <strong className="text-white">Aparece na sua tela em ~2 minutos</strong> (+ cópia no WhatsApp)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-black mt-0.5">✓</span>
                  <span>
                    💳 <strong className="text-white">Pagamento único</strong> — sem mensalidade
                  </span>
                </li>
              </ul>
            </div>

            {/* Garantia de Emoção / Dinheiro de Volta */}
            <div className="w-full text-center my-6 px-2 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#22c55e] to-[#15803d] border-2 border-emerald-300 shadow-xl shadow-emerald-500/30 flex items-center justify-center mb-3">
                <Star className="w-7 h-7 text-white fill-white" />
              </div>

              <h3 className="text-base font-black text-white leading-tight">
                Emoção garantida <br />
                ou seu dinheiro de volta
              </h3>
              <p className="text-[11px] text-white/70 mt-2 max-w-[320px] leading-relaxed">
                Se a sua foto não superar suas expectativas, devolvemos 100% do seu dinheiro em até 14 dias.
              </p>
              <p className="text-[10px] text-white/50 mt-1">
                Sem pegadinha e sem mensalidade. É uma compra única.
              </p>
            </div>

            {/* Amado por milhares de brasileiros */}
            <div className="w-full text-center mt-3 mb-6">
              <div className="flex items-center justify-center gap-1 text-[11px] text-white/70 mb-1">
                <span className="text-amber-400">★</span>
                <span className="font-extrabold text-white">4,9/5</span>
                <span>• milhares de fotos entregues</span>
              </div>
              <h3 className="text-base font-black text-white mb-3">
                Amado por milhares de brasileiros 👇
              </h3>

              <div className="w-full rounded-2xl overflow-hidden border border-amber-400/30 bg-neutral-900/90 shadow-2xl relative">
                <div className="relative aspect-[1024/853] w-full bg-black">
                  <img
                    src={selectedScenario.image}
                    alt={`Exemplo com ${selectedCandidate.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-3.5 bg-black/85 backdrop-blur-md border-t border-white/10 text-left flex items-start justify-between gap-3">
                  <div>
                    <div className="flex text-amber-400 text-xs mb-1">
                      ★★★★★
                    </div>
                    <strong className="text-xs font-bold text-white block">
                      {selectedCandidate.id === "lula" ? "Carlos Eduardo Mendes" : "Marcos Vinícius Silveira"}
                    </strong>
                    <span className="text-[10px] text-white/50 block mb-1">
                      {selectedCandidate.id === "lula" ? "São Paulo - SP" : "Curitiba - PR"}
                    </span>
                    <p className="text-[11px] text-white/80 italic leading-snug">
                      {selectedCandidate.id === "lula"
                        ? '"Ficou muito perfeito! Mandei no grupo da família e todo mundo achou que eu realmente estive com o Lula em Brasília. Parabéns pelo trabalho!"'
                        : '"Sensacional, imagem nítida e muito realista! Todo mundo elogiou no meu WhatsApp parecendo que estive pessoalmente com o Flávio. Recomendo muito!"'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/50 shrink-0">
                    <img
                      src={userPhoto || (selectedCandidate.id === "lula" ? "/lula-13.jpg" : "/flavio-bolsonaro-22.jpg")}
                      alt="Cliente"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Mais Feedbacks Reais de Apoiadores do Candidato */}
              <div className="flex flex-col gap-2.5 mt-3 text-left">
                {(selectedCandidate.id === "lula" ? LULA_REVIEWS : FLAVIO_REVIEWS)
                  .slice(1)
                  .map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-neutral-900/90 border border-white/10 rounded-xl p-3 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.avatar}
                            alt={rev.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <strong className="text-xs font-bold text-white block">
                                {rev.name}
                              </strong>
                              {rev.verified && (
                                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                                  ✓ Verificado
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-white/50 block">
                              {rev.city} • {rev.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex text-amber-400 text-[11px] shrink-0">
                          {"★".repeat(rev.stars)}
                        </div>
                      </div>

                      <p className="text-[11px] text-white/80 leading-relaxed italic">
                        "{rev.text}"
                      </p>

                      {rev.imagePreview && (
                        <div className="mt-2.5 flex items-center gap-2.5 bg-black/50 p-2 rounded-lg border border-white/10">
                          <img
                            src={rev.imagePreview}
                            alt="Montagem"
                            className="w-14 h-11 object-cover rounded border border-white/20 shrink-0"
                          />
                          <div className="text-left">
                            <span className="text-[10px] text-amber-300 font-bold block leading-tight">
                              Montagem oficial entregue
                            </span>
                            <span className="text-[9px] text-white/50 block">
                              Cópia em alta resolução recebida via WhatsApp
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Rodapé institucional */}
            <footer className="mt-4 pt-4 pb-6 text-center text-xs text-white/50 w-full border-t border-white/10 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-4 text-xs text-white/60">
                <a href="#" className="hover:underline">Termos de Uso</a>
                <span>•</span>
                <a href="#" className="hover:underline">Política de Privacidade</a>
              </div>
              <p className="text-[11px] text-white/40">
                Precisa de ajuda? <span className="text-amber-400 font-bold">contato@cliquepolitico.com.br</span>
              </p>
            </footer>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL POPUP: EMAIL, WHATSAPP E PAGAMENTO PIX                              */}
        {/* ========================================================================= */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3.5 animate-in fade-in duration-200">
            <div className="w-full max-w-[400px] bg-neutral-950 border border-white/20 rounded-2xl p-5 shadow-2xl relative text-left max-h-[95vh] overflow-y-auto">
              {/* Botão Fechar */}
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition p-1 rounded-full bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              {modalStage === "contact" ? (
                <div className="flex flex-col">
                  <div className="w-11 h-11 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mb-3">
                    <Phone className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-black text-white leading-tight">
                    Para onde enviamos a sua foto oficial?
                  </h3>
                  <p className="text-xs text-white/70 mt-1 mb-4 leading-relaxed">
                    Você visualiza aqui na tela e ainda recebe uma cópia original sem compressão no seu WhatsApp e e-mail.
                  </p>

                  <div className="flex flex-col gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-white/75 mb-1 block">
                        Seu WhatsApp com DDD:
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => handlePhoneMask(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition font-medium"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-white/75 mb-1 block">
                        Seu melhor e-mail:
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/50 mt-3 flex items-center gap-1.5 leading-tight">
                    <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Seus dados são confidenciais e protegidos pela LGPD.</span>
                  </p>

                  <button
                    disabled={whatsapp.length < 14 || !email.includes("@")}
                    onClick={() => {
                      setModalStage("pix");
                      setPixGenerated(true);
                    }}
                    className={`w-full mt-4 py-4 rounded-xl font-black text-sm tracking-wide transition shadow-lg ${
                      whatsapp.length >= 14 && email.includes("@")
                        ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white active:scale-98 hover:brightness-110 cursor-pointer"
                        : "bg-white/10 text-white/30 cursor-not-allowed"
                    }`}
                  >
                    CONTINUAR PARA PAGAMENTO PIX
                  </button>
                </div>
              ) : (
                /* Modal Stage: PIX */
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-black mb-2">
                    <span>⚡ PIX · APROVAÇÃO INSTANTÂNEA</span>
                  </div>

                  <div className="text-3xl font-black text-white mt-1 font-mono">
                    R$ 27,90
                  </div>
                  <p className="text-[11px] text-white/60 mb-3">
                    Montagem oficial com {selectedCandidate.name}
                  </p>

                  {/* Botão Copiar Código PIX */}
                  <button
                    onClick={handleCopyPix}
                    className={`w-full py-4 px-3 rounded-xl font-black text-sm tracking-wide text-black flex items-center justify-center gap-2 transition cursor-pointer ${
                      pixCopied
                        ? "bg-[#8ff0b3]"
                        : "bg-gradient-to-b from-[#41E877] via-[#25C55B] to-[#17A94B] text-black shadow-lg shadow-green-500/20"
                    }`}
                  >
                    {pixCopied ? (
                      <>
                        <Check className="w-5 h-5 text-black" />
                        <span>CÓDIGO PIX COPIADO! ✓</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        <span>COPIAR CÓDIGO PIX</span>
                      </>
                    )}
                  </button>

                  {/* QR Code */}
                  <div className="bg-white p-2.5 rounded-xl my-3 flex flex-col items-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                        pixCodeString
                      )}`}
                      alt="QR Code Pix"
                      className="w-32 h-32"
                    />
                    <span className="text-[10px] text-black/70 font-semibold mt-1">
                      Aponte a câmera do aplicativo do seu banco
                    </span>
                  </div>

                  {/* Status pulsando */}
                  <div className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5 text-left mb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping shrink-0" />
                    <div className="text-xs leading-tight">
                      <strong className="text-white block">Aguardando pagamento…</strong>
                      <span className="text-[10px] text-white/50">Expira em {formatTime(timeLeft)}</span>
                    </div>
                  </div>

                  {/* Simular para testes */}
                  <button
                    onClick={() => {
                      setShowContactModal(false);
                      handlePaymentConfirmed();
                    }}
                    className="text-xs text-amber-400 underline opacity-85 hover:opacity-100 my-1 cursor-pointer"
                  >
                    ⚡ Simular confirmação (Ver resultado final)
                  </button>

                  {/* Voltar para editar contato */}
                  <button
                    onClick={() => setModalStage("contact")}
                    className="text-[11px] text-white/50 hover:text-white underline mt-1 cursor-pointer"
                  >
                    ← Alterar WhatsApp ({whatsapp}) ou E-mail
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 7: FOTO ENTREGUE / SUCESSO                                            */}
        {/* ========================================================================= */}
        {step === "delivered" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            {!genComplete ? (
              <div className="w-full flex-1 flex flex-col items-center justify-center py-8">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl mb-4 animate-pulse">
                  <img src={selectedScenario.image} alt={selectedCandidate.name} className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">
                  Finalizando sua montagem…
                </h2>
                <p className="text-xs text-amber-400 font-semibold mb-6">
                  ⏱️ leva apenas alguns instantes
                </p>

                <ol className="text-left text-xs space-y-2.5 max-w-[260px] mx-auto">
                  <li className={`flex items-center gap-2 ${genStage >= 1 ? "text-white font-bold" : "text-white/30"}`}>
                    <span className={`w-2 h-2 rounded-full ${genStage >= 1 ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" : "bg-white/20"}`} />
                    Ajustando seu rosto no cenário ({selectedScenario.title})
                  </li>
                  <li className={`flex items-center gap-2 ${genStage >= 2 ? "text-white font-bold" : "text-white/30"}`}>
                    <span className={`w-2 h-2 rounded-full ${genStage >= 2 ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" : "bg-white/20"}`} />
                    Equalizando iluminação, sombras e nitidez
                  </li>
                  <li className={`flex items-center gap-2 ${genStage >= 3 ? "text-white font-bold" : "text-white/30"}`}>
                    <span className={`w-2 h-2 rounded-full ${genStage >= 3 ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" : "bg-white/20"}`} />
                    Gerando arquivo final em alta resolução
                  </li>
                </ol>
              </div>
            ) : (
              <div className="w-full flex-1 flex flex-col items-center animate-in zoom-in-95 duration-500">
                <div className="text-center mb-3">
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                    ✓ Pagamento Confirmado
                  </span>
                  <h1 className="text-2xl font-black text-white mt-2">
                    🎉 Sua foto está pronta!
                  </h1>
                  <p className="text-xs text-white/70 mt-0.5">
                    Enviamos uma cópia também no seu WhatsApp 💛
                  </p>
                </div>

                {/* Exibição da Montagem sem cortes */}
                <div className="w-full rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl relative bg-black aspect-[1024/853] mb-4">
                  <img
                    src={selectedScenario.image}
                    alt="Montagem Pronta"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Botões de Ação */}
                <div className="w-full flex flex-col gap-2.5 mb-6">
                  <a
                    href={selectedScenario.image}
                    download={`minha-foto-com-${selectedCandidate.id}.jpg`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-xl font-black text-sm bg-amber-400 hover:bg-amber-300 text-black shadow-lg flex items-center justify-center gap-2 active:scale-98 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar Foto em Alta Resolução</span>
                  </a>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: `Minha foto com ${selectedCandidate.name}`,
                          url: window.location.href,
                        });
                      } else {
                        alert("Link copiado para compartilhar!");
                      }
                    }}
                    className="w-full py-3 rounded-xl font-bold text-xs bg-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/15 transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartilhar no WhatsApp</span>
                  </button>

                  <button
                    onClick={() => {
                      setStep("candidate");
                      setGenComplete(false);
                      setPixGenerated(false);
                      setUserPhoto(null);
                      setShowContactModal(false);
                      setModalStage("contact");
                    }}
                    className="mt-2 text-xs text-white/50 underline hover:text-white"
                  >
                    Criar outra foto com novo candidato ou cenário
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
