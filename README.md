# Cafe Courtyard

Cafe Courtyard is a React/Vite website with a local Express and PostgreSQL
backend for blog publishing, contact submissions, and SEO administration.

## Local setup

Requirements: Node.js 20.19+ and PostgreSQL.

1. Create the local database (you may be prompted for the PostgreSQL `postgres`
   role password):

   ```powershell
   createdb -U postgres -h localhost cafe_courtyard
   ```

2. Copy `.env.example` to `.env` and set your local PostgreSQL password, a
   private admin password (at least 12 characters), and a random session secret
   (at least 32 characters). `.env` is ignored by Git.

   ```powershell
   Copy-Item .env.example .env
   ```
3. Install dependencies and start both services:

   ```powershell
   npm install
   npm run dev
   ```

   The website runs at `http://localhost:3000`; the API runs at
   `http://localhost:3001`. On first start, the API creates its tables and
   imports the existing sample articles and default page SEO settings. This is
   idempotent and does not overwrite existing articles or SEO settings.
4. Open `http://localhost:3000/admin` and sign in with `ADMIN_USERNAME` and
   `ADMIN_PASSWORD` from `.env`.

The admin panel supports article creation, editing, publishing/unpublishing,
feature selection, SEO fields, contact message review/read status/deletion, and
per-page SEO settings. Public journal pages use published database articles.
The contact form saves submissions to PostgreSQL, emails the configured admin
inbox, and sends the visitor a confirmation email. Add Gmail SMTP credentials
to `.env` using `SMTP_USER` and `SMTP_PASSWORD` (a Google App Password, not
your normal Google account password). The administrator notification goes to
`ADMIN_NOTIFICATION_EMAIL`, defaulting to `SMTP_USER`. `SMTP_FROM` is optional;
if set, use the authenticated Gmail address as the sender. The API reports an
email-delivery error if either notification cannot be sent; the form submission
is still retained in the admin inbox. Restart `npm run dev` after changing
email settings.

The sitemap and robots file are available at `/sitemap.xml` and `/robots.txt`.
SEO settings are rendered into the initial HTML response in both Vite
development mode and the Node production server so they are visible in View
Page Source and to crawlers.

For a built local server with server-rendered SEO metadata, run:

```powershell
npm run build
npm start
```

The backend serves the built site at the configured `SITE_URL` (defaults to
`http://localhost:3000`); set `PORT` to `3000` in `.env` for this mode. In Vite
development mode, page metadata is rendered into the initial HTML response,
while the sitemap and robots file are proxied to the API.

This backend is configured for local development. The existing Netlify
configuration serves the static frontend only; deploying the admin/API requires
a Node.js host or a deliberate serverless deployment setup.
"# cafe-courtyard" 
