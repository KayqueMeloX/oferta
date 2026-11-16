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
  Compass,
  X,
  ChevronDown,
  Eye,
  CheckCircle2,
  ArrowRight,
  Heart,
  Palette,
  FileText,
  Gift,
  HelpCircle,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: TinaAldeaExactClone,
});

type Lang = "en" | "pt";
type QuizStep = 1 | 2 | 3 | 4 | 5;

const MONTHS_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MONTHS_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

function getZodiac(day: number, month: number) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: "Aries", symbol: "♈", element: "Fire" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: "Taurus", symbol: "♉", element: "Earth" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: "Gemini", symbol: "♊", element: "Air" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: "Cancer", symbol: "♋", element: "Water" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: "Leo", symbol: "♌", element: "Fire" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: "Virgo", symbol: "♍", element: "Earth" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: "Libra", symbol: "♎", element: "Air" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: "Scorpio", symbol: "♏", element: "Water" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: "Sagittarius", symbol: "♐", element: "Fire" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: "Capricorn", symbol: "♑", element: "Earth" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: "Aquarius", symbol: "♒", element: "Air" };
  return { name: "Pisces", symbol: "♓", element: "Water" };
}

function TinaAldeaExactClone() {
  const [lang, setLang] = useState<Lang>("en");
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [quizStep, setQuizStep] = useState<QuizStep>(1);

  // Form State
  const [interest, setInterest] = useState<"men" | "women" | "both">("men");
  const [birthDay, setBirthDay] = useState("15");
  const [birthMonth, setBirthMonth] = useState("6");
  const [birthYear, setBirthYear] = useState("1996");
  const [ethnicity, setEthnicity] = useState("Any / Destiny Choice");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Post-quiz states
  const [isChanneling, setIsChanneling] = useState(false);
  const [channelProgress, setChannelProgress] = useState(0);
  const [isOfferUnlocked, setIsOfferUnlocked] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic counter
  const [clientCount, setClientCount] = useState(43842);

  useEffect(() => {
    const timer = setInterval(() => {
      setClientCount((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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

  const startChanneling = () => {
    setIsQuizOpen(false);
    setIsChanneling(true);
    setChannelProgress(0);

    const interval = setInterval(() => {
      setChannelProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsChanneling(false);
            setIsOfferUnlocked(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }, 400);
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
    } catch {}
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const chosenSketch = interest === "women" ? "/images/squeeze/sketches/sketch4.jpg" : "/images/squeeze/sketches/sketch3.jpg";
  const currentMonth = lang === "en" ? MONTHS_EN[new Date().getMonth()] : MONTHS_PT[new Date().getMonth()];
  const currentYear = new Date().getFullYear();
  const zodiac = getZodiac(parseInt(birthDay) || 1, parseInt(birthMonth) || 1);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-[#4CAF50] selection:text-white overflow-x-hidden">
      {/* ========================================================================= */}
      {/* TOP BAR: THIS IS MY OFFICIAL WEBSITE!                                     */}
      {/* ========================================================================= */}
      <div className="bg-[#73b4fc] text-white py-2.5 px-4 text-center flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex-1 text-center font-semibold text-xs md:text-sm tracking-wide font-opensans">
          {lang === "en" ? (
            <span>🔮 This is my Official Website! Beware of impersonators</span>
          ) : (
            <span>🔮 Este é o meu Site Oficial! Cuidado com imitadores e golpes</span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0 bg-white/20 rounded-full px-2 py-0.5 text-[11px] font-bold">
          <button
            onClick={() => setLang("en")}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${lang === "en" ? "bg-white text-blue-700 font-black shadow-xs" : "text-white/80"}`}
          >
            EN
          </button>
          <span>/</span>
          <button
            onClick={() => setLang("pt")}
            className={`px-1.5 py-0.5 rounded cursor-pointer ${lang === "pt" ? "bg-white text-blue-700 font-black shadow-xs" : "text-white/80"}`}
          >
            PT
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LOADING DE CANALIZAÇÃO (SE ATIVADO)                                      */}
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
            {lang === "en" ? "Channeling Your Soulmate…" : "Canalizando Sua Alma Gêmea…"}
          </h2>
          <p className="text-sm text-purple-200/80 mb-6 max-w-sm">
            {lang === "en"
              ? `Tina Aldea is tuning into your ${zodiac.name} (${zodiac.symbol}) energy and sketching the facial contours on paper.`
              : `Tina Aldea está sintonizando sua energia de ${zodiac.name} (${zodiac.symbol}) e desenhando os contornos a lápis no papel.`}
          </p>

          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-xs font-bold text-amber-300">
              <span>{channelProgress < 40 ? (lang === "en" ? "Tuning energy..." : "Sintonizando energia...") : channelProgress < 80 ? (lang === "en" ? "Visualizing eyes & smile..." : "Mapeando olhar e sorriso...") : (lang === "en" ? "Completing sketch..." : "Finalizando o desenho...")}</span>
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
      {/* TELA DE OFERTA / REVELAÇÃO DO DESENHO                                     */}
      {/* ========================================================================= */}
      {isOfferUnlocked ? (
        <div className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in duration-300">
          {!isDelivered ? (
            <div className="text-center">
              <div className="bg-[#fff3e0] border border-amber-300 text-amber-900 py-2 px-4 rounded-xl text-xs font-bold mb-4 inline-flex items-center gap-1.5 shadow-sm">
                <span>🎁 65% OFF applied for {name || "you"}</span>
                <span>• Expires in <strong className="text-red-600 font-mono text-sm">{formatTime(timeLeft)}</strong></span>
              </div>

              {/* Teaser do Desenho com Blur e Cadeado */}
              <div className="relative w-full max-w-sm mx-auto aspect-[3/3.8] rounded-2xl overflow-hidden border-4 border-amber-200 shadow-2xl mb-5 bg-neutral-900">
                <img
                  src={chosenSketch}
                  alt="Soulmate Sketch"
                  className="w-full h-full object-cover filter blur-[10px] scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/90 flex items-center justify-center shadow-xl mb-2 animate-bounce">
                    <Lock className="w-7 h-7 text-black" />
                  </div>
                  <span className="text-xs font-black text-white bg-black/75 px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                    SKETCH COMPLETED & LOCKED
                  </span>
                  <p className="text-[11px] text-amber-200 font-medium mt-1">
                    Unlock to view in ultra-high resolution without watermarks
                  </p>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold font-merriweather text-gray-900 leading-tight mb-2">
                Your Soulmate Sketch Is Complete!
              </h1>
              <p className="text-sm text-gray-600 mb-6">
                Tina Aldea has captured the facial features, the gaze, and the aura of the person destined for you.
              </p>

              {/* Tabela de Preço / Checkout Box */}
              <div className="bg-[#fcfaf7] border border-amber-200/80 rounded-2xl p-5 text-left shadow-lg mb-6">
                <div className="space-y-2 text-xs md:text-sm font-medium border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>High-Resolution Pencil Soulmate Sketch</span>
                    <span className="line-through text-gray-400">$97.00 / R$ 97,00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Detailed Psychic Reading & Personality Traits</span>
                    <span className="line-through text-gray-400">$49.00 / R$ 49,00</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Astrological Forecast: When & Where You'll Meet</span>
                    <span className="line-through text-gray-400">$39.00 / R$ 39,00</span>
                  </div>
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Today's Special Discount (65% OFF)</span>
                    <span>-$157.10 / -R$ 157,10</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-base font-bold text-gray-900 block font-merriweather">Total Today</span>
                    <span className="text-[11px] text-gray-500">One-time payment • Instant delivery • No subscriptions</span>
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-emerald-600 font-mono">
                    R$ 27,90 <span className="text-sm text-gray-500 font-normal">($37 USD)</span>
                  </div>
                </div>

                {/* PIX Copia e Cola & QR Code */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
                  <span className="text-xs font-bold text-emerald-600 block mb-2">
                    ⚡ PAGAMENTO RÁPIDO VIA PIX · APROVAÇÃO INSTANTÂNEA
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
                        <span>COPIAR CÓDIGO PIX (R$ 27,90)</span>
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

                  <button
                    onClick={() => setIsDelivered(true)}
                    className="text-xs text-amber-700 underline opacity-85 hover:opacity-100 mt-3 cursor-pointer block mx-auto"
                  >
                    ⚡ Simular confirmação (Ver resultado final desbloqueado)
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOfferUnlocked(false);
                  setIsDelivered(false);
                }}
                className="text-xs text-gray-400 hover:text-gray-600 underline"
              >
                ← Back to home page
              </button>
            </div>
          ) : (
            /* Tela Desbloqueada / Entregue */
            <div className="text-center animate-in zoom-in-95 duration-500">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 mb-2 inline-block">
                ✓ Pagamento Confirmado
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-merriweather text-gray-900 mb-1">
                Here Is Your Soulmate!
              </h1>
              <p className="text-sm text-gray-600 mb-5">
                Copy sent to your WhatsApp ({whatsapp || "registered"}) and email ({email || "registered"}).
              </p>

              <div className="w-full max-w-sm mx-auto aspect-[3/3.8] rounded-2xl overflow-hidden border-4 border-amber-300 shadow-2xl mb-5 bg-black">
                <img
                  src={chosenSketch}
                  alt="Your Soulmate"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-[#fcfaf7] border border-amber-200 rounded-xl p-4 text-left mb-6 max-w-md mx-auto">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                  🔮 Summary of Tina Aldea's Psychic Reading
                </h4>
                <ul className="text-xs text-gray-700 space-y-2">
                  <li>• <strong>Astral Connection:</strong> Strong compatibility with your {zodiac.name} energy.</li>
                  <li>• <strong>Distinctive Traits:</strong> Warm welcoming gaze, spontaneous smile, and protective presence.</li>
                  <li>• <strong>Encounter Circumstances:</strong> The cards point to a serendipitous meeting in a public or social setting in the coming weeks.</li>
                </ul>
              </div>

              <div className="max-w-xs mx-auto space-y-2">
                <a
                  href={chosenSketch}
                  download="my-soulmate-tina-aldea.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-xl font-bold text-sm bg-[#4CAF50] hover:bg-[#45a049] text-white shadow-lg flex items-center justify-center gap-2 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download High-Resolution Sketch</span>
                </a>

                <button
                  onClick={() => {
                    setIsOfferUnlocked(false);
                    setIsDelivered(false);
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 underline block mx-auto pt-2"
                >
                  Start another reading
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ========================================================================= */
        /* LANDING PAGE EXATA DE TINA ALDEA                                          */
        /* ========================================================================= */
        <main>
          {/* ======================================================================= */}
          {/* HERO SECTION (#FDF8F3)                                                 */}
          {/* ======================================================================= */}
          <section className="bg-[#FDF8F3] pt-4 pb-12 md:pb-16 px-5 text-center">
            <div className="max-w-2xl mx-auto">
              {/* Imagem Oficial do Hero (main-hero.jpg) */}
              <div className="mb-8">
                <img
                  src="/images/squeeze/main-hero.jpg"
                  alt="Tina Aldea Soulmate Sketch"
                  className="w-full max-w-sm mx-auto rounded-xl shadow-lg object-cover"
                />
              </div>

              {/* Top Badge */}
              <p
                className="text-xs md:text-sm uppercase tracking-[3px] text-gray-500 font-semibold mb-4"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {lang === "en" ? "THE #1 SOULMATE SKETCH PSYCHIC ARTIST" : "A ARTISTA PSÍQUICA E RETRATISTA Nº 1 DE ALMAS GÊMEAS"}
              </p>

              {/* H1 Headline (Merriweather) */}
              <h1 className="text-2xl md:text-4xl lg:text-[42px] text-gray-900 leading-tight mb-5 font-merriweather">
                {lang === "en"
                  ? '"I Met My Soulmate in Two Weeks After I Got My Sketch from Tina Aldea"'
                  : '"Conheci Minha Alma Gêmea em Duas Semanas Após Receber o Desenho da Tina Aldea"'}
              </h1>

              {/* Subheadline */}
              <p
                className="text-base md:text-lg text-gray-600 mb-8 max-w-xl mx-auto"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {lang === "en"
                  ? "I will draw your Destined Soulmate in 24 hours and tell you when and where you'll meet"
                  : "Vou desenhar sua Alma Gêmea Destinada em 24 horas e revelar quando e onde vocês vão se conhecer"}
              </p>

              {/* Botão de Ação Verde Oficial (#4CAF50) */}
              <button
                type="button"
                onClick={() => {
                  setIsQuizOpen(true);
                  setQuizStep(1);
                }}
                className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-4 px-10 text-lg rounded-xl shadow-lg mx-auto flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <Sparkles className="w-5 h-5" />
                <span>{lang === "en" ? "Start My Soulmate Sketch" : "Iniciar Meu Desenho da Alma Gêmea"}</span>
              </button>

              {/* Delivery Note */}
              <p
                className="text-sm text-gray-500 mt-4"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {lang === "en" ? "Delivered with Love & Intuition in 24 Hours" : "Entregue com Amor e Intuição em 24 Horas"}
              </p>

              {/* Social Proof com Estrelas e Avatares */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex justify-center gap-0.5 mb-1">
                  {[...Array(5)].map((_, l) => (
                    <Star key={l} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
                    <img src="https://randomuser.me/api/portraits/women/17.jpg" alt="" className="w-9 h-9 rounded-full border-2 border-white object-cover shadow-sm" />
                  </div>
                  <span className="text-sm text-gray-600 font-opensans">
                    + <span className="font-bold text-gray-800 text-base">{clientCount.toLocaleString()}</span>
                  </span>
                </div>

                <p className="text-sm text-gray-500 font-opensans">
                  {lang === "en"
                    ? `Loved by ${clientCount.toLocaleString()}+ happy clients`
                    : `Amado por mais de ${clientCount.toLocaleString()} clientes satisfeitas`}
                </p>
              </div>

              {/* AS SEEN ON Media Badges */}
              <div className="mt-10 pt-6 border-t border-gray-200/60">
                <p
                  className="text-xs uppercase tracking-[4px] text-gray-400 font-semibold mb-4"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  AS SEEN ON
                </p>
                <div className="flex justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition">
                  <span className="font-bold text-lg md:text-xl text-gray-400 font-merriweather">CBS</span>
                  <span className="font-bold text-lg md:text-xl text-gray-400 font-merriweather">NBC</span>
                  <span className="font-bold text-lg md:text-xl text-gray-400 font-merriweather">FOX</span>
                  <span className="font-bold text-lg md:text-xl text-gray-400 font-merriweather">USA TODAY</span>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* HOW IT WORKS SECTION (#2D2D2D)                                          */}
          {/* ======================================================================= */}
          <section className="bg-[#2D2D2D] text-white py-14 md:py-16 px-5">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center mb-12 font-merriweather">
                {lang === "en" ? "How It Works" : "Como Funciona"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 text-center">
                {/* Step 1 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold font-merriweather">
                    {lang === "en" ? "Take the Quiz" : "Responda ao Quiz"}
                  </h3>
                  <p className="text-sm text-gray-300 font-opensans leading-relaxed">
                    {lang === "en"
                      ? "Answer a few simple questions so I can tune into your energy"
                      : "Responda a algumas perguntas simples para que eu possa sintonizar sua energia"}
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold font-merriweather">
                    {lang === "en" ? "I Channel Your Soulmate" : "Canalizo Sua Alma Gêmea"}
                  </h3>
                  <p className="text-sm text-gray-300 font-opensans leading-relaxed">
                    {lang === "en"
                      ? "Using my psychic abilities, I visualize and sketch who your soulmate is"
                      : "Usando minhas habilidades psíquicas, visualizo e desenho quem é sua alma gêmea"}
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold font-merriweather">
                    {lang === "en" ? "Delivered to Your Email" : "Entregue no seu E-mail"}
                  </h3>
                  <p className="text-sm text-gray-300 font-opensans leading-relaxed">
                    {lang === "en"
                      ? "Receive your soulmate sketch and detailed reading within 24 hours"
                      : "Receba seu desenho em alta resolução e leitura detalhada em até 24 horas"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* TESTIMONIALS SECTION (WHITE)                                            */}
          {/* ======================================================================= */}
          <section className="py-14 md:py-16 px-5 bg-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-3 font-merriweather">
                {lang === "en" ? "What My Clients Say" : "O Que Meus Clientes Dizem"}
              </h2>
              <p className="text-center text-gray-500 mb-10 text-base font-opensans">
                {lang === "en"
                  ? "Real stories from real people who found their soulmate"
                  : "Histórias reais de pessoas reais que encontraram sua alma gêmea"}
              </p>

              {/* 4 Imagens Oficiais de Testemunhos Extraídas de officialtinaaldea.com */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <img
                  src="/images/squeeze/testimonials/alex.jpg"
                  alt="Testimonial from Alex"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
                <img
                  src="/images/squeeze/testimonials/angela.jpg"
                  alt="Testimonial from Angela"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
                <img
                  src="/images/squeeze/testimonials/julia.jpg"
                  alt="Testimonial from Julia"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
                <img
                  src="/images/squeeze/testimonials/lisa.jpg"
                  alt="Testimonial from Lisa"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsQuizOpen(true);
                    setQuizStep(1);
                  }}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-4 px-10 text-lg rounded-xl shadow-lg inline-flex items-center gap-2 transition-all hover:scale-105 cursor-pointer font-opensans"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{lang === "en" ? "Start My Soulmate Sketch" : "Iniciar Meu Desenho da Alma Gêmea"}</span>
                </button>
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* WHO IS THIS FOR? SECTION (WHITE)                                        */}
          {/* ======================================================================= */}
          <section className="py-14 md:py-16 px-5 bg-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-3 font-merriweather">
                {lang === "en" ? "Who Is This For?" : "Para Quem É Isso?"}
              </h2>
              <p className="text-center text-gray-500 mb-10 text-base font-opensans">
                {lang === "en"
                  ? "A soulmate sketch is the perfect gift for yourself or someone you love"
                  : "O desenho da alma gêmea é o presente perfeito para você ou para alguém que você ama"}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {[
                  { title: lang === "en" ? "Looking for Love" : "Em Busca de Amor", icon: Heart, color: "text-rose-400" },
                  { title: lang === "en" ? "Curious About the Future" : "Curioso(a) sobre o Futuro", icon: Eye, color: "text-indigo-400" },
                  { title: lang === "en" ? "Seeking Closure" : "Buscando Respostas", icon: Lock, color: "text-amber-400" },
                  { title: lang === "en" ? "Spiritual Guidance" : "Orientação Espiritual", icon: Compass, color: "text-teal-400" },
                  { title: lang === "en" ? "A Special Gift" : "Um Presente Especial", icon: Gift, color: "text-pink-400" },
                  { title: lang === "en" ? "Self-Discovery" : "Autodescoberta", icon: Award, color: "text-sky-400" },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="rounded-xl bg-[#FDF8F3] p-5 md:p-6 text-center hover:shadow-md transition-shadow"
                  >
                    <s.icon className={`w-8 h-8 mx-auto mb-3 ${s.color}`} />
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base font-opensans">
                      {s.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* WHAT YOU GET SECTION (GRAY-50)                                          */}
          {/* ======================================================================= */}
          <section className="py-14 md:py-16 px-5 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-3 font-merriweather">
                {lang === "en" ? "What You Get" : "O Que Você Recebe"}
              </h2>
              <p className="text-center text-gray-500 mb-10 text-base font-opensans">
                {lang === "en"
                  ? "Your complete soulmate experience, delivered to your inbox"
                  : "Sua experiência completa da alma gêmea, entregue diretamente no seu e-mail"}
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: Palette,
                    title: lang === "en" ? "Psychic Soulmate Sketch" : "Desenho Psíquico da Alma Gêmea",
                    desc: lang === "en"
                      ? "A detailed portrait of your soulmate, channeled through psychic vision"
                      : "Um retrato detalhado da sua alma gêmea, canalizado através de visão psíquica",
                  },
                  {
                    icon: FileText,
                    title: lang === "en" ? "Detailed Psychic Reading" : "Leitura Psíquica Detalhada",
                    desc: lang === "en"
                      ? "In-depth description of your soulmate's personality, traits, and how you'll meet"
                      : "Descrição aprofundada da personalidade, traços e como vocês vão se conhecer",
                  },
                  {
                    icon: Gift,
                    title: lang === "en" ? "Bonus: Soulmate Compatibility Guide" : "Bônus: Guia de Compatibilidade da Alma Gêmea",
                    desc: lang === "en"
                      ? "Discover the energetic connection between you and your soulmate"
                      : "Descubra a conexão energética e astral entre você e sua alma gêmea",
                  },
                  {
                    icon: Clock,
                    title: lang === "en" ? "24-Hour Delivery" : "Entrega em 24 Horas",
                    desc: lang === "en"
                      ? "Receive everything in your email within 24 hours (express 6h option available)"
                      : "Receba tudo no seu e-mail em até 24 horas (opção expressa de 6h disponível)",
                  },
                ].map((s) => (
                  <div
                    key={s.title}
                    className="flex gap-4 items-start bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-5 h-5 text-[#4CAF50]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base font-merriweather">
                        {s.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5 font-opensans">
                        {s.desc}
                      </p>
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
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-4 px-10 text-lg rounded-xl shadow-lg inline-flex items-center gap-2 transition-all hover:scale-105 cursor-pointer font-opensans"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{lang === "en" ? "Start My Soulmate Sketch" : "Iniciar Meu Desenho da Alma Gêmea"}</span>
                </button>
                <p className="text-xs text-gray-400 mt-3 font-opensans">
                  {lang === "en" ? "Risk-Free Purchase — 30 day money back guarantee" : "Compra Sem Risco — 30 Dias de Garantia de Reembolso"}
                </p>
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* MY RECENT WORK SECTION (WHITE)                                          */}
          {/* ======================================================================= */}
          <section className="py-14 md:py-16 px-5 bg-white">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl md:text-3xl text-center text-gray-900 mb-3 font-merriweather">
                {lang === "en" ? "My Recent Work" : "Meus Trabalhos Recentes"}
              </h3>
              <p className="text-center text-gray-600 mb-8 text-base font-opensans">
                {lang === "en"
                  ? `See below some examples of my ${currentMonth} ${currentYear} work`
                  : `Veja abaixo alguns exemplos de desenhos canalizados em ${currentMonth} de ${currentYear}`}
              </p>

              {/* 4 Esboços Oficiais Baixados de officialtinaaldea.com */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10">
                <img
                  src="/images/squeeze/sketches/sketch3.jpg"
                  alt="Soulmate Sketch Example 1"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
                <img
                  src="/images/squeeze/sketches/sketch4.jpg"
                  alt="Soulmate Sketch Example 2"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
                <img
                  src="/images/squeeze/sketches/sketch2025.jpg"
                  alt="Soulmate Sketch Example 3"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
                <img
                  src="/images/squeeze/sketches/sketch2.jpg"
                  alt="Soulmate Sketch Example 4"
                  className="rounded-xl shadow-md w-full"
                  loading="lazy"
                />
              </div>

              {/* Final Big CTA Button */}
              <div className="text-center mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsQuizOpen(true);
                    setQuizStep(1);
                  }}
                  className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-5 px-8 text-lg md:text-xl rounded-xl shadow-2xl w-full max-w-md mx-auto flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer font-opensans"
                >
                  <span>{lang === "en" ? "YES, I WANT MY SOULMATE DRAWING >" : "SIM, QUERO MEU DESENHO DA ALMA GÊMEA >"}</span>
                  <span className="text-sm font-normal opacity-90 mt-1 font-opensans">
                    {lang === "en" ? "Risk-Free — 30 day money back guarantee" : "Sem Risco — 30 dias de garantia de reembolso"}
                  </span>
                </button>
              </div>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* FREQUENTLY ASKED QUESTIONS (#FAFAFA)                                    */}
          {/* ======================================================================= */}
          <section className="py-14 md:py-16 px-5 bg-[#FAFAFA]">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-10 font-merriweather">
                {lang === "en" ? "Frequently Asked Questions" : "Perguntas Frequentes"}
              </h2>

              <div className="space-y-3">
                {[
                  {
                    q: lang === "en" ? "How does the Soulmate Sketch work?" : "Como funciona o Desenho da Alma Gêmea?",
                    a: lang === "en"
                      ? "I use intuitive energy readings to tune into the energies and vibrations associated with you. These energies guide me in visualizing and sketching a representation of your potential soulmate, along with a detailed psychic reading about who they are."
                      : "Utilizo leituras intuitivas de energia para sintonizar as vibrações associadas a você. Essas energias me guiam na visualização e desenho detalhado da sua alma gêmea, acompanhado de uma leitura psíquica aprofundada sobre quem ela é.",
                  },
                  {
                    q: lang === "en" ? "What is the price?" : "Qual é o valor?",
                    a: lang === "en"
                      ? "The soulmate sketch and reading package is just $37 USD / R$ 27,90 (normally $147). This includes the sketch, detailed reading, and bonus content."
                      : "O pacote completo com o desenho hiper-realista, a leitura detalhada e o guia de bônus custa apenas R$ 27,90 / $37 USD (preço normal R$ 147,00). Pagamento único e sem assinaturas.",
                  },
                  {
                    q: lang === "en" ? "Why should I trust you?" : "Por que devo confiar em você?",
                    a: lang === "en"
                      ? "I'm Tina Aldea, a psychic artist with a unique gift that I've honed since childhood. My skills were nurtured in a family with deep roots in spiritual and psychic practices. Over 43,000 satisfied clients have trusted me with their soulmate journey."
                      : "Sou Tina Aldea, artista e médium com um dom único aperfeiçoado desde a infância. Minhas habilidades foram cultivadas em uma família com raízes profundas em práticas espirituais. Mais de 43.000 clientes satisfeitos confiaram em minhas visões.",
                  },
                  {
                    q: lang === "en" ? "Can I pay with PayPal / PIX / Credit Card?" : "Quais são as formas de pagamento?",
                    a: lang === "en"
                      ? "Yes! I accept PayPal, PIX with instant approval, and all major credit cards. There will be no unauthorized charges — transactions can only be made manually by you."
                      : "Sim! Aceitamos PIX com aprovação imediata, cartão de crédito e PayPal. Não há cobranças não autorizadas nem mensalidades.",
                  },
                  {
                    q: lang === "en" ? "How soon will I receive my sketch?" : "Em quanto tempo recebo meu desenho?",
                    a: lang === "en"
                      ? "Your sketch and reading will be delivered to your email within 24 hours. You also have the option for express 6-hour delivery."
                      : "Seu desenho e leitura serão entregues no seu e-mail e WhatsApp em até 24 horas (com opção de entrega expressa de 6 horas disponível).",
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

          {/* ======================================================================= */}
          {/* FINAL RATING / CALL TO ACTION (#FDF8F3)                                 */}
          {/* ======================================================================= */}
          <section className="py-14 md:py-16 px-5 bg-[#FDF8F3]">
            <div className="max-w-md mx-auto text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, l) => (
                  <Star key={l} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-2xl font-bold text-gray-900 font-merriweather">4.9 / 5</p>
              <p
                className="text-base text-gray-500 mt-1 mb-8"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {lang === "en" ? "Based on 43,000+ happy clients" : "Baseado em mais de 43.000 clientes satisfeitas"}
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsQuizOpen(true);
                  setQuizStep(1);
                }}
                className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-5 px-10 text-xl rounded-xl shadow-lg w-full flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                <Sparkles className="w-5 h-5" />
                <span>{lang === "en" ? "Start My Soulmate Sketch" : "Iniciar Meu Desenho da Alma Gêmea"}</span>
              </button>

              <p
                className="text-xs text-gray-400 mt-3"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {lang === "en" ? "Risk-Free Purchase — 30 day money back guarantee" : "Compra Sem Risco — 30 dias de garantia de reembolso"}
              </p>
            </div>
          </section>

          {/* ======================================================================= */}
          {/* FOOTER OFICIAL COM LOGO E TEXTOS LEGAIS                                 */}
          {/* ======================================================================= */}
          <footer
            className="bg-gray-100 py-10 px-4 text-center text-xs text-gray-500"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            <div className="mb-6">
              <img
                src="/images/misc/logo.png"
                alt="Tina Aldea - Psychic & Soulmate Sketch Artist"
                className="h-14 mx-auto"
              />
            </div>

            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              <a href="#privacy" className="hover:text-gray-700">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-gray-700">Terms & Conditions</a>
              <span>•</span>
              <a href="#refunds" className="hover:text-gray-700">Refunds</a>
              <span>•</span>
              <a href="#contact" className="hover:text-gray-700">Contact</a>
              <span>•</span>
              <a href="#disclaimer" className="hover:text-gray-700">Disclaimer</a>
            </div>

            <p className="font-semibold mb-6">
              Copyright {currentYear} Tina Aldea. All Rights Reserved.
            </p>

            <div className="max-w-3xl mx-auto space-y-4 mb-6 text-gray-400 text-[11px] leading-relaxed">
              <p className="italic">
                <strong>Advertising Disclaimer:</strong> This website is not affiliated with, endorsed by or sponsored by Facebook Inc. or Google LLC. Facebook and Google are registered trademarks of their respective companies. Any product claim, statistic, quote or other representation about a product or service should be verified with the manufacturer, provider or party in question.
              </p>
              <p className="italic">
                <strong>Disclaimer:</strong> By participating in my services you acknowledge that I am not a licensed psychologist, lawyer, or health care professional and my services do not replace the care of lawyers, psychologists, or other healthcare professionals. All my sketches and readings are intended for entertainment purposes only and may not be unique.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-300">
              <p className="text-xs">
                For product support:{" "}
                <a href="mailto:support@officialtinaaldea.com" className="text-blue-500 hover:underline">
                  support@officialtinaaldea.com
                </a>
              </p>
            </div>
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
              {lang === "en" ? "Almost Complete..." : "Quase Completo..."}
            </p>
            <h3 className="text-base md:text-lg font-bold mt-1.5 leading-snug font-merriweather max-w-md mx-auto">
              {lang === "en"
                ? "Just answer a few simple questions so I can draw your Soulmate accurately..."
                : "Responda a algumas perguntas simples para que eu possa desenhar sua Alma Gêmea com precisão..."}
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
                  {lang === "en" ? "Who are You Interested In?" : "Em quem você tem interesse no amor?"}
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  {lang === "en" ? "Tap to Select your Interest" : "Toque para selecionar sua preferência:"}
                </p>

                <div className="space-y-3">
                  {[
                    { val: "men", label: lang === "en" ? "I am into Men" : "Estou em busca de Homens" },
                    { val: "women", label: lang === "en" ? "I am into Women" : "Estou em busca de Mulheres" },
                    { val: "both", label: lang === "en" ? "I am into Both" : "Estou em busca de Ambos" },
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
                          : "border-gray-300 hover:border-[#4CAF50] hover:bg-green-50 text-gray-800"
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
                  {lang === "en" ? "When were you born?" : "Quando você nasceu?"}
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  {lang === "en" ? "Select your birth date" : "Selecione sua data de nascimento:"}
                </p>

                <div className="grid grid-cols-3 gap-2">
                  {/* Dia */}
                  <div>
                    <label className="text-[11px] text-gray-500 font-bold block mb-1">
                      {lang === "en" ? "Day" : "Dia"}
                    </label>
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
                    <label className="text-[11px] text-gray-500 font-bold block mb-1">
                      {lang === "en" ? "Month" : "Mês"}
                    </label>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-full py-3 px-2 rounded-xl border border-gray-300 text-sm font-semibold bg-white text-gray-800 focus:outline-none focus:border-[#4CAF50]"
                    >
                      {(lang === "en" ? MONTHS_EN : MONTHS_PT).map((m, idx) => (
                        <option key={m} value={idx + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ano */}
                  <div>
                    <label className="text-[11px] text-gray-500 font-bold block mb-1">
                      {lang === "en" ? "Year" : "Ano"}
                    </label>
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
                        Sign: {zodiac.name} ({zodiac.element})
                      </span>
                      <span className="text-[10px] text-gray-500">Astrological energy calibrated</span>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>

                <button
                  type="button"
                  onClick={() => setQuizStep(3)}
                  className="w-full py-4 bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold rounded-xl text-base shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === "en" ? "Continue" : "Continuar"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ETAPA 3 DO QUIZ: ETNIA / PREFERÊNCIA */}
            {quizStep === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  {lang === "en" ? "What is your ethnic background?" : "Qual é a sua ascendência ou preferência?"}
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  {lang === "en"
                    ? "This helps me draw your soulmate more accurately"
                    : "Isso me ajuda a desenhar sua alma gêmea com mais precisão"}
                </p>

                <div className="space-y-2.5">
                  {[
                    { en: "White / Western", pt: "Branca / Ocidental" },
                    { en: "Hispanic / Latino", pt: "Hispânica / Latina" },
                    { en: "Black / African", pt: "Negra / Afrodescendente" },
                    { en: "Asian", pt: "Asiática" },
                    { en: "Any / Leave to Destiny", pt: "Qualquer / Deixo ao Destino" },
                  ].map((et) => (
                    <button
                      key={et.en}
                      type="button"
                      onClick={() => {
                        setEthnicity(lang === "en" ? et.en : et.pt);
                        setQuizStep(4);
                      }}
                      className={`w-full p-3.5 text-left border rounded-xl transition text-sm font-semibold cursor-pointer ${
                        ethnicity === (lang === "en" ? et.en : et.pt)
                          ? "border-[#4CAF50] bg-green-50 text-gray-900 font-bold"
                          : "border-gray-200 hover:border-[#4CAF50] hover:bg-green-50 text-gray-700"
                      }`}
                    >
                      {lang === "en" ? et.en : et.pt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ETAPA 4 DO QUIZ: NOME */}
            {quizStep === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  {lang === "en" ? "What is Your Name?" : "Como você se chama?"}
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  {lang === "en" ? "Enter your name" : "Digite seu nome:"}
                </p>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "en" ? "Enter your name..." : "Digite seu nome aqui..."}
                  className="w-full h-14 px-4 rounded-xl border border-gray-300 text-base font-semibold focus:outline-none focus:border-[#4CAF50]"
                  autoFocus
                />

                <button
                  type="button"
                  disabled={!name.trim()}
                  onClick={() => setQuizStep(5)}
                  className={`w-full py-4 rounded-xl text-base font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    name.trim()
                      ? "bg-[#4CAF50] hover:bg-[#45a049] text-white"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <span>{lang === "en" ? "Continue" : "Continuar"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* ETAPA 5 DO QUIZ: EMAIL E WHATSAPP */}
            {quizStep === 5 && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="font-bold text-gray-900 text-lg font-merriweather">
                  {lang === "en" ? "Where should I send your sketch?" : "Onde devo entregar o seu desenho?"}
                </h4>
                <p className="text-sm text-gray-500 font-opensans">
                  {lang === "en"
                    ? "Your sketch will be delivered directly to your inbox and WhatsApp"
                    : "Seu desenho será entregue diretamente no seu e-mail e WhatsApp"}
                </p>

                <div className="space-y-3 text-left">
                  <div>
                    <label className="text-xs font-bold text-gray-700 block mb-1">
                      {lang === "en" ? "Your WhatsApp (with country/area code):" : "Seu WhatsApp com DDD:"}
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
                      {lang === "en" ? "Your Email Address:" : "Seu melhor e-mail:"}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
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
                      {lang === "en"
                        ? "I confirm I am 18 years or older. I agree to receive emails and updates from Tina Aldea."
                        : "Confirmo que tenho 18 anos ou mais e concordo em receber o desenho da minha alma gêmea por WhatsApp e e-mail."}
                    </span>
                  </label>
                </div>

                <button
                  type="button"
                  disabled={whatsapp.length < 10 || !email.includes("@") || !agreeTerms}
                  onClick={startChanneling}
                  className={`w-full py-4 rounded-xl text-base font-bold shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2 ${
                    whatsapp.length >= 10 && email.includes("@") && agreeTerms
                      ? "bg-[#4CAF50] hover:bg-[#45a049] text-white active:scale-98"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{lang === "en" ? "GET MY SOULMATE SKETCH NOW >" : "CANALIZAR MEU DESENHO AGORA >"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
