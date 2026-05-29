import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Copy, ExternalLink, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDiscordInvite } from "@/lib/vixon";

const statColor: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-400",
  awaiting_verification: "bg-blue-500/15 text-blue-400",
  paid: "bg-green-500/15 text-green-400",
  active: "bg-emerald-500/15 text-emerald-400",
  suspended: "bg-orange-500/15 text-orange-400",
  cancelled: "bg-red-500/15 text-red-400",
};

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const invite = useDiscordInvite();

  useEffect(() => {
    if (!user) return;
    supabase.from("orders").select("*, order_items(*)").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setOrders((data as any) || []));
  }, [user]);

  const copy = (num: string) => {
    navigator.clipboard.writeText(num);
    toast({ title: "Copied", description: num });
  };

  return (
    <DashboardLayout title="Orders">
      {orders.length === 0 ? (
        <Card><CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">You don't have any orders yet.</p>
          <Link to="/minecraft-plans"><Button>Browse plans</Button></Link>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Card key={o.id}>
              <CardHeader className="flex flex-row items-start justify-between gap-3">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {o.order_number}
                    <Badge className={statColor[o.status]}>{o.status.replace("_", " ")}</Badge>
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">Placed {new Date(o.created_at).toLocaleString()}</p>
                </div>
                <p className="font-display text-xl font-bold">₹{Number(o.total_inr).toLocaleString("en-IN")}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  {o.order_items?.map((it: any) => (
                    <div key={it.id} className="flex justify-between text-sm">
                      <span>{it.plan_name} × {it.quantity}</span>
                      <span className="text-muted-foreground">₹{(Number(it.unit_price_inr) * it.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
                {(o.status === "pending" || o.status === "awaiting_verification") && (
                  <div className="rounded-lg bg-primary/5 border border-primary/20 p-3 text-sm space-y-2">
                    <p className="font-medium">Discord payment instructions</p>
                    <p className="text-xs text-muted-foreground">
                      Open a ticket in our Discord, paste your order ID, and our team will share UPI / payment options for manual verification.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => copy(o.order_number)} className="gap-1.5">
                        <Copy className="h-3.5 w-3.5" /> Copy order ID
                      </Button>
                      <a href={invite} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
                          <MessageCircle className="h-3.5 w-3.5" /> Open Discord ticket <ExternalLink className="h-3 w-3" />
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default OrdersPage;
