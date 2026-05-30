import { useEffect, useState } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useNavigate } from "react-router-dom";
import { fetchClerkPublishableKey } from "./bootstrap";
import { ClerkBridge } from "./ClerkBridge";

export const ClerkRoot = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [pk, setPk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetchClerkPublishableKey().then(setPk).catch((e) => setErr(e.message));
  }, []);

  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-destructive font-medium">Auth failed to load</p>
          <p className="text-xs text-muted-foreground mt-1">{err}</p>
        </div>
      </div>
    );
  }
  if (!pk) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <ClerkProvider
      publishableKey={pk}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "hsl(263 70% 60%)",
          colorBackground: "hsl(240 10% 6%)",
          colorInputBackground: "hsl(240 6% 12%)",
          colorText: "hsl(0 0% 98%)",
          borderRadius: "0.75rem",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        },
        elements: {
          card: "bg-card/80 backdrop-blur border border-border/50 shadow-2xl",
          headerTitle: "font-display",
        },
      }}
    >
      <ClerkBridge>{children}</ClerkBridge>
    </ClerkProvider>
  );
};
