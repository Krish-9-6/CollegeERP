import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import GraduationCapIcon from "@/components/GraduationCapIcon";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempted");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-border bg-card px-8 py-10 shadow-[0_8px_40px_-12px_hsl(25_80%_42%_/_0.1)]">
          {/* Logo & Title */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-accent">
              <GraduationCapIcon className="h-10 w-10" />
            </div>
            <div className="text-center">
              <h1 className="font-[family-name:var(--font-display)] text-2xl text-foreground">
                Campus Portal
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to your student account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.edu"
                  required
                  className="h-12 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-12 w-full rounded-lg border border-input bg-background pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <button type="button" className="text-xs font-medium text-primary transition-colors hover:text-primary/80">
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="h-12 w-full rounded-lg bg-primary font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:brightness-110 active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Need help? Contact your{" "}
            <span className="font-medium text-primary cursor-pointer hover:underline">
              IT department
            </span>
          </p>
        </div>

        {/* Bottom branding */}
        <p className="mt-6 text-center text-[11px] text-muted-foreground/60">
          © 2026 Campus Portal · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Index;