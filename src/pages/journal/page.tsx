import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { usePublicArticles } from "@/hooks/usePublicArticles";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";

const categories = [
  "All",
  "Food Stories",
  "Continental Culture",
  "Chef Diaries",
  "Travel & Taste",
  "Community Voices",
];

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const articleResult = usePublicArticles();
  const articles = articleResult.data || [];
  const availableCategories = [
    "All",
    ...new Set([
      ...categories.slice(1),
      ...articles.map((article) => article.category),
    ]),
  ];

  const filtered =
    activeCategory === "All"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  const featured = articles.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-5 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-accent-600 mb-3">
              Flavor Files
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-800 leading-[1.1] mb-4">
              Stories of Continental
              <br />
              <span className="italic font-normal">Food &amp; Culture</span>
            </h1>
            <p className="font-body text-foreground-600 text-base md:text-lg max-w-xl leading-relaxed">
              Dive into the narratives behind our dishes, the cultures that shaped
              them, and the conversations they inspire.
            </p>
          </div>
        </section>

        {articleResult.status === "loading" && (
          <p className="pb-12 text-center text-foreground-500">Loading stories…</p>
        )}
        {articleResult.status === "error" && (
          <p role="alert" className="px-5 pb-12 text-center text-red-700">
            Unable to load stories: {articleResult.error}
          </p>
        )}

        {/* Category Filter */}
        <section className="px-5 md:px-10 lg:px-14 pb-8 md:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`font-body text-sm px-4 md:px-5 py-2 rounded-full border transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-primary-800 text-background-50 border-primary-800"
                      : "bg-background-50 text-foreground-600 border-background-200/60 hover:border-primary-300 hover:text-primary-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {featured && activeCategory === "All" && (
          <section className="relative px-5 md:px-10 lg:px-14 pb-12 md:pb-16 overflow-hidden">
            <BougainvilleaCorner position="top-left" size="md" opacity={0.35} />
            <PetalScatter count={5} />
            <div className="max-w-7xl mx-auto">
              <Link
                to={`/journal/${featured.slug}`}
                className="group block bg-primary-600 rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-80 lg:h-[420px] overflow-hidden">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block bg-accent-500/20 text-accent-100 text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full mb-4 w-fit">
                      {featured.category}
                    </span>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-background-50 mb-4 group-hover:text-secondary-200 transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    <p className="font-body text-background-300 text-sm md:text-base leading-relaxed mb-6">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <img
                        src={featured.authorImage}
                        alt={featured.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-body text-background-200 text-sm font-medium">
                          {featured.author}
                        </p>
                        <p className="font-body text-background-500 text-xs">
                          {featured.readingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Article Grid */}
        <section className="relative px-5 md:px-10 lg:px-14 pb-20 md:pb-28 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.35} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {rest.map((article) => (
                <Link
                  key={article.id}
                  to={`/journal/${article.slug}`}
                  className="group flex flex-col bg-background-100 rounded-2xl overflow-hidden border border-background-200/40 hover:border-background-300/60 transition-all duration-300"
                >
                  <div className="relative h-52 md:h-56 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <span className="text-accent-600 text-xs font-body uppercase tracking-wider mb-2">
                      {article.category}
                    </span>
                    <h3 className="font-display text-lg md:text-xl text-primary-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="font-body text-foreground-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <img
                        src={article.authorImage}
                        alt={article.author}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="font-body text-foreground-400 text-xs">
                        {article.author} &middot; {article.readingTime}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {rest.length === 0 && (
              <div className="text-center py-20">
                <p className="font-body text-foreground-500 text-lg">
                  No stories found in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="px-5 md:px-10 lg:px-14 pb-20 md:pb-28">
          <div className="max-w-7xl mx-auto bg-primary-600 rounded-2xl p-8 md:p-12 lg:p-16 text-center">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-background-50 mb-4">
              Never Miss a Story
            </h2>
            <p className="font-body text-background-300 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
              Subscribe to Flavor Files and receive weekly stories
              about continental food, culture, and community.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-background-50 text-primary-600 font-body text-sm px-8 py-3.5 rounded-full hover:bg-secondary-100 transition-colors duration-300 whitespace-nowrap"
            >
              Subscribe Now
              <i className="ri-arrow-right-line" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}