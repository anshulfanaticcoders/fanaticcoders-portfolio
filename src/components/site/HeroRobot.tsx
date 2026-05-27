"use client";

import { motion } from "motion/react";

const innerTags = ["<header>", "<main>", "<section>", "<footer>", "<nav>", "<aside>"];
const middleTags = [
  "<div>",
  "<button>",
  "<form>",
  "<input>",
  "<a>",
  "<img>",
  "<span>",
  "<ul>",
];
const outerTags = ["</>", "{ }", "( )", "=>", "</section>", "<code>", "<script>", "JSX"];

export function HeroRobot({
  ambient = false,
}: {
  ambient?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`robot-scene group relative mx-auto aspect-square w-full ${
        ambient ? "max-w-[760px]" : "max-w-[520px]"
      }`}
      style={
        ambient
          ? {
              maskImage:
                "radial-gradient(circle at 50% 50%, #000 38%, rgba(0,0,0,0.55) 60%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 50%, #000 38%, rgba(0,0,0,0.55) 60%, transparent 85%)",
            }
          : undefined
      }
    >
      {/* glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-6%] rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(215,181,109,0.32),rgba(215,181,109,0.05)_45%,transparent_70%)] blur-2xl transition-opacity duration-700 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(127,227,214,0.10),transparent_60%)] blur-xl"
      />

      {/* faint orbital lines */}
      <div
        aria-hidden
        className="absolute inset-[10%] rounded-full border border-[rgba(215,181,109,0.10)]"
      />
      <div
        aria-hidden
        className="absolute inset-[24%] rounded-full border border-[rgba(215,181,109,0.08)]"
      />
      <div
        aria-hidden
        className="absolute inset-[38%] rounded-full border border-[rgba(215,181,109,0.06)]"
      />

      {/* tag orbits */}
      <Orbit
        tags={outerTags}
        radiusPct={45}
        direction="cw"
        durationVar="--orbit-dur-outer"
        accent="champagne"
      />
      <Orbit
        tags={middleTags}
        radiusPct={37}
        direction="ccw"
        durationVar="--orbit-dur-mid"
        accent="cyan"
      />
      <Orbit
        tags={innerTags}
        radiusPct={29}
        direction="cw"
        durationVar="--orbit-dur-inner"
        accent="champagne"
      />

      {/* robot */}
      <motion.div
        className="absolute inset-0 grid place-items-center"
        animate={{ rotate: 0 }}
        whileHover={{ rotate: -3, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 140, damping: 16 }}
      >
        <div className="robot-float">
          <Robot />
        </div>
      </motion.div>

      {/* hover hint label (skip in ambient mode) */}
      {!ambient && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-[var(--color-ink-dim)] opacity-60 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-[var(--color-line)] bg-[rgba(8,8,11,0.5)] px-3 py-1 backdrop-blur">
            Hover · Spin Up
          </span>
        </div>
      )}
    </motion.div>
  );
}

