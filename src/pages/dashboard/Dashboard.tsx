import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Receipt, ShoppingCart, Bell, Activity, ArrowRight, User as UserIcon } from "lucide-react";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [pendingInvoices, setPendingInvoices] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [unread, setUnread] = useState(0);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [o, inv, c, n, a] = await Promise.all([
        supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("invoices").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("status", "pending"),
        supabase.from("cart_items").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        supabase.from("notifications").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("read", false),
        supabase.from("user_activity_logs").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ]);
      setOrders((o.data as any) || []);
      setPendingInvoices(inv.count || 0);
      setCartCount(c.count || 0);
      setUnread(n.count || 0);
      setActivity((a.data as any) || []);
    })();
  }, [user]);

  const completion = (() => {
    if (!profile) return 0;
    const fields = ["full_name", "username", "phone", "address", "city", "country", "postal_code", "avatar_url"];
    const done = fields.filter((f) => (profile as any)[f]).length;
    return Math.round((done / fields.length) * 100);
  })();

  const active = orders.filter((o) => o.status === "active").length;

  const statColor: Record<string, string> = {
    pending: "bg-yellow-500/15 text-yellow-400",
    awaiting_verification: "bg-blue-500/15 text-blue-400",
    paid: "bg-green-500/15 text-green-400",
    active: "bg-emerald-500/15 text-emerald-400",
    suspended: "bg-orange-500/15 text-orange-400",
    cancelled: "bg-red-500/15 text-red-400",
  };

  return (
    <DashboardLayout title={`Welcome, ${profile?.full_name?.split(" ")[0] || "there"}`}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: Activity, label: "Active services", value: active, to: "/dashboard/orders" },
          { icon: Receipt, label: "Pending invoices", value: pendingInvoices, to: "/dashboard/billing" },
          { icon: ShoppingCart, label: "In cart", value: cartCount, to: "/cart" },
          { icon: Bell, label: "Unread", value: unread, to: "/dashboard" },
        ].map((s) => (
          <Link key={s.label} to={s.to}>
            <Card className="hover:border-primary/40 transition-colors cursor-pointer">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold font-display mt-1">{s.value}</p>
                </div>
                <s.icon className="h-7 w-7 text-primary opacity-70" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base">Recent orders</CardTitle>
              <CardDescription>Your latest hosting orders</CardDescription>
            </div>
            <Link to="/dashboard/orders"><Button variant="ghost" size="sm" className="gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No orders yet. <Link to="/minecraft-plans" className="text-primary hover:underline">Browse plans</Link></p>
            ) : orders.map((o) => (
              <div key={o.id} className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{o.order_number}</p>
                  <p className="text-xs text-muted-foreground">₹{Number(o.total_inr).toLocaleString("en-IN")} · {new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <Badge className={statColor[o.status] || "bg-muted"}>{o.status.replace("_", " ")}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><UserIcon className="h-4 w-4 text-primary" /> Profile</CardTitle>
            <CardDescription>{completion}% complete</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Progress value={completion} className="h-2" />
            <Link to="/dashboard/profile">
              <Button variant="outline" size="sm" className="w-full">Complete profile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Recent activity</CardTitle></CardHeader>
        <CardContent>
          {activity.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-6">No activity yet</p>
          ) : (
            <ul className="space-y-2">
              {activity.map((a) => (
                <li key={a.id} className="flex items-center justify-between text-sm border-b border-border/30 pb-2 last:border-0">
                  <span>{a.action}</span>
                  <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Dashboard;
