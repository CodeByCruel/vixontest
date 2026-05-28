import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Save, MessageCircle, Activity, Shield } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import {
  ADMIN_TOKEN_KEY, isAdminLoggedIn,
  refreshSettings, saveAdminSettings,
} from "@/lib/vixon";
import { toast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const nav = useNavigate();
  const [invite, setInvite] = useState("");
  const [statusUrl, setStatusUrl] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn()) { nav("/adminpagemeow", { replace: true }); return; }
    refreshSettings().then((s) => {
      setInvite(s.discord_invite);
      setStatusUrl(s.status_redirect_url);
    });
  }, [nav]);

  const save = async () => {
    setSaving(true);
    try {
      await saveAdminSettings({ discord_invite: invite, status_redirect_url: statusUrl });
      toast({ title: "Settings saved", description: "Changes are live across the site." });
    } catch (e: any) {
      toast({ title: "Save failed", description: e?.message || String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    nav("/adminpagemeow", { replace: true });
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <header className="border-b border-border/30 backdrop-blur bg-background/60 sticky top-0 z-20">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <p className="font-semibold font-display">VixonCloud Admin</p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-10 max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-primary" /> Discord Invite
              </CardTitle>
              <CardDescription>
                Used everywhere on the site — navbar, footer, order popups, TOS.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label className="text-xs text-muted-foreground">Invite URL</Label>
              <Input
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                placeholder="https://discord.gg/..."
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> Status Page Redirect
              </CardTitle>
              <CardDescription>
                When users open <code className="text-foreground">/status</code>, they get
                redirected here. Leave empty to show a "not configured" message.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label className="text-xs text-muted-foreground">Status URL</Label>
              <Input
                value={statusUrl}
                onChange={(e) => setStatusUrl(e.target.value)}
                placeholder="https://status.vixoncloud.com"
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={save} disabled={saving} className="gap-1.5 glow-primary bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
