import { useEffect } from "react";
import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import AnimatedBackground from "@/components/AnimatedBackground";
import logo from "@/assets/vixon-logo.png";

const AdminLogin = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && isAdmin) nav("/adminpagemeow/panel", { replace: true });
  }, [loading, user, isAdmin, nav]);

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      <AnimatedBackground />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-lg font-display">Vixon<span className="gradient-text">Cloud</span></span>
        </Link>
        <ClerkSignIn
          routing="path"
          path="/adminpagemeow"
          signUpUrl="/sign-up"
          forceRedirectUrl="/adminpagemeow/panel"
          fallbackRedirectUrl="/adminpagemeow/panel"
          signUpForceRedirectUrl="/adminpagemeow/panel"
        />
        {user && !isAdmin && (
          <p className="mt-4 text-xs text-destructive text-center">This account doesn't have admin access.</p>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
