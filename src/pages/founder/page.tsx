import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { cafeInfo } from "@/mocks/cafeInfo";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";

const timeline = [
  {
    year: "2019",
    title: "The Seed",
    description:
      "After years in the corporate world, Sudarshana Dutt found herself drawn to the stories behind food. A trip through Europe — from Parisian bistros to Viennese coffeehouses — planted the seed for what would become Cafe Courtyard.",
    image:
      "https://storage.readdy-site.link/project_files/4eeeef57-020b-451b-9556-b41a13a8f84a/d0300d4a-0885-47e5-8856-885d0f9a2dec_compressed_Screenshot-2026-07-23-160407.webp",
  },
  {
    year: "2020",
    title: "The Pivot",
    description:
      "The pandemic forced the world to slow down — and Sudarshana used that time to study continental cuisine in depth. Online courses with French and Italian chefs, endless recipe testing in her home kitchen, and the vision began to take shape.",
    image:
      "https://readdy.ai/api/search-image?query=Home%20kitchen%20with%20cooking%20utensils%2C%20fresh%20ingredients%20on%20wooden%20counter%2C%20cookbook%20open%20beside%20stove%2C%20warm%20natural%20lighting%2C%20editorial%20documentary%20photography%20style%2C%20intimate%20domestic%20scene&width=500&height=400&seq=founder-2020&orientation=landscape",
  },
  {
    year: "2021",
    title: "The Courtyard Opens",
    description:
      "Cafe Courtyard opened its doors in New Town, Kolkata. The first customers were friends and family. The first dish served was Chicken Ala Kiev. The first conversation was about why continental food deserved more than a menu — it deserved a story.",
    image:
      "https://storage.readdy-site.link/project_files/4eeeef57-020b-451b-9556-b41a13a8f84a/b5cb5048-4775-4714-b877-d769361dfff2_compressed_Screenshot-2026-07-23-160643.webp",
  },
  {
    year: "2022",
    title: "Community Grows",
    description:
      "The first poetry evening. The first Sunday brunch tradition. The first regular who became family. Cafe Courtyard evolved from a cafe into a community hub — a place where conversations about food, culture, and life became as important as the food itself.",
    image:
      "https://storage.readdy-site.link/project_files/4eeeef57-020b-451b-9556-b41a13a8f84a/55249bb5-f003-45e2-a513-236b72046bd5_compressed_Screenshot-2026-07-23-160827.webp",
  },
  {
    year: "2023",
    title: "Plate Stories Beyond The Meal",
    description:
      "The menu was reimagined. No longer just a list of dishes and prices, it became Plate Stories — a curated collection of stories, origins, and experiences. Each dish got its own narrative, its own philosophy, its own place in the broader story of continental cuisine.",
    image:
      "https://storage.readdy-site.link/project_files/4eeeef57-020b-451b-9556-b41a13a8f84a/3fe56f73-1d14-4e66-8511-ee165245a618_compressed_Screenshot-2026-07-23-160948.webp",
  },
  {
    year: "2024",
    title: "Flavor Files Is Born",
    description:
      "Flavor Files was born — a digital space for food stories, chef diaries, cultural explorations, and community voices. The website transformed from a simple cafe page into a living journal of continental food culture.",
    image:
      "https://storage.readdy-site.link/project_files/4eeeef57-020b-451b-9556-b41a13a8f84a/6700dd8c-bab7-4375-b776-c9171a494a0b_compressed_Screenshot-2026-07-23-161131.webp",
  },
  {
    year: "2025 — Today",
    title: "A Living Archive",
    description:
      "Today, Cafe Courtyard is more than a cafe. It is a digital destination for continental food, culture, stories, and conversations. The community continues to grow. The stories keep being written. And every new visitor adds their own chapter to the story.",
    image:
      "https://storage.readdy-site.link/project_files/4eeeef57-020b-451b-9556-b41a13a8f84a/3df2a13f-4e63-48a4-b3e8-72a8868f6f58_compressed_Screenshot-2026-07-23-161307.webp",
  },
];

