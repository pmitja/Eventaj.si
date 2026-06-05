"use client";

import Image from "next/image";
import { CSSProperties, useId } from "react";

type SceneProps = {
  variant?: number;
  label?: string;
  className?: string;
};

const palettes = [
  { bg: "#2A1F1A", warm: "#E8A55C", glow: "#F2C87A", figure: "#1A120E", accent: "#C77B4F" },
  { bg: "#1F2937", warm: "#D4B896", glow: "#F4EFE6", figure: "#0F1419", accent: "#9C6B4B" },
  { bg: "#3D2817", warm: "#F2C87A", glow: "#FFE4B5", figure: "#1A0E08", accent: "#B8553A" },
  { bg: "#4A2C1F", warm: "#E8B584", glow: "#F4D9AA", figure: "#1F0F08", accent: "#D4915F" },
  { bg: "#1A2332", warm: "#A6864A", glow: "#D4B896", figure: "#0A0F18", accent: "#7A5A3A" },
  { bg: "#2D1B16", warm: "#F4D9AA", glow: "#FFEACB", figure: "#15090A", accent: "#B8553A" },
  { bg: "#0F1419", warm: "#C9A66B", glow: "#E8C887", figure: "#050709", accent: "#8B5A3C" },
  { bg: "#3A2218", warm: "#D4915F", glow: "#F2BC8B", figure: "#1A0C06", accent: "#A6864A" },
] as const;

const photoSources = [
  {
    src: "/application/hero-collage/sanja-50.webp",
    alt: "Druzina z zabavnimi ocali v photo boothu",
  },
  {
    src: "/application/hero-collage/gatsby-party.webp",
    alt: "Gosta na elegantni zabavi pred crnim ozadjem",
  },
  {
    src: "/application/hero-collage/doba-35.webp",
    alt: "Trije gostje z rekviziti pred sijočim ozadjem",
  },
  {
    src: "/application/hero-collage/new-year.webp",
    alt: "Novoletna zabava s photo booth okvirjem",
  },
  {
    src: "/application/hero-collage/lucija-30.webp",
    alt: "Rojstnodnevni photo booth posnetek z baloni",
  },
  {
    src: "/application/hero-collage/green-boom.webp",
    alt: "Gosti s komicnimi ocali pred zelenim ozadjem",
  },
  {
    src: "/application/hero-collage/gold-group.webp",
    alt: "Skupina gostov s klobuki in ocali pred zlatim ozadjem",
  },
  {
    src: "/application/hero-collage/doba-35.webp",
    alt: "Veseli gostje s photo booth rekviziti",
  },
] as const;

