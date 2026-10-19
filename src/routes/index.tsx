import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Check,
  Copy,
  Lock,
  ShieldCheck,
  Star,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Download,
  Share2,
  RefreshCw,
  Sparkles,
  Phone,
  Mail,
  QrCode,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: EternizaFunnel,
});

type Step = "scenes" | "upload" | "loading" | "contact" | "checkout" | "delivered";

interface SceneOption {
  id: string;
  title: string;
  video: string;
  poster: string;
}

const SCENES: SceneOption[] = [
  {
    id: "reencontro",
    title: "A escadaria dourada",
    video: "https://eternizaamor.com/assets/video/estilo-escadaria-nuvens.mp4",
    poster: "https://eternizaamor.com/assets/video/estilo-escadaria-nuvens-poster.webp",
  },
  {
    id: "reencontrocarinho",
    title: "O carinho no céu",
    video: "https://eternizaamor.com/assets/video/estilo-carinho-ceu.mp4",
    poster: "https://eternizaamor.com/assets/video/estilo-carinho-ceu-poster.webp",
  },
  {
    id: "reencontronuvens",
    title: "O abraço nas nuvens",
    video: "https://eternizaamor.com/assets/video/estilo-nuvens.mp4",
    poster: "https://eternizaamor.com/assets/video/estilo-nuvens-poster.webp",
  },
  {
    id: "anjopraia",
    title: "Caminhada na praia",
    video: "https://eternizaamor.com/assets/video/estilo-praia.mp4",
    poster: "https://eternizaamor.com/assets/video/estilo-praia-poster.webp",
  },
];

const REVIEWS = [
  "https://eternizaamor.com/assets/img/prova-reencontro-1.webp",
  "https://eternizaamor.com/assets/img/prova-reencontro-2.webp",
  "https://eternizaamor.com/assets/img/prova-reencontro-3.webp",
  "https://eternizaamor.com/assets/img/prova-reencontro-4.webp",
];

