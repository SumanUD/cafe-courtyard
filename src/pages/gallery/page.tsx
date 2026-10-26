import { useState } from "react";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { galleryItems } from "@/mocks/gallery";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";

const categories = ["All", "Food", "People", "Events", "The Space", "Moments"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState("");

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-5 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-accent-600 mb-3">
              Visual Stories
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-800 leading-[1.1] mb-4">
              Moments In
              <br />
              <span className="italic font-normal">The Frame</span>
            </h1>
            <p className="font-body text-foreground-600 text-base md:text-lg max-w-xl leading-relaxed">
              Moments, food, people, and spaces — captured in the warm light of
              the Courtyard.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-5 md:px-10 lg:px-14 pb-8 md:pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 md:gap-3">
              {categories.map((cat) => (
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

        {/* Gallery Grid — Magazine Style */}
        <section className="relative px-5 md:px-10 lg:px-14 pb-20 md:pb-28 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.35} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {filtered.map((item, idx) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                    idx === 0
                      ? "col-span-2 row-span-2"
                      : idx === 3
                      ? "col-span-2 md:col-span-1"
                      : ""
                  }`}
                  onClick={() => {
                    setLightboxImage(item.image);
                    setLightboxTitle(item.title);
                  }}
                >
                  <div
                    className={`${
                      idx === 0 ? "h-64 md:h-80 lg:h-[500px]" : "h-40 md:h-48 lg:h-56"
                    } overflow-hidden`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="font-body text-xs uppercase tracking-wider text-secondary-300 mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-display text-sm md:text-base text-background-50">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <p className="font-body text-foreground-500 text-lg">
                  No images found in this category yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-primary-950/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => {
            setLightboxImage(null);
            setLightboxTitle("");
          }}
        >
          <button
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-background-50/10 text-background-50 flex items-center justify-center hover:bg-background-50/20 transition-colors"
            onClick={() => {
              setLightboxImage(null);
              setLightboxTitle("");
            }}
          >
            <i className="ri-close-line text-xl" />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              alt={lightboxTitle}
              className="w-full h-full object-contain rounded-lg"
            />
            {lightboxTitle && (
              <p className="font-display text-background-50 text-lg mt-4 text-center">
                {lightboxTitle}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}