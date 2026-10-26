import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { cafeInfo } from "@/mocks/cafeInfo";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative h-[45vh] md:h-[50vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://readdy.ai/api/search-image?query=Warm%20intimate%20cafe%20interior%20with%20courtyard%20garden%20view%2C%20vintage%20wooden%20tables%2C%20potted%20plants%2C%20soft%20natural%20lighting%20through%20glass%20ceiling%2C%20editorial%20architecture%20photography%20style%2C%20European%20cafe%20culture%20atmosphere%2C%20warm%20earthy%20tones&width=1920&height=900&seq=about-hero&orientation=landscape"
              alt="About Cafe Courtyard"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-foreground-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/60 via-foreground-950/40 to-transparent" />
          </div>
          <div className="relative z-10 px-5 md:px-10 lg:px-14 pt-20">
            <div className="max-w-4xl">
              <p className="font-body text-xs uppercase tracking-widest text-secondary-300 mb-3">
                Our Roots
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-background-50 leading-[1.1]" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
                Our Roots, Our
                <br />
                <span className="italic font-normal">Philosophy</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="relative px-5 md:px-10 lg:px-14 py-16 md:py-24 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.4} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-accent-600 mb-3">
                  Our Story
                </p>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-800 leading-tight mb-6">
                  Born from a Love of
                  <br />
                  <span className="italic font-normal">Continental Culture</span>
                </h2>
                <div className="space-y-4">
                  <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed">
                    Cafe Courtyard began with a simple question: why should a
                    cafe website look like a menu when it could read like a
                    journal? Why should food be reduced to prices when every dish
                    carries centuries of culture, technique, and story?
                  </p>
                  <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed">
                    Founded by Sudarshana Dutt in New Town, Kolkata, Cafe
                    Courtyard was conceived not as another restaurant, but as a
                    living archive of continental food culture — a place where
                    European culinary traditions meet Indian hospitality, where
                    every meal is a chapter, and every visitor becomes part of
                    the story.
                  </p>
                  <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed">
                    Today, the Courtyard serves as both cafe and community — a
                    space for Sunday brunches, poetry evenings, food
                    discussions, and the quiet joy of a perfectly brewed
                    Viennese Melange.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://static.readdy.ai/image/9771e8f5c9fa1c2dfcc2250e0df41b8a/023e6d0d1d9abcf64debe4bc40672c76.png"
                    alt="Cafe Courtyard Exterior"
                    className="w-full h-[400px] md:h-[500px] object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="bg-primary-600 px-5 md:px-10 lg:px-14 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-background-400 mb-3 text-center">
              Philosophy
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-background-50 text-center mb-12 md:mb-16">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {cafeInfo.philosophy.slice(0, 3).map((item) => (
                <div
                  key={item.title}
                  className="bg-primary-800/50 rounded-2xl p-6 md:p-8 border border-primary-700/30"
                >
                  <h3 className="font-display text-lg md:text-xl text-background-50 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-background-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 max-w-4xl mx-auto">
              {cafeInfo.philosophy.slice(3).map((item) => (
                <div
                  key={item.title}
                  className="bg-primary-800/50 rounded-2xl p-6 md:p-8 border border-primary-700/30"
                >
                  <h3 className="font-display text-lg md:text-xl text-background-50 mb-3">
                    {item.title}
                  </h3>
                  <p className="font-body text-background-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Vision */}
        <section className="relative px-5 md:px-10 lg:px-14 py-16 md:py-24 overflow-hidden">
          <BougainvilleaCorner position="top-left" size="md" opacity={0.4} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="order-2 md:order-1 relative">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://static.readdy.ai/image/9771e8f5c9fa1c2dfcc2250e0df41b8a/6fd0fe4bb33efb3f7c841f66662b5419.png"
                    alt="Cafe Courtyard Interior with Mediterranean View"
                    className="w-full h-[400px] md:h-[500px] object-cover object-center"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <p className="font-body text-xs uppercase tracking-widest text-accent-600 mb-3">
                  Community Vision
                </p>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-800 leading-tight mb-6">
                  A Table for
                  <br />
                  <span className="italic font-normal">Everyone</span>
                </h2>
                <div className="space-y-4">
                  <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed">
                    We believe that the best conversations happen over the best
                    food. Our community is not just our regulars — it is anyone
                    who walks through our doors with curiosity and an appetite
                    for something more than a meal.
                  </p>
                  <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed">
                    The Courtyard hosts monthly poetry evenings, quarterly
                    food culture discussions, and an open community table where
                    anyone can join a conversation about anything — from the
                    politics of pasta to the philosophy of pastry.
                  </p>
                  <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed">
                    This website is an extension of that table. Here, we share
                    stories, host discussions, and invite you to be part of a
                    growing community of continental food lovers.
                  </p>
                </div>
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 text-primary-600 font-body text-sm mt-6 hover:text-primary-500 transition-colors"
                >
                  Join The Circle
                  <i className="ri-arrow-right-line" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* The Courtyard Experience */}
        <section className="relative bg-background-100 px-5 md:px-10 lg:px-14 py-16 md:py-24 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.35} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-secondary-700 mb-3 text-center">
              The Experience
            </p>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-800 text-center mb-12 md:mb-16">
              What Awaits at The Courtyard
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  icon: "ri-restaurant-line",
                  title: "Continental Cuisine",
                  desc: "Authentic European dishes crafted with local ingredients and continental soul.",
                },
                {
                  icon: "ri-book-open-line",
                  title: "Flavor Files",
                  desc: "Weekly stories about food culture, chef insights, and culinary journeys.",
                },
                {
                  icon: "ri-chat-3-line",
                  title: "The Circle",
                  desc: "Open discussions, food polls, and conversations with fellow enthusiasts.",
                },
                {
                  icon: "ri-music-2-line",
                  title: "Events",
                  desc: "Poetry evenings, live music, and food culture gatherings every month.",
                },
              ].map((exp) => (
                <div
                  key={exp.title}
                  className="bg-background-50 rounded-2xl p-6 md:p-8 border border-background-200/40"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary-100/50 flex items-center justify-center mb-4">
                    <i className={`${exp.icon} text-secondary-600 text-lg`} />
                  </div>
                  <h3 className="font-display text-base md:text-lg text-primary-800 mb-2">
                    {exp.title}
                  </h3>
                  <p className="font-body text-foreground-500 text-sm leading-relaxed">
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-5 md:px-10 lg:px-14 py-16 md:py-24 overflow-hidden">
          <BougainvilleaCorner position="top-left" size="sm" opacity={0.3} />
          <PetalScatter count={4} />
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-800 mb-4">
              Come, Be Part of Our Story
            </h2>
            <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Visit us at Cafe Courtyard. Every visit adds a chapter to a story
              that keeps growing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/visit"
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-background-50 font-body text-sm px-8 py-3.5 rounded-full hover:bg-primary-500 transition-colors duration-300 whitespace-nowrap"
              >
                Come Over
                <i className="ri-arrow-right-line" />
              </Link>
              <Link
                to="/founder"
                className="inline-flex items-center justify-center gap-2 border border-primary-300 text-primary-600 font-body text-sm px-8 py-3.5 rounded-full hover:bg-primary-500 hover:text-background-50 hover:border-primary-500 transition-all duration-300 whitespace-nowrap"
              >
                Meet the Founder
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}