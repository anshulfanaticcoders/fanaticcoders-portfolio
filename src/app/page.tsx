import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { Services } from "@/components/site/Services";
import { TechStack } from "@/components/site/TechStack";
import { Process } from "@/components/site/Process";
import { Work } from "@/components/site/Work";
import { Team } from "@/components/site/Team";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <main className="grain relative min-h-screen bg-[var(--color-canvas)] text-[var(--color-ink)]">
      <Nav />
      <Hero />
      <TrustStrip />
      <Services />
      <TechStack />
      <Process />
      <Work />
      <Team />
      <CTA />
      <Footer />
    </main>
  );
}
