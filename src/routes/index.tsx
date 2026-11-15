import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sparkles,
  Star,
  Lock,
  Check,
  Copy,
  Phone,
  Mail,
  Download,
  Share2,
  ChevronRight,
  ChevronLeft,
  Heart,
  ShieldCheck,
  Clock,
  Compass,
  X,
  ChevronDown,
  Calendar,
  User,
  Eye,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: TinaAldeaSoulmateFunnel,
});

type Step = "hero" | "quiz" | "loading" | "offer" | "delivered";
type Gender = "woman" | "man" | "other";
type TargetGender = "man" | "woman" | "both";

interface Testimonial {
  id: string;
  name: string;
  age: number;
  city: string;
  timeAgo: string;
  stars: number;
  story: string;
  avatar: string;
  sketchThumb: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Juliana Bittencourt",
    age: 29,
    city: "Belo Horizonte, MG",
    timeAgo: "Há 3 dias",
    stars: 5,
    story:
      "Eu estava muito cética, mas quando recebi o desenho no meu WhatsApp fiquei paralisada. Dois meses depois, conheci o Lucas numa cafeteria. Ele tinha EXATAMENTE o mesmo sorriso e o corte de cabelo do desenho da Tina. Hoje estamos noivos!",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    sketchThumb: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: "t2",
    name: "Rodrigo Vasconcelos",
    age: 34,
    city: "São Paulo, SP",
    timeAgo: "Há 1 semana",
    stars: 5,
    story:
      "A precisão da descrição de personalidade me chocou mais ainda que o desenho. A Tina descreveu os hábitos, o jeito doce e a profissão dela. Conheci a Camila no trabalho 3 semanas depois. É surreal a conexão que sentimos.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    sketchThumb: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: "t3",
    name: "Camila Guimarães",
    age: 31,
    city: "Florianópolis, SC",
    timeAgo: "Há 4 dias",
    stars: 5,
    story:
      "Tinha acabado de sair de uma relação desgastante e não acreditava mais no amor. O desenho da Tina me deu uma paz inexplicável e renovou minhas esperanças. Quando bati o olho no Rafael no aeroporto, reconheci na hora!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
    sketchThumb: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
  },
  {
    id: "t4",
    name: "Marcio Esteves",
    age: 38,
    city: "Curitiba, PR",
    timeAgo: "Há 2 semanas",
    stars: 5,
    story:
      "Entrega rápida de verdade no WhatsApp. A riqueza de detalhes a lápis é uma verdadeira obra de arte. Vale cada centavo pela clareza e emoção que transmite.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
    sketchThumb: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=200&auto=format&fit=crop&q=80",
  },
];

const FAQS = [
  {
    q: "Como Tina Aldea consegue desenhar a minha alma gêmea?",
    a: "Tina nasceu com um dom natural de vidência artística e clarividência. Ao conectar sua data de nascimento, nome e energia astral, ela sintoniza a frequência cósmica da pessoa predestinada a você e canaliza visualmente cada detalhe a lápis em papel no seu ateliê.",
  },
  {
    q: "Em quanto tempo recebo meu desenho e leitura?",
    a: "Seu desenho hiper-realista em alta resolução e o dossiê psíquico completo são entregues diretamente no seu WhatsApp e e-mail em até 24 horas (geralmente bem antes). Você já pode visualizar a prévia instantaneamente aqui na tela logo após a confirmação.",
  },
  {
    q: "E se eu já conhecer a pessoa do desenho?",
    a: "Isso acontece com frequência! Muitas pessoas descobrem que sua alma gêmea já é um amigo próximo, alguém do passado ou um conhecido que ainda não haviam enxergado sob essa luz espiritual.",
  },
  {
    q: "O pagamento é único ou assinatura mensal?",
    a: "É um pagamento 100% ÚNICO de R$ 27,90 via PIX. Sem assinaturas, sem cobranças recorrentes e sem taxas escondidas.",
  },
  {
    q: "E se eu não ficar satisfeita(o)? Tem garantia?",
    a: "Sim! Você conta com a Garantia Blindada Incondicional de 30 dias de Tina Aldea. Se por qualquer motivo você não se sentir tocada(o) pela precisão ou beleza do seu desenho, basta nos enviar um e-mail que devolvemos 100% do seu dinheiro sem perguntas.",
  },
];

function getZodiacSign(day: number, month: number) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: "Áries", symbol: "♈", element: "Fogo" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: "Touro", symbol: "♉", element: "Terra" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: "Gêmeos", symbol: "♊", element: "Ar" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: "Câncer", symbol: "♋", element: "Água" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: "Leão", symbol: "♌", element: "Fogo" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: "Virgem", symbol: "♍", element: "Terra" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: "Libra", symbol: "♎", element: "Ar" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: "Escorpião", symbol: "♏", element: "Água" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: "Sagitário", symbol: "♐", element: "Fogo" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: "Capricórnio", symbol: "♑", element: "Terra" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: "Aquário", symbol: "♒", element: "Ar" };
  return { name: "Peixes", symbol: "♓", element: "Água" };
}

