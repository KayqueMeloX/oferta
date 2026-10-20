import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Check,
  Copy,
  Lock,
  ShieldCheck,
  Sparkles,
  Phone,
  Mail,
  Download,
  Share2,
  RefreshCw,
  QrCode,
  FileText,
  ArrowRight,
  ChevronLeft,
  Camera,
  CheckCircle2,
  TrendingUp,
  Flame,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: PoliticalFunnel,
});

type Step = "candidate" | "scenario" | "upload" | "loading" | "contact" | "checkout" | "delivered";

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
    description: "Selfie oficial com Flávio Bolsonaro fazendo o sinal da vitória com a camisa da Seleção.",
    image: "/flavio-cenario-selfie.jpg",
    tag: "Mais Escolhida 🔥",
  },
  {
    id: "flavio-abraco",
    title: "Abraço com Flávio",
    description: "Foto emocionante de abraço fraterno com Flávio Bolsonaro no gabinete.",
    image: "/flavio-cenario-abraco.jpg",
    tag: "Emocionante 💛",
  },
];

// Opções para Lula
const LULA_SCENARIOS: Scenario[] = [
  {
    id: "lula-comicio",
    title: "Selfie no Comício",
    description: "No meio do povo e das bandeiras, estilo selfie espontânea com Lula acenando ao seu lado.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
    tag: "Comício Popular",
  },
  {
    id: "lula-gabinete",
    title: "Gabinete Presidencial",
    description: "Sentados lado a lado na mesa oficial de reuniões e despachos em Brasília.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80",
    tag: "Formal & Oficial",
  },
];

