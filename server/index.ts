import "dotenv/config";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import bcrypt from "bcryptjs";
import connectPgSimple from "connect-pg-simple";
import express, { type NextFunction, type Request, type Response } from "express";
import { rateLimit } from "express-rate-limit";
import session from "express-session";
import helmet from "helmet";
import { initializeDatabase } from "./database.js";
import { sendContactNotifications } from "./email.js";
import { pool } from "./pool.js";
import { defaultPages } from "./seed-data.js";

declare module "express-session" {
  interface SessionData {
    isAdmin: boolean;
  }
}

const requiredEnvironment = ["SESSION_SECRET", "ADMIN_USERNAME", "ADMIN_PASSWORD"];
const missingEnvironment = requiredEnvironment.filter(
  (name) => !process.env[name],
);

if (missingEnvironment.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvironment.join(", ")}. Copy .env.example to .env and configure it.`,
  );
}

if ((process.env.SESSION_SECRET?.length || 0) < 32) {
  throw new Error("SESSION_SECRET must contain at least 32 characters.");
}

if ((process.env.ADMIN_PASSWORD?.length || 0) < 12) {
  throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
}

const port = Number(process.env.PORT || 3001);
const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(
  /\/+$/,
  "",
);
const parsedSiteUrl = new URL(siteUrl);
if (parsedSiteUrl.protocol !== "http:" && parsedSiteUrl.protocol !== "https:") {
  throw new Error("SITE_URL must use the http or https protocol.");
}
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535.");
}
const sessionStore = connectPgSimple(session);
const app = express();
const adminPasswordHash = bcrypt.hashSync(process.env.ADMIN_PASSWORD!, 12);

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "20kb" }));
app.use(
  session({
    store: new sessionStore({ pool, createTableIfMissing: true }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 8,
    },
  }),
);

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Try again in 15 minutes." },
});

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { error: "Too many messages. Please try again later." },
});

const articleFields = `
  id, slug, title, category, excerpt, content, image, author,
  author_image AS "authorImage", reading_time AS "readingTime",
  featured, to_char(created_at, 'YYYY-MM-DD') AS "createdAt",
  is_published AS "isPublished", seo_title AS "seoTitle",
  seo_description AS "seoDescription", canonical_url AS "canonicalUrl",
  social_image AS "socialImage", no_index AS "noIndex"
`;

const pageSeoFields = `
  path, title, description, canonical_url AS "canonicalUrl",
  social_image AS "socialImage", no_index AS "noIndex"
