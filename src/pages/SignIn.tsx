import { SignIn as ClerkSignIn } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import logo from "@/assets/vixon-logo.png";

const SignIn = () => {
  const location = useLocation();
  const from = (location.state as { from?: Location } | null)?.from?.pathname || "/dashboard";

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-bold text-lg font-display">Vixon<span className="gradient-text">Cloud</span></span>
        </Link>
        <ClerkSignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl={from}
          fallbackRedirectUrl="/dashboard"
          signUpForceRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default SignIn;
