import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FanaticCoders | Premium Web Design and Development",
  description:
    "FanaticCoders builds luxury web experiences, SEO-ready sites, admin systems, and custom development with Next.js, Supabase, Laravel, WordPress, React, and Vue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