function PoliticalFunnel() {
  const [step, setStep] = useState<Step>("candidate");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(CANDIDATES[0]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(LULA_SCENARIOS[0]);

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

  // Checkout
  const [plan, setPlan] = useState<"single" | "pack3">("pack3");
  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Delivered animation
  const [genStage, setGenStage] = useState(1);
  const [genComplete, setGenComplete] = useState(false);

  // Cenários ativos de acordo com o candidato selecionado
  const activeScenarios = selectedCandidate.id === "flavio" ? FLAVIO_SCENARIOS : LULA_SCENARIOS;

  // Cronômetro
  useEffect(() => {
    if (step === "checkout" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

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
                setTimeout(() => setStep("contact"), 500);
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

  const currentPrice = plan === "single" ? 19.9 : 29.9;
  const pixCodeString = `00020126580014br.gov.bcb.pix0136clique-${selectedCandidate.id}-${Date.now().toString(36)}5204000053039865405${currentPrice.toFixed(2)}5802BR5920FOTO POLITICA AI6009SAO PAULO62070503***6304`;

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCodeString);
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
                    Sua foto é gerada em segundos com IA realista e conta automaticamente no placar do dia.
                  </span>
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
                {selectedCandidate.id === "flavio"
                  ? "Selecione uma das duas montagens oficiais abaixo:"
                  : "Toque no ambiente onde você quer aparecer ao lado dele:"}
              </p>

              {/* Grade com exatamente as 2 opções para Flávio */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {activeScenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setSelectedScenario(sc);
                      setStep("upload");
                    }}
                    className="relative group rounded-2xl overflow-hidden border-2 border-white/20 bg-neutral-950 aspect-[3/4.2] flex flex-col justify-end text-left transition-all active:scale-95 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/20 focus:outline-none focus:ring-4 focus:ring-amber-400"
                  >
                    <img
                      src={sc.image}
                      alt={sc.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                    <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-xs text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-md border border-amber-400/40">
                      {sc.tag}
                    </div>

                    <div className="relative p-2.5 z-10">
                      <strong className="text-xs font-black text-white block leading-tight">
                        {sc.title}
                      </strong>
                      <span className="text-[10px] text-white/70 block mt-0.5 line-clamp-2">
                        {sc.description}
                      </span>
                      <div className="mt-2 w-full py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-[11px] text-center shadow-md">
                        ESCOLHER ESTA
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
                Envie uma foto de rosto ou selfie. A IA vai colocar o seu rosto perfeitamente na montagem escolhida (
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
                <span>🔒</span> Suas fotos são usadas estritamente para criar a sua montagem com IA.
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
        {/* ABA 5: CONTATO (WHATSAPP E E-MAIL)                                        */}
        {/* ========================================================================= */}
        {step === "contact" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mb-3">
                <Phone className="w-6 h-6" />
              </div>

              <h1 className="text-2xl font-black tracking-tight leading-snug">
                Para onde enviamos a sua <span className="text-amber-400">foto oficial</span>?
              </h1>
              <p className="text-xs text-white/70 mt-1 mb-5">
                Você visualiza aqui na hora e ainda recebe uma cópia sem compressão no WhatsApp.
              </p>

              <div className="w-full flex flex-col gap-3">
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => handlePhoneMask(e.target.value)}
                    placeholder="Seu WhatsApp com DDD (Ex: 11 99999-9999)"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition"
                  />
                </div>
              </div>

              <p className="text-xs text-white/60 mt-3 text-left leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                🔒 Seus dados são confidenciais e usados exclusivamente para entregar o arquivo em alta resolução.
              </p>
            </div>

            <div className="w-full pt-4">
              <button
                disabled={whatsapp.length < 14 || !email}
                onClick={() => setStep("checkout")}
                className={`w-full py-4 rounded-xl font-black text-base tracking-wide transition shadow-lg ${
                  whatsapp.length >= 14 && email
                    ? `${selectedCandidate.colorTheme.btnBg} text-white active:scale-98`
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                Continuar para Pagamento
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ABA 6: CHECKOUT / PAGAMENTO PIX                                           */}
        {/* ========================================================================= */}
        {step === "checkout" && (
          <div className="w-full flex-1 flex flex-col items-center justify-start text-center animate-in fade-in duration-300">
            {/* Faixa de Desconto */}
            <div className="w-full bg-amber-400/10 border border-amber-400/30 text-amber-400 py-2 px-3 rounded-xl text-xs font-bold mb-3 flex items-center justify-center gap-1.5">
              <span>🎁 50% OFF aplicado · expira em</span>
              <strong className="text-white font-mono text-sm">{formatTime(timeLeft)}</strong>
            </div>

            {/* Teaser Borrado da Foto com Cadeado */}
            <div className="w-full rounded-2xl overflow-hidden relative aspect-[16/9] border border-white/10 mb-3 bg-black">
              <img
                src={selectedScenario.image}
                alt="Teaser da montagem"
                className="w-full h-full object-cover filter blur-[5px] brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-xl backdrop-blur-md">
                  🔒
                </div>
              </div>
            </div>

            <span className="text-[11px] font-extrabold tracking-widest text-amber-400 uppercase">
              FALTA SÓ O PAGAMENTO
            </span>
            <h1 className="text-xl font-black tracking-tight leading-snug mt-0.5">
              Sua foto com {selectedCandidate.name} está pronta!
            </h1>

            {/* Card de Escolha de Pacote */}
            <div className="w-full bg-white/5 border border-white/15 rounded-2xl p-4 text-left my-4 shadow-xl">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => setPlan("single")}
                  className={`p-3 rounded-xl border text-left transition ${
                    plan === "single"
                      ? "border-amber-400 bg-amber-400/10"
                      : "border-white/10 bg-black/40 hover:border-white/20"
                  }`}
                >
                  <span className="text-[10px] text-white/60 block">1 FOTO</span>
                  <span className="text-lg font-black text-white">R$ 19,90</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPlan("pack3")}
                  className={`p-3 rounded-xl border text-left transition relative ${
                    plan === "pack3"
                      ? "border-amber-400 bg-amber-400/15"
                      : "border-white/10 bg-black/40 hover:border-white/20"
                  }`}
                >
                  <span className="absolute -top-2 right-2 bg-amber-400 text-black text-[9px] font-black px-1.5 py-0.5 rounded">
                    MAIS POPULAR
                  </span>
                  <span className="text-[10px] text-white/60 block">3 FOTOS</span>
                  <span className="text-lg font-black text-amber-400">R$ 29,90</span>
                </button>
              </div>

              {!pixGenerated ? (
                <div>
                  <button
                    onClick={() => setPixGenerated(true)}
                    className={`w-full py-4 rounded-xl font-black text-sm tracking-wide ${selectedCandidate.colorTheme.btnBg} text-white shadow-xl active:scale-98 transition`}
                  >
                    GERAR PIX DE R$ {currentPrice.toFixed(2).replace(".", ",")}
                  </button>
                  <p className="text-center text-[11px] text-white/60 mt-2">
                    ⚡ Aprovação imediata via Pix • Sem mensalidade
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                  <div className="text-center">
                    <span className="text-xs text-amber-400 font-bold">⚡ PIX · aprovação imediata</span>
                    <div className="text-3xl font-black text-white mt-1">
                      R$ {currentPrice.toFixed(2).replace(".", ",")}
                    </div>
                    <p className="text-[11px] text-white/60">
                      Montagem com {selectedCandidate.name} ({selectedScenario.title})
                    </p>
                  </div>

                  {/* Botão Copiar PIX */}
                  <button
                    onClick={handleCopyPix}
                    className={`w-full py-4 px-3 rounded-xl font-black text-sm tracking-wide text-black flex items-center justify-center gap-2 transition ${
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
                        <span>COPIAR CÓDIGO E PAGAR</span>
                      </>
                    )}
                  </button>

                  {/* QR Code Opcional */}
                  <div className="bg-white p-3 rounded-xl mx-auto flex flex-col items-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                        pixCodeString
                      )}`}
                      alt="QR Code Pix"
                      className="w-32 h-32"
                    />
                    <span className="text-[10px] text-black/70 font-semibold mt-1">
                      Aponte a câmera do seu banco
                    </span>
                  </div>

                  {/* Status pulsante */}
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                    <div className="text-left text-xs leading-tight">
                      <strong className="text-white block">Aguardando confirmação do pagamento…</strong>
                      <span className="text-[11px] text-white/50">Você não precisa fazer mais nada</span>
                    </div>
                  </div>

                  {/* Botão de Teste / Simulação */}
                  <button
                    onClick={handlePaymentConfirmed}
                    className="mt-2 text-xs text-amber-400 underline opacity-80 hover:opacity-100"
                  >
                    ⚡ Simular confirmação (Ver resultado final)
                  </button>
                </div>
              )}
            </div>

            {/* O que você recebe */}
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left mb-4">
              <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>O que está incluído:</span>
              </h3>
              <ul className="text-xs text-white/80 space-y-1.5">
                <li>• Foto em altíssima resolução para redes e impressão</li>
                <li>• Envio imediato no seu WhatsApp e e-mail</li>
                <li>• Iluminação realista ajustada com o candidato</li>
                <li>• Pagamento único — sem pegadinhas nem assinaturas</li>
              </ul>
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

                {/* Exibição da Montagem */}
                <div className="w-full rounded-2xl overflow-hidden border-2 border-amber-400/50 shadow-2xl relative bg-black aspect-[3/3.8] mb-4">
                  <img
                    src={selectedScenario.image}
                    alt="Montagem Pronta"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-md border border-white/20">
                    🤖 Imagem fictícia gerada por IA
                  </div>
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
