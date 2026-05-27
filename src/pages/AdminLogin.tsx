import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import {
  ADMIN_TOKEN_KEY, ADMIN_TOKEN_VALUE,
  HARDCODED_ADMIN_USER, HARDCODED_ADMIN_PASS, isAdminLoggedIn
} from "@/lib/vixon";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (isAdminLoggedIn()) nav("/adminpagemeow/panel", { replace: true });
  }, [nav]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (username.trim() === HARDCODED_ADMIN_USER && password === HARDCODED_ADMIN_PASS) {
      localStorage.setItem(ADMIN_TOKEN_KEY, ADMIN_TOKEN_VALUE);
      nav("/adminpagemeow/panel", { replace: true });
    } else {
      toast({ title: "Invalid credentials", variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <AnimatedBackground />
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm space-y-4 relative z-10 glass p-7 rounded-2xl"
      >
        <div className="text-center mb-2">
          <div className="inline-flex rounded-full bg-primary/10 p-3 mb-3 glow-primary">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-bold font-display">Admin <span className="gradient-text">Sign In</span></h1>
          <p className="text-xs text-muted-foreground mt-1">VixonCloud control panel</p>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Username</Label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={username} onChange={(e) => setUsername(e.target.value)} className="pl-10" placeholder="vixonadmin" autoFocus />
          </div>
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Password</Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full glow-primary bg-primary text-primary-foreground hover:bg-primary/90">
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </motion.form>
    </div>
  );
};

export default AdminLogin;
