import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { Article } from "@/types/article";

type Result<T> =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: string };

export function usePublicArticles(): Result<Article[]> {
  const [result, setResult] = useState<Result<Article[]>>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    let active = true;
    apiRequest<Article[]>("/api/articles")
      .then((data) => {
        if (active) setResult({ status: "success", data, error: null });
      })
      .catch((error: unknown) => {
        if (active) {
          setResult({
            status: "error",
            data: null,
            error: error instanceof Error ? error.message : "Unable to load articles.",
          });
        }
      });
    return () => {
      active = false;
    };
  }, []);

  return result;
}

export function usePublicArticle(slug: string | undefined): Result<Article> {
  const [result, setResult] = useState<Result<Article>>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    let active = true;
    if (!slug) {
      setResult({ status: "error", data: null, error: "Article not found." });
      return () => {
        active = false;
      };
    }

    apiRequest<Article>(`/api/articles/${encodeURIComponent(slug)}`)
      .then((data) => {
        if (active) setResult({ status: "success", data, error: null });
      })
      .catch((error: unknown) => {
        if (active) {
          setResult({
            status: "error",
            data: null,
            error: error instanceof Error ? error.message : "Unable to load article.",
          });
        }
      });
    return () => {
      active = false;
    };
  }, [slug]);

  return result;
}
