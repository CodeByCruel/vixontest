import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Plus, MessageSquare } from "lucide-react";
import { z } from "zod";

const schema = z.object({
  subject: z.string().trim().min(3).max(120),
  message: z.string().trim().min(5).max(2000),
});

const SupportPage = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const load = () => { if (user) supabase.from("support_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).then(({ data }) => setTickets((data as any) || [])); };
  useEffect(load, [user]);

  const submit = async () => {
    const v = schema.safeParse({ subject, message });
    if (!v.success) return toast({ title: v.error.issues[0].message, variant: "destructive" });
    if (!user) return;
    const { error } = await supabase.from("support_tickets").insert({ user_id: user.id, subject: v.data.subject, message: v.data.message });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Ticket sent" });
    setSubject(""); setMessage(""); setOpen(false); load();
  };

  return (
    <DashboardLayout title="Support">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base flex items-center gap-2"><MessageSquare className="h-4 w-4 text-primary" /> Your tickets</CardTitle>
            <CardDescription>For everything else, open a Discord ticket — replies are faster.</CardDescription>
          </div>
          <Button size="sm" onClick={() => setOpen((o) => !o)} className="gap-1.5"><Plus className="h-3.5 w-3.5" /> New ticket</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {open && (
            <div className="rounded-lg border border-border/40 p-3 space-y-2 bg-secondary/30">
              <div><Label className="text-xs">Subject</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
              <div><Label className="text-xs">Message</Label><Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} /></div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
                <Button size="sm" onClick={submit}>Send</Button>
              </div>
            </div>
          )}
          {tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No tickets yet</p>
          ) : tickets.map((t) => (
            <div key={t.id} className="rounded-lg bg-secondary/40 p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium">{t.subject}</p>
                <Badge variant="secondary" className="text-[10px]">{t.status}</Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{t.message}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{new Date(t.created_at).toLocaleString()}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default SupportPage;
