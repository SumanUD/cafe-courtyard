import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { dishes } from "@/mocks/dishes";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";

const sections = [
  { key: "all", label: "All Stories" },
  { key: "Chef's Signature", label: "Chef's Signature" },
  { key: "Community Favourites", label: "Community Favourites" },
  { key: "Seasonal Specials", label: "Seasonal Specials" },
  { key: "Coffee Collection", label: "Coffee Collection" },
  { key: "Sweet Endings", label: "Sweet Endings" },
];

export default function TheTablePage() {
  const [activeSection, setActiveSection] = useState("all");

  const filtered =
    activeSection === "all"
      ? dishes
      : dishes.filter((d) => d.category === activeSection);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[55vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Elegant%20continental%20dining%20table%20set%20with%20wine%20glasses%2C%20candles%2C%20fine%20cutlery%2C%20warm%20ambient%20lighting%2C%20rustic%20wooden%20table%2C%20editorial%20hospitality%20photography%20style%2C%20romantic%20intimate%20atmosphere%2C%20no%20people%2C%20European%20charm&width=1920&height=900&seq=table-hero&orientation=landscape"
              alt="Plate Stories"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-primary-950/50" />
          </div>
          <div className="relative z-10 px-5 md:px-10 lg:px-14 pt-20">
            <div className="max-w-4xl">
              <p className="font-body text-xs uppercase tracking-widest text-secondary-300 mb-3">
                Plate Stories
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-background-50 leading-[1.1] mb-4">
                Every Dish Has{" "}
                <span className="italic font-normal">A Story</span>
              </h1>
              <p className="font-body text-background-200 text-base md:text-lg max-w-xl leading-relaxed">
                Explore our continental offerings through the lens of their origins, the people who created them, how it had travelled around the world and the conversations they inspire.
              </p>
            </div>
          </div>
        </section>

        {/* Section Filter */}
        <section className="sticky top-[72px] z-40 bg-background-50/95 backdrop-blur-md border-b border-background-200/50 px-5 md:px-10 lg:px-14 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1">
              {sections.map((sec) => (
                <button
                  key={sec.key}
                  onClick={() => setActiveSection(sec.key)}
                  className={`font-body text-sm px-4 md:px-5 py-2 rounded-full border whitespace-nowrap transition-all duration-300 shrink-0 ${
                    activeSection === sec.key
                      ? "bg-primary-800 text-background-50 border-primary-800"
                      : "bg-background-50 text-foreground-600 border-background-200/60 hover:border-primary-300 hover:text-primary-600"
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dish Grid */}
        <section className="relative px-5 md:px-10 lg:px-14 py-12 md:py-16 pb-20 md:pb-28 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.35} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((dish) => (
                <Link
                  key={dish.id}
                  to={`/dish/${dish.slug}`}
                  className="group flex flex-col bg-background-100 rounded-2xl overflow-hidden border border-background-200/40 hover:border-background-300/60 transition-all duration-300"
                >
                  <div className="relative h-72 md:h-80 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-background-50/90 backdrop-blur-sm text-primary-600 text-xs font-body uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {dish.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col">
                    <h3 className="font-display text-lg md:text-xl text-primary-800 mb-1 group-hover:text-primary-600 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="font-serif-alt text-foreground-400 text-sm italic mb-3">
                      {dish.tagline}
                    </p>
                    <p className="font-body text-foreground-600 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                      {dish.story}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="font-body text-xs text-secondary-700 bg-secondary-100/50 px-2.5 py-1 rounded-full">
                        {dish.origin}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}