export default function FounderPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero — Larger, more prominent founder story */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] flex items-stretch overflow-hidden bg-background-100">
          <div className="flex flex-col md:flex-row w-full">
            {/* Left — Text, more prominent */}
            <div className="md:w-1/2 lg:w-[55%] flex flex-col justify-center px-5 md:px-10 lg:px-14 py-20 md:py-0">
              <div className="max-w-xl">
                <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-4 font-semibold">
                  Founder Story
                </p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-800 leading-[1.1] mb-4">
                  Sudarshana Dutt
                </h1>
                <p className="font-body text-xl md:text-2xl text-primary-600 italic mb-8">
                  {cafeInfo.founder.title}
                </p>
                <div className="w-16 h-px bg-primary-400 mb-8" />
                <p className="font-body text-base md:text-lg text-foreground-700 leading-relaxed max-w-md mb-10">
                  {cafeInfo.founder.bio}
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 bg-accent-600 text-background-50 font-body text-sm font-medium px-8 py-3.5 rounded-full hover:bg-accent-700 transition-colors duration-300 whitespace-nowrap"
                >
                  Read the Full Story
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>

            {/* Right — Image, larger */}
            <div className="md:w-1/2 lg:w-[45%] relative min-h-[40vh] md:min-h-0">
              <img
                src={cafeInfo.founder.image}
                alt={cafeInfo.founder.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </section>

        {/* Timeline — more visible, larger cards */}
        <section className="relative px-5 md:px-10 lg:px-14 py-20 md:py-28 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.35} />
          <PetalScatter count={5} />
          <div className="max-w-5xl mx-auto">
            <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-600 mb-4 text-center font-semibold">
              The Journey
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-800 text-center mb-14 md:mb-18">
              From Vision to{" "}
              <span className="italic font-normal">The Courtyard</span>
            </h2>

            <div className="space-y-14 md:space-y-0">
              {timeline.map((item, idx) => (
                <div
                  key={item.year}
                  className={`md:grid md:grid-cols-12 md:gap-8 md:items-center ${
                    idx !== timeline.length - 1
                      ? "md:pb-18"
                      : ""
                  }`}
                >
                  {/* Year — more visible */}
                  <div
                    className={`md:col-span-2 ${
                      idx % 2 === 0 ? "md:text-right" : "md:order-3 md:text-left"
                    }`}
                  >
                    <span className="font-display text-2xl md:text-3xl text-primary-600">
                      {item.year}
                    </span>
                  </div>

                  {/* Connector */}
                  <div
                    className={`hidden md:flex md:col-span-1 flex-col items-center ${
                      idx % 2 === 0 ? "" : "md:order-2"
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary-500" />
                    {idx !== timeline.length - 1 && (
                      <div className="w-px h-full bg-background-300/40 min-h-[140px]" />
                    )}
                  </div>

                  {/* Content — larger, more readable */}
                  <div
                    className={`mt-4 md:mt-0 md:col-span-9 ${
                      idx % 2 === 0 ? "" : "md:order-1"
                    }`}
                  >
                    <div className="bg-background-100 rounded-2xl overflow-hidden border border-background-200/40">
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="h-52 md:h-64 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div className="p-6 md:p-8 flex flex-col justify-center">
                          <h3 className="font-display text-lg md:text-xl text-primary-800 mb-3">
                            {item.title}
                          </h3>
                          <p className="font-body text-foreground-700 text-sm md:text-base leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — Consistent primary-600 green */}
        <section className="bg-primary-600 px-5 md:px-10 lg:px-14 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-background-50 mb-4">
              Be Part of the Story
            </h2>
            <p className="font-body text-background-200 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Visit Cafe Courtyard, share your story, and become part of a
              growing community of continental food lovers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/visit"
                className="inline-flex items-center justify-center gap-2 bg-background-50 text-primary-600 font-body text-sm px-8 py-3.5 rounded-full hover:bg-secondary-100 transition-colors duration-300 whitespace-nowrap"
              >
                Come Over
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/community"
                className="inline-flex items-center justify-center gap-2 border border-background-300/40 text-background-100 font-body text-sm px-8 py-3.5 rounded-full hover:bg-background-50/10 transition-colors duration-300 whitespace-nowrap"
              >
                Join The Circle
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}