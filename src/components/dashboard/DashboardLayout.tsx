import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Receipt, ShoppingCart, Settings, ShieldCheck, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const nav = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/profile", icon: User, label: "Profile" },
  { to: "/dashboard/orders", icon: Receipt, label: "Orders" },
  { to: "/dashboard/billing", icon: Receipt, label: "Billing" },
  { to: "/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/dashboard/support", icon: MessageSquare, label: "Support" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export const DashboardLayout = ({ children, title }: { children: ReactNode; title: string }) => {
  const loc = useLocation();
  const { isAdmin } = useAuth();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">{title}</h1>
          <div className="grid lg:grid-cols-[240px_1fr] gap-6">
            <aside className="space-y-1">
              {nav.map((n) => {
                const active = loc.pathname === n.to;
                return (
                  <Link key={n.to} to={n.to}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}>
                    <n.icon className="h-4 w-4" /> {n.label}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link to="/adminpagemeow/panel"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 mt-2 border border-primary/30">
                  <ShieldCheck className="h-4 w-4" /> Admin panel
                </Link>
              )}
            </aside>
            <section>{children}</section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
