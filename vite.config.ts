import { defineConfig } from "vite";
import type { Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { readFile } from "node:fs/promises";
import AutoImport from "unplugin-auto-import/vite";
// import { readdyJsxRuntimeProxyPlugin } from "./vite.jsx-runtime-proxy";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;

interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  socialImage: string;
  noIndex: boolean;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function createSeoHtmlPlugin(): Plugin {
  return {
    name: "cafe-courtyard-seo-html",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (
          req.method !== "GET" ||
          !req.headers.accept?.includes("text/html") ||
          !req.url
        ) {
          next();
          return;
        }

        const requestUrl = new URL(req.url, "http://localhost");
        const apiUrl = new URL(
          `/api/seo?path=${encodeURIComponent(requestUrl.pathname)}`,
          "http://127.0.0.1:3001",
        );

        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            next();
            return;
          }

          const metadata = (await response.json()) as SeoMetadata;
          const template = await readFile(
            resolve(process.cwd(), "index.html"),
            "utf8",
          );
          const html = await server.transformIndexHtml(
            req.url,
            template,
          );
          const title = escapeHtml(metadata.title);
          const description = escapeHtml(metadata.description || "");
          const canonical = escapeHtml(
            metadata.canonicalUrl ||
              `${process.env.SITE_URL || "http://localhost:3000"}${requestUrl.pathname}`,
          );
          const image = escapeHtml(metadata.socialImage || "");
          const robots = metadata.noIndex ? "noindex, nofollow" : "index, follow";
          const result = html
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
            .replace(
              /<meta name="description" content="[^"]*"\s*\/?>/,
              `<meta name="description" content="${description}" />`,
            )
            .replace(
              "<!-- SEO_HEAD -->",
              `<link rel="canonical" href="${canonical}" />\n` +
                `<meta name="robots" content="${robots}" />\n` +
                `<meta property="og:title" content="${title}" />\n` +
                `<meta property="og:description" content="${description}" />\n` +
                `<meta property="og:url" content="${canonical}" />\n` +
                `<meta name="twitter:card" content="summary_large_image" />\n` +
                `<meta name="twitter:title" content="${title}" />\n` +
                `<meta name="twitter:description" content="${description}" />\n` +
                (image
                  ? `<meta property="og:image" content="${image}" />\n<meta name="twitter:image" content="${image}" />`
                  : ""),
            );

          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(result);
        } catch (error) {
          console.error("Unable to render SEO metadata in Vite response:", error);
          next(error);
        }
      });
    },
  };
}

//const proxyPlugins = isPreview ? [readdyJsxRuntimeProxyPlugin()] : [];
// https://vite.dev/config/
export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(isPreview),
    __READDY_PROJECT_ID__: JSON.stringify(process.env.PROJECT_ID || ""),
    __READDY_VERSION_ID__: JSON.stringify(process.env.VERSION_ID || ""),
    __READDY_AI_DOMAIN__: JSON.stringify(process.env.READDY_AI_DOMAIN || ""),
  },
  plugins: [
    // ...proxyPlugins,
    createSeoHtmlPlugin(),
    react(),
    AutoImport({
      imports: [
        {
          react: [
            ["default", "React"],
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
            "Link",
            "NavLink",
            "Navigate",
            "Outlet",
          ],
        },
        // React i18n
        {
          "react-i18next": ["useTranslation", "Trans"],
        },
      ],
      dts: true,
    }),
  ],
  base,
  build: {
    sourcemap: true,
    outDir: 'out',
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: "127.0.0.1",
    proxy: {
      "/api": "http://localhost:3001",
      "/sitemap.xml": "http://localhost:3001",
      "/robots.txt": "http://localhost:3001",
    },
  },
});
