import Image from "next/image";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

interface LogoProps {
  /** "light" = white text for dark backgrounds (navbar, footer)
   *  "dark"  = navy text for light backgrounds */
  variant?: "light" | "dark";
  /** Height of the mark in px — text scales proportionally */
  markSize?: number;
}

export function Logo({ variant = "light", markSize = 44 }: LogoProps) {
  const nameColor   = variant === "light" ? "text-white"    : "text-navy";
  const tagColor    = variant === "light" ? "text-blue-200" : "text-muted";

  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/logo-mark.svg"
        alt=""
        aria-hidden="true"
        width={markSize}
        height={markSize}
        className="w-auto shrink-0"
        style={{ height: markSize }}
        priority
      />
      <div className="flex flex-col leading-none">
        <span className={`${pacifico.className} ${nameColor} text-[1.35rem] leading-tight`}>
          Annadale
        </span>
        <span className={`${tagColor} text-[0.6rem] font-medium tracking-widest uppercase mt-0.5 whitespace-nowrap`}>
          Family Medical Centre
        </span>
      </div>
    </div>
  );
}
