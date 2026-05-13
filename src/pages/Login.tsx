import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { demoAccounts } from "@/lib/mockData";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email, pwd);
    setLoading(false);
    if (res.ok) {
      toast.success(`Welcome back, ${res.user?.name}!`);
      navigate("/app");
    } else {
      toast.error(res.message || "Login failed");
    }
  };

  const fillDemo = (e: string, p: string) => {
    setEmail(e);
    setPwd(p);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col p-12 gradient-hero text-white relative overflow-hidden">
        <Link to="/"><Logo variant="light" /></Link>
        <div className="my-auto">
          <h2 className="text-4xl font-bold tracking-tight">Welcome back, operator.</h2>
          <p className="mt-3 text-slate-300 max-w-md">Sign in to dispatch trips, monitor fleets, and keep the wheels turning.</p>
          <div className="mt-8 glass-dark rounded-2xl p-5 border border-white/10 max-w-md">
            <div className="text-xs uppercase text-slate-400 tracking-wider mb-2">Try demo accounts</div>
            <div className="space-y-2">
              {demoAccounts.map((a) => (
                <button key={a.email} type="button" onClick={() => fillDemo(a.email, a.password)} className="w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
                  <div className="text-sm font-semibold capitalize">{a.user.role}</div>
                  <div className="text-xs text-slate-400">{a.email} · {a.password}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-500">© MountainFleet · All systems operational</div>
      </div>
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Link to="/" className="lg:hidden inline-block mb-8"><Logo /></Link>
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-muted-foreground">Don't have an account? <Link to="/signup" className="text-primary font-semibold">Sign up free</Link></p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-sm font-semibold">Email</label>
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="mt-1.5" />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold">Password</label>
                <Link to="/forgot" className="text-xs text-primary">Forgot?</Link>
              </div>
              <Input type="password" required value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••••" className="mt-1.5" />
            </div>
            <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-6 text-center">Protected by enterprise-grade JWT auth (mocked for demo).</p>
        </motion.div>
      </div>
    </div>
  );
}
