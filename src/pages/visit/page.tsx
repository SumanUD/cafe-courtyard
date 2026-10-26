import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/feature/Navbar";
import Footer from "@/components/feature/Footer";
import { cafeInfo } from "@/mocks/cafeInfo";
import { BougainvilleaCorner, PetalScatter } from "@/components/base/BougainvilleaDecor";
import { apiRequest } from "@/lib/api";

export default function VisitPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get("phone_alt") as string;

    if (honeypot && honeypot.trim() !== "") {
      setFormStatus("success");
      setFormMessage("Thank you for reaching out! We will get back to you soon.");
      form.reset();
      return;
    }

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      setFormStatus("error");
      setFormMessage("Please fill in all required fields.");
      return;
    }

    if (!email.includes("@")) {
      setFormStatus("error");
      setFormMessage("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      await apiRequest("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message, phone_alt: honeypot }),
      });
      setFormStatus("success");
      setSubmittedName(name);
      setFormMessage(
        "Your message is safely with our team. A confirmation email is on its way, and we’ll be in touch soon.",
      );
      form.reset();
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        error instanceof Error
          ? error.message
          : "Unable to send message. Please check your connection.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background-50">
        {/* Hero */}
        <section className="relative h-[45vh] md:h-[50vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://static.readdy.ai/image/9771e8f5c9fa1c2dfcc2250e0df41b8a/0d052824e616e01a2af465d2af2d55b2.png"
              alt="Visit Cafe Courtyard"
              className="w-full h-full object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-foreground-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground-950/60 via-foreground-950/40 to-transparent" />
          </div>
          <div className="relative z-10 px-5 md:px-10 lg:px-14 pb-8 md:pb-12 w-full">
            <div className="max-w-4xl">
              <p className="font-body text-xs uppercase tracking-widest text-secondary-300 mb-3">
                Come Over
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-background-50 leading-[1.1]" style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}>
                Come Over
                <br />
                <span className="italic font-normal">To The Courtyard</span>
              </h1>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="relative px-5 md:px-10 lg:px-14 py-16 md:py-24 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.4} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {/* Location */}
              <div className="bg-background-100 rounded-2xl p-6 md:p-8 border border-background-200/40">
                <div className="w-10 h-10 rounded-full bg-accent-100/50 flex items-center justify-center mb-5">
                  <i className="ri-map-pin-line text-accent-600 text-lg" />
                </div>
                <h3 className="font-display text-lg text-primary-800 mb-3">
                  Location
                </h3>
                <p className="font-body text-foreground-600 text-sm leading-relaxed">
                  {cafeInfo.address.line1}
                  <br />
                  {cafeInfo.address.line2}
                  <br />
                  {cafeInfo.address.city}, {cafeInfo.address.state}{" "}
                  {cafeInfo.address.pincode}
                  <br />
                  {cafeInfo.address.country}
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Cafe+Courtyard+New+Town+Kolkata"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 font-body text-sm mt-4 hover:text-primary-500 transition-colors"
                >
                  <i className="ri-navigation-line" />
                  Get Directions
                </a>
              </div>

              {/* Hours */}
              <div className="bg-background-100 rounded-2xl p-6 md:p-8 border border-background-200/40">
                <div className="w-10 h-10 rounded-full bg-secondary-100/50 flex items-center justify-center mb-5">
                  <i className="ri-time-line text-secondary-600 text-lg" />
                </div>
                <h3 className="font-display text-lg text-primary-800 mb-3">
                  Hours
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-body text-foreground-500 text-xs uppercase tracking-wider">
                      Monday — Friday
                    </p>
                    <p className="font-body text-foreground-700 text-sm">
                      {cafeInfo.hours.weekdays}
                    </p>
                  </div>
                  <div>
                    <p className="font-body text-foreground-500 text-xs uppercase tracking-wider">
                      Saturday — Sunday
                    </p>
                    <p className="font-body text-foreground-700 text-sm">
                      {cafeInfo.hours.weekends}
                    </p>
                  </div>
                </div>
                <p className="font-body text-accent-600 text-xs mt-4 bg-accent-100/30 px-3 py-1.5 rounded-full inline-block">
                  {cafeInfo.hours.note}
                </p>
              </div>

              {/* Contact */}
              <div className="bg-background-100 rounded-2xl p-6 md:p-8 border border-background-200/40">
                <div className="w-10 h-10 rounded-full bg-primary-100/50 flex items-center justify-center mb-5">
                  <i className="ri-phone-line text-primary-600 text-lg" />
                </div>
                <h3 className="font-display text-lg text-primary-800 mb-3">
                  Contact
                </h3>
                <div className="space-y-2">
                  <a
                    href={`tel:${cafeInfo.contact.phone}`}
                    className="font-body text-foreground-700 text-sm block hover:text-primary-600 transition-colors"
                  >
                    {cafeInfo.contact.phone}
                  </a>
                  <a
                    href={`mailto:${cafeInfo.contact.email}`}
                    className="font-body text-foreground-700 text-sm block hover:text-primary-600 transition-colors"
                  >
                    {cafeInfo.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <a
                    href={cafeInfo.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-background-300/40 flex items-center justify-center text-foreground-500 hover:text-primary-600 hover:border-primary-300 transition-all"
                    aria-label="Facebook"
                  >
                    <i className="ri-facebook-fill text-sm" />
                  </a>
                  <a
                    href={cafeInfo.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-background-300/40 flex items-center justify-center text-foreground-500 hover:text-primary-600 hover:border-primary-300 transition-all"
                    aria-label="Instagram"
                  >
                    <i className="ri-instagram-line text-sm" />
                  </a>
                  <a
                    href={cafeInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-background-300/40 flex items-center justify-center text-foreground-500 hover:text-primary-600 hover:border-primary-300 transition-all"
                    aria-label="LinkedIn"
                  >
                    <i className="ri-linkedin-fill text-sm" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="relative px-5 md:px-10 lg:px-14 pb-16 md:pb-24 overflow-hidden">
          <BougainvilleaCorner position="top-left" size="sm" opacity={0.3} />
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-background-200/40 h-72 md:h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.1234567890123!2d88.484!3d22.583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275e5e5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sCafe%20Courtyard!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cafe Courtyard Location"
              />
            </div>
          </div>
        </section>

        {/* Reservation / Contact Form */}
        <section className="relative bg-background-100 px-5 md:px-10 lg:px-14 py-16 md:py-24 overflow-hidden">
          <BougainvilleaCorner position="top-right" size="md" opacity={0.35} />
          <PetalScatter count={5} />
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              {/* Reservation Info */}
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-secondary-700 mb-3">
                  Reservations
                </p>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-primary-800 mb-6">
                  Reserve Your{" "}
                  <span className="italic font-normal">Table</span>
                </h2>
                <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed mb-6">
                  We welcome walk-ins, but for groups of 4 or more, or for
                  special occasions, we recommend reserving a table in advance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-background-200/50 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-whatsapp-line text-foreground-500 text-sm" />
                    </div>
                    <div>
                      <p className="font-body text-foreground-700 text-sm font-medium">
                        WhatsApp
                      </p>
                      <p className="font-body text-foreground-500 text-sm">
                        Send us a message at {cafeInfo.contact.phone} for quick
                        reservations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-background-200/50 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-phone-line text-foreground-500 text-sm" />
                    </div>
                    <div>
                      <p className="font-body text-foreground-700 text-sm font-medium">
                        Call
                      </p>
                      <p className="font-body text-foreground-500 text-sm">
                        {cafeInfo.contact.phone} — Available during hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-background-200/50 flex items-center justify-center shrink-0 mt-0.5">
                      <i className="ri-mail-line text-foreground-500 text-sm" />
                    </div>
                    <div>
                      <p className="font-body text-foreground-700 text-sm font-medium">
                        Email
                      </p>
                      <p className="font-body text-foreground-500 text-sm">
                        {cafeInfo.contact.email} — For large group bookings
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-background-50 rounded-2xl p-6 md:p-8 border border-background-200/40">
                <h3 className="font-display text-lg md:text-xl text-primary-800 mb-6">
                  Send Us a Message
                </h3>
                {formStatus === "success" ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-2xl border border-primary-200 bg-primary-50/70 px-6 py-8 text-center"
                  >
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                      <i className="ri-mail-send-line text-3xl" aria-hidden="true" />
                    </div>
                    <p className="font-body text-xs uppercase tracking-[0.2em] text-primary-700">
                      Message received
                    </p>
                    <h4 className="mt-2 font-display text-2xl text-primary-900">
                      Thank you{submittedName ? `, ${submittedName}` : ""}.
                    </h4>
                    <p className="mx-auto mt-3 max-w-md font-body text-base leading-relaxed text-foreground-700">
                      {formMessage}
                    </p>
                    <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-body text-sm text-foreground-600">
                      <i className="ri-inbox-archive-line text-primary-700" aria-hidden="true" />
                      Please check your inbox for our note.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormStatus("idle");
                        setFormMessage("");
                        setSubmittedName("");
                      }}
                      className="mx-auto mt-6 block font-body text-sm font-medium text-primary-700 underline underline-offset-4 hover:text-primary-900"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="phone_alt"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    readOnly
                    className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
                    style={{ clip: "rect(0, 0, 0, 0)" }}
                    value=""
                    onChange={() => {}}
                  />
                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-foreground-500 mb-1.5 block">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full font-body text-sm px-4 py-3 rounded-xl bg-background-100 border border-background-200/60 text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-foreground-500 mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full font-body text-sm px-4 py-3 rounded-xl bg-background-100 border border-background-200/60 text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-wider text-foreground-500 mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      maxLength={500}
                      rows={4}
                      className="w-full font-body text-sm px-4 py-3 rounded-xl bg-background-100 border border-background-200/60 text-foreground-800 placeholder:text-foreground-400 focus:outline-none focus:border-primary-300 transition-colors resize-none"
                      placeholder="Tell us what you are looking for..."
                    />
                    <p className="font-body text-xs text-foreground-400 mt-1 text-right">
                      Max 500 characters
                    </p>
                  </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full font-body text-sm bg-primary-600 text-background-50 px-6 py-3.5 rounded-xl hover:bg-primary-500 transition-colors duration-300 whitespace-nowrap disabled:cursor-wait disabled:opacity-70"
                    >
                      {submitting ? "Sending…" : "Send Message"}
                    </button>
                  </form>
                )}

                {formStatus === "error" && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="mt-4 font-body text-sm text-red-600"
                  >
                    {formMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Social CTA */}
        <section className="relative px-5 md:px-10 lg:px-14 py-16 md:py-24 overflow-hidden">
          <BougainvilleaCorner position="top-left" size="sm" opacity={0.3} />
          <PetalScatter count={4} />
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl text-primary-800 mb-4">
              Follow The Courtyard
            </h2>
            <p className="font-body text-foreground-600 text-sm md:text-base leading-relaxed mb-8 max-w-md mx-auto">
              Stay updated with our latest stories, events, and community
              moments on social media.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href={cafeInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-background-100 border border-background-200/50 flex items-center justify-center text-primary-600 hover:bg-primary-800 hover:text-background-50 hover:border-primary-800 transition-all duration-300"
                aria-label="Facebook"
              >
                <i className="ri-facebook-fill text-lg" />
              </a>
              <a
                href={cafeInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-background-100 border border-background-200/50 flex items-center justify-center text-primary-600 hover:bg-primary-800 hover:text-background-50 hover:border-primary-800 transition-all duration-300"
                aria-label="Instagram"
              >
                <i className="ri-instagram-line text-lg" />
              </a>
              <a
                href={cafeInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-background-100 border border-background-200/50 flex items-center justify-center text-primary-600 hover:bg-primary-800 hover:text-background-50 hover:border-primary-800 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <i className="ri-linkedin-fill text-lg" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}