import { useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);

  const onSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("OTP sent to " + email);
    setStep("otp");
  };

  const onVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length === 4) {
      toast.success("Verified! Reset link emailed.");
      setStep("done");
    } else {
      toast.error("Enter all 4 digits");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md bg-card rounded-3xl border border-border p-8 shadow-2xl">
        <Link to="/" className="inline-block mb-6"><Logo /></Link>
        {step === "email" && (
          <>
            <h1 className="text-2xl font-bold">Forgot password?</h1>
            <p className="text-sm text-muted-foreground mt-1">We'll send you a 4-digit OTP.</p>
            <form onSubmit={onSendOtp} className="mt-6 space-y-3">
              <Input type="email" required placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button type="submit" variant="primary" className="w-full" size="lg">Send OTP</Button>
            </form>
          </>
        )}
        {step === "otp" && (
          <>
            <h1 className="text-2xl font-bold">Enter OTP</h1>
            <p className="text-sm text-muted-foreground mt-1">Sent to {email}</p>
            <form onSubmit={onVerify} className="mt-6 space-y-4">
              <div className="flex gap-3 justify-center">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={v}
                    onChange={(e) => {
                      const arr = [...otp];
                      arr[i] = e.target.value;
                      setOtp(arr);
                      const next = e.target.nextElementSibling as HTMLInputElement | null;
                      if (e.target.value && next) next.focus();
                    }}
                    className="w-14 h-14 text-center text-2xl font-bold rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                ))}
              </div>
              <Button type="submit" variant="primary" className="w-full" size="lg">Verify</Button>
            </form>
          </>
        )}
        {step === "done" && (
          <div className="text-center py-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-3xl">✓</div>
            <h1 className="text-2xl font-bold mt-4">Check your inbox</h1>
            <p className="text-sm text-muted-foreground mt-2">A password reset link has been sent.</p>
            <Link to="/login"><Button variant="primary" className="w-full mt-6">Back to sign in</Button></Link>
          </div>
        )}
      </div>
    </div>
  );
}
