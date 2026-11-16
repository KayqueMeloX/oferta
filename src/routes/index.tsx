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
  ShieldCheck,
  Clock,
  X,
  ChevronDown,
  Eye,
  CheckCircle2,
  ArrowRight,
  Heart,
  Palette,
  FileText,
  Gift,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: TinaAldeaLandingPage,
});

type QuizStep = 1 | 2 | 3 | 4 | 5;

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function getZodiac(day: number, month: number) {
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

function TinaAldeaLandingPage() {
  // Modal Quiz State
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState<QuizStep>(1);

  // Form State
  const [interest, setInterest] = useState<"men" | "women" | "both">("men");
  const [birthDay, setBirthDay] = useState("15");
  const [birthMonth, setBirthMonth] = useState("6");
  const [birthYear, setBirthYear] = useState("1996");
  const [ethnicity, setEthnicity] = useState("Qualquer / Destino");
  const [userName, setUserName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Flow State
  const [isChanneling, setIsChanneling] = useState(false);
  const [channelProgress, setChannelProgress] = useState(0);
  const [isOfferUnlocked, setIsOfferUnlocked] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);

  // Checkout State
  const [pixCopied, setPixCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Counter
  const [clientCount, setClientCount] = useState(43842);

  useEffect(() => {
    const timer = setInterval(() => {
      setClientCount((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Timer checkout
  useEffect(() => {
    if (isOfferUnlocked && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [isOfferUnlocked, timeLeft]);

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

  const currentMonthName = MONTH_NAMES[new Date().getMonth()];
  const currentYear = new Date().getFullYear();
  const zodiac = getZodiac(parseInt(birthDay) || 1, parseInt(birthMonth) || 1);

  // Iniciar Canalização
  const handleStartChanneling = () => {
    setIsQuizOpen(false);
    setIsChanneling(true);
    setChannelProgress(0);

    const interval = setInterval(() => {
      setChannelProgress((prev) => {
        const next = prev + 4;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsChanneling(false);
            setIsOfferUnlocked(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 500);
          return 100;
        }
        return next;
      });
    }, 80);
  };

  const priceBrl = 27.9;
  const pixCode = `00020126580014br.gov.bcb.pix0136tina-aldea-${Date.now().toString(36)}5204000053039865405${priceBrl.toFixed(2)}5802BR5920TINA ALDEA SKETCH6009SAO PAULO62070503***6304`;

  const handleCopyPix = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(pixCode);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = pixCode;
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

  const chosenSketch = interest === "women" ? "/sketch-1.jpg" : "/sketch-2.jpg";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#4CAF50] selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP NOTICE BAR (IDENTICA AO SITE OFICIAL)                              */}
      {/* ========================================================================= */}
      <div className="bg-[#73b4fc] text-white py-2 px-4 text-center">
        <p className="text-xs md:text-sm font-semibold tracking-wide">
          🔮 Este é o meu Site Oficial! Cuidado com imitadores e cópias não autorizadas
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOADING MÍSTICO DE CANALIZAÇÃO (SE ATIVADO)                            */}
      {/* ========================================================================= */}
      {isChanneling && (
        <div className="fixed inset-0 z-50 bg-[#161226]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-spin" style={{ animationDuration: "8s" }} />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-400/70 animate-spin" style={{ animationDuration: "5s", animationDirection: "reverse" }} />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-900 to-amber-900 flex items-center justify-center shadow-2xl">
              <Sparkles className="w-9 h-9 text-amber-300 animate-pulse" />
            </div>
          </div>

          <h2 className="text-2xl font-bold font-merriweather mb-2">
            Canalizando sua Alma Gêmea…
          </h2>
          <p className="text-sm text-purple-200/80 mb-6 max-w-sm">
            Tina Aldea está sintonizando a vibração de {zodiac.name} ({zodiac.symbol}) e desenhando os contornos a lápis no papel.
          </p>

          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-xs font-bold text-amber-300">
              <span>{channelProgress < 40 ? "Sintonizando energia..." : channelProgress < 80 ? "Traçando feições e olhar..." : "Finalizando o desenho..."}</span>
              <span>{channelProgress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-yellow-300 rounded-full transition-all duration-100"
                style={{ width: `${channelProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TELA DE REVELAÇÃO / OFERTA APÓS CANALIZAÇÃO                            */}
      {/* ========================================================================= */}
      {isOfferUnlocked ? (
        <div className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in duration-300">
          {!isDelivered ? (
            <div className="text-center">
              {/* Faixa de Desconto */}
              <div className="bg-[#fff3e0] border border-amber-300 text-amber-900 py-2 px-4 rounded-xl text-xs font-bold mb-4 inline-flex items-center gap-1.5 shadow-sm">
                <span>🎁 65% OFF aplicado para {userName || "você"}</span>
                <span>• Expira em <strong className="text-red-600 font-mono text-sm">{formatTime(timeLeft)}</strong></span>
              </div>

              {/* Teaser do Desenho com Blur e Cadeado */}
              <div className="relative w-full max-w-sm mx-auto aspect-[3/3.8] rounded-2xl overflow-hidden border-4 border-amber-200 shadow-2xl mb-5 bg-neutral-900">
                <img
                  src={chosenSketch}
                  alt="Esboço da sua alma gêmea"
                  className="w-full h-full object-cover filter blur-[10px] scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/90 flex items-center justify-center shadow-xl mb-2 animate-bounce">
                    <Lock className="w-7 h-7 text-black" />
                  </div>
                  <span className="text-xs font-black text-white bg-black/75 px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                    DESENHO PRONTO & BLOQUEADO
                  </span>
                  <p className="text-[11px] text-amber-200 font-medium mt-1">
                    Desbloqueie para visualizar em alta definição
                  </p>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold font-merriweather text-gray-900 leading-tight mb-2">
                O Retrato da Sua Alma Gêmea Foi Concluído!
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                Tina Aldea captou a essência facial, o olhar e a aura da pessoa destinada a você.
              </p>

              {/* Tabela de Preço / Checkout Box */}
              <div className="bg-[#fcfaf7] border border-amber-200/80 rounded-2xl p-5 text-left shadow-lg mb-6">
                <div className="space-y-2 text-xs md:text-sm font-medium border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Retrato a Lápis em Alta Resolução</span>
                    <span className="line-through text-gray-400">R$ 97,00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Leitura Psíquica de Personalidade e Hábitos</span>
                    <span className="line-through text-gray-400">R$ 49,00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Previsão de Onde e Quando Vocês Vão Se Conhecer</span>
                    <span className="line-through text-gray-400">R$ 39,00</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Desconto Especial de Hoje (65% OFF)</span>
                    <span>- R$ 157,10</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-base font-bold text-gray-900 block font-merriweather">Total Hoje</span>
                    <span className="text-[11px] text-gray-500">Pagamento único via PIX • Sem mensalidade</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">
                    R$ 27,90
                  </div>
                </div>

                {/* PIX Copia e Cola & QR Code */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <span className="text-xs font-bold text-emerald-600 block mb-2">
                    ⚡ PAGAMENTO RÁPIDO VIA PIX · APROVAÇÃO NA HORA
                  </span>

                  <button
                    onClick={handleCopyPix}
                    className={`w-full py-4 px-3 rounded-xl font-black text-sm tracking-wide text-black flex items-center justify-center gap-2 transition cursor-pointer mb-3 shadow-md ${
                      pixCopied
                        ? "bg-[#8ff0b3]"
                        : "bg-gradient-to-b from-[#41E877] via-[#25C55B] to-[#17A94B] text-black hover:brightness-105"
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

                  <div className="bg-white p-2.5 rounded-xl border border-gray-100 inline-block mx-auto">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                        pixCode
                      )}`}
                      alt="QR Code Pix"
                      className="w-32 h-32 mx-auto"
                    />
                    <span className="text-[10px] text-gray-500 font-semibold mt-1 block">
                      Aponte a câmera do aplicativo do seu banco
                    </span>
                  </div>

                  {/* Simulação para teste */}
                  <button
                    onClick={() => setIsDelivered(true)}
                    className="text-xs text-amber-700 underline opacity-85 hover:opacity-100 mt-3 cursor-pointer block mx-auto"
                  >
                    ⚡ Simular confirmação (Ver resultado final desbloqueado)
                  </button>
                </div>
              </div>

              {/* Botão de Voltar */}
              <button
                onClick={() => {
                  setIsOfferUnlocked(false);
                  setIsDelivered(false);
                }}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                ← Voltar para a página inicial
              </button>
            </div>
          ) : (
            /* Tela Desbloqueada / Entregue */
            <div className="text-center animate-in zoom-in-95 duration-500">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 mb-2 inline-block">
                ✓ Pagamento Confirmado
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-merriweather text-gray-900 mb-1">
                Aqui Está a Sua Alma Gêmea!
              </h1>
              <p className="text-sm text-gray-600 mb-5">
                Cópia enviada também para seu WhatsApp ({whatsapp || "cadastrado"}) e e-mail.
              </p>

              <div className="w-full max-w-sm mx-auto aspect-[3/3.8] rounded-2xl overflow-hidden border-4 border-amber-300 shadow-2xl mb-5 bg-black">
                <img
                  src={chosenSketch}
                  alt="Sua alma gêmea revelada"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#fcfaf7] border border-amber-200 rounded-xl p-4 text-left mb-6 max-w-md mx-auto">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                  🔮 Resumo da Leitura Psíquica de Tina Aldea
                </h4>
                <ul className="text-xs text-gray-700 space-y-2">
                  <li>• <strong>Sintonia Astral:</strong> Alta conexão com a vibração de {zodiac.name}.</li>
                  <li>• <strong>Traços Marcantes:</strong> Olhar acolhedor, sorriso sincero e energia protetora.</li>
                  <li>• <strong>Momento do Encontro:</strong> O destino aponta um cruzamento de caminhos em local social nas próximas semanas.</li>
                </ul>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <a
                  href={chosenSketch}
                  download="minha-alma-gemea-tina-aldea.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-xl font-bold text-sm bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Retrato em Alta Resolução</span>
                </a>

                <button
                  onClick={() => {
                    setIsOfferUnlocked(false);
                    setIsDelivered(false);
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 underline block mx-auto pt-2"
                >
                  Fazer nova consulta
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* 4. LANDING PAGE PRINCIPAL IDENTICA AO OFICIAL                             */
        /* ========================================================================= */
        <main>
          {/* HERO SECTION (#FDF8F3) */}
          <section className="bg-[#FDF8F3] pt-6 pb-12 md:pb-16 px-5 text-center">
            <div className="max-w-2xl mx-auto">
              {/* Foto da Tina Aldea em Círculo / Moldura */}
              <div className="mb-6">
                <img
                  src="/tina-profile.jpg"
                  alt="Tina Aldea - Psychic & Soulmate Sketch Artist"
                  className="w-40 h-40 md:w-44 md:h-44 mx-auto rounded-full object-cover shadow-xl border-4 border-white"
                />
              </div>

              {/* Top Badge */}
              <p className="text-xs md:text-sm uppercase tracking-[3px] text-gray-500 font-semibold mb-3 font-opensans">
                A ARTISTA PSÍQUICA E RETRATISTA Nº 1 DE ALMAS GÊMEAS
              </p>

              {/* Main Headline (Merriweather) */}
              <h1 className="text-2xl md:text-4xl lg:text-[40px] text-gray-900 leading-tight mb-4 font-merriweather">
                "Conheci Minha Alma Gêmea em Duas Semanas Após Receber o Desenho da Tina Aldea"
              </h1>

              {/* Subheadline */}
              <p className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto font-opensans leading-relaxed">
                Vou desenhar sua Alma Gêmea Destinada em 24 horas e revelar quando e onde vocês vão se conhecer
              </p>

              {/* Botão de CTA Verde Oficial (#4CAF50) */}
              <button
                type="button"
                onClick={() => {
                  setIsQuizOpen(true);
                  setQuizStep(1);
                }}
                className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-4 px-8 md:px-10 text-base md:text-lg rounded-xl shadow-lg mx-auto flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer font-opensans"
              >
                <Sparkles className="w-5 h-5" />
                <span>INICIAR MEU DESENHO DA ALMA GÊMEA &gt;</span>
              </button>

              {/* Delivery Note */}
              <p className="text-xs md:text-sm text-gray-500 mt-3 font-opensans">
                Entregue com Amor e Intuição em 24 Horas
              </p>

              {/* Avaliação e Prova Social com Avatares */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="Cliente" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
                  </div>
                  <span className="text-sm text-gray-600 font-opensans">
                    + <strong className="text-gray-900 font-bold">{clientCount.toLocaleString("pt-BR")}</strong> clientes satisfeitas
                  </span>
                </div>

                <p className="text-xs text-gray-500 font-opensans">
                  Amado por milhares de pessoas ao redor do mundo
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: COMO FUNCIONA (#1A1A2E - DEEP NAVY) */}
          <section className="py-14 md:py-16 px-5 bg-[#1a1a2e] text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl mb-12 font-merriweather font-bold">
                Como Funciona
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center">
                {/* Passo 1 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold shadow-md">
                    1
                  </div>
                  <h3 className="text-lg font-bold font-merriweather">Responda ao Quiz</h3>
                  <p className="text-sm text-gray-300 font-opensans leading-relaxed">
                    Responda a algumas perguntas simples para que eu possa sintonizar a sua energia cósmica.
                  </p>
                </div>

                {/* Passo 2 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold shadow-md">
                    2
                  </div>
                  <h3 className="text-lg font-bold font-merriweather">Canalizo Sua Alma Gêmea</h3>
                  <p className="text-sm text-gray-300 font-opensans leading-relaxed">
                    Usando minhas habilidades psíquicas e visões astrais, sintonizo e desenho quem é sua alma gêmea.
                  </p>
                </div>

                {/* Passo 3 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold shadow-md">
                    3
                  </div>
                  <h3 className="text-lg font-bold font-merriweather">Entrega em até 24 Horas</h3>
                  <p className="text-sm text-gray-300 font-opensans leading-relaxed">
                    Receba seu desenho hiper-realista e leitura detalhada no seu e-mail e WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: O QUE MEUS CLIENTES DIZEM (WHITE) */}
          <section className="py-14 md:py-16 px-5 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-2 font-merriweather font-bold">
                O Que Meus Clientes Dizem
              </h2>
              <p className="text-center text-gray-500 mb-10 text-sm md:text-base font-opensans">
                Histórias reais de pessoas reais que encontraram a sua alma gêmea
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: "Alexandre & Bruna",
                    city: "São Paulo, SP",
                    text: "Recebi o desenho da Tina em julho. No mês seguinte, conheci a Bruna num seminário de trabalho. O formato dos olhos e o queixo eram IDÊNTICOS ao desenho. Ficamos chocados!",
                    sketchImg: "/sketch-1.jpg",
                  },
                  {
                    name: "Angela & Rodrigo",
                    city: "Belo Horizonte, MG",
                    text: "Eu não costumo acreditar muito nessas coisas, mas a riqueza de detalhes na leitura de personalidade me arrepiou. Conheci exatamente a pessoa descrita 3 semanas depois.",
                    sketchImg: "/sketch-2.jpg",
                  },
                  {
                    name: "Júlia & Rafael",
                    city: "Curitiba, PR",
                    text: "O desenho da Tina me deu esperança quando eu já estava desiludida. Quando encontrei o Rafael, senti na hora que era ele. Estamos juntos há 1 ano!",
                    sketchImg: "/sketch-2.jpg",
                  },
                  {
                    name: "Larissa & Gabriel",
                    city: "Rio de Janeiro, RJ",
                    text: "A entrega no WhatsApp foi super rápida. Imprimi o desenho e guardei. Dois meses depois esbarrei com ele na cafeteria perto de casa. Perfeito demais!",
                    sketchImg: "/sketch-1.jpg",
                  },
                ].map((dep, idx) => (
                  <div key={idx} className="bg-[#fcfaf7] border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex gap-1 text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 font-opensans italic mb-4 leading-relaxed">
                        "{dep.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                      <div>
                        <strong className="text-xs font-bold text-gray-900 block font-merriweather">{dep.name}</strong>
                        <span className="text-[10px] text-gray-500">{dep.city}</span>
                      </div>
                      <img
                        src={dep.sketchImg}
                        alt="Desenho entregue"
                        className="w-10 h-10 rounded-lg object-cover border border-amber-300 shadow-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION: O QUE VOCÊ RECEBE (#FDF8F3) */}
          <section className="py-14 md:py-16 px-5 bg-[#FDF8F3]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-2 font-merriweather font-bold">
                O Que Você Recebe
              </h2>
              <p className="text-center text-gray-500 mb-10 text-sm md:text-base font-opensans">
                Sua experiência completa da alma gêmea, entregue diretamente no seu e-mail e WhatsApp
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Palette,
                    title: "Desenho Psíquico da Alma Gêmea",
                    desc: "Um retrato detalhado a lápis em altíssima resolução, canalizado através de visão psíquica e intuição cósmica.",
                  },
                  {
                    icon: FileText,
                    title: "Leitura Psíquica Detalhada",
                    desc: "Descrição aprofundada da personalidade, traços marcantes, jeito de falar e as circunstâncias de como vocês vão se cruzar.",
                  },
                  {
                    icon: Gift,
                    title: "Bônus: Guia de Compatibilidade da Alma Gêmea",
                    desc: "Descubra a conexão energética, pontos fortes e mapa de sinastria entre você e sua alma gêmea.",
                  },
                  {
                    icon: Clock,
                    title: "Entrega em 24 Horas",
                    desc: "Receba tudo no seu e-mail e WhatsApp em até 24 horas (opção expressa de 6 horas disponível).",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base font-merriweather">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 font-opensans leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setIsQuizOpen(true);
                    setQuizStep(1);
                  }}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-4 px-10 text-base md:text-lg rounded-xl shadow-lg inline-flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer font-opensans"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>INICIAR MEU DESENHO DA ALMA GÊMEA &gt;</span>
                </button>
                <p className="text-xs text-gray-400 mt-3 font-opensans">
                  Compra Segura — 30 Dias de Garantia Incondicional de Reembolso
                </p>
              </div>
            </div>
          </section>

          {/* SECTION: MEUS TRABALHOS RECENTES (WHITE) */}
          <section className="py-14 md:py-16 px-5 bg-white">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl text-gray-900 mb-2 font-merriweather font-bold">
                Meus Trabalhos Recentes
              </h3>
              <p className="text-gray-600 mb-8 text-sm md:text-base font-opensans">
                Veja abaixo alguns exemplos de desenhos canalizados em {currentMonthName} de {currentYear}:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-lg mx-auto">
                <div className="bg-[#fcfaf7] p-3 rounded-2xl border border-gray-200 shadow-md">
                  <div className="aspect-[3/3.8] rounded-xl overflow-hidden mb-2 bg-neutral-900">
                    <img
                      src="/sketch-1.jpg"
                      alt="Exemplo de desenho 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 block font-merriweather">
                    Retrato Masculino Canalizado
                  </span>
                  <span className="text-[10px] text-gray-400 font-opensans">
                    Entregue em 18 horas
                  </span>
                </div>

                <div className="bg-[#fcfaf7] p-3 rounded-2xl border border-gray-200 shadow-md">
                  <div className="aspect-[3/3.8] rounded-xl overflow-hidden mb-2 bg-neutral-900">
                    <img
                      src="/sketch-2.jpg"
                      alt="Exemplo de desenho 2"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-700 block font-merriweather">
                    Retrato Feminino Canalizado
                  </span>
                  <span className="text-[10px] text-gray-400 font-opensans">
                    Entregue em 14 horas
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: PERGUNTAS FREQUENTES (FAQ) */}
          <section className="py-14 md:py-16 px-5 bg-[#FDF8F3]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-8 font-merriweather font-bold">
                Perguntas Frequentes
              </h2>

              <div className="space-y-3">
                {[
                  {
                    q: "Como funciona o Desenho da Alma Gêmea?",
                    a: "Utilizo leituras intuitivas de energia para sintonizar as frequências associadas a você. Essas energias me guiam na visualização e desenho detalhado da representação da sua alma gêmea em papel, além de uma leitura psíquica profunda sobre quem ela é.",
                  },
                  {
                    q: "Qual é o valor do pacote?",
                    a: "O pacote completo com o desenho hiper-realista, a leitura psíquica e os bônus está com valor promocional de apenas R$ 27,90 (preço normal R$ 147,00). Pagamento único e sem assinaturas.",
                  },
                  {
                    q: "Por que devo confiar em Tina Aldea?",
                    a: "Sou Tina Aldea, médium e retratista com um dom natural aperfeiçoado desde a infância, transmitido por gerações em minha família. Mais de 43.000 clientes em todo o mundo já confiaram em minhas leituras para encontrar o amor verdadeiro.",
                  },
                  {
                    q: "Como posso realizar o pagamento?",
                    a: "Aceitamos PIX com aprovação imediata e cartões. O pagamento é 100% seguro, processado com criptografia bancária e sem cobranças não autorizadas.",
                  },
                  {
                    q: "Em quanto tempo vou receber meu desenho?",
                    a: "Seu desenho e leitura detalhada serão enviados diretamente para o seu WhatsApp e e-mail em até 24 horas.",
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-4 text-left font-bold text-sm text-gray-900 flex items-center justify-between gap-3 cursor-pointer hover:bg-gray-50 transition font-merriweather"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="p-4 pt-0 text-sm text-gray-600 font-opensans leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION: AVALIAÇÃO FINAL 4.9/5 E BOTÃO FINAL */}
          <section className="py-14 md:py-16 px-5 bg-white text-center">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-3xl font-extrabold text-gray-900 font-merriweather">
                4.9 / 5
              </p>
              <p className="text-sm text-gray-500 mt-1 mb-8 font-opensans">
                Baseado em mais de 43.000 clientes satisfeitas
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsQuizOpen(true);
                  setQuizStep(1);
                }}
                className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-5 px-10 text-lg md:text-xl rounded-xl shadow-lg w-full flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer font-opensans"
              >
                <Sparkles className="w-5 h-5" />
                <span>INICIAR MEU DESENHO DA ALMA GÊMEA &gt;</span>
              </button>

              <p className="text-xs text-gray-400 mt-3 font-opensans">
                Compra Sem Risco — 30 Dias de Garantia de Devolução do Dinheiro
              </p>
            </div>
          </section>

          {/* FOOTER OFICIAL */}
          <footer className="bg-gray-100 py-10 px-4 text-center text-xs text-gray-500 font-opensans">
            <div className="mb-4">
              <h4 className="text-base font-bold text-gray-800 font-merriweather">
                Tina Aldea
              </h4>
              <span className="text-[11px] text-gray-500">
                Psychic & Soulmate Sketch Artist
              </span>
            </div>

            <div className="flex justify-center gap-4 mb-4 flex-wrap text-gray-600">
              <a href="#" className="hover:text-gray-900">Política de Privacidade</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-900">Termos de Uso</a>
              <span>•</span>
              <a href="#" className="hover:text-gray-900">Garantia e Reembolso</a>
            </div>

            <p className="text-[11px] text-gray-400 max-w-md mx-auto leading-relaxed">
              Aviso Legal: Os serviços de Tina Aldea são baseados em intuição e clarividência artística para fins de entretenimento e reflexão pessoal. Todos os direitos reservados © {currentYear}.
            </p>
          </footer>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL POPUP DO QUIZ (IDENTICO AO OFICIAL QUANDO CLICA NO CTA)           */}
      {/* ========================================================================= */}
      {isQuizOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in duration-200">
          {/* Header Escuro do Modal (#2D2D2D) */}
          <div className="bg-[#2D2D2D] text-white p-5 text-center relative">
            <button
              onClick={() => setIsQuizOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <p className="text-xs text-gray-300 uppercase tracking-widest font-opensans font-semibold">
              Quase Completo...
            </p>
            <h3 className="text-base md:text-lg font-bold mt-1.5 leading-snug font-merriweather max-w-md mx-auto">
              Responda a algumas perguntas simples para que eu possa desenhar sua Alma Gêmea com precisão...
            </h3>
          </div>

          <div className="max-w-md mx-auto px-5 py-6">
            {/* Barra de Progresso com 5 Segmentos Verdes (#4CAF50) */}
            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3, 4, 5].map((st) => (
                <div
                  key={st}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    st <= quizStep ? "bg-[#4CAF50]" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* ETAPA 1 DO QUIZ: INTERESSE */}
            {quizStep === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  Em quem você tem interesse no amor?
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  Toque para selecionar sua preferência afetiva:
                </p>

                <div className="space-y-3">
                  {[
                    { val: "men", label: "Estou em busca de Homens" },
                    { val: "women", label: "Estou em busca de Mulheres" },
                    { val: "both", label: "Estou em busca de Ambos / Aberto(a)" },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      type="button"
                      onClick={() => {
                        setInterest(opt.val as any);
                        setQuizStep(2);
                      }}
                      className={`w-full p-4 text-left border-2 rounded-xl transition-all text-base font-semibold cursor-pointer ${
                        interest === opt.val
                          ? "border-[#4CAF50] bg-green-50 text-gray-900 shadow-sm"
                          : "border-gray-200 hover:border-[#4CAF50] hover:bg-green-50 text-gray-800"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ETAPA 2 DO QUIZ: DATA DE NASCIMENTO */}
            {quizStep === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  Quando você nasceu?
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  Seu mapa astral ajuda a sintonizar a conexão exata:
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {/* Dia */}
                  <div>
                    <label className="text-[11px] text-gray-500 font-bold block mb-1">Dia</label>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-full py-3 px-2 rounded-xl border border-gray-300 text-sm font-semibold bg-white text-gray-800 focus:outline-none focus:border-[#4CAF50]"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mês */}
                  <div>
                    <label className="text-[11px] text-gray-500 font-bold block mb-1">Mês</label>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full py-3 px-2 rounded-xl border border-gray-300 text-sm font-semibold bg-white text-gray-800 focus:outline-none focus:border-[#4CAF50]"
                    >
                      {MONTH_NAMES.map((m, idx) => (
                        <option key={m} value={idx + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ano */}
                  <div>
                    <label className="text-[11px] text-gray-500 font-bold block mb-1">Ano</label>
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-full py-3 px-2 rounded-xl border border-gray-300 text-sm font-semibold bg-white text-gray-800 focus:outline-none focus:border-[#4CAF50]"
                    >
                      {Array.from({ length: 70 }, (_, i) => 2006 - i).map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Badge Signo Solar */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{zodiac.symbol}</span>
                    <div>
                      <span className="text-xs font-bold text-amber-900 block">
                        Signo: {zodiac.name} ({zodiac.element})
                      </span>
                      <span className="text-[10px] text-gray-500">Energia astrológica mapeada</span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>

                <button
                  type="button"
                  onClick={() => setQuizStep(3)}
                  className="w-full py-4 bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold rounded-xl text-base shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ETAPA 3 DO QUIZ: ETNIA / PREFERÊNCIA */}
            {quizStep === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  Qual é a ascendência ou etnia da sua preferência?
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  Isso ajuda Tina a captar traços fisionômicos mais precisos:
                </p>

                <div className="space-y-2.5">
                  {[
                    "Qualquer / Deixo o Destino Escolher",
                    "Branca / Europeia",
                    "Latina / Mista",
                    "Negra / Afrodescendente",
                    "Asiática",
                    "Indígena / Nativa",
                  ].map((et) => (
                    <button
                      key={et}
                      type="button"
                      onClick={() => {
                        setEthnicity(et);
                        setQuizStep(4);
                      }}
                      className={`w-full p-3.5 text-left border rounded-xl transition text-sm font-semibold cursor-pointer ${
                        ethnicity === et
                          ? "border-[#4CAF50] bg-green-50 text-gray-900 font-bold"
                          : "border-gray-200 hover:border-[#4CAF50] hover:bg-green-50 text-gray-700"
                      }`}
                    >
                      {et}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ETAPA 4 DO QUIZ: NOME */}
            {quizStep === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  Como você se chama?
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  Seu primeiro nome é usado para canalizar a vibração nominal:
                </p>

                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Digite seu nome aqui..."
                  className="w-full h-14 px-4 rounded-xl border border-gray-300 text-base font-semibold focus:outline-none focus:border-[#4CAF50]"
                  autoFocus
                />

                <button
                  type="button"
                  disabled={!userName.trim()}
                  onClick={() => setQuizStep(5)}
                  className={`w-full py-4 rounded-xl text-base font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    userName.trim()
                      ? "bg-[#4CAF50] hover:bg-[#45a049] text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ETAPA 5 DO QUIZ: ENTREGA (WHATSAPP E E-MAIL) */}
            {quizStep === 5 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  Onde Tina deve entregar o seu desenho?
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  Você verá a revelação instantaneamente aqui na tela e receberá uma cópia de alta resolução:
                </p>

                <div className="space-y-3 text-left">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Seu WhatsApp com DDD:
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => handlePhoneMask(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-[#4CAF50]"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      Seu melhor e-mail:
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-[#4CAF50]"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#4CAF50] rounded border-gray-300"
                    />
                    <span className="text-xs text-gray-500 leading-tight">
                      Confirmo que tenho 18 anos ou mais e concordo em receber o desenho da minha alma gêmea por WhatsApp e e-mail.
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  disabled={whatsapp.length < 14 || !email.includes("@") || !agreeTerms}
                  onClick={handleStartChanneling}
                  className={`w-full py-4 rounded-xl text-base font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                    whatsapp.length >= 14 && email.includes("@") && agreeTerms
                      ? "bg-[#4CAF50] hover:bg-[#45a049] text-white active:scale-98"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>CANALIZAR MEU DESENHO AGORA &gt;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
