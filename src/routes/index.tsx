import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import {
  Sparkles,
  Camera,
  CheckCircle2,
  Shield,
  Clock,
  Send,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  UploadCloud,
  RefreshCw,
  Lock,
  Smartphone,
  Eye,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: CliquePoliticoPage,
});

/* ========================================================================= */
/* CONFIGURAÇÃO CENTRALIZADA DE PREÇOS E OFERTAS                             */
/* ========================================================================= */
export const PRICING_CONFIG = {
  single: {
    id: "single",
    name: "1 Montagem com IA",
    tagline: "Ideal para testar e compartilhar",
    price: 19.9,
    priceFormatted: "R$ 19,90",
    features: [
      "1 imagem em alta resolução (ideal para WhatsApp e redes)",
      "Cenário e figura política escolhidos",
      "Identificação visual de conteúdo gerado por IA",
      "Entrega digital direta no seu WhatsApp e e-mail",
    ],
  },
  pack3: {
    id: "pack3",
    name: "Pacote 3 Montagens (Mais Popular)",
    tagline: "3 variações exclusivas de ângulos e poses",
    badge: "Economize R$ 19,80",
    price: 39.9,
    priceFormatted: "R$ 39,90",
    features: [
      "3 imagens diferentes geradas com a sua foto",
      "Variações de enquadramento no cenário selecionado",
      "Maior resolução para postagens e impressões",
      "Entrega prioritária no seu WhatsApp e e-mail",
    ],
  },
};

/* ========================================================================= */
/* DADOS DAS PERSONALIDADES E CENÁRIOS                                       */
/* ========================================================================= */
interface Personality {
  id: "lula" | "flavio";
  name: string;
  fullName: string;
  role: string;
  image: string;
  accentColor: string;
}

const PERSONALITIES: Personality[] = [
  {
    id: "lula",
    name: "Lula",
    fullName: "Luiz Inácio Lula da Silva",
    role: "Presidente da República",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=700&q=80",
    accentColor: "border-red-500/80 bg-red-50/50 text-red-700",
  },
  {
    id: "flavio",
    name: "Flávio Bolsonaro",
    fullName: "Flávio Bolsonaro",
    role: "Senador da República",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80",
    accentColor: "border-blue-500/80 bg-blue-50/50 text-blue-700",
  },
];

interface Scenario {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "selfie-evento",
    title: "Selfie num evento político",
    description: "Ângulo espontâneo de selfie com iluminação realista, como se estivesse na primeira fila do encontro.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80",
    tag: "Descontraído",
  },
  {
    id: "gabinete-presidencial",
    title: "Gabinete presidencial fictício",
    description: "Ambiente executivo sofisticado com mesa oficial, bandeira institucional brasileira e ar solene.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80",
    tag: "Formal & Institucional",
  },
  {
    id: "encontro-institucional",
    title: "Encontro institucional fictício",
    description: "Aperto de mão e conversa amistosa em sala de conferência com visual diplomático refinado.",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=700&q=80",
    tag: "Aperto de Mão",
  },
  {
    id: "evento-publico",
    title: "Comício ou palco de evento",
    description: "Cenário vibrante de palco com plateia e iluminação de grande concentração pública.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=700&q=80",
    tag: "Grande Público",
  },
];

