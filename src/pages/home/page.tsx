import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";
import { dishes } from "@/mocks/dishes";
import { featuredConversation } from "@/mocks/community";
import { cafeInfo } from "@/mocks/cafeInfo";
import { galleryItems } from "@/mocks/gallery";
import { usePublicArticles } from "@/hooks/usePublicArticles";
import type { Article } from "@/types/article";

/* ─── Scroll animation hook ─── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── HERO ─── */
function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col overflow-hidden">
      {/* Hero image — actual cafe interior photo */}
      <div className="absolute inset-0">
        <img
          src="https://public.readdy.ai/ai/img_res/edited_7fec41bfafdc1700b34d60143680d689_817ca1d2.jpg"
          alt="Cafe Courtyard Interior"
          className="w-full h-full object-cover object-center"
        />
        {/* Bottom gradient — darker at bottom where text lives, clear at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Hero content — anchored at bottom, clean and minimal */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end w-full px-6 md:px-12 pt-24 pb-16 md:pb-24">
        <div className="text-center max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-background-50 leading-[1.1] mb-5 hero-text-shadow">
            Where continental food
            <br />
            becomes <span className="italic text-primary-300">conversation</span>
          </h1>
          <p className="font-body text-background-50 text-lg md:text-xl lg:text-2xl leading-relaxed mb-10 max-w-xl mx-auto font-semibold hero-text-shadow-light">
            Discover continental cuisine through conversations, culture, memories, and community.
          </p>
          <Link
            to="/the-table"
            className="inline-flex items-center justify-center gap-3 bg-background-50 text-accent-800 font-body text-base font-medium px-10 py-4 rounded-full hover:bg-accent-50 transition-all duration-500 whitespace-nowrap group shadow-xl"
          >
            Explore the Courtyard
            <span className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center transition-transform duration-500 group-hover:translate-x-0.5">
              <i className="ri-arrow-right-line text-background-50 text-sm" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── PHILOSOPHY TRANSITION ─── */
function PhilosophySection() {
  return (
    <section className="relative bg-background-50 py-20 md:py-28 px-5 md:px-10 lg:px-14 overflow-hidden">
      <BougainvilleaCorner position="top-right" size="md" opacity={0.4} />
      <PetalScatter count={5} />
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-on-scroll">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-primary-600 mb-8 font-semibold">
            Our Philosophy
          </p>
          <div className="space-y-5 mb-12">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground-800 leading-relaxed italic">
              &ldquo;Every table has a story.
            </p>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground-800 leading-relaxed italic">
              Every recipe has a journey.
            </p>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground-800 leading-relaxed italic">
              Every guest becomes part of the conversation.&rdquo;
            </p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <span className="font-body text-foreground-500 text-sm tracking-widest uppercase">Scroll to discover</span>
            <div className="w-px h-10 bg-primary-300/40 relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-400/60 animate-bounce origin-top" style={{ height: "50%" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── OUR ROOTS ─── */
function OurRootsSection() {
  return (
    <section className="relative bg-background-100 py-20 md:py-28 px-5 md:px-10 lg:px-14 overflow-hidden">
      <BougainvilleaCorner position="top-left" size="md" opacity={0.35} />
      <PetalScatter count={4} />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 animate-on-scroll">
          {/* Founder image */}
          <div className="w-full lg:w-2/5 shrink-0">
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none rounded-2xl overflow-hidden">
              <img
                src={cafeInfo.founder.image}
                alt={cafeInfo.founder.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-accent-900/80 to-transparent p-6">
                <p className="font-display text-background-50 text-lg">{cafeInfo.founder.name}</p>
                <p className="font-body text-background-300 text-sm italic">{cafeInfo.founder.title}</p>
              </div>
            </div>
          </div>

          {/* Story text */}
          <div className="w-full lg:w-3/5">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-4 font-semibold">
              Our Roots
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-800 leading-tight mb-6">
              A Table for Stories,
              <br />
              <span className="italic font-normal">A Home for Conversation</span>
            </h2>
            <div className="space-y-4 font-body text-foreground-700 text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                We opened Café Courtyard to create a place where continental food becomes conversation — where every meal is more than sustenance, it is an experience shared across tables, cultures, and generations.
              </p>
              <p>
                Rooted in the warmth of European café culture and the vibrant spirit of Kolkata, our kitchen draws from the best of both worlds. Each dish carries a story, each ingredient is chosen with purpose, and every guest who walks through our doors becomes part of a growing community.
              </p>
              <p>
                This is not just a café. It is a living journal of food, friendship, and the beautiful moments that happen when people gather around a table.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-accent-600 text-background-50 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-accent-700 transition-colors duration-300 whitespace-nowrap"
              >
                Read Our Story
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/founder"
                className="inline-flex items-center justify-center gap-2 border-2 border-accent-300 text-accent-700 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-accent-50 transition-colors duration-300 whitespace-nowrap"
              >
                Meet the Founder
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PLATE STORIES ─── */
function PlateStoriesSection() {
  const signatureDishes = dishes.filter(
    (d) => d.category === "Chef's Signature" || d.category === "Community Favourites"
  ).slice(0, 4);

  return (
    <section className="relative bg-background-50 py-20 md:py-28 px-5 md:px-10 lg:px-14 overflow-hidden">
      <BougainvilleaCorner position="top-right" size="md" opacity={0.35} />
      <PetalScatter count={5} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-on-scroll">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-3 font-semibold">
            Plate Stories
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-800 leading-tight mb-4">
            Every Dish Has{" "}
            <span className="italic font-normal">A Story</span>
          </h2>
          <p className="font-body text-foreground-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Explore our continental offerings through the lens of their origins, the people who created them, and the conversations they inspire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {signatureDishes.map((dish) => (
            <Link
              key={dish.id}
              to={`/dish/${dish.slug}`}
              className="group animate-on-scroll"
            >
              <div className="bg-background-100 rounded-2xl overflow-hidden border border-background-200/40 hover:border-primary-200/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-background-50/90 backdrop-blur-sm text-primary-600 font-body text-xs uppercase tracking-wider px-3 py-1.5 rounded-full font-medium">
                      {dish.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-primary-800 mb-1 group-hover:text-primary-600 transition-colors">
                    {dish.name}
                  </h3>
                  <p className="font-body text-foreground-500 text-sm italic mb-2">
                    {dish.origin}
                  </p>
                  <p className="font-body text-foreground-600 text-sm leading-relaxed line-clamp-2">
                    {dish.story}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12 animate-on-scroll">
          <Link
            to="/the-table"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-background-50 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-primary-500 transition-colors duration-300 whitespace-nowrap"
          >
            Explore the Table
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── FLAVOR FILES ─── */
function FlavorFilesSection({
  articles,
  loading,
  error,
}: {
  articles: Article[];
  loading: boolean;
  error: string | null;
}) {
  const [showAll, setShowAll] = useState(false);
  const featured = articles.slice(0, 2);
  const remaining = articles.slice(2);

  return (
    <section className="relative bg-background-100 py-20 md:py-28 px-5 md:px-10 lg:px-14 overflow-hidden">
      <BougainvilleaCorner position="top-left" size="md" opacity={0.35} />
      <PetalScatter count={4} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-on-scroll">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-3 font-semibold">
            Flavor Files
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-800 leading-tight mb-4">
            Stories That Feed{" "}
            <span className="italic font-normal">the Soul</span>
          </h2>
          <p className="font-body text-foreground-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Dive into the narratives behind our dishes, the cultures that shaped them, and the conversations they spark.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {featured.map((article) => (
            <Link
              key={article.id}
              to={`/journal/${article.slug}`}
              className="group animate-on-scroll"
            >
              <div className="bg-background-50 rounded-2xl overflow-hidden border border-background-200/40 hover:border-primary-200/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-900/60 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="bg-primary-500/25 backdrop-blur-sm text-background-100 font-body text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl text-primary-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-body text-foreground-600 text-base leading-relaxed mb-5">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={article.authorImage}
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-body text-foreground-500 text-sm">
                      {article.author} &middot; {article.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {showAll && remaining.map((article) => (
            <Link
              key={article.id}
              to={`/journal/${article.slug}`}
              className="group animate-on-scroll"
            >
              <div className="bg-background-50 rounded-2xl overflow-hidden border border-background-200/40 hover:border-primary-200/50 transition-all duration-500 hover:scale-[1.02]">
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-900/60 to-transparent" />
                  <div className="absolute bottom-5 left-5">
                    <span className="bg-primary-500/25 backdrop-blur-sm text-background-100 font-body text-xs uppercase tracking-wider px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-xl md:text-2xl text-primary-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-body text-foreground-600 text-base leading-relaxed mb-5">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={article.authorImage}
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="font-body text-foreground-500 text-sm">
                      {article.author} &middot; {article.readingTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {loading && (
          <p className="mt-8 text-center text-sm text-foreground-500">Loading stories…</p>
        )}
        {error && (
          <p role="alert" className="mt-8 text-center text-sm text-red-700">
            Unable to load stories: {error}
          </p>
        )}
        {!loading && !error && articles.length === 0 && (
          <p className="mt-8 text-center text-sm text-foreground-500">No published stories yet.</p>
        )}

        <div className="text-center mt-12 animate-on-scroll">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-background-50 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-primary-500 transition-colors duration-300 whitespace-nowrap"
            >
              Show More
              <i className="ri-arrow-down-line" />
            </button>
          ) : (
            <Link
              to="/journal"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 text-background-50 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-primary-500 transition-colors duration-300 whitespace-nowrap"
            >
              View all Flavor Files
              <i className="ri-arrow-right-line" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── THE FRAME ─── */
function TheFrameSection() {
  return (
    <section className="relative bg-background-50 py-20 md:py-28 px-5 md:px-10 lg:px-14 overflow-hidden">
      <BougainvilleaCorner position="top-right" size="md" opacity={0.3} />
      <PetalScatter count={5} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 animate-on-scroll">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-3 font-semibold">
            The Frame
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-primary-800 leading-tight mb-4">
            Moments Captured,
            <br />
            <span className="italic font-normal">Stories Preserved</span>
          </h2>
          <p className="font-body text-foreground-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            A visual journal of life at the Courtyard — food, people, light, and the quiet beauty of everyday moments.
          </p>
        </div>

        <div className="masonry-grid">
          {galleryItems.map((item, idx) => {
            const isLarge = idx % 3 === 0;
            return (
              <Link
                key={item.id}
                to="/gallery"
                className="group block animate-on-scroll"
              >
                <div className={`relative overflow-hidden rounded-2xl ${isLarge ? 'h-[420px] md:h-[500px]' : 'h-[280px] md:h-[340px]'}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-body text-background-50 text-sm font-medium">{item.title}</p>
                    <p className="font-body text-background-300 text-xs">{item.category}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12 animate-on-scroll">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-background-50 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-primary-500 transition-colors duration-300 whitespace-nowrap"
          >
            See the Full Frame
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── THE CIRCLE ─── */
function TheCircleSection() {
  return (
    <section className="relative bg-primary-600 py-20 md:py-28 px-5 md:px-10 lg:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto animate-on-scroll">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-background-300 mb-3 font-semibold">
            The Circle
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-background-50 leading-tight mb-4">
            Where Conversations{" "}
            <span className="italic font-normal text-primary-200">Come Alive</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-primary-800/50 rounded-3xl p-8 md:p-12 border border-primary-700/30">
          <span className="font-display text-primary-200 text-6xl md:text-7xl leading-none block mb-6">
            &ldquo;
          </span>
          <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-background-50 leading-relaxed mb-8 italic">
            {featuredConversation.quote}
          </blockquote>
          <div className="flex items-center gap-4 mb-10">
            <img
              src={featuredConversation.image}
              alt={featuredConversation.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-body text-background-100 text-base font-medium">
                {featuredConversation.author}
              </p>
              <p className="font-body text-background-400 text-sm italic">
                {featuredConversation.role}
              </p>
            </div>
          </div>
          <Link
            to="/visit"
            className="inline-flex items-center justify-center gap-2 bg-background-50 text-primary-600 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-primary-100 transition-colors duration-300 whitespace-nowrap"
          >
            Join the Conversation
            <i className="ri-arrow-right-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── JOIN THE CONVERSATION ─── */
function JoinConversationSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get("company_alt") as string;

    if (honeypot && honeypot.trim() !== "") {
      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");
      return;
    }

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        "https://readdy.ai/api/form/d9audl4ngs93pt5sh63g",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email } as Record<string, string>).toString(),
        }
      );

      const responseText = await response.text();
      let parsed;
      try { parsed = JSON.parse(responseText); } catch { parsed = null; }

      if (response.ok && parsed?.code === "OK") {
        setStatus("success");
        setMessage("Welcome to the Courtyard community! Check your inbox soon.");
        setEmail("");
        form.reset();
      } else {
        const serverMsg = parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText || "Something went wrong.";
        setStatus("error");
        setMessage(serverMsg);
      }
    } catch {
      setStatus("error");
      setMessage("Unable to subscribe. Please check your connection and try again.");
    }
  };

  return (
    <section className="relative bg-background-50 py-20 md:py-28 px-5 md:px-10 lg:px-14 overflow-hidden">
      <BougainvilleaCorner position="top-left" size="sm" opacity={0.3} />
      <PetalScatter count={4} />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Visit info */}
          <div className="animate-on-scroll">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-3 font-semibold">
              Come Over
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-primary-800 leading-tight mb-6">
              Find Your{" "}
              <span className="italic font-normal">Seat</span>
            </h2>
            <div className="space-y-5 font-body text-foreground-700 text-base leading-relaxed">
              <div>
                <p className="font-medium text-foreground-900">{cafeInfo.address.line1}</p>
                <p>{cafeInfo.address.line2}</p>
                <p>{cafeInfo.address.city}, {cafeInfo.address.state} {cafeInfo.address.pincode}</p>
              </div>
              <div>
                <p className="font-medium text-foreground-900">Open Everyday</p>
                <p>{cafeInfo.hours.weekdays}</p>
                <p>{cafeInfo.hours.weekends}</p>
                <p className="text-foreground-500 text-sm italic mt-1">{cafeInfo.hours.note}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/visit"
                  className="inline-flex items-center justify-center gap-2 bg-accent-600 text-background-50 font-body text-sm font-medium px-6 py-3 rounded-full hover:bg-accent-700 transition-colors duration-300 whitespace-nowrap"
                >
                  <i className="ri-map-pin-line" />
                  Get Directions
                  <i className="ri-arrow-right-up-line" />
                </Link>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="animate-on-scroll">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-3 font-semibold">
              Stay Connected
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-primary-800 leading-tight mb-4">
              Join The{" "}
              <span className="italic font-normal">Conversation</span>
            </h2>
            <p className="font-body text-foreground-600 text-base leading-relaxed mb-8 max-w-md">
              Read a story, add your perspective, or send us a memory of your own. Wherever you are in the world, there is room for your voice here. 
            </p>

            <form
              onSubmit={handleSubmit}
              data-readdy-form
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="text"
                name="company_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
                value=""
                onChange={() => {}}
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 font-body text-sm px-5 py-3.5 rounded-full bg-background-100 border border-background-200/60 text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 transition-colors"
                required
              />
              <button
                type="submit"
                className="font-body text-sm font-medium bg-accent-600 text-background-50 px-8 py-3.5 rounded-full hover:bg-accent-700 transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {status !== "idle" && (
              <p className={`font-body text-sm mt-4 ${status === "success" ? "text-primary-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN HOME PAGE ─── */
export default function Home() {
  useScrollReveal();
  const articleResult = usePublicArticles();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <OurRootsSection />
        <PlateStoriesSection />
        <FlavorFilesSection
          articles={articleResult.data || []}
          loading={articleResult.status === "loading"}
          error={articleResult.status === "error" ? articleResult.error : null}
        />
        <TheFrameSection />
        <TheCircleSection />
        <JoinConversationSection />
      </main>
      <Footer />
    </div>
  );
}