`;

class ValidationError extends Error {}

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.isAdmin) {
    res.status(401).json({ error: "Sign in to access the admin panel." });
    return;
  }
  next();
}

function requiredString(
  body: Record<string, unknown>,
  field: string,
  maxLength: number,
) {
  const value = body[field];
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) {
    throw new ValidationError(`${field} is required and must be at most ${maxLength} characters.`);
  }
  return value.trim();
}

function optionalString(
  body: Record<string, unknown>,
  field: string,
  maxLength: number,
) {
  const value = body[field];
  if (value === undefined || value === null) return "";
  if (typeof value !== "string" || value.length > maxLength) {
    throw new ValidationError(`${field} must be at most ${maxLength} characters.`);
  }
  return value.trim();
}

function optionalUrl(value: string, field: string) {
  if (!value) return;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error();
    }
  } catch {
    throw new ValidationError(`${field} must be a valid http or https URL.`);
  }
}

function parseArticle(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ValidationError("Article data must be an object.");
  }
  const values = body as Record<string, unknown>;
  const slug = requiredString(values, "slug", 160);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new ValidationError("Slug may contain lowercase letters, numbers, and hyphens.");
  }

  const image = requiredString(values, "image", 2048);
  const authorImage = optionalString(values, "authorImage", 2048);
  const canonicalUrl = optionalString(values, "canonicalUrl", 2048);
  const socialImage = optionalString(values, "socialImage", 2048);
  optionalUrl(image, "image");
  optionalUrl(authorImage, "authorImage");
  optionalUrl(canonicalUrl, "canonicalUrl");
  optionalUrl(socialImage, "socialImage");

  if (typeof values.featured !== "boolean" || typeof values.isPublished !== "boolean" || typeof values.noIndex !== "boolean") {
    throw new ValidationError("Featured, published, and no-index settings must be boolean values.");
  }

  const createdAt = optionalString(values, "createdAt", 10);
  if (createdAt && !/^\d{4}-\d{2}-\d{2}$/.test(createdAt)) {
    throw new ValidationError("Publication date must use YYYY-MM-DD format.");
  }

  return {
    slug,
    title: requiredString(values, "title", 200),
    category: requiredString(values, "category", 100),
    excerpt: requiredString(values, "excerpt", 1000),
    content: requiredString(values, "content", 100000),
    image,
    author: requiredString(values, "author", 120),
    authorImage,
    readingTime: optionalString(values, "readingTime", 40),
    featured: values.featured,
    createdAt: createdAt || new Date().toISOString().slice(0, 10),
    isPublished: values.isPublished,
    seoTitle: optionalString(values, "seoTitle", 200),
    seoDescription: optionalString(values, "seoDescription", 320),
    canonicalUrl,
    socialImage,
    noIndex: values.noIndex,
  };
}

function isUniqueViolation(error: unknown): boolean {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "23505",
  );
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

async function getSeo(path: string) {
  const normalizedPath = path.length > 1 ? path.replace(/\/+$/, "") : path;
  if (normalizedPath === "/admin" || normalizedPath.startsWith("/admin/")) {
    return {
      title: "Admin — Cafe Courtyard",
      description: "Cafe Courtyard administration panel.",
      canonicalUrl: "",
      socialImage: "",
      noIndex: true,
    };
  }
  const articleSlug = normalizedPath.match(/^\/journal\/([^/]+)$/)?.[1];
  const routeTemplate = normalizedPath.startsWith("/dish/")
        ? "/dish/:slug"
        : normalizedPath;
  if (articleSlug) {
    const { rows } = await pool.query(
      `SELECT title, excerpt AS description,
        seo_title AS "seoTitle", seo_description AS "seoDescription",
        canonical_url AS "canonicalUrl", social_image AS "socialImage",
        image, no_index AS "noIndex"
       FROM articles WHERE slug = $1 AND is_published = true`,
      [decodeURIComponent(articleSlug)],
    );
    const article = rows[0];
    if (article) {
      return {
        title: article.seoTitle || `${article.title} — Cafe Courtyard`,
        description: article.seoDescription || article.description,
        canonicalUrl: article.canonicalUrl,
        socialImage: article.socialImage || article.image,
        noIndex: article.noIndex,
      };
    }
    return null;
  }

  const { rows } = await pool.query(
    `SELECT title, description, canonical_url AS "canonicalUrl",
      social_image AS "socialImage", no_index AS "noIndex"
     FROM page_seo WHERE path = $1`,
    [routeTemplate],
  );
  return rows[0] || null;
}

const api = express.Router();
api.get("/admin/session", (req, res) => {
  res.json({ authenticated: Boolean(req.session.isAdmin) });
});

api.post("/admin/login", loginLimiter, async (req, res, next) => {
  try {
    const username = req.body?.username;
    const password = req.body?.password;
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username !== process.env.ADMIN_USERNAME ||
      !(await bcrypt.compare(password, adminPasswordHash))
    ) {
      res.status(401).json({ error: "Invalid username or password." });
      return;
    }

    req.session.regenerate((error) => {
      if (error) {
        next(error);
        return;
      }
      req.session.isAdmin = true;
      req.session.save((saveError) => {
        if (saveError) {
          next(saveError);
          return;
        }
        res.json({ authenticated: true });
      });
    });
  } catch (error) {
    next(error);
  }
});

api.post("/admin/logout", requireAdmin, (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
      return;
    }
    res.clearCookie("connect.sid", { httpOnly: true, sameSite: "strict" });
    res.status(204).end();
  });
});

api.post("/contact", contactLimiter, async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      throw new ValidationError("Contact details must be submitted as an object.");
    }
    const body = req.body as Record<string, unknown>;
    if (typeof body.phone_alt === "string" && body.phone_alt.trim()) {
      res.status(201).json({ submitted: true });
      return;
    }
    const name = requiredString(body, "name", 120);
    const email = requiredString(body, "email", 254);
    const message = requiredString(body, "message", 500);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: "Enter a valid email address." });
      return;
    }

    await pool.query(
      "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message],
    );
    try {
      await sendContactNotifications({ name, email, message });
    } catch (error) {
      console.error("Contact submission email delivery failed:", error);
      res.status(503).json({
        error:
          error instanceof Error
            ? error.message
            : "The message was saved, but email notifications could not be sent.",
      });
      return;
    }
    res.status(201).json({ submitted: true });
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    next(error);
  }
});

api.get("/articles", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${articleFields} FROM articles WHERE is_published = true
       ORDER BY featured DESC, created_at DESC, title ASC`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

