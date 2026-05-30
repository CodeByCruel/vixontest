import { SignUp as ClerkSignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";
import logo from "@/assets/vixon-logo.png";

const SignUp = () => (
  <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
    <AnimatedBackground />
    <div className="relative z-10 w-full max-w-md">
      <Link to="/" className="flex items-center justify-center gap-2 mb-6">
        <img src={logo} alt="" className="h-8 w-8 rounded-lg" />
        <span className="font-bold text-lg font-display">Vixon<span className="gradient-text">Cloud</span></span>
      </Link>
      <ClerkSignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignInUrl="/dashboard"
        afterSignUpUrl="/dashboard"
      />
    </div>
  </div>
);

export default SignUp;
