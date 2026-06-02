import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, ShieldCheck } from "lucide-react";

// ─── Icons ───────────────────────────────────────────────────────────────────

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
      <path d="M17.5 3h3l-7 8 8.2 10h-6.4l-5-6.1L8 21H5l7.4-8.5L4.5 3H11l4.5 5.5L17.5 3Zm-1.1 16h1.7L8.1 4.8H6.3L16.4 19Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 11 22 14.3V21h-4v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}
function ExternalArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px]">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SOLUTIONS_LINKS = [
  { label: "Services", href: "/services" },
  { label: "WaaP", href: "/waap" },
  { label: "CaaP", href: "/caap" },
  { label: "AI Suite", href: "/ai" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="relative" style={{ background: "#070b15" }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(700px 320px at 8% 0%,rgba(110,140,251,.06),transparent 60%)" }}
        aria-hidden
      />

      {/* ─── CTA Band ─────────────────────────────────────────────────────────── */}
      <div className="relative max-w-[1240px] mx-auto px-[26px]">
        <div
          className="relative -mt-12 rounded-[18px] p-[38px_44px] flex items-center justify-between gap-[30px] flex-wrap overflow-hidden"
          style={{
            background: "radial-gradient(500px 280px at 88% -40%,rgba(110,140,251,.28),transparent 60%),linear-gradient(120deg,#0e1424,#0a0f1c)",
            border: "1px solid rgba(255,255,255,.14)",
            boxShadow: "0 40px 90px -40px rgba(0,0,0,.9)",
          }}
        >
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
              backgroundSize: "34px 34px",
              WebkitMaskImage: "radial-gradient(600px 300px at 80% 0%,#000,transparent 70%)",
              maskImage: "radial-gradient(600px 300px at 80% 0%,#000,transparent 70%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <h3
              className="m-0 mb-2 text-[26px] font-bold text-white tracking-[-0.02em] leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Ready to ship what lasts?
            </h3>
            <p className="m-0 text-[14.5px] leading-[1.5] max-w-[440px]" style={{ color: "#8b97ad" }}>
              Book a discovery call and get a fixed-scope plan for your software and AI roadmap.
            </p>
          </div>

          <div className="relative flex gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-[7px] font-semibold text-[14.5px] rounded-full px-[24px] py-[13px] text-[#02101c] hover:-translate-y-px transition-transform duration-220"
              style={{
                background: "linear-gradient(180deg,#636CCB,#6E8CFB)",
                boxShadow: "0 8px 24px -8px rgba(110,140,251,.45),inset 0 1px 0 rgba(255,255,255,.5)",
                border: "1px solid transparent",
              }}
            >
              Schedule a call <ExternalArrow />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-[7px] font-semibold text-[14.5px] rounded-full px-[24px] py-[13px] text-[#eaf1fb] hover:bg-white/[0.06] transition-colors duration-220"
              style={{ border: "1px solid rgba(255,255,255,.14)", background: "rgba(255,255,255,.035)" }}
            >
              Explore services
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Footer Main ──────────────────────────────────────────────────────── */}
      <div className="footer-main-grid relative max-w-[1240px] mx-auto px-[26px] pt-16 pb-10">
        {/* Brand column */}
        <div className="footer-brand-col" style={{ maxWidth: 320 }}>
          <Link href="/" className="inline-flex items-center gap-[11px] mb-5">
            <img
              src="/favicon.svg"
              alt="SaaPify logo"
              width={34}
              height={34}
              className="flex-shrink-0"
              style={{ filter: "drop-shadow(0 4px 12px rgba(110,140,251,.35))" }}
            />
            <span className="font-bold text-[21px] tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Saa<span className="bg-gradient-to-r from-[#6E8CFB] to-[#8BA8FC] bg-clip-text text-transparent">P</span>ify
            </span>
          </Link>

          <p className="mt-5 mb-6 text-[14px] leading-[1.6]" style={{ color: "#8b97ad" }}>
            Structured services. Predictable outcomes. Software and AI solutions built to last — not just to ship.
          </p>

          {/* Status badge */}
          <span
            className="inline-flex items-center gap-[9px] text-[12.5px] font-semibold px-[13px] py-[7px] rounded-full"
            style={{ color: "#8b97ad", background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)" }}
          >
            <span
              className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
              style={{ animation: "nav-status-pulse 2.4s cubic-bezier(.22,1,.36,1) infinite" }}
            />
            All systems operational
          </span>

          {/* Socials */}
          <div className="flex gap-[10px] mt-5">
            {[
              { href: "https://github.com/saapify", icon: <GitHubIcon />, label: "GitHub" },
              { href: "#", icon: <XIcon />, label: "X" },
              { href: "#", icon: <LinkedInIcon />, label: "LinkedIn" },
              { href: "mailto:connect@saapify.in", icon: <MailIcon />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="f-soc w-[40px] h-[40px] rounded-[11px] grid place-items-center"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <h5 className="m-0 mb-[18px] text-[11px] font-bold tracking-[.14em] uppercase" style={{ color: "#57637a" }}>Solutions</h5>
          <ul className="list-none m-0 p-0 flex flex-col gap-[13px]">
            {SOLUTIONS_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="relative text-[14.5px] transition-colors duration-200 hover:text-[#eaf1fb]"
                  style={{ color: "#8b97ad" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="m-0 mb-[18px] text-[11px] font-bold tracking-[.14em] uppercase" style={{ color: "#57637a" }}>Company</h5>
          <ul className="list-none m-0 p-0 flex flex-col gap-[13px]">
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="relative text-[14.5px] transition-colors duration-200 hover:text-[#eaf1fb]"
                  style={{ color: "#8b97ad" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <h5 className="m-0 mb-[18px] text-[11px] font-bold tracking-[.14em] uppercase" style={{ color: "#57637a" }}>Contact</h5>

          <a
            href="mailto:connect@saapify.in"
            className="flex items-center gap-[11px] text-[14.5px] mb-[15px] transition-colors duration-200 hover:text-[#eaf1fb]"
            style={{ color: "#8b97ad" }}
          >
            <span className="text-[#6E8CFB] opacity-85 flex-shrink-0"><MailIcon /></span>
            connect@saapify.in
          </a>

          <div className="flex items-center gap-[11px] text-[14.5px] mb-[15px]" style={{ color: "#8b97ad" }}>
            <span className="text-[#6E8CFB] opacity-85 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
                <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            India · Remote-first
          </div>

          <div className="flex items-center gap-[11px] text-[14.5px] mb-[15px]" style={{ color: "#8b97ad" }}>
            <span className="text-[#6E8CFB] opacity-85 flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px]">
                <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" /><path d="m9 12 2 2 4-4" />
              </svg>
            </span>
            SOC 2 Type II
          </div>

          <Link
            href="/contact"
            className="mt-[6px] self-start inline-flex items-center gap-[7px] font-semibold text-[13.5px] rounded-full px-[20px] py-[11px] text-[#02101c] hover:-translate-y-px transition-transform duration-220"
            style={{
              background: "linear-gradient(180deg,#636CCB,#6E8CFB)",
              boxShadow: "0 8px 24px -8px rgba(110,140,251,.45),inset 0 1px 0 rgba(255,255,255,.5)",
              border: "1px solid transparent",
            }}
          >
            Get in touch <ExternalArrow />
          </Link>
        </div>
      </div>

      {/* ─── Footer Bottom ────────────────────────────────────────────────────── */}
      <div className="relative" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div className="max-w-[1240px] mx-auto px-[26px] py-6 flex items-center justify-between gap-[18px] flex-wrap">
          <span className="text-[13px]" style={{ color: "#57637a" }}>
            © 2026 SaaPify Technologies. All rights reserved.
          </span>
          <div className="flex items-center gap-[22px]">
            <Link href="/privacy" className="text-[13px] transition-colors duration-200 hover:text-[#eaf1fb]" style={{ color: "#8b97ad" }}>
              Privacy Policy
            </Link>
            <span className="w-px h-[14px] bg-white/[0.08]" />
            <Link href="/terms" className="text-[13px] transition-colors duration-200 hover:text-[#eaf1fb]" style={{ color: "#8b97ad" }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
