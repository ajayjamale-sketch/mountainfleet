import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

export function Stats() {
  const stats = [
    { value: 12400, label: "Vehicles managed", suffix: "+" },
    { value: 98, label: "Customer satisfaction", suffix: "%" },
    { value: 184, label: "Cities covered", suffix: "" },
    { value: 32, label: "Million miles tracked", suffix: "M" },
  ];
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/40 border-y border-border">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gradient" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
