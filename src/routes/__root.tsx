import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0a09] text-white px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white/90">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white/80">Página não encontrada</h2>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-black shadow-md hover:bg-amber-400"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0c0a09] text-white px-4">
      <div className="max-w-lg text-center w-full">
        <h1 className="text-xl font-bold tracking-tight text-white mb-2">
          Ocorreu um erro ao carregar a página
        </h1>
        <div className="bg-red-950/80 border border-red-500/50 text-red-200 text-xs p-3.5 rounded-xl text-left my-4 overflow-auto max-h-60 font-mono">
          <strong className="text-red-400 block mb-1">
            {error instanceof Error ? error.message : String(error)}
          </strong>
          {error instanceof Error && error.stack && (
            <pre className="mt-2 text-[10px] text-red-300/80 whitespace-pre-wrap">
              {error.stack}
            </pre>
          )}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-amber-400 transition"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" },
      { title: "Sua Foto com Lula 13 ou Flávio Bolsonaro 22 — Montagem Personalizada" },
      { name: "description", content: "Escolha entre Lula 13 e Flávio Bolsonaro 22 e receba sua montagem personalizada em alta resolução para redes sociais e WhatsApp." },
      { name: "theme-color", content: "#0c0a09" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
