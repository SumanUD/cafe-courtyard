import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { communityDiscussions, featuredConversation } from "@/mocks/community";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";
import { cafeInfo } from "@/mocks/cafeInfo";
import { useState } from "react";

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="pt-28 md:pt-32 pb-12 md:pb-16 px-5 md:px-10 lg:px-14">
          <div className="max-w-7xl mx-auto">
            <p className="font-body text-xs uppercase tracking-widest text-accent-600 mb-3">
              The Circle
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-800 leading-[1.1] mb-4">
              Where Food
              <br />
              <span className="italic font-normal">Meets Conversation</span>
            </h1>
            <p className="font-body text-foreground-600 text-base md:text-lg max-w-xl leading-relaxed">
              Join the conversation. Share your food stories, ask questions, and
              connect with fellow continental cuisine enthusiasts.
            </p>
          </div>
        </section>

        {/* Featured Conversation */}
        <section className="relative px-5 md:px-10 lg:px-14 pb-12 md:pb-16 overflow-hidden">
          <BougainvilleaCorner position="top-left" size="md" opacity={0.35} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="bg-primary-600 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto md:min-h-[480px]">
                  <img
                    src={featuredConversation.image}
                    alt={featuredConversation.author}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <p className="font-body text-xs uppercase tracking-widest text-secondary-400 mb-6">
                    The Circle
                  </p>
                  <span className="font-serif-alt text-secondary-500 text-5xl md:text-6xl leading-none mb-6">
                    &ldquo;
                  </span>
                  <blockquote className="font-display text-xl md:text-2xl lg:text-3xl text-background-50 leading-relaxed mb-8">
                    {featuredConversation.quote}
                  </blockquote>
                  <div>
                    <p className="font-body text-background-200 text-sm font-medium">
                      {featuredConversation.author}
                    </p>
                    <p className="font-body text-background-500 text-xs">
                      {featuredConversation.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Discussion of the Week */}
        <section className="relative px-5 md:px-10 lg:px-14 pb-12 md:pb-16 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="sm" opacity={0.3} />
          <PetalScatter count={4} />
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-accent-500" />
              <h2 className="font-display text-xl md:text-2xl text-primary-800">
                Discussion of the Week
              </h2>
            </div>
            {communityDiscussions
              .filter((d) => d.category === "Discussion of the Week")
              .map((discussion) => (
                <div
                  key={discussion.id}
                  className="bg-background-100 rounded-2xl p-6 md:p-8 border border-background-200/40"
                >
                  <h3 className="font-display text-lg md:text-xl text-primary-800 mb-2">
                    {discussion.title}
                  </h3>
                  <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed mb-4">
                    {discussion.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-body text-foreground-400 text-xs">
                      {discussion.author}
                    </span>
                    <span className="font-body text-accent-600 text-xs bg-accent-100/40 px-2.5 py-1 rounded-full">
                      {discussion.responses} responses
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* All Conversations */}
        <section className="relative px-5 md:px-10 lg:px-14 pb-12 md:pb-16 overflow-hidden">
          <BougainvilleaCorner position="top-left" size="sm" opacity={0.3} />
          <PetalScatter count={4} />
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-xl md:text-2xl text-primary-800 mb-8">
              Join the Conversation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityDiscussions
                .filter((d) => d.category !== "Discussion of the Week")
                .map((discussion) => (
                  <div
                    key={discussion.id}
                    className="bg-background-100 rounded-2xl p-6 border border-background-200/40 hover:border-background-300/60 transition-all duration-300 cursor-pointer"
                  >
                    <span className="inline-block text-accent-600 text-xs font-body uppercase tracking-wider mb-3 bg-accent-100/40 px-2.5 py-1 rounded-full">
                      {discussion.category}
                    </span>
                    <h3 className="font-display text-base md:text-lg text-primary-800 mb-2">
                      {discussion.title}
                    </h3>
                    <p className="font-body text-foreground-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {discussion.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-foreground-400 text-xs">
                        {discussion.author}
                      </span>
                      <span className="font-body text-foreground-400 text-xs flex items-center gap-1">
                        <i className="ri-chat-1-line" />
                        {discussion.responses}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Food Poll */}
 <section className="px-5 md:px-10 lg:px-14 pb-20 md:pb-28">
  <div className="max-w-7xl mx-auto">
    <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center">
      <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center mx-auto mb-6">
        <i className="ri-survey-line text-secondary-300 text-xl" />
      </div>

      <h2 className="font-display text-2xl md:text-3xl text-background-50 mb-4">
        Food Poll of the Month
      </h2>

      <p className="font-body text-background-300 text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed">
        Which continental dish should we feature next? Your vote shapes
        the next story on Plate Stories.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
        {[
          {
            name: "Bacon Wrapped Prawns",
            votes: 24,
          },
          {
            name: "English Breakfast",
            votes: 18,
          },
          {
            name: "Chicken Ala Kiev",
            votes: 12,
          },
        ].map((option) => {
          const [selectedFood, setSelectedFood] = useState(null);

          return (
            <button
              key={option.name}
              onClick={() => setSelectedFood(option.name)}
              className={`w-full sm:w-auto font-body text-sm px-6 py-3 rounded-full border transition-all duration-300 text-center ${
                selectedFood === option.name
                  ? "bg-secondary-400 text-primary-900 border-secondary-400"
                  : "bg-background-50/10 text-background-200 border-background-400/20 hover:bg-background-50 hover:text-primary-900"
              }`}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  </div>
</section>
      </main>
      <Footer />
    </>
  );
}