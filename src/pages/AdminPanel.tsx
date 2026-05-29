import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { LogOut, Save, MessageCircle, Activity, Shield, Users, Receipt, Ticket as TicketIcon, Bell, Tag, Package, Settings as Cog, Ban, Trash2 } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { refreshSettings, saveAdminSettings } from "@/lib/vixon";
import { toast } from "@/hooks/use-toast";

const ORDER_STATUSES = ["pending", "awaiting_verification", "paid", "active", "suspended", "cancelled"];

const AdminPanel = () => {
  const nav = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) nav("/adminpagemeow", { replace: true });
  }, [loading, user, isAdmin, nav]);

  if (loading || !user || !isAdmin) {
    return <div className="min-h-screen flex items-center justify-center"><div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="border-b border-border/30 backdrop-blur bg-background/60 sticky top-0 z-20">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /><p className="font-semibold font-display">VixonCloud Admin</p></div>
            <Button variant="ghost" size="sm" onClick={async () => { await signOut(); nav("/adminpagemeow"); }} className="gap-1.5"><LogOut className="h-4 w-4" /> Sign out</Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-7xl">
          <Tabs defaultValue="users">
            <TabsList className="flex-wrap h-auto">
              <TabsTrigger value="users"><Users className="h-3.5 w-3.5 mr-1.5" />Users</TabsTrigger>
              <TabsTrigger value="orders"><Receipt className="h-3.5 w-3.5 mr-1.5" />Orders</TabsTrigger>
              <TabsTrigger value="plans"><Package className="h-3.5 w-3.5 mr-1.5" />Plans</TabsTrigger>
              <TabsTrigger value="coupons"><Tag className="h-3.5 w-3.5 mr-1.5" />Coupons</TabsTrigger>
              <TabsTrigger value="invoices"><Receipt className="h-3.5 w-3.5 mr-1.5" />Invoices</TabsTrigger>
              <TabsTrigger value="tickets"><TicketIcon className="h-3.5 w-3.5 mr-1.5" />Tickets</TabsTrigger>
              <TabsTrigger value="notifications"><Bell className="h-3.5 w-3.5 mr-1.5" />Notify</TabsTrigger>
              <TabsTrigger value="settings"><Cog className="h-3.5 w-3.5 mr-1.5" />Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-4"><UsersTab /></TabsContent>
            <TabsContent value="orders" className="mt-4"><OrdersTab /></TabsContent>
            <TabsContent value="plans" className="mt-4"><PlansTab /></TabsContent>
            <TabsContent value="coupons" className="mt-4"><CouponsTab /></TabsContent>
            <TabsContent value="invoices" className="mt-4"><InvoicesTab /></TabsContent>
            <TabsContent value="tickets" className="mt-4"><TicketsTab /></TabsContent>
            <TabsContent value="notifications" className="mt-4"><NotificationsTab /></TabsContent>
            <TabsContent value="settings" className="mt-4"><SettingsTab /></TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

// ============ USERS ============
const UsersTab = () => {
  const [users, setUsers] = useState<any[]>([]);
  const load = () => supabase.from("profiles").select("*").order("created_at", { ascending: false }).then(({ data }) => setUsers((data as any) || []));
  useEffect(() => { load(); }, []);

  const setStatus = async (user_id: string, status: "active" | "suspended" | "banned") => {
    await supabase.from("profiles").update({ status }).eq("user_id", user_id);
    if (status !== "active") await supabase.from("user_suspensions").insert({ user_id, type: status });
    toast({ title: `User ${status}` });
    load();
  };

  const remove = async (user_id: string) => {
    if (!confirm("Delete this user's profile? (Auth account remains; use admin tools to delete fully.)")) return;
    await supabase.from("profiles").delete().eq("user_id", user_id);
    toast({ title: "Profile deleted" });
    load();
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">All users ({users.length})</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead><TableHead>Username</TableHead><TableHead>Email</TableHead>
              <TableHead>Phone</TableHead><TableHead>Location</TableHead><TableHead>Joined</TableHead>
              <TableHead>Status</TableHead><TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.full_name || "—"}</TableCell>
                <TableCell>{u.username || "—"}</TableCell>
                <TableCell className="text-xs">{u.email || "—"}</TableCell>
                <TableCell>{u.phone || "—"}</TableCell>
                <TableCell className="text-xs">{[u.city, u.country].filter(Boolean).join(", ") || "—"}</TableCell>
                <TableCell className="text-xs">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                <TableCell><Badge variant={u.status === "active" ? "default" : "destructive"} className="text-[10px]">{u.status}</Badge></TableCell>
                <TableCell>
                  <div className="flex gap-1 justify-end">
                    {u.status !== "suspended" && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setStatus(u.user_id, "suspended")} title="Suspend"><Ban className="h-3.5 w-3.5 text-orange-400" /></Button>}
                    {u.status !== "banned" && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setStatus(u.user_id, "banned")} title="Ban"><Ban className="h-3.5 w-3.5 text-red-500" /></Button>}
                    {u.status !== "active" && <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setStatus(u.user_id, "active")} title="Reactivate"><Shield className="h-3.5 w-3.5 text-green-400" /></Button>}
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => remove(u.user_id)} title="Delete"><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// ============ ORDERS ============
const OrdersTab = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const load = () => supabase.from("orders").select("*, profiles(full_name, email)").order("created_at", { ascending: false }).then(({ data }) => setOrders((data as any) || []));
  useEffect(() => { load(); }, []);

  const updateStatus = async (order: any, status: string) => {
    await supabase.from("orders").update({ status: status as any }).eq("id", order.id);
    if (status === "paid") await supabase.from("invoices").update({ status: "paid", paid_at: new Date().toISOString() }).eq("order_id", order.id);
    await supabase.from("notifications").insert({
      user_id: order.user_id, title: `Order ${order.order_number} → ${status}`,
      message: `Your order is now "${status.replace("_", " ")}".`, type: "order",
    });
    toast({ title: "Updated" });
    load();
  };

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Orders ({orders.length})</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Order</TableHead><TableHead>User</TableHead><TableHead>Total</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">{o.order_number}</TableCell>
                <TableCell className="text-xs">{o.profiles?.full_name || o.profiles?.email || o.user_id.slice(0, 8)}</TableCell>
                <TableCell>₹{Number(o.total_inr).toLocaleString("en-IN")}</TableCell>
                <TableCell className="text-xs">{new Date(o.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Select value={o.status} onValueChange={(v) => updateStatus(o, v)}>
                    <SelectTrigger className="h-7 w-40 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>{ORDER_STATUSES.map((s) => <SelectItem key={s} value={s}>{s.replace("_", " ")}</SelectItem>)}</SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// ============ PLANS ============
const PlansTab = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({ category: "minecraft", name: "", description: "", price_inr: 0 });
  const load = () => supabase.from("plans").select("*").order("category").order("sort_order").then(({ data }) => setPlans((data as any) || []));
  useEffect(() => { load(); }, []);

  const create = async () => {
    if (!form.name) return;
    await supabase.from("plans").insert(form);
    setForm({ category: "minecraft", name: "", description: "", price_inr: 0 }); load();
  };
  const toggle = async (p: any) => { await supabase.from("plans").update({ active: !p.active }).eq("id", p.id); load(); };
  const del = async (id: string) => { await supabase.from("plans").delete().eq("id", id); load(); };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Add a plan</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-5 gap-2">
          <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input type="number" placeholder="Price ₹" value={form.price_inr} onChange={(e) => setForm({ ...form, price_inr: Number(e.target.value) })} />
          <Button onClick={create}>Add</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Plans ({plans.length})</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader><TableRow><TableHead>Category</TableHead><TableHead>Name</TableHead><TableHead>Price</TableHead><TableHead>Active</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {plans.map((p) => (
                <TableRow key={p.id}>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{p.category}</Badge></TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>₹{Number(p.price_inr).toLocaleString("en-IN")}</TableCell>
                  <TableCell><Badge variant={p.active ? "default" : "secondary"} className="cursor-pointer" onClick={() => toggle(p)}>{p.active ? "on" : "off"}</Badge></TableCell>
                  <TableCell><Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => del(p.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// ============ COUPONS ============
const CouponsTab = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [form, setForm] = useState({ code: "", percent_off: 10 });
  const load = () => supabase.from("coupons").select("*").order("created_at", { ascending: false }).then(({ data }) => setCoupons((data as any) || []));
  useEffect(() => { load(); }, []);
  const create = async () => {
    if (!form.code) return;
    const { error } = await supabase.from("coupons").insert({ code: form.code.toUpperCase(), percent_off: form.percent_off });
    if (error) return toast({ title: error.message, variant: "destructive" });
    setForm({ code: "", percent_off: 10 }); load();
  };
  const toggle = async (c: any) => { await supabase.from("coupons").update({ active: !c.active }).eq("id", c.id); load(); };
  const del = async (id: string) => { await supabase.from("coupons").delete().eq("id", id); load(); };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader><CardTitle className="text-base">Add a coupon</CardTitle></CardHeader>
        <CardContent className="flex gap-2 flex-wrap">
          <Input placeholder="CODE" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="max-w-xs uppercase" />
          <Input type="number" min={1} max={100} value={form.percent_off} onChange={(e) => setForm({ ...form, percent_off: Number(e.target.value) })} className="max-w-[100px]" />
          <span className="text-xs text-muted-foreground self-center">% off</span>
          <Button onClick={create}>Add</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Coupons ({coupons.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Code</TableHead><TableHead>% Off</TableHead><TableHead>Uses</TableHead><TableHead>Active</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{coupons.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono">{c.code}</TableCell>
                <TableCell>{c.percent_off}%</TableCell>
                <TableCell>{c.uses}{c.max_uses ? `/${c.max_uses}` : ""}</TableCell>
                <TableCell><Badge variant={c.active ? "default" : "secondary"} className="cursor-pointer" onClick={() => toggle(c)}>{c.active ? "on" : "off"}</Badge></TableCell>
                <TableCell><Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => del(c.id)}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// ============ INVOICES ============
const InvoicesTab = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => { supabase.from("invoices").select("*, profiles(full_name, email)").order("created_at", { ascending: false }).then(({ data }) => setList((data as any) || [])); }, []);
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Invoices ({list.length})</CardTitle></CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Number</TableHead><TableHead>User</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead></TableRow></TableHeader>
          <TableBody>{list.map((i) => (
            <TableRow key={i.id}>
              <TableCell className="font-mono text-xs">{i.invoice_number}</TableCell>
              <TableCell className="text-xs">{i.profiles?.full_name || i.profiles?.email || "—"}</TableCell>
              <TableCell>₹{Number(i.amount_inr).toLocaleString("en-IN")}</TableCell>
              <TableCell><Badge variant={i.status === "paid" ? "default" : "secondary"} className="text-[10px]">{i.status}</Badge></TableCell>
              <TableCell className="text-xs">{new Date(i.created_at).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// ============ TICKETS ============
const TicketsTab = () => {
  const [list, setList] = useState<any[]>([]);
  const load = () => supabase.from("support_tickets").select("*, profiles(full_name, email)").order("created_at", { ascending: false }).then(({ data }) => setList((data as any) || []));
  useEffect(() => { load(); }, []);
  const setStatus = async (id: string, status: string) => { await supabase.from("support_tickets").update({ status }).eq("id", id); load(); };

  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Support tickets ({list.length})</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {list.map((t) => (
          <div key={t.id} className="rounded-lg bg-secondary/40 p-3">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div>
                <p className="text-sm font-medium">{t.subject}</p>
                <p className="text-xs text-muted-foreground">{t.profiles?.full_name || t.profiles?.email} · {new Date(t.created_at).toLocaleString()}</p>
              </div>
              <Select value={t.status} onValueChange={(v) => setStatus(t.id, v)}>
                <SelectTrigger className="h-7 w-32 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{["open", "in_progress", "resolved", "closed"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <p className="text-sm">{t.message}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// ============ NOTIFICATIONS ============
const NotificationsTab = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const send = async () => {
    if (!title || !message) return;
    const { error } = await supabase.from("notifications").insert({ title, message, type: "announcement", user_id: null });
    if (error) return toast({ title: error.message, variant: "destructive" });
    setTitle(""); setMessage("");
    toast({ title: "Broadcast sent" });
  };
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">Send broadcast notification</CardTitle><CardDescription>All users will receive this</CardDescription></CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
        <Button onClick={send} className="gap-2"><Bell className="h-4 w-4" /> Broadcast</Button>
      </CardContent>
    </Card>
  );
};

// ============ SETTINGS ============
const SettingsTab = () => {
  const [invite, setInvite] = useState("");
  const [statusUrl, setStatusUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { refreshSettings().then((s) => { setInvite(s.discord_invite); setStatusUrl(s.status_redirect_url); }); }, []);
  const save = async () => {
    setSaving(true);
    try { await saveAdminSettings({ discord_invite: invite, status_redirect_url: statusUrl }); toast({ title: "Settings saved" }); }
    catch (e: any) { toast({ title: "Save failed", description: e?.message, variant: "destructive" }); }
    finally { setSaving(false); }
  };
  return (
    <div className="space-y-4 max-w-2xl">
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><MessageCircle className="h-4 w-4 text-primary" /> Discord invite</CardTitle><CardDescription>Used across the site</CardDescription></CardHeader>
        <CardContent><Label className="text-xs">Invite URL</Label><Input value={invite} onChange={(e) => setInvite(e.target.value)} /></CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Activity className="h-4 w-4 text-primary" /> Status page redirect</CardTitle><CardDescription>/status redirects here</CardDescription></CardHeader>
        <CardContent><Label className="text-xs">Status URL</Label><Input value={statusUrl} onChange={(e) => setStatusUrl(e.target.value)} /></CardContent>
      </Card>
      <Button onClick={save} disabled={saving} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"><Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}</Button>
    </div>
  );
};

export default AdminPanel;