function EternizaFunnel() {
  const [step, setStep] = useState<Step>("scenes");
  const [selectedScene, setSelectedScene] = useState<SceneOption>(SCENES[0]);

  // Photos
  const [photoYou, setPhotoYou] = useState<string | null>(null);
  const [photoLoved, setPhotoLoved] = useState<string | null>(null);

  // Loading progress
  const [bar1, setBar1] = useState(0);
  const [bar2, setBar2] = useState(0);
  const [bar3, setBar3] = useState(0);

  // Contact
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Checkout & PIX
  const [pixGenerated, setPixGenerated] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Delivered animation
  const [genStage, setGenStage] = useState(1);
  const [genComplete, setGenComplete] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (step === "checkout" && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // WhatsApp mask
  const handleWhatsappChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 11);
    let formatted = raw;
    if (raw.length > 2) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length > 7) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    setWhatsapp(formatted);
  };

  // Image Upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "you" | "loved") => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (target === "you") setPhotoYou(event.target.result as string);
          else setPhotoLoved(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Run loading animation
  const startLoading = () => {
    setStep("loading");
    setBar1(0);
    setBar2(0);
    setBar3(0);

    let p1 = 0;
    const interval1 = setInterval(() => {
      p1 += 4;
      if (p1 >= 100) {
        p1 = 100;
        clearInterval(interval1);

        let p2 = 0;
        const interval2 = setInterval(() => {
          p2 += 4;
          if (p2 >= 100) {
            p2 = 100;
            clearInterval(interval2);

            let p3 = 0;
            const interval3 = setInterval(() => {
              p3 += 4;
              if (p3 >= 100) {
                p3 = 100;
                clearInterval(interval3);
                setTimeout(() => setStep("contact"), 600);
              }
              setBar3(p3);
            }, 60);
          }
          setBar2(p2);
        }, 60);
      }
      setBar1(p1);
    }, 60);
  };

  // Start Generation on Delivered
  const handlePaymentConfirmed = () => {
    setStep("delivered");
    setGenStage(1);
    setGenComplete(false);

    setTimeout(() => setGenStage(2), 2500);
    setTimeout(() => setGenStage(3), 5000);
    setTimeout(() => setGenComplete(true), 8000);
  };

  // PIX Code
  const pixCodeString =
    "00020126580014br.gov.bcb.pix0136d89e7c41-3b77-4482-9694-8149d5bf1c46520400005303986540528.895802BR5916ETERNIZA SERVICOS6009SAO PAULO62070503***6304C7F2";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCodeString);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3500);
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-white flex flex-col items-center justify-between font-sans selection:bg-[#E7C86B] selection:text-black">
      {/* Centralized Container for mobile/desktop layout */}
      <main className="w-full max-w-[440px] px-4 py-4 flex-1 flex flex-col items-center justify-between min-h-screen">
        {/* ========================================================================= */}
        {/* TELA 21: ESCOLHA DO CENÁRIO                                               */}
        {/* ========================================================================= */}
        {step === "scenes" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              {/* Logo */}
              <div className="mb-2">
                <img
                  src="https://eternizaamor.com/assets/img/eterniza-logo.webp"
                  alt="Eterniza"
                  className="h-10 object-contain mx-auto"
                />
              </div>

              {/* Title */}
              <h1 className="font-fraunces text-2xl sm:text-[27px] font-bold text-white tracking-tight leading-tight mt-1">
                Escolha o cenário
              </h1>
              <p className="text-xs sm:text-[13px] text-white/70 mt-1 mb-4">
                Toque na cena e veja novamente quem fez tanta falta 💛
              </p>

              {/* Grid 2x2 of Scenes */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => {
                      setSelectedScene(scene);
                      setStep("upload");
                    }}
                    className="relative group rounded-2xl overflow-hidden border border-white/20 bg-black aspect-[9/15] flex flex-col justify-end text-left transition-all active:scale-95 hover:border-[#E7C86B] focus:outline-none focus:ring-2 focus:ring-[#E7C86B]"
                  >
                    <video
                      src={scene.video}
                      poster={scene.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                    <div className="relative p-2.5 z-10">
                      <span className="text-[13px] font-bold text-white block leading-tight group-hover:text-[#E7C86B] transition-colors">
                        {scene.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-6 pt-2 pb-2 text-center text-xs text-white/50 w-full flex flex-col gap-1 border-t border-white/10">
              <div className="flex justify-center gap-3">
                <a href="https://eternizaamor.com/termos" target="_blank" rel="noreferrer" className="hover:underline">
                  Termos de Uso
                </a>
                <span>•</span>
                <a href="https://eternizaamor.com/privacidade" target="_blank" rel="noreferrer" className="hover:underline">
                  Privacidade
                </a>
              </div>
              <p className="text-[11px] mt-0.5">
                Precisa de ajuda?{" "}
                <a href="mailto:contato@eternizaamor.com" className="text-[#E7C86B] underline">
                  contato@eternizaamor.com
                </a>
              </p>
            </footer>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TELA 1: UPLOAD DAS 2 FOTOS                                                */}
        {/* ========================================================================= */}
        {step === "upload" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              {/* Back to scenes */}
              <button
                onClick={() => setStep("scenes")}
                className="self-start text-xs text-[#E7C86B] flex items-center gap-1 mb-2 hover:opacity-80 transition"
              >
                ← Trocar cenário ({selectedScene.title})
              </button>

              <div className="mb-2">
                <img
                  src="https://eternizaamor.com/assets/img/eterniza-logo.webp"
                  alt="Eterniza"
                  className="h-9 object-contain mx-auto"
                />
              </div>

              <h1 className="font-fraunces text-2xl font-bold tracking-tight leading-snug">
                Agora dê vida <br />a esse reencontro <span className="inline-block">💛</span>
              </h1>
              <p className="text-xs sm:text-[13px] text-white/70 mt-1 mb-4">
                Envie uma foto sua e uma de quem você quer rever.
              </p>

              {/* Labels */}
              <div className="grid grid-cols-2 gap-3 w-full mb-1 text-[11px] font-bold tracking-wider uppercase text-[#E7C86B]">
                <span>Você</span>
                <span>Quem partiu</span>
              </div>

              {/* Upload Slots */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Slot 1: Você */}
                <label className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-[#E7C86B]/40 bg-[#E7C86B]/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-[#E7C86B] transition active:scale-98">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, "you")}
                  />
                  {photoYou ? (
                    <div className="relative w-full h-full">
                      <img src={photoYou} alt="Sua foto" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                        <span className="text-xs font-bold text-white bg-black/60 px-2 py-1 rounded-md">TROCAR</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-3">
                      <span className="text-3xl text-[#E7C86B] mb-1 font-light">+</span>
                      <span className="text-[12px] font-bold text-white/90 tracking-wide">SUA FOTO</span>
                      <span className="text-[10px] text-white/50 mt-1">Toque para enviar</span>
                    </div>
                  )}
                </label>

                {/* Slot 2: Quem partiu */}
                <label className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-[#E7C86B]/40 bg-[#E7C86B]/5 flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-[#E7C86B] transition active:scale-98">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(e, "loved")}
                  />
                  {photoLoved ? (
                    <div className="relative w-full h-full">
                      <img src={photoLoved} alt="Foto dele(a)" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
                        <span className="text-xs font-bold text-white bg-black/60 px-2 py-1 rounded-md">TROCAR</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-3">
                      <span className="text-3xl text-[#E7C86B] mb-1 font-light">+</span>
                      <span className="text-[12px] font-bold text-white/90 tracking-wide">A FOTO DELE(A)</span>
                      <span className="text-[10px] text-white/50 mt-1">Toque para enviar</span>
                    </div>
                  )}
                </label>
              </div>

              {/* Privacy badge */}
              <p className="text-[12px] text-white/60 mt-3 flex items-center gap-1.5 justify-center">
                <span>🔒</span> Suas fotos são usadas só para criar o seu vídeo.
              </p>

              {/* Button */}
              <button
                disabled={!photoYou || !photoLoved}
                onClick={startLoading}
                className={`w-full mt-4 py-4 rounded-xl font-bold text-sm sm:text-base tracking-wide transition shadow-lg ${
                  photoYou && photoLoved
                    ? "bg-gradient-to-r from-[#FF7A4D] via-[#F8545D] to-[#FFA230] text-white shadow-red-500/20 active:scale-98 animate-pulse-gold"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                CRIAR MEU REENCONTRO
              </button>

              {/* Gallery proof below */}
              <div className="mt-5 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                <img
                  src="https://eternizaamor.com/assets/img/templates-grid-eterniza.webp?v=2"
                  alt="Exemplos de reencontro"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TELA 3: LOADING INTERATIVO                                                */}
        {/* ========================================================================= */}
        {step === "loading" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              <h1 className="font-fraunces text-xl sm:text-2xl font-bold tracking-tight mt-2">
                Preparando o reencontro de vocês…
              </h1>
              <p className="text-xs text-white/70 mt-1 mb-4">
                Estamos reconhecendo os dois rostos e criando o abraço
              </p>

              {/* Example Video */}
              <div className="w-full rounded-2xl overflow-hidden border border-[#E7C86B]/30 shadow-2xl relative bg-black aspect-[9/14] max-h-[380px]">
                <div className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-[#E7C86B] font-semibold flex items-center gap-1">
                  <span>✨</span> Um exemplo do que estamos criando pra você 💛
                </div>
                <video
                  src="https://eternizaamor.com/assets/video/exemplo-reencontro.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Animated Progress Bars */}
              <div className="w-full flex flex-col gap-3 mt-5">
                {/* Bar 1 */}
                <div className="w-full text-left">
                  <div className="flex justify-between text-xs font-semibold text-white/80 mb-1">
                    <span>Reconhecendo os dois rostos</span>
                    <span className="text-[#E7C86B]">{bar1}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#E7C86B] rounded-full transition-all duration-100 ease-out"
                      style={{ width: `${bar1}%` }}
                    />
                  </div>
                </div>

                {/* Bar 2 */}
                <div className="w-full text-left">
                  <div className="flex justify-between text-xs font-semibold text-white/80 mb-1">
                    <span>Preparando o encontro</span>
                    <span className="text-[#E7C86B]">{bar2}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-[#E7C86B] rounded-full transition-all duration-100 ease-out"
                      style={{ width: `${bar2}%` }}
                    />
                  </div>
                </div>

                {/* Bar 3 */}
                <div className="w-full text-left">
                  <div className="flex justify-between text-xs font-semibold text-white/80 mb-1">
                    <span>Criando o abraço</span>
                    <span className="text-[#E7C86B]">{bar3}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#E7C86B] to-[#FF7A4D] rounded-full transition-all duration-100 ease-out"
                      style={{ width: `${bar3}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TELA 5: CAPTURA DE CONTATO (E-MAIL + WHATSAPP)                            */}
        {/* ========================================================================= */}
        {step === "contact" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            <div className="w-full flex flex-col items-center">
              <div className="mb-2">
                <img
                  src="https://eternizaamor.com/assets/img/eterniza-logo.webp"
                  alt="Eterniza"
                  className="h-9 object-contain mx-auto"
                />
              </div>

              <h1 className="font-fraunces text-2xl font-bold tracking-tight leading-snug mt-1">
                Pra onde enviamos a sua <span className="text-[#E7C86B]">cópia</span> do vídeo?
              </h1>

              <div className="w-full flex flex-col gap-3 mt-5">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Seu melhor e-mail"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#E7C86B] transition"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => handleWhatsappChange(e.target.value)}
                    placeholder="Seu WhatsApp com DDD"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#E7C86B] transition"
                  />
                </div>
              </div>

              <p className="text-xs text-white/70 mt-3 text-left leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                Você vê o vídeo aqui na hora e ainda mandamos uma cópia no seu WhatsApp pra guardar pra sempre.{" "}
                <strong className="text-white">Confira se estão corretos.</strong>
              </p>
            </div>

            <div className="w-full pt-4">
              <button
                disabled={!email || whatsapp.length < 14}
                onClick={() => setStep("checkout")}
                className={`w-full py-4 rounded-xl font-bold text-base tracking-wide transition shadow-lg ${
                  email && whatsapp.length >= 14
                    ? "bg-gradient-to-r from-[#FF7A4D] via-[#F8545D] to-[#FFA230] text-white active:scale-98 animate-pulse-gold"
                    : "bg-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TELA 6: CHECKOUT / PAYWALL (PIX)                                          */}
        {/* ========================================================================= */}
        {step === "checkout" && (
          <div className="w-full flex-1 flex flex-col items-center justify-start text-center animate-in fade-in duration-300">
            {/* Countdown Badge */}
            <div className="w-full bg-[#FFC73B]/10 border border-[#FFC73B]/30 text-[#FFD873] py-2 px-3 rounded-xl text-xs font-semibold mb-3 flex items-center justify-center gap-1.5">
              <span>🎁 50% OFF aplicado · expira em</span>
              <strong className="text-white font-mono text-sm">{formatTime(timeLeft)}</strong>
            </div>

            {/* Blurred Teaser Image */}
            <div className="w-full rounded-2xl overflow-hidden relative aspect-[16/8] border border-white/10 mb-3">
              <img
                src="https://eternizaamor.com/assets/img/checkout-hero-reencontro.webp"
                alt="Teaser"
                className="w-full h-full object-cover filter blur-[4px] brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-black/60 border border-white/30 flex items-center justify-center text-xl backdrop-blur-md">
                  🔒
                </div>
              </div>
            </div>

            {/* Title */}
            <span className="text-[11px] font-extrabold tracking-widest text-[#E7C86B] uppercase">
              FALTA SÓ O PAGAMENTO
            </span>
            <h1 className="font-fraunces text-xl sm:text-[22px] font-bold tracking-tight leading-snug mt-0.5">
              Você está a 1 passo de ver essa lembrança ganhar vida
            </h1>
            <p className="text-xs text-white/70 mt-1 mb-3">
              ⭐️ 4,9/5 · <strong className="text-[#E7C86B]">milhares de famílias</strong> emocionadas
            </p>

            {/* Pricing Card */}
            <div className="w-full bg-white/5 border border-white/15 rounded-2xl p-4 text-left mb-4 shadow-xl">
              <div className="flex justify-between items-end border-b border-white/10 pb-3 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-wide">VÍDEO DO REENCONTRO</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs line-through text-white/40">R$ 54,00</span>
                    <span className="text-[11px] font-bold bg-[#FFC73B]/20 border border-[#FFC73B]/40 text-[#FFC73B] px-1.5 py-0.5 rounded">
                      50% OFF
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1 flex items-center gap-1">
                    Taxa de serviço • <strong className="text-white/80">R$ 0,99</strong>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#FFC73B]">R$ 27,90</span>
                  <span className="block text-[10px] text-white/40">pagamento único</span>
                </div>
              </div>

              {!pixGenerated ? (
                <div>
                  <button
                    onClick={() => setPixGenerated(true)}
                    className="w-full py-4 rounded-xl font-black text-sm sm:text-base tracking-wide bg-gradient-to-r from-[#FF7A4D] via-[#F8545D] to-[#FFA230] text-white shadow-xl shadow-red-500/20 active:scale-98 animate-pulse-gold transition"
                  >
                    QUERO VIVER ESTE REENCONTRO
                  </button>
                  <p className="text-center text-[11px] text-white/60 mt-2 flex items-center justify-center gap-1">
                    ⚡ Pague com <strong>PIX</strong> · aprovação imediata
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 animate-in fade-in duration-300">
                  <div className="text-center">
                    <span className="text-xs text-[#E7C86B] font-bold">⚡ PIX · aprovação na hora</span>
                    <div className="text-3xl font-black text-white mt-1">R$ 28,89</div>
                    <p className="text-[11px] text-white/60">Pagamento único · seu vídeo chega no WhatsApp</p>
                  </div>

                  {/* PIX Copy Button */}
                  <button
                    onClick={handleCopyPix}
                    className={`w-full py-4 px-3 rounded-xl font-black text-sm tracking-wide text-black flex items-center justify-center gap-2 transition relative overflow-hidden shadow-xl ${
                      pixCopied
                        ? "bg-[#8ff0b3]"
                        : "bg-gradient-to-b from-[#41E877] via-[#25C55B] to-[#17A94B] animate-pix-halo animate-pix-shine text-black"
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

                  {/* 3 Steps */}
                  <ol className="bg-black/30 border border-white/10 rounded-xl p-3 flex flex-col gap-2 text-xs text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E7C86B] text-black font-bold flex items-center justify-center text-[10px]">
                        1
                      </span>
                      <span>Abra o app do seu banco</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E7C86B] text-black font-bold flex items-center justify-center text-[10px]">
                        2
                      </span>
                      <span>
                        Cole em <strong>Pix Copia e Cola</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#E7C86B] text-black font-bold flex items-center justify-center text-[10px]">
                        3
                      </span>
                      <span>
                        Seu vídeo chega no <strong>WhatsApp</strong>
                      </span>
                    </li>
                  </ol>

                  {/* Collapsibles for Code and QR */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setShowCode(!showCode)}
                      className="py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70 flex items-center justify-center gap-1.5 hover:text-white"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{showCode ? "Ocultar código" : "Ver código"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQr(!showQr)}
                      className="py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70 flex items-center justify-center gap-1.5 hover:text-white"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>{showQr ? "Ocultar QR" : "Ver QR Code"}</span>
                    </button>
                  </div>

                  {showCode && (
                    <div className="mt-1">
                      <textarea
                        readOnly
                        value={pixCodeString}
                        className="w-full text-[11px] font-mono bg-black/60 border border-white/20 p-2 rounded-lg text-white/90 h-20 resize-none break-all"
                      />
                    </div>
                  )}

                  {showQr && (
                    <div className="bg-white p-3 rounded-xl mx-auto flex flex-col items-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                          pixCodeString
                        )}`}
                        alt="QR Code PIX"
                        className="w-36 h-36"
                      />
                      <span className="text-[10px] text-black/70 font-semibold mt-1">
                        Aponte a câmera do seu banco
                      </span>
                    </div>
                  )}

                  {/* Pulsing Status */}
                  <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E7C86B] animate-ping" />
                    <div className="text-left text-xs leading-tight">
                      <strong className="text-white block">Aguardando o pagamento…</strong>
                      <span className="text-[11px] text-white/50">Você não precisa fazer mais nada</span>
                    </div>
                  </div>

                  {/* Dev Simulation Button */}
                  <button
                    onClick={handlePaymentConfirmed}
                    className="mt-2 text-xs text-[#E7C86B] underline opacity-80 hover:opacity-100"
                  >
                    ⚡ Simular confirmação de pagamento (Ver resultado)
                  </button>
                </div>
              )}
            </div>

            {/* Features list */}
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left mb-4">
              <h2 className="text-sm font-bold text-white mb-2 flex items-center gap-1">
                <span>✨</span> O que você recebe
              </h2>
              <ul className="text-xs text-white/80 space-y-2">
                <li className="flex items-center gap-2">
                  <span>🎬</span> O vídeo do reencontro de vocês, em movimento
                </li>
                <li className="flex items-center gap-2">
                  <span>🎵</span> Com música emocionante e sem marca d'água
                </li>
                <li className="flex items-center gap-2">
                  <span>📱</span> Aparece na sua tela em ~2 minutos (+ cópia no WhatsApp)
                </li>
                <li className="flex items-center gap-2">
                  <span>💳</span> Pagamento único — sem mensalidade
                </li>
              </ul>
            </div>

            {/* Guarantee */}
            <div className="w-full bg-[#3ddc6f]/5 border border-[#3ddc6f]/20 rounded-2xl p-4 text-left mb-4 flex items-start gap-3">
              <img
                src="https://eternizaamor.com/assets/img/guarantee-shield.png"
                alt="Garantia"
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <div>
                <h3 className="text-xs font-bold text-[#8ff0b3]">
                  Emoção garantida ou seu dinheiro de volta
                </h3>
                <p className="text-[11px] text-white/70 mt-1 leading-relaxed">
                  Se o seu reencontro não tocar o seu coração, devolvemos 100% do seu dinheiro em até 14 dias.
                </p>
              </div>
            </div>

            {/* Reviews Carousel */}
            <div className="w-full mb-6">
              <p className="text-[11px] text-[#E7C86B] font-bold text-center mb-1">⭐️ 4,9/5 · DEPOIMENTOS REAIS</p>
              <h2 className="font-fraunces text-base font-bold text-center mb-3">
                Amado por milhares de famílias brasileiras 👇
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
                {REVIEWS.map((src, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[78%] rounded-2xl overflow-hidden border border-white/10 shadow-lg snap-center bg-black"
                  >
                    <img src={src} alt="Depoimento real" className="w-full h-auto object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <footer className="text-xs text-white/50 text-center pb-6 flex flex-col gap-1 w-full border-t border-white/10 pt-4">
              <div className="flex justify-center gap-3">
                <a href="https://eternizaamor.com/termos" target="_blank" rel="noreferrer" className="hover:underline">
                  Termos de Uso
                </a>
                <span>•</span>
                <a href="https://eternizaamor.com/privacidade" target="_blank" rel="noreferrer" className="hover:underline">
                  Privacidade
                </a>
              </div>
              <p className="text-[11px]">
                Precisa de ajuda?{" "}
                <a href="mailto:contato@eternizaamor.com" className="text-[#E7C86B] underline">
                  contato@eternizaamor.com
                </a>
              </p>
            </footer>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TELA 7: VÍDEO PRONTO (ENTREGÁVEL) & UPSELL                                */}
        {/* ========================================================================= */}
        {step === "delivered" && (
          <div className="w-full flex-1 flex flex-col items-center justify-between text-center animate-in fade-in duration-300">
            {!genComplete ? (
              /* Waiting Scene: "A luz que atravessa" */
              <div className="w-full flex-1 flex flex-col items-center justify-center py-8">
                {/* Two user photos floating towards each other */}
                <div className="relative flex items-center justify-center gap-4 mb-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl animate-cena-respira">
                    <img
                      src={photoYou || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"}
                      alt="Você"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Beam of glowing light */}
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#E7C86B] to-transparent relative">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#E7C86B]/60 filter blur-[2px] animate-ping" />
                  </div>
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E7C86B] shadow-2xl shadow-[#E7C86B]/30 animate-cena-respira">
                    <img
                      src={photoLoved || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300"}
                      alt="Quem partiu"
                      className="w-full h-full object-cover filter sepia-[0.2] brightness-105"
                    />
                  </div>
                </div>

                <h2 className="font-fraunces text-2xl font-bold text-white mb-2">
                  Estamos preparando o encontro de vocês
                </h2>
                <p className="text-xs text-[#E7C86B] font-semibold mb-6">⏱️ costuma levar alguns instantes</p>

                {/* Steps */}
                <ol className="text-left text-xs space-y-2.5 max-w-[260px] mx-auto mb-6">
                  <li className={`flex items-center gap-2 ${genStage >= 1 ? "text-white font-bold" : "text-white/30"}`}>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        genStage >= 1 ? "bg-[#E7C86B] shadow-[0_0_8px_#E7C86B]" : "bg-white/20"
                      }`}
                    />
                    Reconhecendo os rostos
                  </li>
                  <li className={`flex items-center gap-2 ${genStage >= 2 ? "text-white font-bold" : "text-white/30"}`}>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        genStage >= 2 ? "bg-[#E7C86B] shadow-[0_0_8px_#E7C86B]" : "bg-white/20"
                      }`}
                    />
                    Construindo o encontro
                  </li>
                  <li className={`flex items-center gap-2 ${genStage >= 3 ? "text-white font-bold" : "text-white/30"}`}>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        genStage >= 3 ? "bg-[#E7C86B] shadow-[0_0_8px_#E7C86B]" : "bg-white/20"
                      }`}
                    />
                    Dando vida à cena
                  </li>
                </ol>

                <p className="text-xs text-white/70 max-w-[30ch]">
                  Fica aqui com a gente — ele aparece nesta tela 💛
                </p>
              </div>
            ) : (
              /* Completed Video View */
              <div className="w-full flex-1 flex flex-col items-center animate-in zoom-in-95 duration-500">
                <div className="text-center mb-3">
                  <h1 className="font-fraunces text-2xl font-bold text-white">
                    🎉 Seu reencontro está pronto!
                  </h1>
                  <p className="text-xs text-white/70 mt-0.5">Enviamos uma cópia também no seu WhatsApp 💛</p>
                </div>

                {/* Video Player */}
                <div className="w-full rounded-2xl overflow-hidden border border-[#E7C86B]/40 shadow-2xl relative bg-black aspect-[9/15] max-h-[460px] mb-4">
                  <video
                    src={selectedScene.video}
                    controls
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Download Button */}
                <div className="w-full flex flex-col gap-2.5 mb-6">
                  <a
                    href={selectedScene.video}
                    download="meu-reencontro.mp4"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-[#B47B1E] to-[#E8C25A] text-black shadow-lg flex items-center justify-center gap-2 active:scale-98 transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar meu vídeo</span>
                  </a>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: "Meu Reencontro Eterniza",
                          url: window.location.href,
                        });
                      } else {
                        alert("Link copiado para compartilhar!");
                      }
                    }}
                    className="w-full py-3 rounded-xl font-semibold text-xs bg-white/10 text-white flex items-center justify-center gap-2 hover:bg-white/15 transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartilhar com a família</span>
                  </button>
                </div>

                {/* Upsell Card */}
                <div className="w-full bg-gradient-to-b from-[#E7C86B]/15 to-transparent border border-[#E7C86B]/30 rounded-2xl p-4 text-center mb-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E7C86B] bg-[#E7C86B]/10 px-2.5 py-1 rounded-full">
                    Oferta especial
                  </span>
                  <h3 className="font-fraunces text-lg font-bold text-white mt-2">
                    Vocês dois, em outro cenário
                  </h3>
                  <p className="text-xs text-white/70 mt-1 mb-3">
                    Use as mesmas fotos ou escolha outras.
                  </p>
                  <div className="flex items-baseline justify-center gap-2 mb-3">
                    <span className="text-xs text-white/40 line-through">R$ 27,00</span>
                    <span className="text-2xl font-black text-[#E7C86B]">R$ 19,90</span>
                  </div>
                  <button
                    onClick={() => {
                      setStep("scenes");
                      setGenComplete(false);
                      setPixGenerated(false);
                    }}
                    className="w-full py-3.5 rounded-xl font-bold text-xs bg-white text-black hover:bg-white/90 active:scale-98 transition"
                  >
                    APROVEITAR DESCONTO
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
