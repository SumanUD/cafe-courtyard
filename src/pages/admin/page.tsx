import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { Article, ContactSubmission, PageSeo } from "@/types/article";

type Section = "articles" | "contacts" | "seo";
type ArticleDraft = Omit<Article, "id">;

const emptyArticle: ArticleDraft = {
  slug: "",
  title: "",
  category: "Food Stories",
  excerpt: "",
  content: "",
  image: "",
  author: "",
  authorImage: "",
  readingTime: "",
  featured: false,
  createdAt: new Date().toISOString().slice(0, 10),
  isPublished: false,
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
  socialImage: "",
  noIndex: false,
};

const fieldClass =
  "w-full rounded-lg border border-background-300 bg-white px-3 py-2 text-sm text-foreground-900 focus:border-primary-500 focus:outline-none";
const buttonClass =
  "rounded-lg bg-primary-700 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-60";

async function loadDashboard() {
  const [articles, contacts, pages] = await Promise.all([
    apiRequest<Article[]>("/api/admin/articles"),
    apiRequest<ContactSubmission[]>("/api/admin/contacts"),
    apiRequest<PageSeo[]>("/api/admin/seo"),
  ]);
  return { articles, contacts, pages };
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="block space-y-1.5 text-sm font-medium text-foreground-700">
      <span>{label}</span>
      <input
        className={fieldClass}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 4,
  required = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="block space-y-1.5 text-sm font-medium text-foreground-700">
      <span>{label}</span>
      <textarea
        className={fieldClass}
        value={value}
        rows={rows}
        required={required}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-primary-700"
      />
      {label}
    </label>
  );
}

