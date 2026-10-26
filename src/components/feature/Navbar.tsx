import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const navOptions = [
  { label: "Our Roots", href: "/about" },
  { label: "Plate Stories", href: "/the-table" },
  { label: "Flavor Files", href: "/journal" },
  { label: "The Frame", href: "/gallery" },
  { label: "The Circle", href: "/community" },
  { label: "Join the Conversation", href: "/visit" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dotsOpen, setDotsOpen] = useState(false);
  const dotsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDotsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dotsRef.current && !dotsRef.current.contains(e.target as Node)) {
        setDotsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isHome = location.pathname === "/";
  const isDark = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background-50/95 backdrop-blur-md border-b border-background-200/60"
          : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-5 md:px-10 lg:px-14 py-4 md:py-5">
        {/* Logo — bigger, no ring */}
        <Link to="/" className="shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src="https://static.readdy.ai/image/9771e8f5c9fa1c2dfcc2250e0df41b8a/bc3f3b0c7e23ab1152e3a1da9be127e1.png"
              alt="Cafe Courtyard"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop: Three-dot menu only */}
        <div className="hidden md:flex items-center gap-4">
          <div ref={dotsRef} className="relative">
            <button
              onClick={() => setDotsOpen(!dotsOpen)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "text-background-50 hover:bg-background-50/15"
                  : "text-foreground-700 hover:bg-background-200/70"
              } ${dotsOpen ? (isDark ? "bg-background-50/15" : "bg-background-200/70") : ""}`}
              aria-label="Navigation menu"
            >
              <i className="ri-more-2-fill text-xl" />
            </button>

            {/* Dropdown */}
            {dotsOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-background-50 rounded-xl border border-background-200/70 py-2 shadow-lg z-50 overflow-hidden">
                {navOptions.map((opt, idx) => {
                  const isActive = location.pathname === opt.href;
                  const isLast = idx === navOptions.length - 1;
                  const isCTA = opt.label === "Join the Conversation";
                  return (
                    <Link
                      key={opt.href}
                      to={opt.href}
                      className={`flex items-center justify-between px-5 py-3 font-body text-base transition-colors duration-200 ${
                        isCTA
                          ? "mt-1 pt-4 border-t-2 border-background-200/60 text-primary-600 font-semibold hover:bg-primary-50/70"
                          : isActive
                          ? "text-primary-600 bg-primary-50/70 font-medium"
                          : "text-foreground-700 hover:bg-background-100 hover:text-primary-600"
                      } ${!isCTA && !isLast && idx !== navOptions.length - 2 ? "border-b border-background-100/60" : ""}`}
                    >
                      <span>{opt.label}</span>
                      <i className={`ri-arrow-right-s-line text-lg ${isCTA ? "text-primary-500" : "text-foreground-400"}`} />
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors ${
            isDark ? "text-background-50" : "text-foreground-700"
          }`}
          aria-label="Toggle menu"
        >
          <i
            className={`ri-${mobileOpen ? "close" : "menu"}-line text-2xl`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background-50 border-b border-background-200/60 px-5 pb-6 pt-2">
          <div className="flex flex-col gap-4">
            {navOptions.slice(0, -1).map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-body text-foreground-700 text-base py-2 border-b border-background-200/50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/visit"
              className="font-body text-base text-center font-semibold px-5 py-3 rounded-full bg-primary-600 text-background-50 mt-3"
            >
              Join the Conversation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}