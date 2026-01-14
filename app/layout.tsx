import type { Metadata } from "next";
import { getNavigation } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Health Quote Hero - Own Your Healthcare",
    template: "%s | Health Quote Hero",
  },
  description:
    "Find the right health insurance and Medicare plans for you and your family. Compare quotes from top providers.",
  metadataBase: new URL("https://www.healthquotehero.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Health Quote Hero",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getNavigation();

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header navigation={navigation.header} />
        <main className="flex-1">{children}</main>
        <Footer navigation={navigation.footer} />
      </body>
    </html>
  );
}