export function PhotoScene({ variant = 0, label = "", className }: SceneProps) {
  const reactId = useId().replace(/:/g, "");
  const p = palettes[variant % palettes.length];
  const id = `ps-${variant}-${reactId}`;
  const photo = photoSources[variant % photoSources.length];

  if (photo) {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "#1f1713",
        }}
      >
        <Image
          src={photo.src}
          alt={label || photo.alt}
          fill
          sizes="(max-width: 768px) 80vw, 420px"
          priority={variant < 4}
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      role={label ? "img" : "presentation"}
      aria-label={label || undefined}
    >
      {variant % 8 === 0 && (
        <g>
          <defs>
            <radialGradient id={`${id}-glow`} cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor={p.glow} stopOpacity="0.6" />
              <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={p.bg} />
          <rect width="400" height="500" fill={`url(#${id}-glow)`} />
          {Array.from({ length: 18 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 53) % 400}
              cy={(i * 71) % 500}
              r={4 + (i % 5) * 3}
              fill={p.warm}
              opacity={0.15 + (i % 4) * 0.08}
            />
          ))}
          <g transform="translate(200 280)">
            <ellipse cx="-30" cy="100" rx="55" ry="20" fill={p.figure} opacity="0.5" />
            <ellipse cx="30" cy="100" rx="55" ry="20" fill={p.figure} opacity="0.5" />
            <path d="M -45 -40 Q -55 20 -75 100 L 5 100 Q -10 20 -20 -40 Z" fill={p.figure} />
            <circle cx="-30" cy="-65" r="22" fill={p.figure} />
            <path d="M 15 -40 Q 10 20 -5 100 L 65 100 Q 55 20 45 -40 Z" fill={p.figure} />
            <circle cx="30" cy="-65" r="22" fill={p.figure} />
            <path d="M -10 -50 Q 0 -55 10 -50" stroke={p.warm} strokeWidth="1" fill="none" opacity="0.6" />
          </g>
          <g fill={p.glow}>
            <circle cx="80" cy="120" r="2" />
            <circle cx="320" cy="180" r="2.5" />
            <circle cx="350" cy="90" r="1.5" />
            <circle cx="60" cy="220" r="1.5" />
          </g>
        </g>
      )}

      {variant % 8 === 1 && (
        <g>
          <defs>
            <radialGradient id={`${id}-spot`} cx="50%" cy="20%" r="80%">
              <stop offset="0%" stopColor={p.warm} stopOpacity="0.4" />
              <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={p.bg} />
          <rect width="400" height="500" fill={`url(#${id}-spot)`} />
          <path d="M 0 380 Q 50 320 100 360 Q 150 300 200 350 Q 250 290 300 340 Q 350 310 400 360 L 400 500 L 0 500 Z" fill={p.figure} opacity="0.9" />
          <path d="M 0 420 Q 50 380 100 410 Q 150 370 200 400 Q 250 360 300 400 Q 350 380 400 410 L 400 500 L 0 500 Z" fill={p.figure} />
          <g stroke={p.figure} strokeWidth="6" strokeLinecap="round" fill="none">
            <line x1="80" y1="380" x2="75" y2="280" />
            <line x1="160" y1="350" x2="170" y2="240" />
            <line x1="240" y1="360" x2="250" y2="260" />
            <line x1="320" y1="370" x2="330" y2="290" />
          </g>
          {Array.from({ length: 30 }).map((_, i) => (
            <rect
              key={i}
              x={(i * 37) % 400}
              y={(i * 19) % 280}
              width="4"
              height="8"
              fill={i % 3 === 0 ? p.warm : i % 3 === 1 ? p.glow : p.accent}
              opacity="0.85"
              transform={`rotate(${i * 23} ${(i * 37) % 400} ${(i * 19) % 280})`}
            />
          ))}
        </g>
      )}

      {variant % 8 === 2 && (
        <g>
          <linearGradient id={`${id}-strip`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={p.warm} />
            <stop offset="100%" stopColor={p.accent} />
          </linearGradient>
          <rect width="400" height="500" fill={p.bg} />
          <rect x="130" y="40" width="140" height="420" fill={p.glow} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="145" y={55 + i * 100} width="110" height="85" fill={p.figure} />
              <circle cx="200" cy={85 + i * 100} r="14" fill={p.warm} opacity="0.7" />
              <ellipse cx="200" cy={120 + i * 100} rx="20" ry="10" fill={p.warm} opacity="0.5" />
            </g>
          ))}
          <ellipse cx="200" cy="475" rx="90" ry="8" fill="#000" opacity="0.4" />
        </g>
      )}

      {variant % 8 === 3 && (
        <g>
          <defs>
            <radialGradient id={`${id}-floor`} cx="50%" cy="100%" r="70%">
              <stop offset="0%" stopColor={p.warm} stopOpacity="0.4" />
              <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={p.bg} />
          <rect width="400" height="500" fill={`url(#${id}-floor)`} />
          <path d="M 100 380 Q 200 320 300 380 Q 200 400 100 380" stroke={p.warm} strokeWidth="1.5" fill="none" opacity="0.4" />
          <path d="M 80 360 Q 200 280 320 360" stroke={p.warm} strokeWidth="1" fill="none" opacity="0.3" />
          <g transform="translate(200 250)">
            <path d="M -40 0 Q -90 100 -110 150 L 50 150 Q 30 80 0 0 Z" fill={p.figure} />
            <circle cx="-25" cy="-30" r="18" fill={p.figure} />
            <path d="M 5 -10 L 30 130 L 65 130 L 50 -10 Z" fill={p.figure} />
            <circle cx="30" cy="-40" r="18" fill={p.figure} />
            <line x1="-15" y1="-10" x2="20" y2="-15" stroke={p.figure} strokeWidth="8" strokeLinecap="round" />
          </g>
          {Array.from({ length: 8 }).map((_, i) => (
            <circle key={i} cx={50 + i * 45} cy={40 + (i % 2) * 20} r="3" fill={p.glow} opacity="0.8" />
          ))}
        </g>
      )}

      {variant % 8 === 4 && (
        <g>
          <defs>
            <radialGradient id={`${id}-360`} cx="50%" cy="60%" r="50%">
              <stop offset="0%" stopColor={p.warm} stopOpacity="0.5" />
              <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={p.bg} />
          <rect width="400" height="500" fill={`url(#${id}-360)`} />
          <circle cx="200" cy="300" r="160" fill="none" stroke={p.warm} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 4" />
          <circle cx="200" cy="300" r="120" fill="none" stroke={p.warm} strokeWidth="0.5" opacity="0.3" />
          <ellipse cx="200" cy="400" rx="100" ry="20" fill={p.figure} />
          <ellipse cx="200" cy="395" rx="100" ry="20" fill={p.accent} />
          <g transform="translate(200 300)">
            <path d="M -20 -20 L -25 90 L 25 90 L 20 -20 Z" fill={p.figure} />
            <circle cx="0" cy="-50" r="22" fill={p.figure} />
            <line x1="-20" y1="0" x2="-50" y2="40" stroke={p.figure} strokeWidth="10" strokeLinecap="round" />
            <line x1="20" y1="0" x2="55" y2="20" stroke={p.figure} strokeWidth="10" strokeLinecap="round" />
          </g>
          <path d="M 60 310 Q 100 220 200 200" stroke={p.glow} strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M 340 310 Q 300 220 200 200" stroke={p.glow} strokeWidth="2" fill="none" opacity="0.5" strokeLinecap="round" />
        </g>
      )}

      {variant % 8 === 5 && (
        <g>
          <defs>
            <radialGradient id={`${id}-bq`} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={p.warm} stopOpacity="0.3" />
              <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={p.bg} />
          <rect width="400" height="500" fill={`url(#${id}-bq)`} />
          <rect x="0" y="380" width="400" height="120" fill={p.figure} opacity="0.7" />
          <g transform="translate(80 280)" stroke={p.glow} strokeWidth="2" fill={p.warm} opacity="0.7">
            <path d="M -20 0 Q -22 60 -10 90 L 10 90 Q 22 60 20 0 Z" />
            <line x1="0" y1="90" x2="0" y2="120" />
            <ellipse cx="0" cy="120" rx="18" ry="3" />
          </g>
          <g transform="translate(280 270)">
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i / 8) * Math.PI * 2;
              return <circle key={i} cx={Math.cos(a) * 25} cy={Math.sin(a) * 25} r="18" fill={p.accent} opacity="0.8" />;
            })}
            <circle cx="0" cy="0" r="18" fill={p.warm} />
            <path d="M -3 18 L -8 100 L 8 100 L 3 18 Z" fill={p.figure} />
          </g>
        </g>
      )}

      {variant % 8 === 6 && (
        <g>
          <defs>
            <linearGradient id={`${id}-bt`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={p.warm} stopOpacity="0.2" />
              <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="400" height="500" fill={p.bg} />
          <rect width="400" height="500" fill={`url(#${id}-bt)`} />
          <g transform="translate(140 240)">
            <path d="M -50 0 L -65 200 L -5 200 L -10 0 Z" fill={p.figure} />
            <path d="M -45 0 L -30 30 L -25 0 Z" fill={p.glow} opacity="0.9" />
            <circle cx="-30" cy="-40" r="24" fill={p.figure} />
          </g>
          <g transform="translate(250 240)">
            <path d="M 0 0 L 5 200 L 65 200 L 50 0 Z" fill={p.figure} />
            <path d="M 15 0 L 25 30 L 35 0 Z" fill={p.accent} />
            <circle cx="25" cy="-40" r="24" fill={p.figure} />
          </g>
        </g>
      )}

      {variant % 8 === 7 && (
        <g>
          <defs>
            <radialGradient id={`${id}-spark`} cx="50%" cy="40%" r="40%">
              <stop offset="0%" stopColor={p.glow} stopOpacity="0.8" />
              <stop offset="100%" stopColor={p.bg} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="400" height="500" fill={p.bg} />
          <rect width="400" height="500" fill={`url(#${id}-spark)`} />
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r = 60 + (i % 5) * 20;
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * 30}
                y1={200 + Math.sin(a) * 30}
                x2={200 + Math.cos(a) * r}
                y2={200 + Math.sin(a) * r}
                stroke={i % 3 === 0 ? p.glow : p.warm}
                strokeWidth="1"
                opacity={0.4 + (i % 4) * 0.15}
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="200" cy="200" r="20" fill={p.glow} />
          <circle cx="200" cy="200" r="10" fill="#fff" />
          <path d="M 180 220 L 175 380 Q 200 400 225 380 L 220 220 Z" fill={p.figure} />
        </g>
      )}
    </svg>
  );
}

type PhotoStripProps = {
  variants?: number[];
  rotate?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
};

export function PhotoStrip({
  variants = [0, 1, 2, 3],
  rotate = 0,
  scale = 1,
  className,
  style,
}: PhotoStripProps) {
  return (
    <div
      className={className}
      style={{
        background: "#fff",
        padding: "10px 10px 50px",
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.5), 0 8px 20px -8px rgba(0,0,0,0.3)",
        transform: `rotate(${rotate}deg) scale(${scale})`,
        transformOrigin: "center center",
        width: 130,
        position: "relative",
        ...style,
      }}
    >
      {variants.map((v, i) => (
        <div key={`${v}-${i}`} style={{ width: 110, height: 80, marginBottom: 6, overflow: "hidden", background: "#000" }}>
          <PhotoScene variant={v} />
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--eventaj-serif-italic)",
          fontStyle: "italic",
          fontSize: 11,
          color: "#666",
          letterSpacing: "0.04em",
        }}
      >
        eventaj.si
      </div>
    </div>
  );
}
