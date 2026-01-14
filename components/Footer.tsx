import Link from "next/link";
import { NavItem } from "@/lib/content";

interface FooterProps {
  navigation: NavItem[];
}

export default function Footer({ navigation }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4 mt-0">
              Health Quote Hero
            </h3>
            <p className="text-sm text-gray-400 mb-0">
              Own Your Healthcare. Find the right health insurance and Medicare
              plans for you and your family.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 mt-0">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link
                href="/health-insurance"
                className="text-gray-400 hover:text-white no-underline transition-colors"
              >
                Health Insurance
              </Link>
              <Link
                href="/medicare"
                className="text-gray-400 hover:text-white no-underline transition-colors"
              >
                Medicare
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white no-underline transition-colors"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 mt-0">Legal</h4>
            <nav className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-400 hover:text-white no-underline transition-colors"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p className="mb-0">
            &copy; {currentYear} Health Quote Hero. All rights reserved.
          </p>
          <p className="mt-2 mb-0 text-xs">
            405 Waltham Street, Suite 408, Lexington MA 02421
          </p>
        </div>
      </div>
    </footer>
  );
}
