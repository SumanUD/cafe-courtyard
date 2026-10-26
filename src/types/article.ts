export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorImage: string;
  readingTime: string;
  featured: boolean;
  createdAt: string;
  isPublished: boolean;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  socialImage: string;
  noIndex: boolean;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  canonicalUrl: string;
  socialImage: string;
  noIndex: boolean;
}
