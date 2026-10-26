import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { usePublicArticle, usePublicArticles } from "@/hooks/usePublicArticles";

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const articleResult = usePublicArticle(slug);
  const articlesResult = usePublicArticles();
  const article = articleResult.data;

  const related = useMemo(() => {
    if (!article || !articlesResult.data) return [];
    return articlesResult.data
      .filter((a) => a.id !== article.id && a.category === article.category)
      .slice(0, 2);
  }, [article, articlesResult.data]);

  if (articleResult.status === "loading") {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 text-center text-foreground-600">
          Loading story…
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 px-5 md:px-10 lg:px-14">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="font-display text-3xl text-primary-800 mb-4">
              Story Not Found
            </h1>
            <p className="font-body text-foreground-600 mb-8">
              {articleResult.error ||
                "This story seems to have wandered off. Let us help you find another."}
            </p>
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 text-primary-600 font-body text-sm hover:text-primary-500 transition-colors"
            >
              <i className="ri-arrow-left-line" />
              Back to Flavor Files
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const paragraphs = article.content.split("\n\n");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero Image */}
        <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-10 lg:px-14 pb-8 md:pb-12">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-accent-500/30 text-accent-100 text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                {article.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-background-50 leading-tight mb-4">
                {article.title}
              </h1>
              <div className="flex items-center gap-4">
                <img
                  src={article.authorImage}
                  alt={article.author}
                  className="w-10 h-10 rounded-full object-cover border-2 border-background-50/30"
                />
                <div>
                  <p className="font-body text-background-200 text-sm font-medium">
                    {article.author}
                  </p>
                  <p className="font-body text-background-400 text-xs">
                    {article.readingTime} &middot;{" "}
                    {new Date(article.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="px-5 md:px-10 lg:px-14 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Excerpt */}
            <p className="font-serif-alt text-xl md:text-2xl text-foreground-600 leading-relaxed italic mb-10 md:mb-14 border-l-2 border-secondary-400 pl-6">
              {article.excerpt}
            </p>

            {/* Body */}
            <div className="space-y-6 md:space-y-8">
              {paragraphs.map((para, idx) => {
                const isPullQuote =
                  para.length > 80 && para.length < 200 && idx > 0;
                if (isPullQuote) {
                  return (
                    <blockquote
                      key={idx}
                      className="py-6 md:py-8 px-6 md:px-10 bg-background-100 rounded-xl border-l-4 border-accent-500"
                    >
                      <p className="font-display text-lg md:text-xl text-primary-800 leading-relaxed">
                        &ldquo;{para}&rdquo;
                      </p>
                    </blockquote>
                  );
                }
                return (
                  <p
                    key={idx}
                    className="font-body text-foreground-700 text-base md:text-lg leading-[1.8]"
                  >
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Discussion Prompt */}
            <div className="mt-16 md:mt-20 p-6 md:p-8 bg-primary-600 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center shrink-0">
                  <i className="ri-chat-1-line text-accent-300 text-lg" />
                </div>
                <div>
                  <h3 className="font-display text-lg md:text-xl text-background-50 mb-2">
                    Join the Conversation
                  </h3>
                  <p className="font-body text-background-300 text-sm md:text-base leading-relaxed mb-4">
                    What did this story make you think about? Share your thoughts
                    with the Courtyard community.
                  </p>
                  <Link
                    to="/community"
                    className="inline-flex items-center gap-2 text-secondary-300 font-body text-sm hover:text-secondary-200 transition-colors"
                  >
                    Go to The Circle
                    <i className="ri-arrow-right-line" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Stories */}
        {related.length > 0 && (
          <section className="px-5 md:px-10 lg:px-14 pb-20 md:pb-28 bg-background-100">
            <div className="max-w-7xl mx-auto pt-12 md:pt-16">
              <h2 className="font-display text-2xl md:text-3xl text-primary-800 mb-8 md:mb-12">
                More from{" "}
                <span className="italic font-normal">{article.category}</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/journal/${rel.slug}`}
                    className="group flex gap-5 bg-background-50 rounded-xl overflow-hidden border border-background-200/40 hover:border-background-300/60 transition-all duration-300"
                  >
                    <div className="w-32 md:w-44 h-32 md:h-44 shrink-0 overflow-hidden">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="py-4 pr-4 md:py-5 md:pr-5 flex flex-col justify-center">
                      <span className="text-accent-600 text-xs font-body uppercase tracking-wider mb-1">
                        {rel.category}
                      </span>
                      <h3 className="font-display text-base md:text-lg text-primary-800 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                        {rel.title}
                      </h3>
                      <span className="font-body text-foreground-400 text-xs">
                        {rel.readingTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}