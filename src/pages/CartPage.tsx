import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Trash2, Minus, Plus, Tag, ShoppingCart, MessageCircle, Copy } from "lucide-react";
import { useDiscordInvite } from "@/lib/vixon";

interface CartItem {
  id: string;
  plan_id: string | null;
  plan_name: string;
  plan_category: string | null;
  unit_price_inr: number;
  quantity: number;
}

const CartPage = () => {
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const invite = useDiscordInvite();
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState<{ code: string; percent: number } | null>(null);
  const [placing, setPlacing] = useState(false);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("cart_items").select("*").eq("user_id", user.id).order("created_at");
    setItems((data as any) || []);
  };

  useEffect(() => { if (user) load(); }, [user]);

  if (!authLoading && !user) {
    return (
      <>
        <AnimatedBackground />
        <Navbar />
        <main className="min-h-screen pt-32 pb-16 relative z-10 container mx-auto px-4 max-w-md text-center">
          <ShoppingCart className="h-12 w-12 mx-auto text-primary mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Sign in to view your cart</h1>
          <p className="text-muted-foreground mb-6">Your cart is saved to your account.</p>
          <Link to="/sign-in"><Button>Sign in</Button></Link>
        </main>
        <Footer />
      </>
    );
  }

  const updateQty = async (id: string, q: number) => {
    if (q < 1) return;
    await supabase.from("cart_items").update({ quantity: q }).eq("id", id);
    load();
  };
  const remove = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    load();
  };

  const subtotal = items.reduce((s, i) => s + Number(i.unit_price_inr) * i.quantity, 0);
  const discount = applied ? Math.round(subtotal * (applied.percent / 100)) : 0;
  const total = subtotal - discount;

  const applyCoupon = async () => {
    const code = coupon.trim().toUpperCase();
    if (!code) return;
    const { data } = await supabase.from("coupons").select("*").eq("code", code).eq("active", true).maybeSingle();
    if (!data) return toast({ title: "Invalid coupon", variant: "destructive" });
    if (data.expires_at && new Date(data.expires_at) < new Date()) return toast({ title: "Coupon expired", variant: "destructive" });
    if (data.max_uses && data.uses >= data.max_uses) return toast({ title: "Coupon limit reached", variant: "destructive" });
    setApplied({ code: data.code, percent: data.percent_off });
    toast({ title: "Coupon applied", description: `${data.percent_off}% off` });
  };

  const placeOrder = async () => {
    if (!user || items.length === 0) return;
    setPlacing(true);
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        subtotal_inr: subtotal,
        discount_inr: discount,
        total_inr: total,
        coupon_code: applied?.code || null,
      })
      .select()
      .single();
    if (error || !order) { setPlacing(false); return toast({ title: "Order failed", description: error?.message, variant: "destructive" }); }

    const orderItems = items.map((i) => ({
      order_id: order.id, plan_id: i.plan_id, plan_name: i.plan_name, unit_price_inr: i.unit_price_inr, quantity: i.quantity,
    }));
    await supabase.from("order_items").insert(orderItems);

    const invoiceNumber = `INV-${order.order_number.replace("VC-", "")}`;
    await supabase.from("invoices").insert({
      order_id: order.id, user_id: user.id, invoice_number: invoiceNumber, amount_inr: total, status: "pending",
    });

    await supabase.from("cart_items").delete().eq("user_id", user.id);
    await supabase.from("user_activity_logs").insert({ user_id: user.id, action: `Placed order ${order.order_number}` });
    await supabase.from("notifications").insert({
      user_id: user.id, title: `Order ${order.order_number} created`,
      message: `Open a Discord ticket to complete payment. Total ₹${total.toLocaleString("en-IN")}.`, type: "order",
    });

    setPlacing(false);
    toast({ title: "Order placed", description: order.order_number });
    nav("/dashboard/orders");
  };

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main className="min-h-screen pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl md:text-4xl font-bold mb-8">
            Your cart
          </motion.h1>

          {items.length === 0 ? (
            <Card><CardContent className="py-16 text-center">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Link to="/minecraft-plans"><Button>Browse plans</Button></Link>
            </CardContent></Card>
          ) : (
            <div className="grid lg:grid-cols-[1fr_360px] gap-6">
              <div className="space-y-3">
                {items.map((i) => (
                  <Card key={i.id}>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{i.plan_name}</p>
                        {i.plan_category && <Badge variant="secondary" className="text-[10px] mt-1">{i.plan_category}</Badge>}
                        <p className="text-sm text-muted-foreground mt-1">₹{Number(i.unit_price_inr).toLocaleString("en-IN")} each</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQty(i.id, i.quantity - 1)}><Minus className="h-3.5 w-3.5" /></Button>
                        <span className="w-8 text-center text-sm">{i.quantity}</span>
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQty(i.id, i.quantity + 1)}><Plus className="h-3.5 w-3.5" /></Button>
                      </div>
                      <p className="font-semibold w-24 text-right">₹{(Number(i.unit_price_inr) * i.quantity).toLocaleString("en-IN")}</p>
                      <Button size="icon" variant="ghost" onClick={() => remove(i.id)} className="text-destructive h-8 w-8">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="h-fit sticky top-24">
                <CardHeader>
                  <CardTitle className="text-base">Order summary</CardTitle>
                  <CardDescription>Manual payment via Discord</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
                  {applied && <div className="flex justify-between text-sm text-green-400"><span>Discount ({applied.code})</span><span>-₹{discount.toLocaleString("en-IN")}</span></div>}
                  <div className="border-t border-border/40 pt-3 flex justify-between font-semibold">
                    <span>Total</span><span className="font-display text-xl">₹{total.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                      <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="pl-9 h-9" />
                    </div>
                    <Button size="sm" variant="outline" onClick={applyCoupon}>Apply</Button>
                  </div>
                  <Button onClick={placeOrder} disabled={placing} className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
                    <MessageCircle className="h-4 w-4" /> {placing ? "Placing…" : "Place order"}
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">
                    You'll get an order ID. Open a Discord ticket to pay via UPI or other methods — our team verifies manually.
                  </p>
                  <a href={invite} target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" size="sm" className="w-full gap-1.5">
                      <MessageCircle className="h-3.5 w-3.5" /> Join our Discord
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CartPage;