function TinaAldeaSoulmateFunnel() {
  const [step, setStep] = useState<Step>("hero");

  // Quiz State
  const [quizStep, setQuizStep] = useState<number>(1);
  const [gender, setGender] = useState<Gender>("woman");
  const [targetGender, setTargetGender] = useState<TargetGender>("man");
  const [userName, setUserName] = useState<string>("");
  const [birthDay, setBirthDay] = useState<string>("15");
  const [birthMonth, setBirthMonth] = useState<string>("6");
  const [birthYear, setBirthYear] = useState<string>("1996");
  const [loveStatus, setLoveStatus] = useState<string>("single");

  // Contact State
  const [whatsapp, setWhatsapp] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Loading animation state
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadStage, setLoadStage] = useState<number>(1);

  // Checkout PIX State
  const [showPixModal, setShowPixModal] = useState<boolean>(false);
  const [pixCopied, setPixCopied] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Live count counter simulation
  const [livePeople, setLivePeople] = useState<number>(142);

  useEffect(() => {
    const interval = setInterval(() => {
      setLivePeople((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(128, Math.min(165, prev + delta));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Timer regressivo do checkout
  useEffect(() => {
    if ((step === "offer" || showPixModal) && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [step, showPixModal, timeLeft]);

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

  const zodiac = getZodiacSign(parseInt(birthDay) || 1, parseInt(birthMonth) || 1);

  // Simulação de Loading Místico
  const startLoadingAnimation = () => {
    setStep("loading");
    setLoadProgress(0);
    setLoadStage(1);

    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        const next = prev + 3;
        if (next >= 35 && next < 70) setLoadStage(2);
        if (next >= 70 && next < 95) setLoadStage(3);
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("offer"), 600);
          return 100;
        }
        return next;
      });
    }, 80);
  };

  const currentPrice = 27.9;
  const pixCodeString = `00020126580014br.gov.bcb.pix0136tina-aldea-soulmate-${Date.now().toString(36)}5204000053039865405${currentPrice.toFixed(2)}5802BR5920TINA ALDEA SKETCH6009SAO PAULO62070503***6304`;

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
      // fallback
    }
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  // Imagem do desenho de acordo com quem o usuário procura
  const sketchImage =
    targetGender === "woman"
      ? "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=900&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80";

  return (
    <div className="min-h-screen bg-[#080612] text-white flex flex-col items-center justify-between font-sans selection:bg-purple-500 selection:text-white relative overflow-hidden">
      {/* Luz ambiente cósmica */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-purple-900/25 via-violet-950/15 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-[300px] h-[300px] bg-amber-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Top Banner de Urgência & Prova Social */}
      <header className="w-full bg-[#120c22] border-b border-purple-500/20 py-2 px-3 text-center text-xs flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
        <span className="text-purple-200/90 text-[11px] sm:text-xs">
          <strong>Tina Aldea</strong> • Retratista Psíquica Oficial •{" "}
          <span className="text-amber-300 font-bold">{livePeople} pessoas</span> consultando seu destino agora
        </span>
      </header>

      {/* Container Principal Mobile-First */}
      <main className="w-full max-w-[480px] px-3.5 py-4 flex-1 flex flex-col items-center justify-between min-h-screen">
        {/* ========================================================================= */}
        {/* ETAPA 1: HERO & APRESENTAÇÃO                                              */}
        {/* ========================================================================= */}
        {step === "hero" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              {/* Badge mística */}
              <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-900/40 via-amber-500/20 to-purple-900/40 border border-purple-500/40 text-amber-300 px-3.5 py-1 rounded-full text-[11px] font-black mb-3 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>CANALIZAÇÃO ENERGÉTICA E VIDÊNCIA REAL</span>
              </div>

              {/* Título Principal */}
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight font-cinzel">
                Descubra o Rosto da Sua <br />
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
                  Verdadeira Alma Gêmea
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-purple-200/80 mt-2.5 mb-4 leading-relaxed max-w-[420px]">
                A vidente e artista psíquica mundialmente reconhecida <strong>Tina Aldea</strong> sintoniza sua vibração cósmica para desenhar à mão o retrato detalhado do seu futuro amor.
              </p>

              {/* Retrato Hero em Moldura Mística */}
              <div className="w-full relative rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-2xl shadow-purple-900/40 bg-black/60 my-2 aspect-[16/10] group">
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&auto=format&fit=crop&q=80"
                  alt="Tina Aldea desenhando alma gêmea"
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-amber-300 text-[10px] font-black px-2.5 py-1 rounded-md border border-amber-400/40 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>+37.000 Casais Conectados</span>
                </div>

                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/85 backdrop-blur-md p-2.5 rounded-xl border border-white/10 text-left">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    Por Tina Aldea
                  </span>
                  <p className="text-xs font-semibold text-white/95 leading-tight">
                    "O destino não comete erros. Quando você vê o rosto certo, sua alma reconhece instantaneamente."
                  </p>
                </div>
              </div>

              {/* 3 Pilares */}
              <div className="grid grid-cols-3 gap-2 w-full my-4">
                <div className="bg-purple-950/40 border border-purple-500/20 p-2.5 rounded-xl text-center">
                  <Compass className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-[10px] text-white/90 font-bold block">100% Preciso</span>
                  <span className="text-[9px] text-white/50">Canalização astral</span>
                </div>
                <div className="bg-purple-950/40 border border-purple-500/20 p-2.5 rounded-xl text-center">
                  <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span className="text-[10px] text-white/90 font-bold block">Em 24 Horas</span>
                  <span className="text-[9px] text-white/50">Direto no WhatsApp</span>
                </div>
                <div className="bg-purple-950/40 border border-purple-500/20 p-2.5 rounded-xl text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span className="text-[10px] text-white/90 font-bold block">Garantia Total</span>
                  <span className="text-[9px] text-white/50">30 dias sem riscos</span>
                </div>
              </div>

              {/* Botão Principal de Início do Funil */}
              <button
                type="button"
                onClick={() => {
                  setStep("quiz");
                  setQuizStep(1);
                }}
                className="w-full py-4 px-4 rounded-xl font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/25 active:scale-98 transition transform cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <span>VER O ROSTO DA MINHA ALMA GÊMEA</span>
                <ChevronRight className="w-5 h-5 text-slate-950" />
              </button>
              <p className="text-[10px] text-white/50 mt-2">
                Levará menos de 60 segundos para sintonizar sua energia
              </p>
            </div>

            <footer className="mt-6 pt-3 pb-2 text-center text-xs text-white/40 w-full border-t border-white/10">
              <p className="text-[11px]">
                Tina Aldea • Psychic & Soulmate Sketch Artist © {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ETAPA 2: QUIZ INTERATIVO MULTI-STEP                                       */}
        {/* ========================================================================= */}
        {step === "quiz" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              {/* Barra de Progresso do Quiz */}
              <div className="w-full flex items-center justify-between text-xs text-purple-300 font-bold mb-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (quizStep > 1) setQuizStep((s) => s - 1);
                    else setStep("hero");
                  }}
                  className="flex items-center gap-1 text-[11px] text-amber-400 hover:underline"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
                <span>Passo {quizStep} de 5</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-5">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all duration-300"
                  style={{ width: `${(quizStep / 5) * 100}%` }}
                />
              </div>

              {/* PERGUNTA 1: SEU GÊNERO */}
              {quizStep === 1 && (
                <div className="w-full flex flex-col items-center animate-in fade-in">
                  <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase mb-1">
                    Passo 1 · Polaridade Energética
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel mb-2">
                    Qual é o seu gênero?
                  </h2>
                  <p className="text-xs text-purple-200/70 mb-5">
                    Isso ajuda Tina a calibrar o fluxo de energia receptiva ou magnética.
                  </p>

                  <div className="flex flex-col gap-3 w-full">
                    {[
                      { val: "woman", label: "Eu sou Mulher", icon: "👩" },
                      { val: "man", label: "Eu sou Homem", icon: "👨" },
                      { val: "other", label: "Não-binário / Outro", icon: "✨" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setGender(opt.val as Gender);
                          setQuizStep(2);
                        }}
                        className={`w-full py-4 px-4 rounded-xl border text-left flex items-center justify-between text-sm sm:text-base font-bold transition active:scale-98 cursor-pointer ${
                          gender === opt.val
                            ? "bg-purple-900/40 border-amber-400 text-white shadow-lg shadow-purple-900/30"
                            : "bg-neutral-900/80 border-white/15 text-white/80 hover:border-purple-400"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-2xl">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-amber-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PERGUNTA 2: QUEM PROCURA */}
              {quizStep === 2 && (
                <div className="w-full flex flex-col items-center animate-in fade-in">
                  <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase mb-1">
                    Passo 2 · Sintonia do Coração
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel mb-2">
                    Quem você procura no amor?
                  </h2>
                  <p className="text-xs text-purple-200/70 mb-5">
                    Tina visualizará a essência facial compatível com o seu desejo.
                  </p>

                  <div className="flex flex-col gap-3 w-full">
                    {[
                      { val: "man", label: "Estou em busca de um Homem", icon: "👨" },
                      { val: "woman", label: "Estou em busca de uma Mulher", icon: "👩" },
                      { val: "both", label: "Aberto(a) ao Destino", icon: "💞" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setTargetGender(opt.val as TargetGender);
                          setQuizStep(3);
                        }}
                        className={`w-full py-4 px-4 rounded-xl border text-left flex items-center justify-between text-sm sm:text-base font-bold transition active:scale-98 cursor-pointer ${
                          targetGender === opt.val
                            ? "bg-purple-900/40 border-amber-400 text-white shadow-lg shadow-purple-900/30"
                            : "bg-neutral-900/80 border-white/15 text-white/80 hover:border-purple-400"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-2xl">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-amber-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PERGUNTA 3: NOME E DATA DE NASCIMENTO (SIGNO ZODIACAL AUTOMÁTICO) */}
              {quizStep === 3 && (
                <div className="w-full flex flex-col items-center animate-in fade-in">
                  <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase mb-1">
                    Passo 3 · Mapa Astral
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel mb-2">
                    Seus dados espirituais
                  </h2>
                  <p className="text-xs text-purple-200/70 mb-4">
                    Seu nome e data ativam a vibração astrológica exata da sua alma gêmea.
                  </p>

                  <div className="w-full flex flex-col gap-3.5 text-left">
                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1">
                        Seu primeiro nome:
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Ex: Beatriz ou Rafael"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1">
                        Sua data de nascimento:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Dia */}
                        <div>
                          <select
                            value={birthDay}
                            onChange={(e) => setBirthDay(e.target.value)}
                            className="w-full py-3 px-2 rounded-xl bg-[#161226] border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
                          >
                            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                              <option key={d} value={d}>
                                Dia {d}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Mês */}
                        <div>
                          <select
                            value={birthMonth}
                            onChange={(e) => setBirthMonth(e.target.value)}
                            className="w-full py-3 px-2 rounded-xl bg-[#161226] border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
                          >
                            {[
                              "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
                              "Jul", "Ago", "Set", "Out", "Nov", "Dez"
                            ].map((m, idx) => (
                              <option key={m} value={idx + 1}>
                                {m}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Ano */}
                        <div>
                          <select
                            value={birthYear}
                            onChange={(e) => setBirthYear(e.target.value)}
                            className="w-full py-3 px-2 rounded-xl bg-[#161226] border border-white/20 text-white text-xs font-semibold focus:outline-none focus:border-amber-400"
                          >
                            {Array.from({ length: 70 }, (_, i) => 2006 - i).map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Card de Validação Astrológica em Tempo Real */}
                    <div className="bg-gradient-to-r from-purple-950/80 to-amber-950/50 border border-amber-400/30 rounded-xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{zodiac.symbol}</span>
                        <div>
                          <span className="text-xs font-black text-amber-300 block">
                            Signo Solar: {zodiac.name}
                          </span>
                          <span className="text-[10px] text-white/60">
                            Elemento {zodiac.element} • Frequência identificada
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold px-2 py-0.5 rounded border border-amber-400/40">
                        Ativado
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={!userName.trim()}
                      onClick={() => setQuizStep(4)}
                      className={`w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition shadow-lg mt-2 cursor-pointer ${
                        userName.trim()
                          ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 active:scale-98"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                    >
                      CONTINUAR
                    </button>
                  </div>
                </div>
              )}

              {/* PERGUNTA 4: STATUS AMOROSO ATUAL */}
              {quizStep === 4 && (
                <div className="w-full flex flex-col items-center animate-in fade-in">
                  <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase mb-1">
                    Passo 4 · Momento Cósmico
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel mb-2">
                    Como está sua vida amorosa hoje?
                  </h2>
                  <p className="text-xs text-purple-200/70 mb-5">
                    Ajuda Tina a entender o tempo cósmico do seu reencontro de almas.
                  </p>

                  <div className="flex flex-col gap-2.5 w-full">
                    {[
                      { val: "single", label: "Solteira(o) e pronta(o) para o verdadeiro amor", icon: "✨" },
                      { val: "complicated", label: "Em um relacionamento com dúvidas", icon: "🌪️" },
                      { val: "separated", label: "Recém-separada(o) querendo recomeçar", icon: "🕊️" },
                      { val: "curious", label: "Apenas curiosa(o) para ver quem o destino escolheu", icon: "🔮" },
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        type="button"
                        onClick={() => {
                          setLoveStatus(opt.val);
                          setQuizStep(5);
                        }}
                        className={`w-full py-3.5 px-4 rounded-xl border text-left flex items-center justify-between text-xs sm:text-sm font-bold transition active:scale-98 cursor-pointer ${
                          loveStatus === opt.val
                            ? "bg-purple-900/40 border-amber-400 text-white shadow-lg shadow-purple-900/30"
                            : "bg-neutral-900/80 border-white/15 text-white/80 hover:border-purple-400"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-xl">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-amber-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PERGUNTA 5: ONDE RECEBER O DESENHO (WHATSAPP E E-MAIL) */}
              {quizStep === 5 && (
                <div className="w-full flex flex-col items-center animate-in fade-in">
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 fill-amber-400" />
                  </div>

                  <span className="text-[11px] font-extrabold tracking-wider text-amber-400 uppercase mb-1">
                    Último Passo · Canal de Entrega
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel mb-1">
                    Para onde Tina enviará seu desenho?
                  </h2>
                  <p className="text-xs text-purple-200/70 mb-4">
                    Você visualizará a revelação aqui na hora e receberá o arquivo original em alta resolução.
                  </p>

                  <div className="w-full flex flex-col gap-3 text-left">
                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1">
                        Seu WhatsApp com DDD:
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="tel"
                          value={whatsapp}
                          onChange={(e) => handlePhoneMask(e.target.value)}
                          placeholder="(11) 99999-9999"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-white/80 block mb-1">
                        Seu melhor e-mail:
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 transition"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-white/50 flex items-center gap-1.5 leading-tight mt-1">
                      <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Seus dados são confidenciais e protegidos por sigilo espiritual e LGPD.</span>
                    </p>

                    <button
                      type="button"
                      disabled={whatsapp.length < 14 || !email.includes("@")}
                      onClick={startLoadingAnimation}
                      className={`w-full py-4 rounded-xl font-black text-sm tracking-wide transition shadow-xl mt-3 cursor-pointer ${
                        whatsapp.length >= 14 && email.includes("@")
                          ? "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 active:scale-98 hover:brightness-110"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                    >
                      CANALIZAR E DESENHAR MINHA ALMA GÊMEA ✨
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ETAPA 3: LOADING MÍSTICO COM BARRAS CÓSMICAS                              */}
        {/* ========================================================================= */}
        {step === "loading" && (
          <div className="w-full flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-300 py-8">
            {/* Círculo Astral Pulsando */}
            <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin" style={{ animationDuration: "10s" }} />
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-400/60 animate-spin" style={{ animationDuration: "6s", animationDirection: "reverse" }} />
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-900 to-amber-950 flex items-center justify-center shadow-2xl shadow-purple-900/50">
                <Sparkles className="w-10 h-10 text-amber-300 animate-pulse" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white font-cinzel mb-1">
              Conectando com sua Alma Gêmea…
            </h2>
            <p className="text-xs text-purple-200/80 mb-6 max-w-[320px]">
              Tina Aldea está sintonizando sua frequência de {zodiac.name} ({zodiac.symbol}) e traçando os contornos a lápis
            </p>

            <div className="w-full max-w-[340px] flex flex-col gap-3 text-left">
              <div className="flex justify-between text-xs font-bold text-white/80">
                <span>
                  {loadStage === 1 && "1/3 Sintonizando conexão cósmica..."}
                  {loadStage === 2 && "2/3 Mapeando traços faciais e olhar..."}
                  {loadStage === 3 && "3/3 Concluindo o retrato a lápis em alta resolução..."}
                </span>
                <span className="text-amber-400 font-mono">{loadProgress}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/10 shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-amber-400 to-yellow-300 rounded-full transition-all duration-100 shadow-md"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>

              <div className="bg-purple-950/40 border border-purple-500/20 p-2.5 rounded-xl text-left mt-3">
                <p className="text-[11px] text-purple-200/90 leading-tight">
                  🔮 <strong>Visão captada:</strong> O destino preparou alguém com traços marcantes e alta compatibilidade energética com você, {userName || "querida(o)"}!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ETAPA 4: ABA DE OFERTA / REVELAÇÃO COM CADEADO E CHECKOUT                   */}
        {/* ========================================================================= */}
        {step === "offer" && (
          <div className="w-full flex-1 flex flex-col items-center justify-start text-center animate-in fade-in duration-300">
            {/* Faixa Superior 65% OFF */}
            <div className="w-full bg-gradient-to-r from-purple-950 via-[#4d0b13] to-purple-950 text-amber-300 py-1.5 px-3 rounded-t-xl text-center text-xs font-black tracking-wide border-b border-amber-500/30 shadow-inner">
              🎁 65% OFF APLICADO · OFERTA DE CANALIZAÇÃO EXCLUSIVA HOJE
            </div>

            {/* Teaser do Retrato Desenhado com Cadeado Dourado */}
            <div className="w-full rounded-2xl overflow-hidden relative aspect-[16/11] border-2 border-amber-400/50 my-3 bg-black shadow-2xl shadow-purple-900/40">
              <img
                src={sketchImage}
                alt="Retrato da alma gêmea"
                className="w-full h-full object-cover filter blur-[9px] brightness-75 scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border-2 border-amber-400 backdrop-blur-md flex items-center justify-center shadow-xl shadow-amber-500/40 mb-2 animate-bounce" style={{ animationDuration: "3s" }}>
                  <Lock className="w-7 h-7 text-amber-300" />
                </div>
                <span className="text-xs font-black text-white bg-black/80 px-3 py-1 rounded-full border border-amber-400/50">
                  RETRATO CONCLUÍDO E BLOQUEADO
                </span>
                <span className="text-[10px] text-amber-300 font-semibold mt-1">
                  Desbloqueie para visualizar em alta resolução sem marcas d'água
                </span>
              </div>
            </div>

            {/* Headline Principal da Oferta */}
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug font-cinzel px-1">
              O Retrato da Sua Alma Gêmea Foi Canalizado com Sucesso!
            </h1>
            <div className="flex items-center justify-center gap-1.5 text-xs text-white/80 mt-1 mb-4">
              <span className="text-amber-400 text-sm">★</span>
              <span className="font-extrabold text-white">4,9/5</span>
              <span className="text-white/40">•</span>
              <span className="text-amber-300 font-bold">Mais de 37.000 pessoas</span>
              <span className="text-white/70">já encontraram seu amor</span>
            </div>

            {/* CARD: FALTA SÓ O PAGAMENTO / TABELA DE VALOR */}
            <div className="w-full bg-[#110d20] border border-purple-500/30 rounded-2xl p-4 shadow-2xl relative mb-5 text-left">
              <div className="w-full text-center mb-3">
                <span className="inline-block bg-gradient-to-r from-purple-900 to-amber-900/60 border border-amber-500/40 text-amber-300 text-[10px] font-black tracking-widest px-3.5 py-1 rounded-full uppercase shadow-md">
                  FALTA SÓ O DESBLOQUEIO
                </span>
              </div>

              {/* Tabela de Preço */}
              <div className="space-y-1.5 text-xs font-semibold">
                <div className="flex items-center justify-between text-white/85">
                  <span>Desenho Hiper-realista a Lápis da Alma Gêmea</span>
                  <span className="font-mono text-white/60 line-through">R$ 97,00</span>
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span>Dossiê Psíquico & Mapa de Personalidade</span>
                  <span className="font-mono text-white/60 line-through">R$ 49,00</span>
                </div>
                <div className="flex items-center justify-between text-white/85">
                  <span>Previsão de Quando e Onde Vocês Vão Se Conhecer</span>
                  <span className="font-mono text-white/60 line-through">R$ 39,00</span>
                </div>
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span>Desconto Especial de Hoje (65% OFF)</span>
                  <span className="font-mono">- R$ 157,10</span>
                </div>
                <div className="flex items-center justify-between text-white/50 text-[11px]">
                  <span>Taxa de processamento espiritual</span>
                  <span className="font-mono">R$ 0,00</span>
                </div>
              </div>

              <div className="border-t border-white/10 my-3" />

              {/* Linha Total */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-base font-black text-white block leading-tight font-cinzel">Total Hoje</span>
                  <span className="text-[10px] text-purple-300/70 block">pagamento único • via PIX • sem mensalidade</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight font-mono">
                  R$ 27,90
                </div>
              </div>

              {/* Botão CTA Principal */}
              <button
                type="button"
                onClick={() => setShowPixModal(true)}
                className="w-full py-4 px-4 rounded-xl font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/30 active:scale-98 transition transform cursor-pointer flex items-center justify-center gap-2"
              >
                <Eye className="w-5 h-5 text-slate-950" />
                <span>DESBLOQUEAR MEU DESENHO AGORA</span>
              </button>

              <p className="text-[11px] text-white/60 mt-2.5 text-center flex items-center justify-center gap-1.5 font-medium">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Pagamento seguro via PIX • Liberação imediata na tela</span>
              </p>
            </div>

            {/* O que você recebe */}
            <div className="w-full text-left mb-6 px-1">
              <h3 className="text-sm font-black text-white mb-3 flex items-center gap-2 font-cinzel">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>O que está incluído no seu pacote oficial:</span>
              </h3>

              <ul className="space-y-3 text-xs text-white/90">
                <li className="flex items-start gap-2.5 bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/20">
                  <span className="text-amber-400 font-black mt-0.5 text-base">🎨</span>
                  <div>
                    <strong className="text-white block">Desenho Hiper-realista a Lápis</strong>
                    <span className="text-white/70 text-[11px]">
                      Retrato nítido em alta definição artística do rosto e olhar da sua alma gêmea, pronto para imprimir ou guardar no celular.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/20">
                  <span className="text-amber-400 font-black mt-0.5 text-base">🔮</span>
                  <div>
                    <strong className="text-white block">Perfil Psíquico & Guia de Personalidade</strong>
                    <span className="text-white/70 text-[11px]">
                      Como essa pessoa fala, seus valores mais profundos, hobbies, tipo de profissão e hábitos no dia a dia.
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/20">
                  <span className="text-amber-400 font-black mt-0.5 text-base">⏳</span>
                  <div>
                    <strong className="text-white block">Quando e Onde Vocês Vão Se Encontrar</strong>
                    <span className="text-white/70 text-[11px]">
                      Pistas astrológicas do momento exato em que seus caminhos irão se cruzar e sinais cósmicos para reconhecê-la(o).
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-2.5 bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/20">
                  <span className="text-amber-400 font-black mt-0.5 text-base">📱</span>
                  <div>
                    <strong className="text-white block">Entrega Imediata no WhatsApp e no E-mail</strong>
                    <span className="text-white/70 text-[11px]">
                      Aparece na sua tela agora mesmo e enviamos uma cópia sem perda de qualidade no seu WhatsApp e e-mail.
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            {/* SEÇÃO: QUEM É TINA ALDEA */}
            <div className="w-full bg-[#130d24] border border-amber-400/30 rounded-2xl p-4 text-left my-4 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80"
                  alt="Tina Aldea Médium e Artista"
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shrink-0"
                />
                <div>
                  <h4 className="text-sm font-black text-white font-cinzel">Tina Aldea</h4>
                  <span className="text-[11px] text-amber-300 font-bold block">
                    Vidente & Retratista de Almas Gêmeas
                  </span>
                  <span className="text-[10px] text-white/50 block">
                    Mais de 15 anos unindo destinos ao redor do mundo
                  </span>
                </div>
              </div>
              <p className="text-xs text-white/80 leading-relaxed italic border-l-2 border-amber-400 pl-3 my-2">
                "Desde pequena percebi que quando fechava os olhos e segurava um lápis, minhas mãos desenhavam rostos de pessoas que meus amigos e familiares ainda iriam conhecer anos depois. Transformei esse dom na minha missão de vida: ajudar corações a reencontrarem sua outra metade cósmica."
              </p>
            </div>

            {/* GARANTIA DE 30 DIAS */}
            <div className="w-full text-center my-6 px-2 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-amber-500 to-amber-700 border-2 border-yellow-300 shadow-xl shadow-amber-500/30 flex items-center justify-center mb-3">
                <ShieldCheck className="w-8 h-8 text-slate-950" />
              </div>

              <h3 className="text-base font-black text-white leading-tight font-cinzel">
                Garantia Blindada Incondicional de 30 Dias
              </h3>
              <p className="text-[11px] text-white/70 mt-2 max-w-[320px] leading-relaxed">
                Se você não sentir uma conexão genuína e profunda com o desenho ou achar que não valeu cada centavo, devolvemos 100% do seu dinheiro. Sem pegadinhas e sem ressentimentos.
              </p>
            </div>

            {/* DEPOIMENTOS REAIS E HISTÓRIAS DE SUCESSO */}
            <div className="w-full text-left my-4">
              <div className="text-center mb-3">
                <span className="text-xs text-amber-400 font-bold">HISTÓRIAS REAIS</span>
                <h3 className="text-base font-black text-white font-cinzel">
                  Eles Encontraram Suas Almas Gêmeas 👇
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {TESTIMONIALS.map((t) => (
                  <div
                    key={t.id}
                    className="bg-neutral-900/90 border border-purple-500/20 rounded-xl p-3.5 shadow-md text-left"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-9 h-9 rounded-full object-cover border border-amber-400/50 shrink-0"
                        />
                        <div>
                          <strong className="text-xs font-bold text-white block">
                            {t.name}, {t.age} anos
                          </strong>
                          <span className="text-[10px] text-white/50 block">
                            {t.city} • {t.timeAgo}
                          </span>
                        </div>
                      </div>
                      <div className="flex text-amber-400 text-xs">
                        {"★".repeat(t.stars)}
                      </div>
                    </div>

                    <p className="text-[11px] text-white/80 leading-relaxed italic mb-2">
                      "{t.story}"
                    </p>

                    <div className="flex items-center gap-2.5 bg-black/60 p-2 rounded-lg border border-white/10">
                      <img
                        src={t.sketchThumb}
                        alt="Esboço entregue"
                        className="w-12 h-12 object-cover rounded border border-white/20 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] text-amber-300 font-bold block">
                          Retrato Oficial entregue por Tina
                        </span>
                        <span className="text-[9px] text-emerald-400 font-semibold block">
                          ✓ Encontro da vida real confirmado
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SEÇÃO FAQ (PERGUNTAS FREQUENTES) */}
            <div className="w-full text-left my-6">
              <h3 className="text-sm font-black text-white mb-3 text-center font-cinzel">
                Perguntas Frequentes
              </h3>
              <div className="flex flex-col gap-2">
                {FAQS.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3 text-left font-bold text-xs text-white flex items-center justify-between gap-2 cursor-pointer hover:bg-white/5 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-amber-400 transition-transform ${
                          openFaq === idx ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-3 pt-0 text-[11px] text-white/70 leading-relaxed border-t border-white/5 animate-in fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Botão Flutuante / Final de Compra */}
            <div className="w-full pt-2 pb-6">
              <button
                type="button"
                onClick={() => setShowPixModal(true)}
                className="w-full py-4 px-4 rounded-xl font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 shadow-xl shadow-amber-500/30 active:scale-98 transition transform cursor-pointer flex items-center justify-center gap-2"
              >
                <span>QUERO MEU DESENHO POR R$ 27,90</span>
                <ChevronRight className="w-5 h-5 text-slate-950" />
              </button>
            </div>

            {/* Rodapé institucional */}
            <footer className="mt-4 pt-4 pb-6 text-center text-xs text-white/50 w-full border-t border-white/10 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center gap-4 text-xs text-white/60">
                <a href="#" className="hover:underline">Termos de Uso</a>
                <span>•</span>
                <a href="#" className="hover:underline">Política de Privacidade</a>
              </div>
              <p className="text-[11px] text-white/40">
                Precisa de ajuda com seu pedido? <span className="text-amber-400 font-bold">suporte@tinaaldea.com.br</span>
              </p>
              <p className="text-[9px] text-white/30 max-w-[360px] leading-tight mt-1">
                Aviso: Este produto é oferecido com base em tradições de clarividência e arte intuitiva para entretenimento e autoconhecimento pessoal.
              </p>
            </footer>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL POPUP: CHECKOUT PIX                                                 */}
        {/* ========================================================================= */}
        {showPixModal && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3.5 animate-in fade-in duration-200">
            <div className="w-full max-w-[400px] bg-[#100b1e] border border-amber-400/40 rounded-2xl p-5 shadow-2xl relative text-center max-h-[95vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setShowPixModal(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition p-1 rounded-full bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-black mb-2">
                <span>⚡ PIX · APROVAÇÃO INSTANTÂNEA</span>
              </div>

              <div className="text-3xl font-black text-amber-400 mt-1 font-mono">
                R$ 27,90
              </div>
              <p className="text-[11px] text-white/70 mb-3">
                Retrato hiper-realista da sua alma gêmea por Tina Aldea
              </p>

              {/* Botão Copiar PIX */}
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
                  setShowPixModal(false);
                  setStep("delivered");
                }}
                className="text-xs text-amber-400 underline opacity-85 hover:opacity-100 my-1 cursor-pointer block mx-auto"
              >
                ⚡ Simular confirmação (Ver resultado final)
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ETAPA 5: DESENHO ENTREGUE E REVELADO                                      */}
        {/* ========================================================================= */}
        {step === "delivered" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in zoom-in-95 duration-500 py-4">
            <div className="w-full flex flex-col items-center">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 mb-2">
                ✓ Pagamento Confirmado
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white font-cinzel">
                Aqui Está a Sua Alma Gêmea!
              </h1>
              <p className="text-xs text-purple-200/80 mt-1 mb-4">
                Enviamos também uma cópia no seu WhatsApp ({whatsapp || "cadastrado"}) e e-mail.
              </p>

              {/* Retrato sem blur em alta resolução */}
              <div className="w-full rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl relative bg-black aspect-[16/11] mb-4">
                <img
                  src={sketchImage}
                  alt="Sua alma gêmea revelada"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dossiê revelado */}
              <div className="w-full bg-[#130d24] border border-amber-400/30 rounded-xl p-3.5 text-left mb-4">
                <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider mb-1">
                  🔮 Resumo da Leitura Psíquica de Tina Aldea
                </h4>
                <ul className="text-xs text-white/80 space-y-1.5">
                  <li>• <strong>Conexão Astral:</strong> Alta compatibilidade com sua energia de {zodiac.name}.</li>
                  <li>• <strong>Traços Marcantes:</strong> Olhar acolhedor, sorriso espontâneo e postura protetora.</li>
                  <li>• <strong>Quando Vocês Vão Se Conhecer:</strong> As cartas apontam um encontro em um local público ou evento social nas próximas semanas.</li>
                </ul>
              </div>

              {/* Botões de Ação */}
              <div className="w-full flex flex-col gap-2.5 mb-6">
                <a
                  href={sketchImage}
                  download="minha-alma-gemea-tina-aldea.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-xl font-black text-sm bg-amber-400 hover:bg-amber-300 text-black shadow-lg flex items-center justify-center gap-2 active:scale-98 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Retrato em Alta Resolução</span>
                </a>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Minha Alma Gêmea por Tina Aldea",
                        url: window.location.href,
                      });
                    } else {
                      alert("Link copiado para compartilhar!");
                    }
                  }}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/15 transition cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar no WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setStep("hero");
                    setQuizStep(1);
                  }}
                  className="mt-2 text-xs text-white/50 underline hover:text-white cursor-pointer"
                >
                  Fazer nova consulta ou canalização
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