function Orbit({
  tags,
  radiusPct,
  direction,
  durationVar,
  accent,
}: {
  tags: string[];
  radiusPct: number;
  direction: "cw" | "ccw";
  durationVar: string;
  accent: "champagne" | "cyan";
}) {
  const ringCls = direction === "cw" ? "orbit-cw" : "orbit-ccw";
  const counterCls = direction === "cw" ? "orbit-ccw" : "orbit-cw";
  const dotColor =
    accent === "champagne"
      ? "bg-[var(--color-champagne)]"
      : "bg-[var(--color-cyan)]";
  const textColor =
    accent === "champagne"
      ? "text-[var(--color-champagne)]"
      : "text-[var(--color-cyan)]";

  const topPct = 50 - radiusPct;

  return (
    <div
      className={`absolute inset-0 ${ringCls}`}
      style={{ animationDuration: `var(${durationVar})` }}
    >
      {tags.map((tag, i) => {
        const angle = (360 / tags.length) * i;
        return (
          <div
            key={`${tag}-${i}`}
            className="absolute inset-0"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: `${topPct}%` }}
            >
              <div
                className={counterCls}
                style={{ animationDuration: `var(${durationVar})` }}
              >
                <span
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-line)] bg-[rgba(8,8,11,0.7)] px-2.5 py-1 font-mono text-[10px] tracking-tight backdrop-blur-sm transition-all duration-500 group-hover:border-[var(--color-line-strong)] group-hover:bg-[rgba(20,16,8,0.85)] ${textColor}`}
                >
                  <span className={`h-1 w-1 rounded-full ${dotColor}`} />
                  {tag}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Robot() {
  return (
    <svg
      width="220"
      height="260"
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="FanaticCoders mascot robot"
      role="img"
      className="drop-shadow-[0_30px_60px_rgba(215,181,109,0.35)]"
    >
      <defs>
        <linearGradient id="goldBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5dfa3" />
          <stop offset="45%" stopColor="#d7b56d" />
          <stop offset="100%" stopColor="#8b6a2a" />
        </linearGradient>
        <linearGradient id="goldHead" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff0c9" />
          <stop offset="50%" stopColor="#e6c47f" />
          <stop offset="100%" stopColor="#8a6a30" />
        </linearGradient>
        <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a140a" />
          <stop offset="100%" stopColor="#3a2a10" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff4d4" />
          <stop offset="55%" stopColor="#e6c478" />
          <stop offset="100%" stopColor="#5a3f12" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eyeGlow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#cbfff5" />
          <stop offset="60%" stopColor="#7fe3d6" />
          <stop offset="100%" stopColor="#0e3c36" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Antenna */}
      <g>
        <line
          x1="110"
          y1="36"
          x2="110"
          y2="14"
          stroke="url(#goldHead)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle
          cx="110"
          cy="11"
          r="4.5"
          fill="#f5dfa3"
          className="antenna-pulse"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          filter="url(#softGlow)"
        />
      </g>

      {/* Head */}
      <g>
        <rect
          x="62"
          y="36"
          width="96"
          height="78"
          rx="20"
          fill="url(#goldHead)"
          stroke="#d7b56d"
          strokeOpacity="0.4"
        />
        <rect
          x="62"
          y="36"
          width="96"
          height="78"
          rx="20"
          fill="none"
          stroke="#fff3cf"
          strokeOpacity="0.25"
          strokeWidth="0.6"
        />

        {/* Side ears */}
        <rect x="54" y="58" width="10" height="28" rx="4" fill="#8a6a30" />
        <rect x="156" y="58" width="10" height="28" rx="4" fill="#8a6a30" />
        <circle cx="59" cy="72" r="2" fill="#f5dfa3" />
        <circle cx="161" cy="72" r="2" fill="#f5dfa3" />

        {/* Visor */}
        <rect
          x="74"
          y="58"
          width="72"
          height="34"
          rx="10"
          fill="url(#visor)"
        />
        <rect
          x="74"
          y="58"
          width="72"
          height="34"
          rx="10"
          fill="none"
          stroke="#d7b56d"
          strokeOpacity="0.55"
        />

        {/* Eyes */}
        <g className="eye-blink">
          <circle cx="94" cy="75" r="6" fill="url(#eyeGlow)" />
          <circle cx="94" cy="75" r="2.4" fill="#cffff7" />
          <circle cx="126" cy="75" r="6" fill="url(#eyeGlow)" />
          <circle cx="126" cy="75" r="2.4" fill="#cffff7" />
        </g>

        {/* Mouth grille */}
        <g stroke="#8a6a30" strokeWidth="1.4" strokeLinecap="round">
          <line x1="96" y1="102" x2="104" y2="102" />
          <line x1="108" y1="102" x2="116" y2="102" />
          <line x1="120" y1="102" x2="128" y2="102" />
        </g>
      </g>

      {/* Neck */}
      <rect x="100" y="114" width="20" height="12" rx="3" fill="#8a6a30" />
      <rect x="100" y="114" width="20" height="3" rx="1.5" fill="#d7b56d" />

      {/* Body */}
      <g>
        <path
          d="M52 134 Q52 126 60 126 L160 126 Q168 126 168 134 L172 220 Q172 232 160 232 L60 232 Q48 232 48 220 Z"
          fill="url(#goldBody)"
          stroke="#d7b56d"
          strokeOpacity="0.45"
        />
        {/* chest plate seams */}
        <line
          x1="110"
          y1="130"
          x2="110"
          y2="222"
          stroke="#5e451b"
          strokeOpacity="0.4"
          strokeWidth="1"
        />
        <line
          x1="60"
          y1="200"
          x2="160"
          y2="200"
          stroke="#5e451b"
          strokeOpacity="0.35"
          strokeWidth="1"
        />

        {/* Chest core */}
        <g
          className="core-pulse"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="110" cy="170" r="22" fill="url(#coreGlow)" />
          <circle
            cx="110"
            cy="170"
            r="9"
            fill="#fff4d4"
            filter="url(#softGlow)"
          />
          <circle
            cx="110"
            cy="170"
            r="14"
            fill="none"
            stroke="#fff3cf"
            strokeOpacity="0.4"
          />
        </g>

        {/* Status pips */}
        <circle cx="68" cy="142" r="2" fill="#7fe3d6" />
        <circle cx="76" cy="142" r="2" fill="#d7b56d" />
        <circle cx="84" cy="142" r="2" fill="#8a6a30" />

        <text
          x="142"
          y="146"
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          fill="#1a1206"
          opacity="0.6"
        >
          FC-01
        </text>
      </g>

      {/* Arms */}
      <g>
        <rect x="28" y="138" width="18" height="62" rx="9" fill="url(#goldBody)" />
        <circle cx="37" cy="206" r="9" fill="#e6c47f" stroke="#8a6a30" />
        {/* Right arm — waves hi */}
        <g className="wave-arm">
          <rect
            x="174"
            y="138"
            width="18"
            height="62"
            rx="9"
            fill="url(#goldBody)"
          />
          <circle cx="183" cy="206" r="9" fill="#e6c47f" stroke="#8a6a30" />
        </g>
      </g>

      {/* Base shadow */}
      <ellipse
        cx="110"
        cy="244"
        rx="56"
        ry="6"
        fill="#000"
        opacity="0.5"
        filter="url(#softGlow)"
      />
    </svg>
  );
}
