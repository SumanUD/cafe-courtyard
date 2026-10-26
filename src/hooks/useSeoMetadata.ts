import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { apiRequest } from "@/lib/api";

interface SeoMetadata {
  title: string;
  description: string;
  canonicalUrl: string;
  socialImage: string;
  noIndex: boolean;
}

function setMeta(name: string, content: string, property = false) {
  const selector = property
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    if (property) tag.setAttribute("property", name);
    else tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

export function useSeoMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    let active = true;
    apiRequest<SeoMetadata>(`/api/seo?path=${encodeURIComponent(pathname)}`)
      .then((metadata) => {
        if (!active) return;
        document.title = metadata.title;
        setMeta("description", metadata.description);
        setMeta("robots", metadata.noIndex ? "noindex, nofollow" : "index, follow");
        setMeta("og:title", metadata.title, true);
        setMeta("og:description", metadata.description, true);
        const canonicalUrl =
          metadata.canonicalUrl || `${window.location.origin}${pathname}`;
        let canonical = document.head.querySelector<HTMLLinkElement>(
          'link[rel="canonical"]',
        );
        if (!canonical) {
          canonical = document.createElement("link");
          canonical.rel = "canonical";
          document.head.appendChild(canonical);
        }
        canonical.href = canonicalUrl;
        setMeta("og:url", canonicalUrl, true);
        setMeta(
          "og:type",
          pathname.startsWith("/journal/") ? "article" : "website",
          true,
        );
        setMeta("twitter:card", "summary_large_image");
        setMeta("twitter:title", metadata.title);
        setMeta("twitter:description", metadata.description);
        setMeta("og:image", metadata.socialImage, true);
        setMeta("twitter:image", metadata.socialImage);
      })
      .catch((error: unknown) => {
        console.error("Unable to load SEO metadata:", error);
      });

    return () => {
      active = false;
    };
  }, [pathname]);
}
