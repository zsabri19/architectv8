import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <div className="text-xs font-medium uppercase tracking-[0.3em] text-gold">Error 404</div>
        <h1 className="mt-4 font-serif text-6xl text-navy">Off the path</h1>
        <p className="mt-4 text-sm text-navy/60">
          The page you are looking for has moved or was never here.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-widest text-paper transition-colors hover:bg-gold hover:text-navy"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-navy">This page didn't load</h1>
        <p className="mt-3 text-sm text-navy/60">
          Something went wrong. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-navy px-6 py-3 text-xs font-semibold uppercase tracking-widest text-paper hover:bg-gold hover:text-navy"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-navy/20 px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:border-navy"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Zeeshan Sabri" },
      { property: "og:site_name", content: "Zeeshan Sabri — ClarityOS" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0F172A" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Zeeshan Sabri",
          jobTitle: "Crisis-to-Clarity Architect, Founder of ClarityOS",
          worksFor: { "@type": "Organization", name: "Global Markets Technologies LLC" },
          award: "Entrepreneurial Excellence Award, Founders 2.0 Conference (Dubai, 2025)",
          sameAs: ["https://www.linkedin.com/in/zeeshansabri/"],
        }),
      },
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-Z9BFJP96Q4",
      },
      {
        type: "script",
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Z9BFJP96Q4');
        `,
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
    <html lang="en">
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
