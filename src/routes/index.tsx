import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Star,
  Lock,
  Check,
  Copy,
  Phone,
  Mail,
  Download,
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
  Award,
  Zap,
  ShoppingBag,
  MessageCircle,
  Send,
  RefreshCw,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: TinaAldeaExactClone,
});

type Lang = "en" | "pt";
type ActiveMode = "chat" | "classic";
type ChatPhase = "landing" | "connecting" | "chat";

interface ChatMessage {
  id: number;
  from: "tina" | "user";
  kind: "text" | "resonance" | "offer";
  text?: string;
  sign?: string;
  target?: number;
}

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

const CLIENT_TESTIMONIALS_CHAT = [
  {
    text: "And like your reading, he happens to be a doctor, he mentors other residents, and he really does have beautiful hands.",
    tag: "After meeting him"
  },
  {
    text: "THAT IS SO COOL! oh my gosh! That's crazy!! And I imagined it too! That's just great!",
    tag: "On sketch delivery"
  },
  {
    text: "Well, I feel I met him before somewhere but can't remember. A warm feeling. But we'll see if he will come to find me.",
    tag: "After her reading"
  },
  {
    text: "I have to say I am somewhat skeptical of the sketch but I guess I have to wait and see.",
    tag: "First message from a new client"
  },
  {
    text: "This man looked sort of familiar, more than others… he had a little facial hair and glasses on. Never know.",
    tag: "On sketch delivery"
  }
];

const EMOTION_OPTIONS = [
  { value: "wrong-people", en: "I keep attracting the wrong people", pt: "Continuo atraindo as pessoas erradas" },
  { value: "waiting", en: "I feel like I've been waiting forever", pt: "Sinto que estou esperando há uma eternidade" },
  { value: "confused", en: "I'm confused about someone in my life", pt: "Estou em dúvida sobre alguém na minha vida" },
  { value: "given-up", en: "I've almost given up on love", pt: "Quase desisti de encontrar o amor" },
];

const EMOTION_REPLIES: Record<string, { en: string[]; pt: string[] }> = {
  "wrong-people": {
    en: [
      "I hear that more often than you'd believe — but with you it lands differently.",
      "You give fast, and you forgive faster. That's not weakness, {name}. But it is a pattern. Hold that thought — it matters for what I'm about to look at."
    ],
    pt: [
      "Ouço isso com muita frequência — mas no seu caso a energia bate de forma diferente.",
      "Você se entrega rápido e perdoa mais rápido ainda. Isso não é fraqueza, {name}. Mas é um padrão cármico. Guarde isso — é crucial para o que vou sintonizar agora."
    ]
  },
  "waiting": {
    en: [
      "The waiting is the hardest one. Not because nothing happens — but because you start wondering if it's you.",
      "It isn't, {name}. Timing and person are two different readings. Let me look at both."
    ],
    pt: [
      "A espera é a parte mais dolorosa. Não porque nada acontece, mas porque você começa a achar que o problema é com você.",
      "Não é, {name}. O momento certo e a pessoa certa são leituras diferentes. Vou olhar para as duas agora."
    ]
  },
  "confused": {
    en: [
      "Someone specific… I thought so. There's a reason your mind keeps circling back to them.",
      "Confusion usually means the connection is real but the picture is incomplete. That's exactly what a sketch is for, {name}."
    ],
    pt: [
      "Alguém em mente… eu imaginei. Há uma razão energética para sua mente continuar voltando nessa pessoa.",
      "A dúvida geralmente surge quando a conexão existe, mas o quadro está incompleto. É exatamente para isso que o desenho serve, {name}."
    ]
  },
  "given-up": {
    en: [
      "I'm glad you told me that instead of pretending. Almost giving up is not the same as giving up, {name}.",
      "The people who tell me this are usually closer than they think. Let me see if that's true for you."
    ],
    pt: [
      "Fico feliz que tenha sido sincera(o) comigo em vez de fingir. Quase desistir não é o mesmo que desistir, {name}.",
      "As pessoas que me dizem isso costumam estar muito mais perto do encontro do que imaginam. Deixe-me ver se isso é verdade para você."
    ]
  }
};

const DESIRE_OPTIONS = [
  { value: "safe", en: "Safe — someone who finally stays", pt: "Segurança — alguém que finalmente fique" },
  { value: "seen", en: "Passionate — someone who truly sees me", pt: "Paixão — alguém que verdadeiramente me enxergue" },
  { value: "peace", en: "Peaceful — no more games, no more guessing", pt: "Paz — sem joguinhos, sem incertezas" }
];

const DESIRE_REPLIES: Record<string, { en: string; pt: string }> = {
  safe: {
    en: "Someone who stays. I'll look for steadiness in the face, {name} — it shows around the eyes.",
    pt: "Alguém que fique. Vou procurar pela firmeza no rosto, {name} — isso sempre transparece no olhar."
  },
  seen: {
    en: "To be truly seen… that's the rarest one, and the strongest pull. Good.",
    pt: "Ser verdadeiramente vista(o)… essa é a conexão mais rara e magnética. Muito bom."
  },
  peace: {
    en: "Peace. After what you've carried, {name}, that's not a small ask — it's the right one.",
    pt: "Paz. Depois de tudo o que você carregou, {name}, não é pedir muito — é pedir o que você merece."
  }
};

const ZODIAC_READINGS: Record<string, { en: string; pt: string }> = {
  Aries: {
    en: "A fire sign. You don't wait for love — which is exactly why the wrong ones chase you and the right one has to catch you still.",
    pt: "Signo de fogo. Você não espera parada(o) — e é por isso que os errados correm atrás e o certo precisa encontrar você em paz."
  },
  Taurus: {
    en: "An earth sign. You build slowly and loyally — but once someone is in, you keep the door open long after they've stopped deserving it.",
    pt: "Signo de terra. Você constrói com lealdade — mas quando alguém entra, você mantém a porta aberta mesmo após deixarem de merecer."
  },
  Gemini: {
    en: "An air sign. Your mind moves faster than your heart admits. You talk yourself out of feelings that were trying to tell you something.",
    pt: "Signo de ar. Sua mente é ágil. Às vezes você tenta racionalizar sentimentos que o seu coração já havia percebido."
  },
  Cancer: {
    en: "A water sign. You feel everything first and explain it later. Your softness is real — and it's been mistaken for an invitation.",
    pt: "Signo de água. Você sente tudo primeiro e racionaliza depois. Sua sensibilidade é pura — e já foi mal interpretada no passado."
  },
  Leo: {
    en: "A fire sign. You love loudly and generously — and you've learned to perform 'fine' better than almost anyone.",
    pt: "Signo de fogo. Você ama com intensidade e generosidade — e aprendeu a fingir que está tudo bem melhor do que qualquer um."
  },
  Virgo: {
    en: "An earth sign. You notice everything. The detail others miss is the exact detail that's been hurting you.",
    pt: "Signo de terra. Você repara em tudo. O detalhe que os outros não percebem é exatamente o que tem mexido com você."
  },
  Libra: {
    en: "An air sign. You keep the peace so well that no one asks what it costs you. In love, that bill has come due more than once.",
    pt: "Signo de ar. Você preserva tanto a harmonia que quase ninguém pergunta o quanto isso te custa por dentro."
  },
  Scorpio: {
    en: "A water sign. You don't do halfway. When you attach, it's total — which is why the endings have cut so deep.",
    pt: "Signo de água. Você não faz nada pela metade. Quando se entrega, é por inteiro — por isso as partidas doeram tanto."
  },
  Sagittarius: {
    en: "A fire sign. Freedom matters to you — but lately you've wondered if you've been running toward something or away from it.",
    pt: "Signo de fogo. Liberdade é essencial — mas ultimamente você tem se perguntado se estava correndo em direção ou fugindo de algo."
  },
  Capricorn: {
    en: "An earth sign. You hold your life together for everyone. Being held, for once, is the thing you never ask for.",
    pt: "Signo de terra. Você segura as pontas para todo mundo. Ser cuidada(o), por uma vez, é algo que você raramente pede."
  },
  Aquarius: {
    en: "An air sign. You connect deeply but on your own terms — and most people never get far enough to learn that.",
    pt: "Signo de ar. Sua conexão é profunda e autêntica — poucos têm a sensibilidade de alcançar sua essência verdadeira."
  },
  Pisces: {
    en: "A water sign. You dream in full color, love included. The world has told you to be realistic. I won't.",
    pt: "Signo de água. Você sonha com o amor verdadeiro. O mundo pode dizer para você ser realista, mas as cartas mostram sua fé intacta."
  }
};

