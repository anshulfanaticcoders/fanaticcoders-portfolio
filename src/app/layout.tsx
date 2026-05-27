import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/site/MotionProvider";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fanaticcoders.com"),
  title: {
    default: "FanaticCoders — Premium Web Design, Development & SEO",
    template: "%s · FanaticCoders",
  },
  description:
    "FanaticCoders is a premium web team building luxury sites, admin systems, SEO growth engines, and custom platforms with Next.js, Supabase, Laravel, WordPress, React and Vue.",
  keywords: [
    "premium web development",
    "luxury web design",
    "Next.js agency",
    "Supabase development",
    "Laravel development",
    "WordPress custom theme",
    "SEO agency",
    "React development",
    "Vue development",
  ],
  openGraph: {
    title: "FanaticCoders — Premium Web Design, Development & SEO",
    description:
      "Luxury web systems, admin platforms, and SEO growth, engineered with Next.js, Supabase, Laravel and WordPress.",
    type: "website",
    siteName: "FanaticCoders",
  },
  twitter: {
    card: "summary_large_image",
    title: "FanaticCoders",
    description:
      "Premium web design, development, and SEO for brands that care about the details.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
