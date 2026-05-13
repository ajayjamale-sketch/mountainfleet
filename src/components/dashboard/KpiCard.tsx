import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  trend?: number;
  icon: LucideIcon;
  color?: "primary" | "accent" | "emerald" | "violet";
}

const colorMap = {
  primary: "from-sky-500 to-blue-600",
  accent: "from-orange-500 to-rose-500",
  emerald: "from-emerald-500 to-teal-600",
  violet: "from-violet-500 to-fuchsia-600",
};

export function KpiCard({ label, value, trend, icon: Icon, color = "primary" }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden bg-card border border-border rounded-2xl p-5 group hover:shadow-xl hover:border-primary/20 transition">
      <div className={cn("absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br opacity-10 group-hover:opacity-20 transition blur-2xl", colorMap[color])} />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">{label}</div>
          <div className="text-3xl font-bold mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
        </div>
        <div className={cn("w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg", colorMap[color])}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      {trend !== undefined && (
        <div className={cn("inline-flex items-center gap-1 mt-3 text-xs font-semibold px-2 py-0.5 rounded-full", trend >= 0 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300")}>
          {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(trend)}% vs last week
        </div>
      )}
    </motion.div>
  );
}