const FAQS = [
  {
    q: "Como funciona a criação da foto com IA?",
    a: "Você escolhe a figura política (Lula ou Flávio Bolsonaro), seleciona o cenário fictício desejado e faz o upload da sua foto. Nossa inteligência artificial analisa os traços do seu rosto e gera uma composição realista mantendo a sua identidade visual e adaptando a iluminação ao cenário escolhido.",
  },
  {
    q: "Preciso de ter algum conhecimento sobre IA ou edição de imagem?",
    a: "Nenhum! Todo o processamento é feito de forma 100% automatizada e profissional por nosso sistema. Você só precisa escolher as opções e enviar uma foto simples do seu celular com o rosto bem visível.",
  },
  {
    q: "Como devo tirar ou escolher a minha foto para o envio?",
    a: "Dê preferência a uma foto nítida tirada de frente ou meio perfil, com boa iluminação e sem óculos escuros, bonés ou elementos que cubram o rosto. Selfies comuns do dia a dia funcionam muito bem.",
  },
  {
    q: "Como recebo a montagem?",
    a: "A montagem é entregue digitalmente em alta definição diretamente no seu WhatsApp e também enviada como link de download seguro para o seu e-mail cadastrado.",
  },
  {
    q: "Quanto tempo demora para a imagem ficar pronta?",
    a: "Após a confirmação do pagamento, as imagens são processadas e chegam no seu WhatsApp em média entre 30 minutos e 2 horas úteis.",
  },
  {
    q: "A imagem é uma fotografia real de um encontro?",
    a: "Não. Conforme informamos de maneira transparente em toda a plataforma, trata-se de uma montagem fictícia gerada por inteligência artificial exclusivamente para fins de entretenimento, humor e redes sociais. Não houve encontro real nem qualquer recomendação ou apoio político.",
  },
  {
    q: "Como os meus dados e a minha foto são tratados?",
    a: "Sua foto é utilizada estritamente para a geração do seu pedido específico. Suas imagens nunca são publicadas, compartilhadas com terceiros ou utilizadas para treinar modelos abertos de inteligência artificial. Após a entrega, os arquivos temporários são eliminados de forma segura.",
  },
];

