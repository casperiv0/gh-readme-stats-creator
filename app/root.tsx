import * as React from "react";
import type { LinksFunction, MetaFunction } from "remix";
import { Outlet, Meta, Links, Scripts, LiveReload, useCatch } from "remix";
import { SSRProvider } from "@react-aria/ssr";

import tailwindStyles from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  viewport: "width=device-width, initial-scale=1",
  "google-site-verification": "6LqjGmq_LshCupZ3FdR3meDNGaWcBjRG2snvcRtclSc",
  "og:image": "https://notey.caspertheghost.me/icons/notey-app-144.png",
});

function Document({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body className="max-w-5xl p-5 mx-auto mt-5">
        <SSRProvider>{children}</SSRProvider>
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <main className="p-5">
            <h1>
              {caught.status} {caught.statusText}
            </h1>
          </main>
        </Document>
      );

    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <Document title="Uh-oh!">
      <main className="p-5">
        <h1 className="mb-5 text-3xl font-bold">App Error</h1>

        <span className="text-lg">
          {isDev ? (
            <pre>{error.message}</pre>
          ) : (
            <p>An unexpected error occurred. Please reload the page or try again later.</p>
          )}
        </span>
      </main>
    </Document>
  );
}
