import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { Role } from "@/lib/mockData";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", role: "manager" as Role });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signup(form);
    setLoading(false);
    if (res.ok) {
      toast.success("Welcome to MountainFleet!");
      navigate("/app");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-card rounded-3xl border border-border p-8 shadow-2xl">
        <Link to="/" className="inline-block mb-6"><Logo /></Link>
        <h1 className="text-2xl font-bold tracking-tight">Create your workspace</h1>
        <p className="text-sm text-muted-foreground mt-1">14-day free trial · No credit card</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <Input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input required type="email" placeholder="Work email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input required placeholder="Company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <Input required type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <div>
            <div className="text-xs font-semibold mb-1.5 uppercase tracking-wider text-muted-foreground">Your role</div>
            <div className="grid grid-cols-2 gap-2">
              {(["admin", "manager", "driver", "customer"] as Role[]).map((r) => (
                <button type="button" key={r} onClick={() => setForm({ ...form, role: r })}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition capitalize ${form.role === r ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
        </form>
        <p className="mt-5 text-xs text-muted-foreground text-center">Already have one? <Link to="/login" className="text-primary font-semibold">Sign in</Link></p>
      </div>
    </div>
  );
}
