CREATE TABLE IF NOT EXISTS articles (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  category text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  image text NOT NULL,
  author text NOT NULL,
  author_image text NOT NULL DEFAULT '',
  reading_time text NOT NULL DEFAULT '',
  featured boolean NOT NULL DEFAULT false,
  created_at date NOT NULL DEFAULT CURRENT_DATE,
  is_published boolean NOT NULL DEFAULT false,
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  canonical_url text NOT NULL DEFAULT '',
  social_image text NOT NULL DEFAULT '',
  no_index boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS page_seo (
  path text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  canonical_url text NOT NULL DEFAULT '',
  social_image text NOT NULL DEFAULT '',
  no_index boolean NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id bigserial PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS articles_published_created_idx
  ON articles (is_published, created_at DESC);

CREATE INDEX IF NOT EXISTS contact_submissions_created_idx
  ON contact_submissions (created_at DESC);
