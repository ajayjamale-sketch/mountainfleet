import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun, Building2, Globe, Bell as BellIcon, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account, workspace and preferences.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <img src={user?.avatar} className="w-16 h-16 rounded-2xl" alt="" />
              <div>
                <div className="font-bold">{user?.name}</div>
                <div className="text-xs text-muted-foreground capitalize">{user?.role} · {user?.company}</div>
              </div>
            </div>
            <Input defaultValue={user?.name} placeholder="Full name" />
            <Input defaultValue={user?.email} placeholder="Email" />
            <Button variant="primary" className="w-full" onClick={() => toast.success("Profile saved")}>Save changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <button onClick={toggle} className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-muted transition">
              <div className="flex items-center gap-3">
                {theme === "light" ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-sky-400" />}
                <span className="font-semibold">{theme === "light" ? "Light mode" : "Dark mode"}</span>
              </div>
              <span className="text-xs text-muted-foreground">Toggle</span>
            </button>
            {[
              { icon: BellIcon, label: "Notifications", desc: "Email + push enabled" },
              { icon: Globe, label: "Language", desc: "English (US)" },
              { icon: Building2, label: "Workspace", desc: user?.company },
              { icon: Shield, label: "Security", desc: "2FA enabled" },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-3 p-3 rounded-xl bg-muted/40">
                <p.icon className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <div className="font-semibold text-sm">{p.label}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Company</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input defaultValue={user?.company} placeholder="Company name" />
            <Input defaultValue="1700 Pearl St, Denver CO" placeholder="Address" />
            <Input defaultValue="+1 720 555 0100" placeholder="Phone" />
            <Input defaultValue="USD" placeholder="Currency" />
            <Button variant="primary" className="w-full" onClick={() => toast.success("Company updated")}>Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
