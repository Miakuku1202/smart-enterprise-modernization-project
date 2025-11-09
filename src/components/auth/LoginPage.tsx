import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Zap, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { users } from "../../data/mockData";
import { motion } from "motion/react";

interface LoginPageProps {
  onLogin: (email: string, role: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check credentials
    const user = Object.values(users).find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      onLogin(email, user.role);
      
      // Navigate to appropriate dashboard
      const roleRoutes: Record<string, string> = {
        "Executive": "/dashboard/executive",
        "Factory Manager": "/dashboard/factory",
        "Supply Chain Manager": "/dashboard/supply-chain",
        "IT/DevOps Engineer": "/dashboard/it-devops",
        "AI Engineer": "/dashboard/ai-engineer",
        "Partner/Supplier": "/dashboard/partner",
        "Customer Support": "/dashboard/support"
      };
      
      navigate(roleRoutes[user.role]);
    } else {
      setError("Invalid email or password");
    }
  };

  const quickLogin = (userKey: keyof typeof users) => {
    const user = users[userKey];
    setEmail(user.email);
    setPassword(user.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-6xl relative"
      >
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700">
            <Link to="/" className="flex items-center gap-2 mb-12">
              <ArrowLeft className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
              <span className="text-slate-400 hover:text-white transition-colors">Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl text-white">Smart Enterprise</h1>
                <p className="text-slate-400">Automotive Digital Transformation</p>
              </div>
            </div>

            <h2 className="text-4xl text-white mb-6">
              Welcome Back to the Future of Automotive
            </h2>
            
            <p className="text-lg text-slate-300 mb-8">
              Access your role-based dashboard and manage your enterprise operations with 
              AI-powered insights and real-time analytics.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>Zero Downtime Operations</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>Real-time Analytics Dashboard</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>AI-Powered Predictions</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 lg:p-12">
            <div className="lg:hidden mb-8">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <ArrowLeft className="w-5 h-5 text-slate-400" />
                <span className="text-slate-400">Back to Home</span>
              </Link>
              <h2 className="text-3xl text-white mb-2">Sign In</h2>
              <p className="text-slate-400">Access your dashboard</p>
            </div>

            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl text-white mb-2">Sign In</h2>
              <p className="text-slate-400">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="pl-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-11 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-slate-400 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-700 bg-slate-900 text-teal-500 focus:ring-teal-500" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-teal-400 hover:text-teal-300">
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
                size="lg"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="text-slate-400 text-sm mb-4">Quick Login (Demo):</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "executive" as const, label: "Executive" },
                  { key: "factory" as const, label: "Factory Mgr" },
                  { key: "supply" as const, label: "Supply Chain" },
                  { key: "it" as const, label: "IT/DevOps" },
                  { key: "ai" as const, label: "AI Engineer" },
                  { key: "partner" as const, label: "Partner" },
                  { key: "support" as const, label: "Support" }
                ].map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => quickLogin(role.key)}
                    className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-300 text-sm transition-colors"
                  >
                    {role.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-4">
                All demo accounts use password: <code className="text-teal-400">demo123</code>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
