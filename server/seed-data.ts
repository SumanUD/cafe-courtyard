import { randomUUID } from "node:crypto";
import { pool } from "./pool.js";
import { articles } from "../src/mocks/articles.js";

export const defaultPages = [
  {
    path: "/",
    title: "Cafe Courtyard — Where Continental Food Becomes Conversation",
    description:
      "A digital destination for continental food, culture, stories, and conversations in New Town, Kolkata.",
  },
  {
    path: "/journal",
    title: "Flavor Files — Cafe Courtyard",
    description:
      "Stories of continental food, culture, chef diaries, and community voices.",
  },
  {
    path: "/the-table",
    title: "Plate Stories — Cafe Courtyard",
    description:
      "Explore Cafe Courtyard's continental dishes through their origins and stories.",
  },
  {
    path: "/dish/:slug",
    title: "Plate Stories — Cafe Courtyard",
    description:
      "Discover the story, ingredients, and inspiration behind Cafe Courtyard dishes.",
  },
  {
    path: "/community",
    title: "The Circle — Cafe Courtyard",
    description:
      "Share food stories and connect with the Cafe Courtyard community.",
  },
  {
    path: "/about",
    title: "About Cafe Courtyard",
    description:
      "Discover Cafe Courtyard's story, philosophy, and community vision.",
  },
  {
    path: "/founder",
    title: "Founder Story — Cafe Courtyard",
    description:
      "Meet Sudarshana Dutt and discover the story behind Cafe Courtyard.",
  },
  {
    path: "/gallery",
    title: "Gallery — Cafe Courtyard",
    description:
      "Explore moments, food, people, and spaces at Cafe Courtyard.",
  },
  {
    path: "/visit",
    title: "Visit Cafe Courtyard — New Town, Kolkata",
    description:
      "Find Cafe Courtyard in New Town, Kolkata, and get in touch or reserve a table.",
  },
];

export async function seedInitialContent() {
  for (const article of articles) {
    await pool.query(
      `INSERT INTO articles (
        id, slug, title, category, excerpt, content, image, author,
        author_image, reading_time, featured, created_at, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)
      ON CONFLICT (slug) DO NOTHING`,
      [
        article.id || randomUUID(),
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
      ],
    );
  }

  for (const page of defaultPages) {
    await pool.query(
      `INSERT INTO page_seo (path, title, description)
       VALUES ($1, $2, $3)
       ON CONFLICT (path) DO NOTHING`,
      [page.path, page.title, page.description],
    );
  }
}
