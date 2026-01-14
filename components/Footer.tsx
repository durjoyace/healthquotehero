"use client";

import Link from "next/link";
import { NavItem } from "@/lib/content";
import { useState, useEffect } from "react";

interface FooterProps {
  navigation: NavItem[];
}

export default function Footer({ navigation }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-primary-900 text-white relative">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary-900 via-orange-400 to-primary-900" />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="no-underline">
              <h3 className="text-white font-heading font-bold text-2xl mb-4 mt-0">
                Health Quote Hero
              </h3>
            </Link>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Own Your Healthcare. Find the right health insurance and Medicare
              plans for you and your family. Compare top carriers and save.
            </p>
            {/* Social Links */}
            <div className="flex gap-4" role="list" aria-label="Social media links">
              <a
                href="https://facebook.com/healthquotehero"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors no-underline"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z" />
                </svg>
              </a>
              <a
                href="https://twitter.com/healthquotehero"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors no-underline"
                aria-label="Follow us on Twitter"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/healthquotehero"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-orange-500 transition-colors no-underline"
                aria-label="Connect with us on LinkedIn"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-6 mt-0">
              Insurance Types
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/health-insurance"
                className="text-white/70 hover:text-orange-400 no-underline transition-colors text-sm"
              >
                Health Insurance
              </Link>
              <Link
                href="/medicare"
                className="text-white/70 hover:text-orange-400 no-underline transition-colors text-sm"
              >
                Medicare
              </Link>
              <Link
                href="/medicare"
                className="text-white/70 hover:text-orange-400 no-underline transition-colors text-sm"
              >
                Medicare Advantage
              </Link>
              <Link
                href="/medicare"
                className="text-white/70 hover:text-orange-400 no-underline transition-colors text-sm"
              >
                Medicare Supplement
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-6 mt-0">
              Company
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-white/70 hover:text-orange-400 no-underline transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-white/70 hover:text-orange-400 no-underline transition-colors text-sm"
              >
                Contact Us
              </Link>
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-white/70 hover:text-orange-400 no-underline transition-colors text-sm"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-heading font-semibold text-lg mb-6 mt-0">
              Get in Touch
            </h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white/70">
                  405 Waltham Street, Suite 408
                  <br />
                  Lexington, MA 02421
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-orange-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:support@healthquotehero.com"
                  className="text-white/70 hover:text-orange-400 no-underline transition-colors"
                >
                  support@healthquotehero.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p className="mb-0">
              &copy; {currentYear} Health Quote Hero. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white no-underline transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white no-underline transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-orange-500 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all duration-300 z-40 ${
          showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
}