function CliquePoliticoPage() {
  // Estado da seleção interativa
  const [selectedPersonality, setSelectedPersonality] = useState<Personality>(PERSONALITIES[0]);
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(SCENARIOS[0]);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [consent, setConsent] = useState<boolean>(false);

  // Pacote de preço
  const [selectedPlan, setSelectedPlan] = useState<"single" | "pack3">("pack3");

  // Dados de contato
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");

  // Estado do Checkout PIX
  const [checkoutOpened, setCheckoutOpened] = useState(false);
  const [pixCopied, setPixCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Referência para rolar até o construtor
  const builderRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  const scrollToBuilder = () => {
    builderRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePhoneMask = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 11);
    let formatted = raw;
    if (raw.length > 2) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length > 7) formatted = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    setClientPhone(formatted);
  };

  // Upload com validação real de tipo e tamanho (máx 10MB)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError(null);

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setPhotoError("Formato inválido. Por favor, envie uma imagem nos formatos JPG, PNG ou WEBP.");
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setPhotoError("A imagem selecionada é muito pesada (máximo 10 MB). Escolha outra foto menor.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUserPhoto(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Código PIX de exemplo para o fluxo de checkout
  const currentPrice = PRICING_CONFIG[selectedPlan].price;
  const currentPriceFormatted = PRICING_CONFIG[selectedPlan].priceFormatted;
  const pixCode = `00020126580014br.gov.bcb.pix0136cliquepolitico-${selectedPlan}-${Date.now().toString(36)}5204000053039865405${currentPrice.toFixed(2)}5802BR5920CLIQUE POLITICO AI6009SAO PAULO62070503***6304`;

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setPixCopied(true);
    setTimeout(() => setPixCopied(false), 3000);
  };

  const handleProceedToCheckout = () => {
    if (!userPhoto) {
      setPhotoError("Por favor, envie sua foto antes de prosseguir para o pagamento.");
      return;
    }
    if (!consent) {
      setPhotoError("É necessário autorizar o processamento por IA para fins de entretenimento.");
      return;
    }
    setCheckoutOpened(true);
    setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-500 selection:text-white">
      {/* ========================================================================= */}
      {/* AVISO LEGAL DE TRANSPARÊNCIA (HEADER SUPERIOR FIXO)                      */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 text-slate-300 px-4 py-2 text-xs border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
            <p className="text-[11px] sm:text-xs">
              <strong className="text-white">Aviso de Transparência:</strong> Montagens digitais geradas por Inteligência Artificial para fins exclusivos de entretenimento. Sem afiliação ou apoio oficial.
            </p>
          </div>
          <span className="hidden md:inline-block text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            Mídia Sintética Identificada
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* NAVBAR                                                                    */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-sm font-black text-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                Clique Político <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 font-medium -mt-1">
                Personalização de Imagens com IA
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#demonstracao" className="hover:text-emerald-600 transition">Exemplos</a>
            <a href="#criador" className="hover:text-emerald-600 transition">Como Funciona</a>
            <a href="#oferta" className="hover:text-emerald-600 transition">Preços</a>
            <a href="#faq" className="hover:text-emerald-600 transition">Dúvidas</a>
          </div>

          <button
            onClick={scrollToBuilder}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-sm flex items-center gap-1.5"
          >
            <span>Criar Minha Foto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SEÇÃO 1: HERO                                                             */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-white via-slate-50 to-slate-100/60 border-b border-slate-200">
        {/* Detalhes sutis nas cores nacionais brasileiras */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tecnologia de Montagem Fotográfica com IA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Sua foto com uma das figuras mais conhecidas da política brasileira.
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Envie sua foto, escolha seu cenário e receba uma montagem personalizada criada com inteligência artificial.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-400 font-medium">
            Uma experiência digital feita para divertir, surpreender e compartilhar.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={scrollToBuilder}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-base bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-98 transition flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              <span>CRIAR MINHA FOTO</span>
            </button>
            <a
              href="#demonstracao"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-bold text-sm bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            >
              Ver Exemplos de Antes e Depois
            </a>
          </div>

          {/* 3 Indicadores Obrigatórios */}
          <div className="mt-10 pt-8 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Personalização com IA</strong>
                <span className="text-[11px] text-slate-500">Adaptação precisa de rosto e luz</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Entrega digital</strong>
                <span className="text-[11px] text-slate-500">Direto no seu WhatsApp e e-mail</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-xs font-bold text-slate-900 block">Conteúdo fictício</strong>
                <span className="text-[11px] text-slate-500">Identificado para entretenimento</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 2: DEMONSTRAÇÃO VISUAL (ANTES E DEPOIS)                             */}
      {/* ========================================================================= */}
      <section id="demonstracao" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-700 text-xs font-extrabold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Demonstração Visual
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Veja o resultado da montagem
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transforme uma selfie comum em uma montagem profissional mantendo sua fisionomia e proporções.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Foto Original */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                  <span>1.</span> Sua foto original (Exemplo)
                </span>
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded font-medium">
                  Foto comum do celular
                </span>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Foto original de exemplo"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Você envia qualquer foto clara de rosto. Sem complicações.
              </p>
            </div>

            {/* Resultado Final com IA */}
            <div className="bg-emerald-50/50 border-2 border-emerald-500/40 rounded-2xl p-4 shadow-sm relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2.</span> Montagem final com IA
                </span>
                <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">
                  Resultado em Alta Resolução
                </span>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-emerald-300">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                  alt="Montagem final gerada por IA"
                  className="w-full h-full object-cover"
                />
                {/* Indicação obrigatória visível */}
                <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-md border border-white/20 flex items-center gap-1">
                  <span>🤖</span> Imagem fictícia gerada por IA
                </div>
              </div>
              <p className="text-xs text-emerald-900 font-medium mt-3 text-center">
                Iluminação ajustada, sombras coerentes e composição natural.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* O CONSTRUTOR: SEÇÕES 3, 4 E 5                                            */}
      {/* ========================================================================= */}
      <section id="criador" ref={builderRef} className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-blue-700 text-xs font-extrabold uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Passo a Passo
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Configure sua montagem agora
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Escolha quem, onde e envie sua foto. Leva menos de 1 minuto.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-12">
            {/* ----------------------------------------------------------------- */}
            {/* ETAPA 1: ESCOLHA DA PERSONALIDADE                                 */}
            {/* ----------------------------------------------------------------- */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Com quem você quer aparecer?
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-6 ml-10">
                Selecione a personalidade política desejada. Ambas as opções recebem o mesmo tratamento gráfico profissional.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PERSONALITIES.map((p) => {
                  const isSelected = selectedPersonality.id === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPersonality(p)}
                      className={`relative text-left p-4 rounded-2xl border-2 transition-all flex items-center gap-4 ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/40 shadow-sm ring-2 ring-emerald-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                          {p.role}
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900 truncate">
                          {p.name}
                        </h4>
                        <span className="text-xs text-slate-500 block truncate">
                          {p.fullName}
                        </span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                            isSelected
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {isSelected ? "Selecionado ✓" : `Escolher ${p.name}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* ETAPA 2: ESCOLHA DO CENÁRIO                                       */}
            {/* ----------------------------------------------------------------- */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Escolha o cenário da sua montagem
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-6 ml-10">
                Selecione o ambiente fictício onde a sua foto será ambientada com {selectedPersonality.name}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCENARIOS.map((sc) => {
                  const isSelected = selectedScenario.id === sc.id;
                  return (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => setSelectedScenario(sc)}
                      className={`relative text-left rounded-2xl overflow-hidden border-2 transition-all p-3 flex flex-col justify-between ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-200">
                        <img src={sc.image} alt={sc.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {sc.tag}
                        </span>
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">
                          {sc.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {sc.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* ETAPA 3: ENVIO DA FOTOGRAFIA                                      */}
            {/* ----------------------------------------------------------------- */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Agora, envie sua foto
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-6 ml-10">
                Envie uma foto em que seu rosto esteja nítido. Formatados suportados: JPG, PNG ou WEBP (máximo 10 MB).
              </p>

              <div className="ml-0 sm:ml-10">
                {!userPhoto ? (
                  <label className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50/50 hover:bg-emerald-50/20 transition group">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-105 transition">
                      <UploadCloud className="w-7 h-7" />
                    </div>
                    <strong className="text-sm font-bold text-slate-800">
                      Clique aqui para selecionar sua foto
                    </strong>
                    <span className="text-xs text-slate-400 mt-1">
                      Ou arraste o arquivo do seu computador ou celular
                    </span>
                    <span className="text-[11px] text-slate-400 mt-2 bg-slate-200/60 px-2 py-0.5 rounded">
                      JPG, PNG, WEBP • Até 10MB
                    </span>
                  </label>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-5">
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-xs flex-shrink-0 bg-white">
                      <img src={userPhoto} alt="Prévia da foto" className="w-full h-full object-cover" />
                      <div className="absolute top-1 right-1 bg-emerald-600 text-white rounded-full p-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                        Foto enviada com sucesso
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        Sua imagem está pronta para a IA
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Ela será alinhada e combinada com {selectedPersonality.name} no cenário "{selectedScenario.title}".
                      </p>

                      <label className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 px-3 py-1.5 rounded-lg cursor-pointer transition">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Substituir fotografia</span>
                      </label>
                    </div>
                  </div>
                )}

                {photoError && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{photoError}</span>
                  </div>
                )}

                {/* Termo de consentimento obrigatório */}
                <div className="mt-5 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                    />
                    <span>
                      Declaro que possuo os direitos de uso desta foto e autorizo o seu processamento por Inteligência Artificial exclusivamente para criar esta montagem personalizada com finalidade de entretenimento. Compreendo que as fotos não são compartilhadas e são eliminadas após a entrega.
                    </span>
                  </label>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-98 transition flex items-center justify-center gap-2"
                  >
                    <span>Confirmar Escolhas e Ir para a Oferta</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 6: OFERTA E CHECKOUT                                                */}
      {/* ========================================================================= */}
      <section id="oferta" ref={checkoutRef} className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-700 text-xs font-extrabold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Revisão e Pagamento
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Sua montagem personalizada está quase pronta
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Escolha seu pacote, informe seu contato para entrega e finalize via Pix com segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Coluna 1 & 2: Seleção de Pacote e Contato */}
            <div className="md:col-span-2 space-y-6">
              {/* Escolha do Pacote */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Escolha seu pacote de entrega:
                </h3>

                <div className="space-y-3">
                  {/* Pacote 1 Foto */}
                  <label
                    onClick={() => setSelectedPlan("single")}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition ${
                      selectedPlan === "single"
                        ? "border-emerald-600 bg-white shadow-xs"
                        : "border-slate-200 bg-white/60 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === "single"}
                          onChange={() => setSelectedPlan("single")}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                        />
                        <div>
                          <strong className="text-sm font-extrabold text-slate-900 block">
                            {PRICING_CONFIG.single.name}
                          </strong>
                          <span className="text-xs text-slate-500">
                            {PRICING_CONFIG.single.tagline}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-black text-slate-900">
                        {PRICING_CONFIG.single.priceFormatted}
                      </span>
                    </div>
                  </label>

                  {/* Pacote 3 Fotos */}
                  <label
                    onClick={() => setSelectedPlan("pack3")}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition relative ${
                      selectedPlan === "pack3"
                        ? "border-emerald-600 bg-emerald-50/30 shadow-xs"
                        : "border-slate-200 bg-white/60 hover:border-slate-300"
                    }`}
                  >
                    <span className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                      {PRICING_CONFIG.pack3.badge}
                    </span>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlan === "pack3"}
                          onChange={() => setSelectedPlan("pack3")}
                          className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
                        />
                        <div>
                          <strong className="text-sm font-extrabold text-slate-900 block">
                            {PRICING_CONFIG.pack3.name}
                          </strong>
                          <span className="text-xs text-slate-500">
                            {PRICING_CONFIG.pack3.tagline}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-black text-emerald-700">
                        {PRICING_CONFIG.pack3.priceFormatted}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Formulário de Entrega (WhatsApp e E-mail) */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Onde você deseja receber a sua imagem?
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Enviaremos o arquivo em alta definição diretamente no seu WhatsApp e uma cópia no seu e-mail.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos Eduardo Silva"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-emerald-600 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp com DDD</label>
                      <input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={clientPhone}
                        onChange={(e) => handlePhoneMask(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-emerald-600 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Seu E-mail</label>
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:border-emerald-600 transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalhes do Pagamento PIX */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                      PIX
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Pagamento Instantâneo via PIX</span>
                      <span className="text-[11px] text-slate-500">Sem mensalidade • Compra única</span>
                    </div>
                  </div>
                  <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                    Aprovação Imediata
                  </span>
                </div>

                <div className="mt-4 flex flex-col items-center">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-3">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                        pixCode
                      )}`}
                      alt="QR Code Pix"
                      className="w-36 h-36 mx-auto"
                    />
                    <span className="block text-center text-[10px] text-slate-400 mt-1">
                      Aponte a câmera do aplicativo do seu banco
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={copyPixCode}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                      pixCopied
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-900 text-white hover:bg-slate-800"
                    }`}
                  >
                    {pixCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Código Pix Copiado com Sucesso!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar Código Pix Copia e Cola</span>
                      </>
                    )}
                  </button>

                  {/* 3 Passos */}
                  <div className="w-full grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block">PASSO 1</span>
                      <span className="text-[11px] text-slate-700 font-semibold">Abra seu banco</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block">PASSO 2</span>
                      <span className="text-[11px] text-slate-700 font-semibold">Cole o Pix</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="text-[10px] font-bold text-slate-400 block">PASSO 3</span>
                      <span className="text-[11px] text-slate-700 font-semibold">Envio automático</span>
                    </div>
                  </div>

                  {/* Status da transação */}
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-xl w-full">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping flex-shrink-0" />
                    <span>Aguardando a confirmação da transação pelo banco...</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 3: Resumo do Pedido */}
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sticky top-24">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Resumo da sua montagem
                </h4>

                <div className="space-y-3 pb-4 border-b border-slate-200 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Personalidade:</span>
                    <strong className="text-slate-900 font-bold">{selectedPersonality.name}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Cenário:</span>
                    <strong className="text-slate-900 font-bold">{selectedScenario.title}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Pacote selecionado:</span>
                    <strong className="text-slate-900 font-bold">{PRICING_CONFIG[selectedPlan].name}</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Prazo de entrega:</span>
                    <span className="text-emerald-700 font-semibold">Até 2h úteis</span>
                  </div>
                </div>

                <div className="py-3 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-slate-700">Valor Total:</span>
                  <span className="text-2xl font-black text-slate-900">{currentPriceFormatted}</span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-2 mt-2 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Garantia de 7 dias contra falhas técnicas</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Sem renovação ou assinatura</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Entrega no WhatsApp e E-mail</span>
                  </div>
                </div>

                {/* Nota de Arquitetura e Integração */}
                <div className="mt-4 p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-[10px] text-blue-900 leading-relaxed">
                  <strong className="block font-bold mb-0.5 flex items-center gap-1">
                    <Info className="w-3 h-3 text-blue-600" />
                    Status da Integração Técnica:
                  </strong>
                  Para ativação da confirmação de pagamento em tempo real e disparo imediato via WhatsApp, conecte suas credenciais de gateway de pagamento (Mercado Pago, Asaas ou EFI Bank) e webhook no backend.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 7: COMO É FEITA A ENTREGA PELO WHATSAPP                              */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-emerald-700 text-xs font-extrabold uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Pós-Pagamento
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Entrega rápida e descomplicada
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Saiba exatamente o que acontece após você efetuar o pagamento.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-black text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Confirmação do Pix
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Assim que a instituição financeira confirma a transferência, o pedido entra automaticamente na fila de processamento da IA.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-black text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Geração em Alta Resolução
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nossos modelos neurais combinam seu rosto ao cenário e à personalidade com fidelidade de iluminação e renderização.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 mb-1">
                Disparo no WhatsApp
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Você recebe uma mensagem com a imagem em alta definição para baixar sem compressão e postar onde quiser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO 8: PERGUNTAS FREQUENTES (FAQ)                                       */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-slate-600 text-xs font-extrabold uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
              Tire Suas Dúvidas
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Perguntas Frequentes
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Transparência total sobre como o produto funciona e como protegemos seus dados.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition bg-slate-50/50"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:text-emerald-700 transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER & AVISOS LEGAIS                                                    */}
      {/* ========================================================================= */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Caixa de Conformidade e Proteção Legal */}
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl mb-8 leading-relaxed text-slate-300">
            <h5 className="text-white font-extrabold text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              Declaração de Conformidade e Aviso aos Usuários
            </h5>
            <p className="text-[11px] text-slate-400">
              O <strong>Clique Político AI</strong> é um serviço de geração de arte e montagens digitais personalizadas que utiliza Inteligência Artificial exclusivamente com objetivos recreativos, artísticos e de entretenimento. Este site e suas criações <strong>não possuem qualquer afiliação, representação oficial, vínculo partidário, apoio ou endosso</strong> por parte das personalidades retratadas, de seus partidos políticos ou de órgãos do governo brasileiro. É estritamente proibida a utilização das imagens geradas para a veiculação de notícias falsas (fake news), desinformação deliberada, fraude eleitoral ou difamação.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                CP
              </div>
              <span className="font-bold text-white text-sm">Clique Político AI</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <a href="#faq" className="hover:text-white transition">Termos de Uso</a>
              <span>•</span>
              <a href="#faq" className="hover:text-white transition">Política de Privacidade</a>
              <span>•</span>
              <a href="#faq" className="hover:text-white transition">Política de Reembolso</a>
            </div>

            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} Clique Político AI. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
