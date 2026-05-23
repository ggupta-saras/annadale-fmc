// Annadale FMC logo — official family-figure mark + Lobster wordmark
// (Lobster matches the font used in the brand logo).

import Image from "next/image";

interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 56, className = "" }: LogoMarkProps) {
  // mark aspect ratio from the supplied PNG (≈ 1.293)
  const width = Math.round(size * 1.293);
  return (
    <Image
      src="/logo-mark-transparent.png"
      alt=""
      aria-hidden="true"
      width={width}
      height={size}
      className={className}
      style={{ height: size, width: "auto", display: "block" }}
      priority
    />
  );
}

interface LogoProps {
  /** "dark" = for light backgrounds (charcoal text);
   *  "light" = for dark backgrounds (white text) */
  variant?: "dark" | "light";
  markSize?: number;
  layout?: "horizontal" | "stacked";
}

export function Logo({ variant = "dark", markSize = 42, layout = "horizontal" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-charcoal";
  const subColor  = variant === "light" ? "text-white/75" : "text-charcoal/75";

  if (layout === "stacked") {
    return (
      <div className="flex flex-col items-center gap-3">
        <LogoMark size={markSize * 1.7} />
        <div className="flex flex-col items-center leading-none">
          <span
            className={`font-brand ${textColor}`}
            style={{ fontSize: markSize * 1.05, lineHeight: 1, letterSpacing: "0.005em" }}
          >
            Annadale
          </span>
          <span
            className={`font-semibold tracking-wide mt-1 ${subColor}`}
            style={{ fontSize: markSize * 0.32 }}
          >
            family medical centre
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5">
      <LogoMark size={markSize} />
      <div className="flex flex-col leading-none">
        <span
          className={`font-brand ${textColor}`}
          style={{ fontSize: markSize * 0.72, lineHeight: 0.92, letterSpacing: "0.005em" }}
        >
          Annadale
        </span>
        <span
          className={`font-semibold tracking-[0.01em] mt-1 ${subColor}`}
          style={{ fontSize: markSize * 0.22 }}
        >
          family medical centre
        </span>
      </div>
    </div>
  );
}
