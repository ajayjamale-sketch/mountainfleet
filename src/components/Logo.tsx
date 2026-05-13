import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "light" | "dark";
}

export function Logo({ className, showText = true, variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-slate-900 dark:text-white";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-sky-700/30">
        <svg viewBox="0 0 32 32" className="w-6 h-6 text-white" fill="none">
          <path d="M3 25 L11 12 L16 19 L22 9 L29 25 Z" fill="currentColor" opacity="0.95" />
          <path d="M3 25 L29 25" stroke="currentColor" strokeWidth="2" />
          <circle cx="9" cy="25" r="2.5" fill="#F97316" />
          <circle cx="23" cy="25" r="2.5" fill="#F97316" />
          <rect x="12" y="20" width="9" height="5" rx="1" fill="white" opacity="0.85" />
        </svg>
      </div>
      {showText && (
        <div className="leading-tight">
          <div className={cn("font-bold text-[17px] tracking-tight", textColor)} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            MountainFleet
          </div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-sky-500 font-semibold">Drive · Track · Deliver</div>
        </div>
      )}
    </div>
  );
}
