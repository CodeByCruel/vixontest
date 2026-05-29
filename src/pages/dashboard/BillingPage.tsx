import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const BillingPage = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("invoices").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setInvoices((data as any) || []));
  }, [user]);

  const pending = invoices.filter((i) => i.status === "pending");
  const paid = invoices.filter((i) => i.status === "paid");

  const renderList = (list: any[]) => list.length === 0 ? (
    <p className="text-sm text-muted-foreground text-center py-6">Nothing here</p>
  ) : list.map((i) => (
    <div key={i.id} className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-3">
      <div>
        <p className="text-sm font-medium">{i.invoice_number}</p>
        <p className="text-xs text-muted-foreground">{new Date(i.created_at).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">₹{Number(i.amount_inr).toLocaleString("en-IN")}</p>
        <Badge variant={i.status === "paid" ? "default" : "secondary"} className="mt-1 text-[10px]">{i.status}</Badge>
      </div>
    </div>
  ));

  return (
    <DashboardLayout title="Billing">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending invoices</CardTitle>
            <CardDescription>Awaiting payment / verification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">{renderList(pending)}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Paid invoices</CardTitle>
            <CardDescription>Payment history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">{renderList(paid)}</CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