api.get("/articles/:slug", async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${articleFields} FROM articles
       WHERE slug = $1 AND is_published = true`,
      [req.params.slug],
    );
    if (!rows[0]) {
      res.status(404).json({ error: "Article not found." });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

api.get("/seo", async (req, res, next) => {
  try {
    const path = typeof req.query.path === "string" ? req.query.path : "/";
    const seo = await getSeo(path);
    if (!seo) {
      res.status(404).json({ error: "SEO settings not found." });
      return;
    }
    res.json(seo);
  } catch (error) {
    next(error);
  }
});

api.use("/admin", requireAdmin);

api.get("/admin/articles", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${articleFields} FROM articles
       ORDER BY created_at DESC, title ASC`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

api.post("/admin/articles", async (req, res, next) => {
  try {
    const article = parseArticle(req.body);
    const { rows } = await pool.query(
      `INSERT INTO articles (
        id, slug, title, category, excerpt, content, image, author,
        author_image, reading_time, featured, created_at, is_published,
        seo_title, seo_description, canonical_url, social_image, no_index
      ) VALUES (
        gen_random_uuid()::text, $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17
      ) RETURNING ${articleFields}`,
      [
        article.slug,
        article.title,
        article.category,
        article.excerpt,
        article.content,
        article.image,
        article.author,
        article.authorImage,
        article.readingTime,
        article.featured,
        article.createdAt,
        article.isPublished,
        article.seoTitle,
        article.seoDescription,
        article.canonicalUrl,
        article.socialImage,
        article.noIndex,
      ],
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    if (isUniqueViolation(error)) {
      res.status(409).json({ error: "An article already uses that slug." });
      return;
    }
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    next(error);
  }
});

api.put("/admin/articles/:id", async (req, res, next) => {
  try {
    const article = parseArticle(req.body);
    const { rows } = await pool.query(
      `UPDATE articles SET
        slug = $2, title = $3, category = $4, excerpt = $5, content = $6,
        image = $7, author = $8, author_image = $9, reading_time = $10,
        featured = $11, created_at = $12, is_published = $13,
        seo_title = $14, seo_description = $15, canonical_url = $16,
        social_image = $17, no_index = $18
       WHERE id = $1 RETURNING ${articleFields}`,
      [
        req.params.id,
        article.slug,
        article.title,
        article.category,
        article.excerpt,
        article.content,
        article.image,
        article.author,
        article.authorImage,
        article.readingTime,
        article.featured,
        article.createdAt,
        article.isPublished,
        article.seoTitle,
        article.seoDescription,
        article.canonicalUrl,
        article.socialImage,
        article.noIndex,
      ],
    );
    if (!rows[0]) {
      res.status(404).json({ error: "Article not found." });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    if (isUniqueViolation(error)) {
      res.status(409).json({ error: "An article already uses that slug." });
      return;
    }
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    next(error);
  }
});

api.delete("/admin/articles/:id", async (req, res, next) => {
  try {
    const result = await pool.query("DELETE FROM articles WHERE id = $1", [
      req.params.id,
    ]);
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Article not found." });
      return;
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

api.get("/admin/contacts", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, message, is_read AS "isRead", created_at AS "createdAt"
       FROM contact_submissions ORDER BY created_at DESC`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

api.patch("/admin/contacts/:id", async (req, res, next) => {
  if (typeof req.body?.isRead !== "boolean") {
    res.status(400).json({ error: "isRead must be a boolean value." });
    return;
  }
  try {
    const { rows } = await pool.query(
      `UPDATE contact_submissions SET is_read = $2 WHERE id = $1
       RETURNING id, name, email, message, is_read AS "isRead", created_at AS "createdAt"`,
      [req.params.id, req.body.isRead],
    );
    if (!rows[0]) {
      res.status(404).json({ error: "Contact submission not found." });
      return;
    }
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

api.delete("/admin/contacts/:id", async (req, res, next) => {
  try {
    const result = await pool.query(
      "DELETE FROM contact_submissions WHERE id = $1",
      [req.params.id],
    );
    if (result.rowCount === 0) {
      res.status(404).json({ error: "Contact submission not found." });
      return;
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

api.get("/admin/seo", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${pageSeoFields} FROM page_seo ORDER BY path`,
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

api.put("/admin/seo", async (req, res, next) => {
  try {
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
      throw new ValidationError("SEO settings must be submitted as an object.");
    }
    const body = req.body as Record<string, unknown>;
    const path = requiredString(body, "path", 200);
    if (!defaultPages.some((page) => page.path === path)) {
      res.status(400).json({ error: "Choose one of the configured site pages." });
      return;
    }
    const title = requiredString(body, "title", 200);
    const description = requiredString(body, "description", 320);
    const canonicalUrl = optionalString(body, "canonicalUrl", 2048);
    const socialImage = optionalString(body, "socialImage", 2048);
    optionalUrl(canonicalUrl, "canonicalUrl");
    optionalUrl(socialImage, "socialImage");
    if (typeof body.noIndex !== "boolean") {
      res.status(400).json({ error: "noIndex must be a boolean value." });
      return;
    }

    const { rows } = await pool.query(
      `UPDATE page_seo SET title = $2, description = $3, canonical_url = $4,
        social_image = $5, no_index = $6
       WHERE path = $1 RETURNING ${pageSeoFields}`,
      [path, title, description, canonicalUrl, socialImage, body.noIndex],
    );
    res.json(rows[0]);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }
    next(error);
  }
});

async function sendSitemap(_req: Request, res: Response, next: NextFunction) {
  try {
    const { rows: pages } = await pool.query(
      `SELECT path, canonical_url AS "canonicalUrl" FROM page_seo
       WHERE no_index = false AND path NOT LIKE '%:%' ORDER BY path`,
    );
    const { rows: posts } = await pool.query(
      `SELECT slug, canonical_url AS "canonicalUrl" FROM articles
       WHERE is_published = true AND no_index = false
       ORDER BY created_at DESC`,
    );
    const urls = [
      ...pages.map((page) => page.canonicalUrl || `${siteUrl}${page.path}`),
      ...posts.map((post) => post.canonicalUrl || `${siteUrl}/journal/${post.slug}`),
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((url) => `  <url><loc>${escapeHtml(url)}</loc></url>`)
      .join("\n")}\n</urlset>`;
    res.type("application/xml").send(xml);
  } catch (error) {
    next(error);
  }
}

function sendRobots(_req: Request, res: Response) {
  res.type("text/plain").send(
    `User-agent: *\nDisallow: /admin\nDisallow: /api\nSitemap: ${siteUrl}/sitemap.xml\n`,
  );
}

api.get("/sitemap.xml", sendSitemap);
api.get("/robots.txt", sendRobots);
app.use("/api", api);
app.get("/sitemap.xml", sendSitemap);
app.get("/robots.txt", sendRobots);

const outputDirectory = resolve(process.cwd(), "out");
app.use(express.static(outputDirectory, { index: false }));
app.get(/.*/, async (req, res, next) => {
  try {
    const template = await readFile(resolve(outputDirectory, "index.html"), "utf8");
    const seo = await getSeo(req.path);
    if (!seo) {
      res.status(404).send(template);
      return;
    }

    const title = escapeHtml(seo.title);
    const description = escapeHtml(seo.description || "");
    const canonical = escapeHtml(
      seo.canonicalUrl || `${siteUrl}${req.path}`,
    );
    const image = escapeHtml(seo.socialImage || "");
    const robots = seo.noIndex ? "noindex, nofollow" : "index, follow";
    const html = template
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
          (image ? `<meta name="twitter:image" content="${image}" />\n` : "") +
          (image ? `<meta property="og:image" content="${image}" />\n` : ""),
      );
    res.send(html);
  } catch (error) {
    next(error);
  }
});

app.use((error: unknown, _req: Request, res: Response, next: NextFunction) => {
  console.error("Request failed:", error);
  if (res.headersSent) {
    next(error);
    return;
  }
  res.status(500).json({ error: "The server could not complete the request." });
});

async function start() {
  await initializeDatabase();
  app.listen(port, "127.0.0.1", () => {
    console.log(`Cafe Courtyard backend listening on http://localhost:${port}`);
  });
}

start().catch(async (error: unknown) => {
  console.error("Backend startup failed:", error);
  await pool.end();
  process.exitCode = 1;
});
