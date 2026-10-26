import { Link } from "react-router-dom";
import { cafeInfo } from "@/mocks/cafeInfo";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Our Roots", href: "/about" },
      { label: "Plate Stories", href: "/the-table" },
      { label: "Flavor Files", href: "/journal" },
      { label: "The Frame", href: "/gallery" },
      { label: "The Circle", href: "/community" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary-600 text-background-100">
      {/* Main footer */}
      <div className="px-5 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + Bougainvillea */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-5 mb-6">
              <Link to="/" className="shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-background-50 flex items-center justify-center">
                  <img
                    src="https://static.readdy.ai/image/9771e8f5c9fa1c2dfcc2250e0df41b8a/bc3f3b0c7e23ab1152e3a1da9be127e1.png"
                    alt="Cafe Courtyard"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
              <div>
                <p className="font-display text-background-50 text-xl md:text-2xl tracking-wide">
                  Café Courtyard
                </p>
                <p className="font-body text-background-300 text-sm italic">
                  Where continental food becomes conversation.
                </p>
              </div>
            </div>
            <p className="font-body text-base leading-relaxed text-background-200 max-w-sm mb-8">
              Rooted in continental cuisine. Built around people, stories, and the shared experiences that make every table feel like home.
            </p>
            {/* Cafe interior photo */}
            <div className="mb-8 rounded-xl overflow-hidden">
              <img
                src="https://storage.readdy-site.link/project_files/4eeeef57-020b-451b-9556-b41a13a8f84a/515ba5f4-b416-4595-98f6-b9e3bee13c7f_compressed_WhatsApp-Image-2026-07-24-at-16.18.35.webp"
                alt="Cafe Courtyard Interior"
                className="h-32 md:h-40 w-full object-cover"
              />
            </div>
            <div className="flex items-center gap-4">
              <a
                href={cafeInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-background-400/30 flex items-center justify-center hover:bg-background-50 hover:text-primary-600 transition-all duration-300"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-lg" />
              </a>
              <a
                href={cafeInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-background-400/30 flex items-center justify-center hover:bg-background-50 hover:text-primary-600 transition-all duration-300"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill text-lg" />
              </a>
              <a
                href={cafeInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-background-400/30 flex items-center justify-center hover:bg-background-50 hover:text-primary-600 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-fill text-lg" />
              </a>
            </div>
          </div>

          {/* Explore links */}
          <div className="md:col-span-3">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-background-400 mb-5 font-medium">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks[0].links.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-base text-background-200 hover:text-background-50 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Come Over */}
          <div className="md:col-span-4">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-background-400 mb-5 font-medium">
              Come Over
            </h4>
            <div className="flex flex-col gap-4 font-body text-base text-background-200 leading-relaxed">
              <div>
                <p>{cafeInfo.address.line1}</p>
                <p>{cafeInfo.address.line2}</p>
                <p>{cafeInfo.address.city}, {cafeInfo.address.state} {cafeInfo.address.pincode}</p>
              </div>
              <div>
                <p className="text-background-300 font-medium mb-1">Open Everyday</p>
                <p>{cafeInfo.hours.weekdays}</p>
                <p>{cafeInfo.hours.weekends}</p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${cafeInfo.contact.phone}`}
                  className="inline-flex items-center gap-2 text-background-300 hover:text-background-50 transition-colors duration-300 text-sm"
                >
                  <i className="ri-phone-line" />
                  {cafeInfo.contact.phone}
                </a>
                <a
                  href={`mailto:${cafeInfo.contact.email}`}
                  className="inline-flex items-center gap-2 text-background-300 hover:text-background-50 transition-colors duration-300 text-sm"
                >
                  <i className="ri-mail-line" />
                  {cafeInfo.contact.email}
                </a>
              </div>
              <Link
                to="/visit"
                className="inline-flex items-center justify-center gap-2 bg-background-50 text-primary-600 font-body text-sm font-medium px-6 py-3 rounded-full hover:bg-secondary-200 transition-colors duration-300 w-fit whitespace-nowrap mt-2"
              >
                Reserve a Table
                <i className="ri-arrow-right-line" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background-800/40 px-5 md:px-10 lg:px-14 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-sm text-background-400">
            &copy; {new Date().getFullYear()} Café Courtyard. All stories, conversations, and rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/journal" className="font-body text-sm text-background-400 hover:text-background-100 transition-colors">
              Flavor Files
            </Link>
            <Link to="/about" className="font-body text-sm text-background-400 hover:text-background-100 transition-colors">
              Our Roots
            </Link>
            <Link to="/visit" className="font-body text-sm text-background-400 hover:text-background-100 transition-colors">
              Come Over
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}