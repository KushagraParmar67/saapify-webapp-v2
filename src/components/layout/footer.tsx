import Link from "next/link";
import { Zap, GitBranch, Mail, MapPin, ArrowUpRight } from "lucide-react";

const SERVICES_LINKS = [
  { label: "Web Development", href: "/services" },
  { label: "Mobile Apps", href: "/services" },
  { label: "AI Suite", href: "/ai" },
  { label: "Cloud & DevOps", href: "/services" },
  { label: "API & Integrations", href: "/services" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="bg-[#020408] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-8">

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 pb-14 border-b border-white/[0.04]">

          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-lg text-white">
                Saa<span className="text-cyan-400">P</span>ify
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Structured services. Predictable outcomes. Software and AI solutions built to last, not just to ship.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-all"
                aria-label="GitHub"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@saapify.in"
                className="w-9 h-9 rounded-lg border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-600 transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-5">Services</h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase mb-5">Contact</h4>
            <div className="space-y-3">
              <a
                href="mailto:hello@saapify.in"
                className="flex items-start gap-2 text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                hello@saapify.in
              </a>
              <div className="flex items-start gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                India
              </div>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/[0.04] border border-gray-800 text-gray-300 text-xs font-medium hover:bg-white/[0.08] hover:border-gray-700 transition-all"
              >
                Get in touch <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} SaaPify Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map(({ label, href }) => (
              <Link key={label} href={href} className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
