"use client";

import { useRef } from "react";
import {
  Cloud,
  Code,
  Globe,
  LayoutDashboard,
  Server,
  ShoppingBag,
  Smartphone,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { services, type ServiceIcon } from "@/content/site";
import { useReveal } from "@/lib/motion";

const ICONS: Record<ServiceIcon, LucideIcon> = {
  ShoppingBag,
  Globe,
  Code,
  Smartphone,
  Server,
  LayoutDashboard,
  UtensilsCrossed,
  Cloud,
};

export function Services() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref, ".service", { y: 24, stagger: 0.06 });

  return (
    <section className="section" id="services" aria-labelledby="servicesHeading" ref={ref}>
      <div className="wrap">
        <p className="eyebrow">01 — Services</p>
        <h2 className="section-title" id="servicesHeading" style={{ marginTop: "1rem" }}>
          One developer,
          <br />
          the whole stack.
        </h2>
        <p className="lede" style={{ marginTop: "1.5rem" }}>
          From a Shopify theme to a multi-tenant SaaS — design, frontend, backend, mobile and hosting, handled
          by the person you actually talk to.
        </p>

        <ul className="services__grid">
          {services.map((s) => {
            const Icon = ICONS[s.icon];
            return (
              <li key={s.title} className="service">
                <span className="service__icon" aria-hidden>
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <ul className="service__tags" aria-label="Tools">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