function TinaAldeaExactClone() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeMode, setActiveMode] = useState<ActiveMode>("chat");
  const [chatPhase, setChatPhase] = useState<ChatPhase>("landing");

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentInputType, setCurrentInputType] = useState<
    "none" | "name" | "emotion" | "interest" | "confirm_women" | "desire" | "birthdate" | "ethnicity"
  >("none");
  const [textInputValue, setTextInputValue] = useState("");
  const [chatZodiac, setChatZodiac] = useState<{ name: string; symbol: string; element: string }>({
    name: "Cancer",
    symbol: "♋",
    element: "Water"
  });
  const [resonanceTarget, setResonanceTarget] = useState(94);
  const [resonanceValue, setResonanceValue] = useState(12);
  const [isOfferUnlocked, setIsOfferUnlocked] = useState(false);
  const [chatTimeLeft, setChatTimeLeft] = useState(15 * 60);

  // Form captured values
  const [name, setName] = useState("");
  const [emotion, setEmotion] = useState("waiting");
  const [interest, setInterest] = useState<"men" | "women" | "both">("men");
  const [birthDay, setBirthDay] = useState("15");
  const [birthMonth, setBirthMonth] = useState("6");
  const [birthYear, setBirthYear] = useState("1996");
  const [ethnicity, setEthnicity] = useState("White / Western");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Plan Selection & Checkout
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "complete">("complete");
  const [pixCopied, setPixCopied] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isUpsellView, setIsUpsellView] = useState(false);
  const [deliverableTab, setDeliverableTab] = useState<"sketch" | "reading" | "bonus1" | "bonus2" | "bonus3">("sketch");

  // Classic Squeeze State
  const [isClassicQuizOpen, setIsClassicQuizOpen] = useState(false);
  const [classicQuizStep, setClassicQuizStep] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const msgIdCounter = useRef(0);

  // Auto scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, currentInputType, isOfferUnlocked]);

  // Chat countdown timer
  useEffect(() => {
    if (isOfferUnlocked && chatTimeLeft > 0) {
      const timer = setInterval(() => setChatTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
      return () => clearInterval(timer);
    }
  }, [isOfferUnlocked, chatTimeLeft]);

  // Resonance progress bar animation
  useEffect(() => {
    if (resonanceValue < resonanceTarget) {
      const timer = setTimeout(() => {
        setResonanceValue((prev) => Math.min(resonanceTarget, prev + 3));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [resonanceValue, resonanceTarget]);

  const addMessage = (from: "tina" | "user", kind: "text" | "resonance" | "offer", text?: string, sign?: string) => {
    msgIdCounter.current += 1;
    setMessages((prev) => [
      ...prev,
      { id: msgIdCounter.current, from, kind, text, sign, target: resonanceTarget }
    ]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const tinaSpeak = async (texts: string[]) => {
    for (const rawText of texts) {
      const formatted = rawText.replace(/\{name\}/g, name || (lang === "en" ? "love" : "querida(o)"));
      setIsTyping(true);
      await sleep(Math.min(2200, 900 + formatted.length * 18));
      setIsTyping(false);
      addMessage("tina", "text", formatted);
      await sleep(350);
    }
  };

  const handleStartChat = async () => {
    setChatPhase("connecting");
    await sleep(2200);
    setChatPhase("chat");

    await sleep(400);
    if (lang === "en") {
      await tinaSpeak([
        "Hi love… you found me. 💫",
        "Something guided you here tonight — I don't believe that's an accident.",
        "Before I look at anything… what's your first name?"
      ]);
    } else {
      await tinaSpeak([
        "Olá, amor… você me encontrou. 💫",
        "Algo guiou você até aqui esta noite — e eu não acredito que isso tenha sido por acaso.",
        "Antes de sintonizar qualquer energia… como você se chama?"
      ]);
    }
    setCurrentInputType("name");
  };

  const handleNameSubmit = async () => {
    if (!textInputValue.trim()) return;
    const cleanName = textInputValue.trim();
    setName(cleanName);
    setTextInputValue("");
    setCurrentInputType("none");
    addMessage("user", "text", cleanName);

    if (lang === "en") {
      await tinaSpeak([
        `${cleanName}. I like saying it slowly — names carry energy.`,
        "Now be honest with me, because it changes what I look for. Where is your heart right now?"
      ]);
    } else {
      await tinaSpeak([
        `${cleanName}. Gosto de pronunciar devagar — os nomes carregam vibrações fortes.`,
        "Agora seja sincera(o) comigo, pois isso muda a frequência do que vou procurar. Onde está seu coração hoje?"
      ]);
    }
    setCurrentInputType("emotion");
  };

  const handleEmotionPick = async (pickedVal: string, pickedLabel: string) => {
    setEmotion(pickedVal);
    setCurrentInputType("none");
    addMessage("user", "text", pickedLabel);

    const replies = EMOTION_REPLIES[pickedVal] || EMOTION_REPLIES["waiting"];
    await tinaSpeak(lang === "en" ? replies.en : replies.pt);

    if (lang === "en") {
      await tinaSpeak(["When I sketch the face that's coming toward you — who am I looking for?"]);
    } else {
      await tinaSpeak(["Quando eu for desenhar o rosto que está vindo em sua direção — quem devo procurar?"]);
    }
    setCurrentInputType("interest");
  };

  const handleInterestPick = async (pickedInterest: "men" | "women" | "both", pickedLabel: string) => {
    setInterest(pickedInterest);
    setCurrentInputType("none");
    addMessage("user", "text", pickedLabel);

    if (pickedInterest === "women") {
      if (lang === "en") {
        await tinaSpeak(["Just so I draw the right face: you want me to draw a WOMAN for you?"]);
      } else {
        await tinaSpeak(["Apenas para confirmar a energia correta: você deseja que eu desenhe uma MULHER?"]);
      }
      setCurrentInputType("confirm_women");
      return;
    }

    await proceedToDesire();
  };

  const proceedToDesire = async () => {
    if (lang === "en") {
      await tinaSpeak([
        "Good. Close your eyes for a second, {name}.",
        "The love you're waiting for — what does it feel like?"
      ]);
    } else {
      await tinaSpeak([
        "Ótimo. Feche os olhos por um segundo, {name}.",
        "O amor que você tanto espera — como ele se parece no seu peito?"
      ]);
    }
    setCurrentInputType("desire");
  };

  const handleDesirePick = async (desireVal: string, pickedLabel: string) => {
    setCurrentInputType("none");
    addMessage("user", "text", pickedLabel);

    const reply = DESIRE_REPLIES[desireVal] || DESIRE_REPLIES.safe;
    await tinaSpeak([lang === "en" ? reply.en : reply.pt]);

    if (lang === "en") {
      await tinaSpeak(["Now the most important part. Your date of birth — that's the doorway I read through."]);
    } else {
      await tinaSpeak(["Agora a parte mais importante. Sua data de nascimento — esse é o portal astrológico pelo qual eu leio."]);
    }
    setCurrentInputType("birthdate");
  };

  const handleBirthDateSubmit = async () => {
    setCurrentInputType("none");
    const d = parseInt(birthDay) || 1;
    const m = parseInt(birthMonth) || 1;
    const zodiacObj = getZodiac(d, m);
    setChatZodiac(zodiacObj);

    const formattedDate = `${birthDay}/${birthMonth}/${birthYear}`;
    addMessage("user", "text", formattedDate);

    if (lang === "en") {
      await tinaSpeak(["Give me a moment with this. Don't type anything…"]);
    } else {
      await tinaSpeak(["Me dê um momento com isso. Não digite nada…"]);
    }

    // Trigger resonance card
    setResonanceValue(15);
    setResonanceTarget(94);
    addMessage("tina", "resonance", undefined, zodiacObj.name);
    await sleep(3500);

    const zReading = ZODIAC_READINGS[zodiacObj.name] || ZODIAC_READINGS.Cancer;
    if (lang === "en") {
      await tinaSpeak([
        `${zodiacObj.name}. I had a feeling, {name}.`,
        zReading.en,
        "One more thing, so the face comes through clearly — which background should I attune your sketch to?"
      ]);
    } else {
      await tinaSpeak([
        `${zodiacObj.name}. Eu tive um pressentimento nítido, {name}.`,
        zReading.pt,
        "Mais uma coisa para que o desenho saia com exatidão — a qual ascendência devo sintonizar o seu retrato?"
      ]);
    }
    setCurrentInputType("ethnicity");
  };

  const handleEthnicityPick = async (ethVal: string, ethLabel: string) => {
    setEthnicity(ethVal);
    setCurrentInputType("none");
    addMessage("user", "text", ethLabel);

    if (lang === "en") {
      await tinaSpeak([
        "That's everything I need, {name}. Now stay with me…",
        "I'm connecting your birth energy to what came through just now. This takes me a moment. 🕯️"
      ]);
    } else {
      await tinaSpeak([
        "Isso é tudo que eu precisava, {name}. Fique aqui comigo…",
        "Estou conectando sua vibração natal ao canal cósmico. Isso leva apenas alguns instantes. 🕯️"
      ]);
    }

    setIsTyping(true);
    await sleep(4000);
    setIsTyping(false);

    if (lang === "en") {
      await tinaSpeak([
        "{name}… it's done. I have what I need.",
        "What I'm seeing around you is honest — and a little surprising. I'd rather show you than describe it in a rushed chat message.",
        "Here's what I'll do: I'll personally hand-draw the face I connected to, and with the Complete Vision I'll write out your full reading too. I've placed your session under your name — I hold it while this chat stays open."
      ]);
    } else {
      await tinaSpeak([
        "{name}… está pronto. Eu recebi a visão.",
        "O que vi ao redor da sua aura é muito real — e revelador. Eu prefiro desenhar e mostrar a você do que tentar resumir em uma mensagem rápida.",
        "Aqui está o que farei: vou desenhar pessoalmente à mão o rosto exato que se conectou a você, e na Visão Completa escreverei toda a leitura detalhada. Reservei o seu atendimento pelo tempo que este chat estiver aberto."
      ]);
    }

    setIsOfferUnlocked(true);
  };

  const formatSecs = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const priceBrl = selectedPlan === "complete" ? 47.0 : 27.9;
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

  return (
    <div className="min-h-screen bg-[#faf8ff] text-gray-900 font-sans selection:bg-purple-600 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & MODE SWITCHER                                            */}
      {/* ========================================================================= */}
      <header className="bg-[#1a0533] text-white py-2 px-4 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold tracking-wide">
              {lang === "en" ? "Official Website of Tina Aldea — Beware of imitations" : "Site Oficial de Tina Aldea — Cuidado com imitações"}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mode Switcher */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setActiveMode("chat")}
                className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition cursor-pointer flex items-center gap-1 ${
                  activeMode === "chat" ? "bg-purple-600 text-white shadow-xs" : "text-white/70 hover:text-white"
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Tina</span>
              </button>
              <button
                onClick={() => setActiveMode("classic")}
                className={`px-2.5 py-1 rounded-md font-bold text-[11px] transition cursor-pointer flex items-center gap-1 ${
                  activeMode === "classic" ? "bg-purple-600 text-white shadow-xs" : "text-white/70 hover:text-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{lang === "en" ? "Classic Page" : "Página Padrão"}</span>
              </button>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center bg-white/15 rounded-md px-1.5 py-0.5 font-bold text-[11px]">
              <button
                onClick={() => setLang("en")}
                className={`px-1 rounded ${lang === "en" ? "bg-white text-purple-900" : "text-white/80"}`}
              >
                EN
              </button>
              <span className="mx-0.5 opacity-50">/</span>
              <button
                onClick={() => setLang("pt")}
                className={`px-1 rounded ${lang === "pt" ? "bg-white text-purple-900" : "text-white/80"}`}
              >
                PT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CHAT EXPERIENCE (MODO CHAT OFICIAL TINA ALDEA)                         */}
      {/* ========================================================================= */}
      {activeMode === "chat" && (
        <div>
          {/* FASE 1: LANDING DO CHAT */}
          {chatPhase === "landing" && (
            <div className="max-w-md mx-auto px-4 pt-8 pb-16 text-center animate-in fade-in duration-300">
              {/* Avatar com Badge Online */}
              <div className="relative inline-block mb-4">
                <img
                  src="/images/misc/tina-circle.jpg"
                  alt="Tina Aldea"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl mx-auto ring-4 ring-purple-100"
                />
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-[3px] border-white shadow-xs" />
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{lang === "en" ? "Tina is available right now" : "Tina está online agora"}</span>
              </div>

              <h1 className="text-2xl font-bold font-merriweather text-gray-900">
                Tina Aldea
              </h1>
              <p className="text-sm text-purple-700 font-semibold mt-0.5 font-opensans">
                {lang === "en" ? "Psychic Soulmate Sketch Artist" : "Artista Psíquica e Retratista de Almas Gêmeas"}
              </p>

              {/* Stars & Social Proof */}
              <div className="flex items-center justify-center gap-1 mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-xs text-gray-600 font-medium ml-1">
                  {lang === "en" ? "Trusted by 6,000+ women" : "Mais de 43.000 clientes satisfeitas"}
                </span>
              </div>

              {/* Main Hook */}
              <h2 className="text-2xl md:text-3xl font-bold font-merriweather text-gray-900 mt-6 leading-snug">
                {lang === "en" ? (
                  <>
                    "I Met My Soulmate in <span className="text-purple-700">Two Weeks</span> After I Got My Sketch"
                  </>
                ) : (
                  <>
                    "Conheci Minha Alma Gêmea em <span className="text-purple-700">Duas Semanas</span> Após Receber o Desenho"
                  </>
                )}
              </h2>

              <p className="text-sm md:text-base text-gray-600 mt-3 leading-relaxed font-opensans">
                {lang === "en"
                  ? "Chat privately with Tina right now. She reads your birth energy live — then hand-draws the face of the person coming toward you."
                  : "Converse em particular com Tina agora mesmo. Ela sintoniza sua energia de nascimento ao vivo — e desenha à mão o rosto da pessoa destinada a você."}
              </p>

              {/* CTA Button */}
              <button
                onClick={handleStartChat}
                className="mt-6 w-full py-4 rounded-2xl text-white text-lg font-bold shadow-xl transition-all duration-200 hover:brightness-105 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{lang === "en" ? "Begin My Chat Reading →" : "Iniciar Minha Leitura no Chat →"}</span>
              </button>

              <p className="text-xs text-gray-500 mt-2.5 flex items-center justify-center gap-1.5 font-opensans">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>{lang === "en" ? "Private • Takes about 2 minutes • No card needed to start" : "Privado • Leva cerca de 2 minutos • Grátis para iniciar"}</span>
              </p>

              {/* Limited Slot Scarcity */}
              <div className="mt-4 flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs">
                <span className="relative flex w-2.5 h-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-amber-500" />
                </span>
                <span>
                  {lang === "en"
                    ? "Tina hand-draws a limited number of sketches daily — one slot is still open today, and it's yours."
                    : "Tina desenha um número limitado de esboços por dia — uma vaga continua aberta hoje para você."}
                </span>
              </div>

              {/* Studio Sketches Horizontal Scroll */}
              <div className="mt-8 text-left">
                <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-bold mb-3 font-opensans">
                  {lang === "en" ? "Recent sketches from her studio" : "Desenhos recentes de seu ateliê"}
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                  {[
                    "/images/squeeze/sketches/sketch3.jpg",
                    "/images/squeeze/sketches/sketch4.jpg",
                    "/images/squeeze/sketches/sketch2025.jpg",
                    "/images/squeeze/sketches/sketch2.jpg"
                  ].map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="Soulmate Sketch"
                      className="w-[70%] sm:w-[60%] flex-shrink-0 snap-center rounded-2xl shadow-md border border-gray-200 object-cover"
                    />
                  ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-2">
                  {lang === "en"
                    ? "Every sketch is hand-drawn and signed by Tina. Yours will be drawn only for you."
                    : "Cada desenho é feito à mão e assinado por Tina. O seu será canalizado com exclusividade."}
                </p>
              </div>

              {/* Client Chat Messages Quotes */}
              <div className="mt-8 text-left">
                <p className="text-center text-xs uppercase tracking-widest text-gray-500 font-bold mb-3">
                  {lang === "en" ? "Real messages from her clients" : "Mensagens reais de clientes"}
                </p>
                <div className="space-y-3">
                  {CLIENT_TESTIMONIALS_CHAT.map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <div className="self-start max-w-[90%] bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-xs">
                        <p className="text-sm text-gray-800 leading-relaxed font-opensans">
                          "{item.text}"
                        </p>
                      </div>
                      <span className="text-[11px] text-gray-400 mt-1 ml-2 font-medium">
                        {item.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FASE 2: TELA DE CONEXÃO ANIMADA */}
          {chatPhase === "connecting" && (
            <div className="h-[92vh] flex items-center justify-center px-4 bg-gradient-to-b from-[#1a0533] to-[#141c3f] animate-in fade-in">
              <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl px-6 py-10 text-center">
                <div className="relative inline-block mb-4">
                  <span className="absolute -inset-2 rounded-full border-2 border-purple-400 animate-ping opacity-60" />
                  <img
                    src="/images/misc/tina-circle.jpg"
                    alt="Tina Aldea"
                    className="relative w-24 h-24 rounded-full object-cover border-4 border-purple-100 mx-auto"
                  />
                </div>
                <h2 className="text-2xl font-bold font-merriweather text-gray-900">
                  Tina Aldea
                </h2>
                <p className="text-xs text-purple-700 font-semibold mt-0.5">
                  {lang === "en" ? "Psychic Soulmate Sketch Artist" : "Artista Psíquica e Retratista"}
                </p>

                <p className="text-base font-bold text-gray-900 mt-6 animate-pulse">
                  {lang === "en" ? "Opening your private session…" : "Iniciando sua sessão privada…"}
                </p>
                <p className="text-xs italic text-gray-500 mt-1">
                  {lang === "en" ? "Please don't leave — Tina has been told you're here." : "Por favor, aguarde — Tina já foi avisada da sua presença."}
                </p>

                <div className="flex justify-center gap-1.5 mt-6">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-bounce"
                      style={{ animationDelay: `${i * 0.18}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FASE 3: CHAT AO VIVO ATIVO */}
          {chatPhase === "chat" && (
            <div className="h-[92vh] flex justify-center bg-[#f4f0fb] md:bg-gradient-to-b md:from-[#1a0533] md:to-[#141c3f] md:py-4">
              <div className="w-full h-full md:max-w-[480px] flex flex-col bg-[#f4f0fb] md:rounded-3xl md:shadow-2xl md:overflow-hidden md:border md:border-white/10">
                {/* Chat Top Bar */}
                <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 shadow-xs z-10">
                  <div className="relative shrink-0">
                    <img
                      src="/images/misc/tina-circle.jpg"
                      alt="Tina Aldea"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-300"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm font-merriweather truncate">
                      Tina Aldea
                    </p>
                    <p className="text-[11px] font-semibold text-purple-700 truncate">
                      {lang === "en" ? "3rd Gen Psychic · Sketch Artist" : "Médium de 3ª Geração · Artista Retratista"}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id}>
                      {/* Resonance Card */}
                      {msg.kind === "resonance" ? (
                        <div className="w-full max-w-[94%] mx-auto rounded-2xl bg-white border border-purple-200 shadow-md overflow-hidden animate-in zoom-in-95 my-2">
                          <div className="h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-400" />
                          <div className="p-4 text-center">
                            <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-md flex items-center justify-center text-white text-2xl font-bold mb-2">
                              {chatZodiac.symbol}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 font-merriweather">
                              {msg.sign}
                            </h3>
                            <p className="text-xs text-gray-500">
                              {lang === "en" ? "Birth Signal • Astral Resonance" : "Sinal Astral • Ressonância Cósmica"}
                            </p>

                            <div className="mt-3 h-2 rounded-full bg-purple-100 overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-300"
                                style={{
                                  width: `${resonanceValue}%`,
                                  background: "linear-gradient(90deg, #a855f7, #ec4899)"
                                }}
                              />
                            </div>
                            <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1 font-semibold">
                              <span>{resonanceValue < 50 ? (lang === "en" ? "Reading energy…" : "Lendo vibração natal…") : (lang === "en" ? "Locking resonance…" : "Sintonizando alma gêmea…")}</span>
                              <span>{resonanceValue}%</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Text Messages */
                        <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-xs ${
                              msg.from === "user"
                                ? "bg-purple-600 text-white rounded-br-xs"
                                : "bg-white text-gray-800 rounded-bl-xs border border-gray-150"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Dots */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-150 rounded-2xl rounded-bl-xs px-4 py-2.5 shadow-xs flex items-center gap-1.5">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Offer in Chat Stream */}
                  {isOfferUnlocked && (
                    <div className="space-y-4 pt-2 animate-in fade-in duration-500">
                      {/* Urgency Badge */}
                      <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 shadow-xs">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>
                            {lang === "en" ? `Your reading is reserved for ${formatSecs(chatTimeLeft)}` : `Sua sessão está reservada por ${formatSecs(chatTimeLeft)}`}
                          </span>
                        </div>
                      </div>

                      {/* Locked Blurred Sketch Teaser */}
                      <div className="relative w-full max-w-[260px] mx-auto aspect-[3/3.8] rounded-2xl overflow-hidden border-3 border-purple-300 shadow-lg bg-black">
                        <img
                          src={chosenSketch}
                          alt="Locked Sketch"
                          className="w-full h-full object-cover filter blur-[10px] scale-105"
                        />
                        <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center p-3 text-center">
                          <div className="w-10 h-10 rounded-xl bg-amber-400 text-black flex items-center justify-center shadow-md mb-2 animate-bounce">
                            <Lock className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-black text-white bg-black/75 px-2.5 py-1 rounded-full uppercase tracking-wider">
                            SKETCH COMPLETED
                          </span>
                        </div>
                      </div>

                      {/* Card 1: Complete Soulmate Vision (Best Value) */}
                      <div
                        onClick={() => setSelectedPlan("complete")}
                        className={`bg-white rounded-2xl border-2 transition-all cursor-pointer overflow-hidden shadow-md ${
                          selectedPlan === "complete" ? "border-purple-600 ring-2 ring-purple-200" : "border-gray-200"
                        }`}
                      >
                        <div className="bg-purple-600 text-white text-center text-[11px] font-bold uppercase tracking-wider py-1">
                          {lang === "en" ? "Most Chosen • Best Value" : "Mais Escolhido • Melhor Opção"}
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-bold text-gray-900 text-base font-merriweather">
                                {lang === "en" ? "Complete Soulmate Vision" : "Visão Completa da Alma Gêmea"}
                              </p>
                              <span className="text-xs text-purple-700 font-semibold block">
                                {lang === "en" ? "Colored Drawing + Written Reading" : "Desenho Colorido + Leitura Escrita"}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-bold text-gray-900 font-mono">
                                {lang === "en" ? "$67 USD" : "R$ 47,00"}
                              </span>
                              <span className="line-through text-[11px] text-gray-400 block">$247 / R$ 247</span>
                            </div>
                          </div>
                          <ul className="text-xs text-gray-600 mt-3 space-y-1">
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                              <span>{lang === "en" ? "Hand-drawn sketch in vivid color (eye & hair color)" : "Desenho feito à mão em cores vivas (cor dos olhos e cabelo)"}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                              <span>{lang === "en" ? "Full written soulmate reading & personality profile" : "Leitura psíquica completa e perfil de personalidade"}</span>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                              <span>{lang === "en" ? "Priority queue — delivery within 6 hours" : "Fila prioritária — entrega em até 6 horas"}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Card 2: Basic Soulmate Sketch */}
                      <div
                        onClick={() => setSelectedPlan("standard")}
                        className={`bg-white rounded-2xl border transition-all cursor-pointer p-4 shadow-xs ${
                          selectedPlan === "standard" ? "border-purple-600 ring-2 ring-purple-200" : "border-gray-200"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold text-gray-700 text-sm font-merriweather">
                              {lang === "en" ? "Soulmate Sketch (Basic)" : "Desenho da Alma Gêmea (Básico)"}
                            </p>
                            <span className="text-xs text-gray-400 block">
                              {lang === "en" ? "Black & white pencil sketch" : "Esboço a lápis preto e branco"}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-gray-800 font-mono">
                              {lang === "en" ? "$37 USD" : "R$ 27,90"}
                            </span>
                            <span className="line-through text-[11px] text-gray-400 block">$147 / R$ 147</span>
                          </div>
                        </div>
                      </div>

                      {/* Embedded PIX Checkout Box */}
                      <div className="bg-white rounded-2xl border border-gray-200 p-4 text-center shadow-md">
                        <span className="text-xs font-bold text-emerald-700 block mb-2">
                          ⚡ {lang === "en" ? "INSTANT PIX APPROVAL" : "PAGAMENTO RÁPIDO VIA PIX"}
                        </span>

                        <button
                          type="button"
                          onClick={handleCopyPix}
                          className={`w-full py-3.5 px-3 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 transition cursor-pointer mb-3 shadow-md ${
                            pixCopied
                              ? "bg-[#8ff0b3]"
                              : "bg-gradient-to-b from-[#41E877] via-[#25C55B] to-[#17A94B] text-black hover:brightness-105"
                          }`}
                        >
                          {pixCopied ? (
                            <>
                              <Check className="w-4 h-4 text-black" />
                              <span>{lang === "en" ? "PIX CODE COPIED! ✓" : "CÓDIGO PIX COPIADO! ✓"}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              <span>{lang === "en" ? `COPY PIX CODE (${priceBrl.toFixed(2).replace(".", ",")} BRL)` : `COPIAR CÓDIGO PIX (R$ ${priceBrl.toFixed(2).replace(".", ",")})`}</span>
                            </>
                          )}
                        </button>

                        <div className="bg-white p-2 border border-gray-200 rounded-xl inline-block mx-auto mb-2">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                              pixCode
                            )}`}
                            alt="QR Code Pix"
                            className="w-32 h-32 mx-auto"
                          />
                        </div>
                        <p className="text-[10px] text-gray-400">
                          {lang === "en" ? "Point camera in your banking app" : "Abra seu banco e aponte a câmera"}
                        </p>

                        <button
                          type="button"
                          onClick={() => setIsDelivered(true)}
                          className="text-xs text-purple-700 underline opacity-85 hover:opacity-100 mt-3 cursor-pointer block mx-auto"
                        >
                          ⚡ {lang === "en" ? "Simulate payment confirmation" : "Simular confirmação e desbloquear desenho"}
                        </button>
                      </div>

                      {/* Delivered View if confirmed */}
                      {isDelivered && (
                        <div className="bg-white border-2 border-emerald-400 rounded-3xl p-5 text-center shadow-xl animate-in zoom-in-95 my-3">
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-3.5 py-1 rounded-full inline-block mb-2 shadow-xs">
                            ✓ {lang === "en" ? "Order Confirmed • All Deliverables Unlocked" : "Pedido Confirmado • Todos os Entregáveis Desbloqueados"}
                          </span>

                          <h3 className="text-lg md:text-xl font-bold font-merriweather text-gray-900 mt-1">
                            {lang === "en" ? `Client Portal: ${name || "Beloved Soul"}` : `Portal de Entrega: ${name || "Querida(o)"}`}
                          </h3>
                          <p className="text-xs text-gray-500 font-opensans mb-4">
                            {lang === "en"
                              ? "Here is your full package from Tina Aldea: Hand-Drawn Sketch, Complete Reading & 3 Free Bonuses."
                              : "Aqui está seu pacote completo de Tina Aldea: Desenho Feito à Mão, Leitura Psíquica e os 3 Bônus Exclusivos."}
                          </p>

                          {/* Deliverables Tab Navigation */}
                          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4 overflow-x-auto text-[11px] font-bold" style={{ scrollbarWidth: "none" }}>
                            <button
                              type="button"
                              onClick={() => setDeliverableTab("sketch")}
                              className={`flex-1 min-w-[70px] py-2 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                                deliverableTab === "sketch" ? "bg-white text-purple-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              <Palette className="w-3.5 h-3.5" />
                              <span>{lang === "en" ? "Sketch" : "Desenho"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeliverableTab("reading")}
                              className={`flex-1 min-w-[70px] py-2 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                                deliverableTab === "reading" ? "bg-white text-purple-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>{lang === "en" ? "Reading" : "Leitura"}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeliverableTab("bonus1")}
                              className={`flex-1 min-w-[70px] py-2 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                                deliverableTab === "bonus1" ? "bg-white text-purple-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              <Gift className="w-3.5 h-3.5" />
                              <span>Bônus 1</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeliverableTab("bonus2")}
                              className={`flex-1 min-w-[70px] py-2 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                                deliverableTab === "bonus2" ? "bg-white text-purple-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              <Gift className="w-3.5 h-3.5" />
                              <span>Bônus 2</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setDeliverableTab("bonus3")}
                              className={`flex-1 min-w-[70px] py-2 px-2 rounded-lg transition cursor-pointer flex items-center justify-center gap-1 ${
                                deliverableTab === "bonus3" ? "bg-white text-purple-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                              }`}
                            >
                              <Gift className="w-3.5 h-3.5" />
                              <span>Bônus 3</span>
                            </button>
                          </div>

                          {/* ========================================================= */}
                          {/* TAB 1: SKETCH (DESENHO EM ALTA RESOLUÇÃO)                 */}
                          {/* ========================================================= */}
                          {deliverableTab === "sketch" && (
                            <div className="animate-in fade-in">
                              <div className="w-full max-w-[260px] mx-auto aspect-[3/3.8] rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-lg my-2 bg-black">
                                <img src={chosenSketch} alt="Your Soulmate" className="w-full h-full object-cover" />
                              </div>

                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-left text-xs text-amber-900 my-3">
                                <p className="font-bold flex items-center gap-1">
                                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                  <span>{lang === "en" ? "Certificate of Authenticity" : "Certificado de Autenticidade"}</span>
                                </p>
                                <p className="text-[11px] text-gray-600 mt-1">
                                  {lang === "en"
                                    ? `Digitally channeled and hand-drawn specifically for ${name || "you"} by Tina Aldea.`
                                    : `Canalizado espiritualmente e desenhado à mão especificamente para ${name || "você"} por Tina Aldea.`}
                                </p>
                              </div>

                              <a
                                href={chosenSketch}
                                download={`soulmate-sketch-${name || "reading"}.jpg`}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full py-3.5 bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition hover:scale-102"
                              >
                                <Download className="w-4 h-4" />
                                <span>{lang === "en" ? "Download High-Resolution Portrait (.JPG)" : "Baixar Retrato em Alta Resolução (.JPG)"}</span>
                              </a>
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* TAB 2: DETAILED PSYCHIC READING (DOSSIÊ COMPLETO)         */}
                          {/* ========================================================= */}
                          {deliverableTab === "reading" && (
                            <div className="text-left text-xs space-y-3 bg-[#faf8ff] p-4 rounded-2xl border border-purple-100 animate-in fade-in">
                              <div className="border-b border-purple-200 pb-2">
                                <span className="font-bold text-purple-900 text-sm font-merriweather block">
                                  {lang === "en" ? "Part 1: Astral Connection & Soul Resonance" : "Parte 1: Conexão Cósmica e Ressonância Astral"}
                                </span>
                                <p className="text-gray-600 mt-1 leading-relaxed">
                                  {lang === "en"
                                    ? `Your natal connection as a ${chatZodiac.name} (${chatZodiac.symbol} - ${chatZodiac.element}) creates an electromagnetic pull. This person possesses a complementary energetic aura that stabilizes your heart center.`
                                    : `Sua vibração cósmica de ${chatZodiac.name} (${chatZodiac.symbol} - Elemento ${chatZodiac.element}) emite uma assinatura magnética pura. A alma gêmea canalizada possui uma aura complementar que ancora e acalma o seu centro cardíaco.`}
                                </p>
                              </div>

                              <div className="border-b border-purple-200 pb-2">
                                <span className="font-bold text-purple-900 text-sm font-merriweather block">
                                  {lang === "en" ? "Part 2: Physical Traits & Presence" : "Parte 2: Traços Físicos e Expressão"}
                                </span>
                                <p className="text-gray-600 mt-1 leading-relaxed">
                                  {lang === "en"
                                    ? "Notice the warm, welcoming gaze and the expressive eyes that hold quiet strength. Their smile carries an immediate familiarity — as if you have known each other across multiple lifetimes."
                                    : "Observe o olhar caloroso e acolhedor, com olhos expressivos que transmitem serenidade e força. O sorriso carrega uma sensação imediata de familiaridade — como se vocês já se conhecessem de muitas vidas passadas."}
                                </p>
                              </div>

                              <div className="border-b border-purple-200 pb-2">
                                <span className="font-bold text-purple-900 text-sm font-merriweather block">
                                  {lang === "en" ? "Part 3: Personality & Love Language" : "Parte 3: Personalidade e Linguagem do Amor"}
                                </span>
                                <p className="text-gray-600 mt-1 leading-relaxed">
                                  {lang === "en"
                                    ? "Their primary love language is Physical Touch and Words of Affirmation. They are naturally loyal, deeply communicative in private, and fiercely protective of those they cherish."
                                    : "A linguagem do amor primária dessa pessoa é Toque Físico e Palavras de Afirmação. É alguém leal por natureza, profundamente transparente a sós e muito protetor com quem ama."}
                                </p>
                              </div>

                              <div>
                                <span className="font-bold text-purple-900 text-sm font-merriweather block">
                                  {lang === "en" ? "Part 4: The Encounter — When & Where You Will Meet" : "Parte 4: O Encontro — Onde e Quando Vocês Vão Se Conhecer"}
                                </span>
                                <p className="text-gray-600 mt-1 leading-relaxed">
                                  {lang === "en"
                                    ? "The psychic forecast indicates a window between 14 to 45 days from today. The setting shows movement — a social gathering, a transit hub, or a place connected with books or coffee."
                                    : "A previsão cósmica indica uma janela temporal entre 14 e 45 dias a partir de hoje. O cenário indica movimento: um encontro social através de conhecidos, um café acolhedor ou um local de aprendizado/viagem."}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* TAB 3: BONUS 1 — GUARDIAN ANGEL READING                   */}
                          {/* ========================================================= */}
                          {deliverableTab === "bonus1" && (
                            <div className="text-left text-xs space-y-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200 animate-in fade-in">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold">
                                  👼
                                </div>
                                <div>
                                  <h4 className="font-bold text-amber-950 font-merriweather text-sm">
                                    {lang === "en" ? "Your Guardian Angel Reading" : "Leitura do Seu Anjo da Guarda"}
                                  </h4>
                                  <span className="text-[10px] text-amber-700">Canalizado por Tina Aldea</span>
                                </div>
                              </div>

                              <p className="text-gray-700 leading-relaxed">
                                {lang === "en"
                                  ? "Your presiding guardian angel is Archangel Chamuel, the angel of peaceful relationships and true love connections. Chamuel is currently working to align your physical path with your soulmate's steps."
                                  : "O anjo que acompanha seus caminhos amorosos é o Arcanjo Chamuel, o regente dos relacionamentos sagrados e do amor verdadeiro. Chamuel está ativamente desobstruindo interferências energéticas para aproximar seus passos da sua alma gêmea."}
                              </p>

                              <div className="bg-white p-3 rounded-xl border border-amber-200">
                                <p className="font-bold text-amber-900 text-[11px] mb-1">
                                  {lang === "en" ? "Daily Angelic Alignment Prayer:" : "Oração de Alinhamento Diário:"}
                                </p>
                                <p className="italic text-gray-600 text-[11px] leading-relaxed">
                                  {lang === "en"
                                    ? '"Beloved Guardian Angel Chamuel, clear all fear from my heart. Guide my eyes to recognize my destined soulmate, and open the road for our meeting in perfect divine timing. Amen."'
                                    : '"Amado Anjo Guardião Chamuel, remove todo o medo e dúvida do meu coração. Guia meus passos para reconhecer minha alma gêmea e abre os caminhos para o nosso encontro no tempo divino perfeito. Amém."'}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* TAB 4: BONUS 2 — HOW TO ATTRACT YOUR SOULMATE FASTER      */}
                          {/* ========================================================= */}
                          {deliverableTab === "bonus2" && (
                            <div className="text-left text-xs space-y-3 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 animate-in fade-in">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold">
                                  📖
                                </div>
                                <div>
                                  <h4 className="font-bold text-emerald-950 font-merriweather text-sm">
                                    {lang === "en" ? "eBook: How to Attract Your Soulmate Faster" : "Livro: Como Atrair Sua Alma Gêmea Mais Rápido"}
                                  </h4>
                                  <span className="text-[10px] text-emerald-700">Guia Prático e Metafísico de Manifestação</span>
                                </div>
                              </div>

                              <div className="space-y-2 text-gray-700 leading-relaxed">
                                <p>
                                  <strong>{lang === "en" ? "Key 1: Clearing Heart Stagnation" : "Chave 1: Desbloqueio do Chacra Cardíaco"}</strong> —{" "}
                                  {lang === "en"
                                    ? "Release unconscious energetic loyalty to former partners. Forgive the lessons so the new love finds an open seat."
                                    : "Corte qualquer lealdade invisível com quem já partiu. Perdoe o ciclo para que a sua alma gêmea encontre espaço livre no seu coração."}
                                </p>
                                <p>
                                  <strong>{lang === "en" ? "Key 2: The Frequency of Certainty" : "Chave 2: A Frequência da Certeza"}</strong> —{" "}
                                  {lang === "en"
                                    ? "Act as though the meeting is already scheduled. Avoid desperate seeking; radiate welcoming peace."
                                    : "Viva com a convicção serena de que o encontro já está agendado nos planos astrais. A calma atrai com 10x mais força do que a ansiedade."}
                                </p>
                                <p>
                                  <strong>{lang === "en" ? "Key 3: The 3-Minute Evening Ritual" : "Chave 3: O Micro-Ritual Noturno de 3 Minutos"}</strong> —{" "}
                                  {lang === "en"
                                    ? "Before sleep, place your right hand on your chest and visualize your soulmate's hand holding yours. Feel the warmth."
                                    : "Antes de dormir, coloque sua mão direita no centro do peito e sinta a sensação de segurar a mão da sua alma gêmea. A vibração do toque acelera a sincronicidade."}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* ========================================================= */}
                          {/* TAB 5: BONUS 3 — GUIDED AURA CLEANSING MASTERCLASS        */}
                          {/* ========================================================= */}
                          {deliverableTab === "bonus3" && (
                            <div className="text-left text-xs space-y-3 bg-purple-50/70 p-4 rounded-2xl border border-purple-200 animate-in fade-in">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center font-bold">
                                  ✨
                                </div>
                                <div>
                                  <h4 className="font-bold text-purple-950 font-merriweather text-sm">
                                    {lang === "en" ? "Guided Aura Cleansing Masterclass" : "Masterclass de Limpeza e Purificação de Aura"}
                                  </h4>
                                  <span className="text-[10px] text-purple-700">Protocolo de 7 Minutos de Desobstrução</span>
                                </div>
                              </div>

                              <p className="text-gray-700 leading-relaxed">
                                {lang === "en"
                                  ? "Follow this 7-minute protocol whenever you feel heavy or blocked. Sit comfortably, close your eyes, and inhale violet-golden light into your crown."
                                  : "Siga este protocolo guiado de 7 minutos para purificar sua energia. Sente-se confortavelmente, feche os olhos e visualize uma luz violeta e dourada descendo pelo topo da cabeça."}
                              </p>

                              <div className="bg-white p-3 rounded-xl border border-purple-200 space-y-1.5 text-[11px] text-gray-600">
                                <p>• <strong>{lang === "en" ? "Minute 1-2:" : "Minutos 1-2:"}</strong> {lang === "en" ? "Deep breathing to release tension." : "Respiração profunda e relaxamento corporal."}</p>
                                <p>• <strong>{lang === "en" ? "Minute 3-5:" : "Minutos 3-5:"}</strong> {lang === "en" ? "Golden cord dissolving past emotional ties." : "Corte de cordões etéricos com o passado."}</p>
                                <p>• <strong>{lang === "en" ? "Minute 6-7:" : "Minutos 6-7:"}</strong> {lang === "en" ? "Sealing the aura with pure love resonance." : "Blindagem da aura com a vibração do amor verdadeiro."}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area (Dynamic Based on Current Step) */}
                <div className="bg-white border-t border-gray-200 p-3 shadow-md">
                  {/* Name Input */}
                  {currentInputType === "name" && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={textInputValue}
                        onChange={(e) => setTextInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                        placeholder={lang === "en" ? "Type your first name…" : "Digite seu primeiro nome…"}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-purple-600"
                        autoFocus
                      />
                      <button
                        onClick={handleNameSubmit}
                        disabled={!textInputValue.trim()}
                        className="px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-bold cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Emotion Choices */}
                  {currentInputType === "emotion" && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold text-gray-500 text-center mb-1">
                        {lang === "en" ? "Tap to choose your feeling:" : "Toque para escolher como você se sente:"}
                      </p>
                      <div className="grid grid-cols-1 gap-1.5">
                        {EMOTION_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => handleEmotionPick(opt.value, lang === "en" ? opt.en : opt.pt)}
                            className="w-full p-2.5 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 text-left text-xs font-semibold text-gray-800 transition cursor-pointer"
                          >
                            {lang === "en" ? opt.en : opt.pt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interest Choices */}
                  {currentInputType === "interest" && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold text-gray-500 text-center mb-1">
                        {lang === "en" ? "Select your preference:" : "Selecione sua preferência:"}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { val: "men", en: "I like men", pt: "Homens" },
                          { val: "women", en: "I like women", pt: "Mulheres" },
                          { val: "both", en: "Open to both", pt: "Ambos" },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            onClick={() => handleInterestPick(opt.val as any, lang === "en" ? opt.en : opt.pt)}
                            className="p-3 rounded-xl border border-purple-300 bg-purple-50 hover:bg-purple-100 text-xs font-bold text-gray-800 transition text-center cursor-pointer"
                          >
                            {lang === "en" ? opt.en : opt.pt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Women Confirmation */}
                  {currentInputType === "confirm_women" && (
                    <div className="flex gap-2">
                      <button
                        onClick={proceedToDesire}
                        className="flex-1 py-3 rounded-xl bg-purple-600 text-white font-bold text-xs"
                      >
                        {lang === "en" ? "Yes, a woman" : "Sim, uma mulher"}
                      </button>
                      <button
                        onClick={() => {
                          setInterest("men");
                          proceedToDesire();
                        }}
                        className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs"
                      >
                        {lang === "en" ? "No, I meant a man" : "Não, eu quis dizer homem"}
                      </button>
                    </div>
                  )}

                  {/* Desire Choices */}
                  {currentInputType === "desire" && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold text-gray-500 text-center mb-1">
                        {lang === "en" ? "What feeling are you longing for?" : "Que tipo de conexão você busca?"}
                      </p>
                      {DESIRE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleDesirePick(opt.value, lang === "en" ? opt.en : opt.pt)}
                          className="w-full p-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-left text-xs font-semibold text-gray-800 transition cursor-pointer"
                        >
                          {lang === "en" ? opt.en : opt.pt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Birthdate Selector */}
                  {currentInputType === "birthdate" && (
                    <div className="space-y-2">
                      <p className="text-[11px] font-semibold text-gray-500 text-center">
                        {lang === "en" ? "Select your birth date:" : "Selecione sua data de nascimento:"}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <select
                          value={birthDay}
                          onChange={(e) => setBirthDay(e.target.value)}
                          className="py-2.5 px-2 rounded-xl border border-gray-300 text-xs bg-white"
                        >
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        <select
                          value={birthMonth}
                          onChange={(e) => setBirthMonth(e.target.value)}
                          className="py-2.5 px-2 rounded-xl border border-gray-300 text-xs bg-white"
                        >
                          {(lang === "en" ? MONTHS_EN : MONTHS_PT).map((m, idx) => (
                            <option key={m} value={idx + 1}>{m}</option>
                          ))}
                        </select>
                        <select
                          value={birthYear}
                          onChange={(e) => setBirthYear(e.target.value)}
                          className="py-2.5 px-2 rounded-xl border border-gray-300 text-xs bg-white"
                        >
                          {Array.from({ length: 70 }, (_, i) => 2006 - i).map((y) => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={handleBirthDateSubmit}
                        className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow cursor-pointer"
                      >
                        {lang === "en" ? "This is my date of birth →" : "Essa é minha data de nascimento →"}
                      </button>
                    </div>
                  )}

                  {/* Ethnicity Choices */}
                  {currentInputType === "ethnicity" && (
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-semibold text-gray-500 text-center mb-1">
                        {lang === "en" ? "Select ethnic background:" : "Selecione ascendência ou preferência:"}
                      </p>
                      {[
                        { en: "White / Western", pt: "Branca / Ocidental" },
                        { en: "Hispanic / Latino", pt: "Hispânica / Latina" },
                        { en: "Black / African", pt: "Negra / Afrodescendente" },
                        { en: "Asian", pt: "Asiática" },
                        { en: "Any / Leave to Destiny", pt: "Qualquer / Deixar ao Destino" },
                      ].map((eth) => (
                        <button
                          key={eth.en}
                          onClick={() => handleEthnicityPick(eth.en, lang === "en" ? eth.en : eth.pt)}
                          className="w-full p-2.5 rounded-xl border border-purple-200 bg-purple-50 hover:bg-purple-100 text-left text-xs font-semibold text-gray-800 transition cursor-pointer"
                        >
                          {lang === "en" ? eth.en : eth.pt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Idle indicator when no input is active */}
                  {currentInputType === "none" && !isOfferUnlocked && (
                    <div className="text-center py-2 text-xs text-gray-400 italic">
                      {isTyping
                        ? (lang === "en" ? "Tina is typing…" : "Tina está digitando…")
                        : (lang === "en" ? "Private session active" : "Sessão privada ativa")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. CLASSIC SALES LANDING PAGE (CASO DESEJE ALTERNAR)                      */}
      {/* ========================================================================= */}
      {activeMode === "classic" && (
        <main>
          {/* Top Blue Banner */}
          <div className="bg-[#73b4fc] text-white py-2 px-4 text-center font-semibold text-xs md:text-sm font-opensans">
            {lang === "en"
              ? "🔮 This is my Official Website! Beware of impersonators"
              : "🔮 Este é o meu Site Oficial! Cuidado com imitadores e golpes"}
          </div>

          {/* Hero Section */}
          <section className="bg-[#FDF8F3] pt-6 pb-12 md:pb-16 px-5 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <img
                  src="/images/squeeze/main-hero.jpg"
                  alt="Tina Aldea Soulmate Sketch"
                  className="w-full max-w-sm mx-auto rounded-xl shadow-lg object-cover"
                />
              </div>

              <p className="text-xs uppercase tracking-[3px] text-gray-500 font-semibold mb-3 font-opensans">
                {lang === "en" ? "THE #1 SOULMATE SKETCH PSYCHIC ARTIST" : "A ARTISTA PSÍQUICA Nº 1 DE ALMAS GÊMEAS"}
              </p>

              <h1 className="text-2xl md:text-4xl text-gray-900 leading-tight mb-4 font-merriweather">
                {lang === "en"
                  ? '"I Met My Soulmate in Two Weeks After I Got My Sketch from Tina Aldea"'
                  : '"Conheci Minha Alma Gêmea em Duas Semanas Após Receber o Desenho da Tina Aldea"'}
              </h1>

              <p className="text-base text-gray-600 mb-8 max-w-xl mx-auto font-opensans">
                {lang === "en"
                  ? "I will draw your Destined Soulmate in 24 hours and tell you when and where you'll meet"
                  : "Vou desenhar sua Alma Gêmea Destinada em 24 horas e revelar quando e onde vocês vão se conhecer"}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMode("chat");
                    handleStartChat();
                  }}
                  className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-8 text-base rounded-xl shadow-lg flex items-center justify-center gap-2 transition hover:scale-105 cursor-pointer font-opensans"
                >
                  <MessageCircle className="w-5 h-5 text-amber-300" />
                  <span>{lang === "en" ? "Start Private Chat With Tina →" : "Iniciar Chat Privado com Tina →"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsClassicQuizOpen(true)}
                  className="w-full sm:w-auto bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-4 px-8 text-base rounded-xl shadow-lg flex items-center justify-center gap-2 transition hover:scale-105 cursor-pointer font-opensans"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>{lang === "en" ? "Standard Quiz →" : "Quiz Rápido →"}</span>
                </button>
              </div>

              {/* Social Proof */}
              <div className="mt-8 flex flex-col items-center gap-1.5">
                <div className="flex justify-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-opensans">
                  {lang === "en" ? "Loved by 43,000+ happy clients" : "Amado por mais de 43.000 clientes"}
                </p>
              </div>
            </div>
          </section>

          {/* How It Works (#2D2D2D) */}
          <section className="bg-[#2D2D2D] text-white py-14 px-5">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center mb-10 font-merriweather">
                {lang === "en" ? "How It Works" : "Como Funciona"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold">1</div>
                  <h3 className="font-bold font-merriweather">{lang === "en" ? "Take the Chat / Quiz" : "Responda ao Chat"}</h3>
                  <p className="text-xs text-gray-300 font-opensans leading-relaxed">
                    {lang === "en" ? "Answer simple questions to tune energy" : "Responda a perguntas para calibrar sua energia"}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold">2</div>
                  <h3 className="font-bold font-merriweather">{lang === "en" ? "I Channel Your Soulmate" : "Canalizo Sua Alma Gêmea"}</h3>
                  <p className="text-xs text-gray-300 font-opensans leading-relaxed">
                    {lang === "en" ? "I visualize and hand-draw the portrait" : "Visualizo e desenho o rosto em detalhes"}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#4CAF50] flex items-center justify-center text-xl font-bold">3</div>
                  <h3 className="font-bold font-merriweather">{lang === "en" ? "Delivered in 24 Hours" : "Entregue em 24h"}</h3>
                  <p className="text-xs text-gray-300 font-opensans leading-relaxed">
                    {lang === "en" ? "Receive your high-res sketch & reading" : "Receba seu desenho em alta resolução e leitura"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-14 px-5 bg-white">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl text-center text-gray-900 mb-8 font-merriweather">
                {lang === "en" ? "What My Clients Say" : "O Que Meus Clientes Dizem"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <img src="/images/squeeze/testimonials/alex.jpg" alt="" className="rounded-xl shadow-md w-full" />
                <img src="/images/squeeze/testimonials/angela.jpg" alt="" className="rounded-xl shadow-md w-full" />
                <img src="/images/squeeze/testimonials/julia.jpg" alt="" className="rounded-xl shadow-md w-full" />
                <img src="/images/squeeze/testimonials/lisa.jpg" alt="" className="rounded-xl shadow-md w-full" />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-100 py-10 px-4 text-center text-xs text-gray-500 font-opensans">
            <img src="/images/misc/logo.png" alt="Tina Aldea" className="h-12 mx-auto mb-4" />
            <p className="font-semibold mb-2">Copyright {new Date().getFullYear()} Tina Aldea. All Rights Reserved.</p>
            <p className="text-[11px] text-gray-400 max-w-xl mx-auto">
              All sketches and readings are intended for entertainment purposes only and may not be unique.
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}
