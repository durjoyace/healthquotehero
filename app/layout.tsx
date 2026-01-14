import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import { getNavigation } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrganizationSchema } from "@/components/JsonLd";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Affordable Health Insurance & Medicare Plans | Health Quote Hero",
    template: "%s | Health Quote Hero",
  },
  description:
    "Compare affordable health insurance plans from Aetna, UnitedHealthcare, Humana, Blue Cross & 75+ carriers. Find cheap health insurance starting at $50/month with ACA subsidies. Free quotes in 2 minutes.",
  keywords: [
    "affordable health insurance",
    "health insurance marketplace",
    "cheap health insurance",
    "health insurance quotes",
    "Medicare plans",
    "Medicare Advantage",
    "Medigap",
    "ACA health insurance",
    "Obamacare plans",
    "health insurance cost",
    "compare health insurance",
    "individual health insurance",
    "family health insurance",
  ],
  authors: [{ name: "Health Quote Hero" }],
  creator: "Health Quote Hero",
  publisher: "Health Quote Hero",
  metadataBase: new URL("https://www.healthquotehero.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Health Quote Hero",
    title: "Find Affordable Health Insurance | Compare Plans & Save $350/Month",
    description:
      "Compare health insurance plans from 75+ top carriers. Our customers save an average of $350/month. Free quotes, no obligation. Licensed agents available 7 days a week.",
    images: [
      {
        url: "/api/og?title=Affordable%20Health%20Insurance%20%26%20Medicare&subtitle=Compare%2075%2B%20carriers.%20Save%20up%20to%20%24350%2Fmonth.",
        width: 1200,
        height: 630,
        alt: "Health Quote Hero - Find Affordable Health Insurance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Affordable Health Insurance & Medicare Plans | Health Quote Hero",
    description:
      "Compare plans from Aetna, UnitedHealthcare, Humana & 75+ carriers. Save up to $350/month on health insurance.",
    images: ["/api/og?title=Affordable%20Health%20Insurance%20%26%20Medicare&subtitle=Compare%2075%2B%20carriers.%20Save%20up%20to%20%24350%2Fmonth."],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "Health Insurance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getNavigation();

  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <head>
        <OrganizationSchema />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header navigation={navigation.header} />
        <main className="flex-1">{children}</main>
        <Footer navigation={navigation.footer} />
      </body>
    </html>
  );
}
