import { useParams, Link } from "react-router-dom";
import { useMemo } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { dishes } from "@/mocks/dishes";
import { usePublicArticles } from "@/hooks/usePublicArticles";

export default function DishDetailPage() {
  const { slug } = useParams();
  const dish = useMemo(() => dishes.find((d) => d.slug === slug), [slug]);
  const articlesResult = usePublicArticles();

  const relatedStory = useMemo(() => {
    if (!dish?.relatedStorySlug) return null;
    return articlesResult.data?.find((a) => a.slug === dish.relatedStorySlug) || null;
  }, [dish, articlesResult.data]);

  if (!dish) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-28 px-5 md:px-10 lg:px-14">
          <div className="max-w-3xl mx-auto text-center py-20">
            <h1 className="font-display text-3xl text-primary-800 mb-4">
              Dish Not Found
            </h1>
            <p className="font-body text-foreground-600 mb-8">
              This dish seems to have left the kitchen. Let us help you find
              another.
            </p>
            <Link
              to="/the-table"
              className="inline-flex items-center gap-2 text-primary-600 font-body text-sm hover:text-primary-500 transition-colors"
            >
              <i className="ri-arrow-left-line" />
              Back to Plate Stories
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <div className="relative h-[55vh] md:h-[65vh]">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-950/70 via-primary-950/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-5 md:px-10 lg:px-14 pb-8 md:pb-12">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-secondary-500/30 text-secondary-100 text-xs font-body uppercase tracking-wider px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                {dish.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-background-50 leading-tight mb-2">
                {dish.name}
              </h1>
              <p className="font-serif-alt text-xl md:text-2xl text-secondary-200 italic">
                {dish.tagline}
              </p>
            </div>
          </div>
        </div>

        <article className="px-5 md:px-10 lg:px-14 py-12 md:py-20">
          <div className="max-w-3xl mx-auto">
            {/* Story */}
            <div className="mb-12 md:mb-16">
              <p className="font-body text-xs uppercase tracking-widest text-secondary-700 mb-3">
                The Story Behind The Dish
              </p>
              <p className="font-body text-foreground-700 text-base md:text-lg leading-[1.8] mb-4">
                {dish.story}
              </p>
              <div className="inline-flex items-center gap-2 bg-secondary-100/50 px-3 py-1.5 rounded-full">
                <i className="ri-map-pin-line text-secondary-600 text-sm" />
                <span className="font-body text-secondary-700 text-sm">
                  Origin: {dish.origin}
                </span>
              </div>
            </div>

            {/* Ingredients + Chef Notes - Two Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
              <div className="bg-background-100 rounded-2xl p-6 md:p-8 border border-background-200/40">
                <h3 className="font-display text-lg md:text-xl text-primary-800 mb-5 flex items-center gap-2">
                  <i className="ri-restaurant-line text-accent-600" />
                  Ingredients
                </h3>
                <ul className="space-y-3">
                  {dish.ingredients.map((ing, idx) => (
                    <li
                      key={idx}
                      className="font-body text-foreground-600 text-sm flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-2 shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-600 rounded-2xl p-6 md:p-8">
                <h3 className="font-display text-lg md:text-xl text-background-50 mb-5 flex items-center gap-2">
                  <i className="ri-quill-pen-line text-secondary-300" />
                  Chef's Notes
                </h3>
                <p className="font-body text-background-300 text-sm md:text-base leading-relaxed italic">
                  &ldquo;{dish.chefNotes}&rdquo;
                </p>
                <p className="font-body text-background-500 text-xs mt-4">
                  — Chef Arjun Mehta
                </p>
              </div>
            </div>

            {/* Pairing Suggestions */}
            <div className="mb-12 md:mb-16">
              <h3 className="font-display text-lg md:text-xl text-primary-800 mb-5 flex items-center gap-2">
                <i className="ri-heart-3-line text-secondary-600" />
                Pairing Suggestions
              </h3>
              <div className="flex flex-wrap gap-3">
                {dish.pairings.map((pair, idx) => (
                  <span
                    key={idx}
                    className="bg-background-100 border border-background-200/50 text-foreground-700 font-body text-sm px-4 py-2 rounded-full"
                  >
                    {pair}
                  </span>
                ))}
              </div>
            </div>

            {/* Related Story */}
            {relatedStory && (
              <div className="bg-background-100 rounded-2xl p-6 md:p-8 border border-background-200/40">
                <p className="font-body text-xs uppercase tracking-widest text-accent-600 mb-3">
                  Related Story
                </p>
                <Link
                  to={`/journal/${relatedStory.slug}`}
                  className="group flex gap-5 items-center"
                >
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={relatedStory.image}
                      alt={relatedStory.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-base md:text-lg text-primary-800 group-hover:text-primary-600 transition-colors mb-1">
                      {relatedStory.title}
                    </h4>
                    <p className="font-body text-foreground-500 text-sm line-clamp-2">
                      {relatedStory.excerpt}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </article>

        {/* Back to Table */}
        <div className="px-5 md:px-10 lg:px-14 pb-16 md:pb-24">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              to="/the-table"
              className="inline-flex items-center gap-2 text-primary-600 font-body text-sm hover:text-primary-500 transition-colors"
            >
              <i className="ri-arrow-left-line" />
              Back to Plate Stories
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}