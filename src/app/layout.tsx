import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { site, services } from "@/content/site";
import "./globals.css";

const body = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const title = `${site.name} — ${site.role}`;
const description = `${site.name} is a freelance full stack developer in ${site.locationShort} with ${site.experienceYears}+ years of experience building Shopify stores, WordPress sites, React and Laravel apps, mobile apps and SaaS products.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://anshulmankotia.com"),
  title,
  description,
  keywords: [
    "freelance full stack developer",
    "Shopify developer India",
    "WordPress developer Dharamshala",
    "React developer",
    "Next.js developer",
    "Laravel developer",
    "React Native developer",
    "Flutter developer",
    "SaaS development",
    "Himachal Pradesh web developer",
  ],
  openGraph: { title, description, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Full Stack Developer",
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dharamshala",
    addressRegion: "Himachal Pradesh",
    addressCountry: "IN",
  },
  knowsAbout: services.map((s) => s.title),
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={body.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f%5B%5D=clash-display@600,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
