import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import { ShieldCheck, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/vixon-logo.png";

const AdminLogin = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) nav("/adminpagemeow/panel", { replace: true });
  }, [loading, user, isAdmin, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    // auth listener will run; isAdmin will redirect when role loads
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <AnimatedBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-lg font-display">Vixon<span className="gradient-text">Cloud</span></span>
        </div>
        <Card className="border-border/50 backdrop-blur bg-card/70">
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Admin access</CardTitle>
            <CardDescription>Sign in with your admin account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-3">
              <div className="space-y-1.5">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" disabled={busy} className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Lock className="h-4 w-4" /> {busy ? "Signing in…" : "Sign in"}
              </Button>
              {user && !isAdmin && (
                <p className="text-xs text-destructive text-center">This account doesn't have admin access.</p>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