export default function AdminPage() {
  const [authState, setAuthState] = useState<"checking" | "signedOut" | "signedIn">(
    "checking",
  );
  const [section, setSection] = useState<Section>("articles");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [articles, setArticles] = useState<Article[]>([]);
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [pages, setPages] = useState<PageSeo[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [draft, setDraft] = useState<ArticleDraft>(emptyArticle);
  const [selectedSeoPath, setSelectedSeoPath] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const refreshDashboard = useCallback(async () => {
    const data = await loadDashboard();
    setArticles(data.articles);
    setContacts(data.contacts);
    setPages(data.pages);
    setSelectedSeoPath((current) => current || data.pages[0]?.path || "");
  }, []);

  useEffect(() => {
    let active = true;
    apiRequest<{ authenticated: boolean }>("/api/admin/session")
      .then(({ authenticated }) => {
        if (!active) return;
        if (!authenticated) {
          setAuthState("signedOut");
          return;
        }
        setAuthState("signedIn");
        refreshDashboard().catch((loadError: unknown) => {
          if (active) {
            setError(
              loadError instanceof Error
                ? loadError.message
                : "Unable to load admin data.",
            );
          }
        });
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Unable to connect to the backend.");
          setAuthState("signedOut");
        }
      });
    return () => {
      active = false;
    };
  }, [refreshDashboard]);

  function showError(value: unknown) {
    setNotice("");
    setError(value instanceof Error ? value.message : "The request could not be completed.");
  }

  function updateDraft<K extends keyof ArticleDraft>(
    field: K,
    value: ArticleDraft[K],
  ) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await apiRequest("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setPassword("");
      setAuthState("signedIn");
      try {
        await refreshDashboard();
      } catch (loadError) {
        showError(loadError);
      }
    } catch (loginError) {
      showError(loginError);
    } finally {
      setSaving(false);
    }
  }

  function selectArticle(article: Article) {
    const { id, ...articleDraft } = article;
    setSelectedArticle(id);
    setDraft(articleDraft);
    setNotice("");
    setError("");
  }

  function startNewArticle() {
    setSelectedArticle(null);
    setDraft({ ...emptyArticle, createdAt: new Date().toISOString().slice(0, 10) });
    setNotice("");
    setError("");
  }

  async function saveArticle(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    setError("");
    try {
      const saved = await apiRequest<Article>(
        selectedArticle
          ? `/api/admin/articles/${encodeURIComponent(selectedArticle)}`
          : "/api/admin/articles",
        {
          method: selectedArticle ? "PUT" : "POST",
          body: JSON.stringify(draft),
        },
      );
      await refreshDashboard();
      selectArticle(saved);
      setNotice("Article saved.");
    } catch (saveError) {
      showError(saveError);
    } finally {
      setSaving(false);
    }
  }

  async function deleteArticle(article: Article) {
    if (!window.confirm(`Delete "${article.title}"? This cannot be undone.`)) return;
    try {
      await apiRequest(`/api/admin/articles/${encodeURIComponent(article.id)}`, {
        method: "DELETE",
      });
      await refreshDashboard();
      if (selectedArticle === article.id) startNewArticle();
      setNotice("Article deleted.");
    } catch (deleteError) {
      showError(deleteError);
    }
  }

  async function updateContact(contact: ContactSubmission, isRead: boolean) {
    try {
      await apiRequest(`/api/admin/contacts/${contact.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isRead }),
      });
      setContacts((current) =>
        current.map((item) => (item.id === contact.id ? { ...item, isRead } : item)),
      );
    } catch (contactError) {
      showError(contactError);
    }
  }

  async function deleteContact(contact: ContactSubmission) {
    if (!window.confirm(`Delete the message from ${contact.name}?`)) return;
    try {
      await apiRequest(`/api/admin/contacts/${contact.id}`, { method: "DELETE" });
      setContacts((current) => current.filter((item) => item.id !== contact.id));
      setNotice("Message deleted.");
    } catch (contactError) {
      showError(contactError);
    }
  }

  async function saveSeo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const page = pages.find((item) => item.path === selectedSeoPath);
    if (!page) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const saved = await apiRequest<PageSeo>("/api/admin/seo", {
        method: "PUT",
        body: JSON.stringify(page),
      });
      setPages((current) =>
        current.map((item) => (item.path === saved.path ? saved : item)),
      );
      setNotice("SEO settings saved.");
    } catch (seoError) {
      showError(seoError);
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    try {
      await apiRequest("/api/admin/logout", { method: "POST" });
      setAuthState("signedOut");
      setArticles([]);
      setContacts([]);
      setPages([]);
    } catch (logoutError) {
      showError(logoutError);
    }
  }

  if (authState === "checking") {
    return (
      <main className="min-h-screen bg-background-100 p-6 text-center text-foreground-700">
        Checking admin access…
      </main>
    );
  }

  if (authState === "signedOut") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background-100 px-5 py-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-5 rounded-2xl bg-white p-8 shadow-sm"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary-700">
              Cafe Courtyard
            </p>
            <h1 className="mt-2 font-display text-3xl text-primary-900">Admin sign in</h1>
            <p className="mt-2 text-sm text-foreground-600">
              This area is restricted to the configured administrator.
            </p>
          </div>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <TextField label="Username" value={username} onChange={setUsername} required />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          <button className={`${buttonClass} w-full`} disabled={saving}>
            {saving ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  const selectedSeo = pages.find((page) => page.path === selectedSeoPath);
  const unreadCount = contacts.filter((contact) => !contact.isRead).length;

  return (
    <main className="min-h-screen bg-background-100">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-background-300 bg-white px-5 py-4 md:px-10">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary-700">Cafe Courtyard</p>
          <h1 className="font-display text-2xl text-primary-900">Admin panel</h1>
        </div>
        <div className="flex gap-3">
          <a href="/" className="rounded-lg border border-background-300 px-4 py-2 text-sm text-foreground-700">
            View site
          </a>
          <button type="button" onClick={logout} className={buttonClass}>
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 md:px-10">
        <nav className="mb-6 flex flex-wrap gap-2" aria-label="Admin sections">
          {([
            ["articles", `Articles (${articles.length})`],
            ["contacts", `Messages (${unreadCount} unread)`],
            ["seo", "Page SEO"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSection(key)}
              className={`rounded-full px-4 py-2 text-sm ${
                section === key
                  ? "bg-primary-800 text-white"
                  : "border border-background-300 bg-white text-foreground-700"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {(error || notice) && (
          <p
            role={error ? "alert" : "status"}
            className={`mb-5 rounded-lg px-4 py-3 text-sm ${
              error ? "bg-red-50 text-red-800" : "bg-green-50 text-green-800"
            }`}
          >
            {error || notice}
          </p>
        )}

        {section === "articles" && (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <aside className="h-fit rounded-xl bg-white p-4">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="font-display text-xl text-primary-900">Blog articles</h2>
                <button type="button" onClick={startNewArticle} className="text-sm text-primary-700">
                  + New
                </button>
              </div>
              <ul className="space-y-1">
                {articles.map((article) => (
                  <li key={article.id}>
                    <button
                      type="button"
                      onClick={() => selectArticle(article)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                        selectedArticle === article.id ? "bg-primary-50 text-primary-900" : "hover:bg-background-100"
                      }`}
                    >
                      <span className="block font-medium">{article.title}</span>
                      <span className="text-xs text-foreground-500">
                        {article.isPublished ? "Published" : "Draft"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <form onSubmit={saveArticle} className="space-y-5 rounded-xl bg-white p-5 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-2xl text-primary-900">
                  {selectedArticle ? "Edit article" : "New article"}
                </h2>
                {selectedArticle && (
                  <button
                    type="button"
                    onClick={() => {
                      const article = articles.find((item) => item.id === selectedArticle);
                      if (article) void deleteArticle(article);
                    }}
                    className="text-sm text-red-700"
                  >
                    Delete article
                  </button>
                )}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Title" value={draft.title} onChange={(value) => updateDraft("title", value)} required maxLength={200} />
                <TextField label="URL slug" value={draft.slug} onChange={(value) => updateDraft("slug", value)} required maxLength={160} />
                <TextField label="Category" value={draft.category} onChange={(value) => updateDraft("category", value)} required maxLength={100} />
                <TextField label="Author" value={draft.author} onChange={(value) => updateDraft("author", value)} required maxLength={120} />
                <TextField label="Cover image URL" value={draft.image} onChange={(value) => updateDraft("image", value)} required maxLength={2048} />
                <TextField label="Author image URL" value={draft.authorImage} onChange={(value) => updateDraft("authorImage", value)} maxLength={2048} />
                <TextField label="Reading time" value={draft.readingTime} onChange={(value) => updateDraft("readingTime", value)} maxLength={40} />
                <TextField label="Publication date" type="date" value={draft.createdAt} onChange={(value) => updateDraft("createdAt", value)} required />
              </div>
              <TextAreaField label="Excerpt" value={draft.excerpt} onChange={(value) => updateDraft("excerpt", value)} required maxLength={1000} />
              <TextAreaField label="Article content (separate paragraphs with a blank line)" value={draft.content} onChange={(value) => updateDraft("content", value)} required rows={12} maxLength={100000} />
              <div className="flex flex-wrap gap-6">
                <Toggle label="Published" checked={draft.isPublished} onChange={(value) => updateDraft("isPublished", value)} />
                <Toggle label="Featured" checked={draft.featured} onChange={(value) => updateDraft("featured", value)} />
              </div>
              <div className="border-t border-background-200 pt-5">
                <h3 className="mb-4 font-display text-xl text-primary-900">Article SEO</h3>
                <div className="space-y-4">
                  <TextField label="SEO title (blank uses article title)" value={draft.seoTitle} onChange={(value) => updateDraft("seoTitle", value)} maxLength={200} />
                  <TextAreaField label="SEO description (blank uses excerpt)" value={draft.seoDescription} onChange={(value) => updateDraft("seoDescription", value)} rows={2} maxLength={320} />
                  <TextField label="Canonical URL" value={draft.canonicalUrl} onChange={(value) => updateDraft("canonicalUrl", value)} maxLength={2048} />
                  <TextField label="Social share image URL (blank uses cover image)" value={draft.socialImage} onChange={(value) => updateDraft("socialImage", value)} maxLength={2048} />
                  <Toggle label="Exclude from search indexing and sitemap" checked={draft.noIndex} onChange={(value) => updateDraft("noIndex", value)} />
                </div>
              </div>
              <button className={buttonClass} disabled={saving}>
                {saving ? "Saving…" : "Save article"}
              </button>
            </form>
          </div>
        )}

        {section === "contacts" && (
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-primary-900">Contact submissions</h2>
            {contacts.length === 0 && (
              <p className="rounded-xl bg-white p-6 text-sm text-foreground-600">No messages yet.</p>
            )}
            {contacts.map((contact) => (
              <article key={contact.id} className={`rounded-xl bg-white p-5 ${contact.isRead ? "" : "border-l-4 border-primary-600"}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-xl text-primary-900">{contact.name}</h3>
                    <a className="text-sm text-primary-700 underline" href={`mailto:${contact.email}`}>{contact.email}</a>
                    <time className="ml-3 text-xs text-foreground-500" dateTime={contact.createdAt}>
                      {new Date(contact.createdAt).toLocaleString()}
                    </time>
                    <p className="mt-3 whitespace-pre-wrap text-sm text-foreground-700">{contact.message}</p>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => void updateContact(contact, !contact.isRead)} className="text-sm text-primary-700">
                      Mark {contact.isRead ? "unread" : "read"}
                    </button>
                    <button type="button" onClick={() => void deleteContact(contact)} className="text-sm text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        {section === "seo" && selectedSeo && (
          <form onSubmit={saveSeo} className="max-w-3xl space-y-5 rounded-xl bg-white p-5 md:p-7">
            <div>
              <h2 className="font-display text-2xl text-primary-900">SEO settings</h2>
              <p className="mt-1 text-sm text-foreground-600">
                These settings update page metadata, canonical links, social previews, and sitemap inclusion.
              </p>
            </div>
            <label className="block space-y-1.5 text-sm font-medium text-foreground-700">
              <span>Page</span>
              <select className={fieldClass} value={selectedSeoPath} onChange={(event) => setSelectedSeoPath(event.target.value)}>
                {pages.map((page) => <option key={page.path} value={page.path}>{page.path}</option>)}
              </select>
            </label>
            <TextField label="Title" value={selectedSeo.title} required maxLength={200} onChange={(value) => setPages((current) => current.map((page) => page.path === selectedSeoPath ? { ...page, title: value } : page))} />
            <TextAreaField label="Meta description" value={selectedSeo.description} required maxLength={320} rows={3} onChange={(value) => setPages((current) => current.map((page) => page.path === selectedSeoPath ? { ...page, description: value } : page))} />
            <TextField label="Canonical URL (blank uses the page URL)" value={selectedSeo.canonicalUrl} maxLength={2048} onChange={(value) => setPages((current) => current.map((page) => page.path === selectedSeoPath ? { ...page, canonicalUrl: value } : page))} />
            <TextField label="Open Graph image URL" value={selectedSeo.socialImage} maxLength={2048} onChange={(value) => setPages((current) => current.map((page) => page.path === selectedSeoPath ? { ...page, socialImage: value } : page))} />
            <Toggle label="Exclude from search indexing and sitemap" checked={selectedSeo.noIndex} onChange={(value) => setPages((current) => current.map((page) => page.path === selectedSeoPath ? { ...page, noIndex: value } : page))} />
            <button className={buttonClass} disabled={saving}>
              {saving ? "Saving…" : "Save SEO settings"}
            </button>
            <div className="border-t border-background-200 pt-4 text-sm">
              <p className="font-medium text-foreground-700">Generated SEO files</p>
              <div className="mt-2 flex gap-4">
                <a className="text-primary-700 underline" href="/sitemap.xml" target="_blank" rel="noreferrer">Open sitemap.xml</a>
                <a className="text-primary-700 underline" href="/robots.txt" target="_blank" rel="noreferrer">Open robots.txt</a>
              </div>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
