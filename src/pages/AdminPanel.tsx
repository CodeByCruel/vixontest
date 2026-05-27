import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogOut, Save, Server, MessageCircle, RefreshCcw, Pencil } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import {
  ADMIN_TOKEN_KEY, ADMIN_TOKEN_VALUE,
  isAdminLoggedIn, callPteroProxy, refreshDiscordInvite
} from "@/lib/vixon";
import { toast } from "@/hooks/use-toast";

interface NodeStatus {
  id: number;
  displayName: string;
  location: string;
  online: boolean;
  maintenance: boolean;
  uptime: Record<string, number>;
}

const AdminPanel = () => {
  const nav = useNavigate();
  const [pteroUrl, setPteroUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [invite, setInvite] = useState("");
  const [nodes, setNodes] = useState<NodeStatus[]>([]);
  const [loadingNodes, setLoadingNodes] = useState(false);
  const [editing, setEditing] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!isAdminLoggedIn()) { nav("/adminpagemeow", { replace: true }); return; }
    (async () => {
      try {
        const cfg = await callPteroProxy<{ pteroUrl: string; apiKey: string; invite: string }>({
          action: "get_config", adminToken: ADMIN_TOKEN_VALUE,
        });
        setPteroUrl(cfg.pteroUrl || "");
        setApiKey(cfg.apiKey || "");
        setInvite(cfg.invite || "");
      } catch (e) { console.error(e); }
    })();
    fetchNodes();
  }, [nav]);

  const fetchNodes = async () => {
    setLoadingNodes(true);
    try {
      const res = await callPteroProxy<{ nodes: NodeStatus[]; error?: string }>({ action: "status" });
      if (res.error) toast({ title: "Node fetch", description: res.error, variant: "destructive" });
      setNodes(res.nodes || []);
    } catch (e) {
      toast({ title: "Error", description: String(e), variant: "destructive" });
    } finally {
      setLoadingNodes(false);
    }
  };

  const saveConfig = async () => {
    try {
      await callPteroProxy({ action: "save_config", adminToken: ADMIN_TOKEN_VALUE, pteroUrl, apiKey });
      toast({ title: "Pterodactyl config saved" });
      fetchNodes();
    } catch (e) { toast({ title: "Error", description: String(e), variant: "destructive" }); }
  };

  const saveInvite = async () => {
    try {
      await callPteroProxy({ action: "save_invite", adminToken: ADMIN_TOKEN_VALUE, invite });
      await refreshDiscordInvite();
      toast({ title: "Discord invite saved (updated everywhere)" });
    } catch (e) { toast({ title: "Error", description: String(e), variant: "destructive" }); }
  };

  const renameNode = async (nodeId: number) => {
    const name = editing[nodeId]?.trim();
    if (!name) return;
    try {
      await callPteroProxy({ action: "rename_node", adminToken: ADMIN_TOKEN_VALUE, nodeId, displayName: name });
      toast({ title: "Node renamed" });
      setEditing((e) => { const c = { ...e }; delete c[nodeId]; return c; });
      fetchNodes();
    } catch (e) { toast({ title: "Error", description: String(e), variant: "destructive" }); }
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
              <Server className="h-4 w-4 text-primary" />
              <p className="font-semibold font-display">VixonCloud Admin</p>
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <Tabs defaultValue="nodes">
            <TabsList className="mb-6">
              <TabsTrigger value="nodes" className="gap-1.5"><Server className="h-3.5 w-3.5" /> Nodes</TabsTrigger>
              <TabsTrigger value="settings" className="gap-1.5"><MessageCircle className="h-3.5 w-3.5" /> Site Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="nodes" className="space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Pterodactyl Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-muted-foreground">Panel URL</Label>
                    <Input value={pteroUrl} onChange={(e) => setPteroUrl(e.target.value)} placeholder="https://panel.example.com" />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Admin API Key</Label>
                    <Input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="ptla_..." />
                    <p className="text-[11px] text-muted-foreground mt-1">Application API key from Pterodactyl → Admin → Application API.</p>
                  </div>
                  <Button onClick={saveConfig} className="gap-1.5 glow-primary"><Save className="h-4 w-4" /> Save</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">Nodes ({nodes.length})</CardTitle>
                  <Button onClick={fetchNodes} size="sm" variant="outline" className="gap-1.5" disabled={loadingNodes}>
                    <RefreshCcw className={`h-3.5 w-3.5 ${loadingNodes ? "animate-spin" : ""}`} /> Refresh
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {nodes.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">No nodes found. Save your Pterodactyl config first.</p>
                  ) : (
                    nodes.map((n) => (
                      <motion.div key={n.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/40 border border-border/30">
                        <div className={`h-2.5 w-2.5 rounded-full ${n.maintenance ? "bg-amber-500" : n.online ? "bg-green-500" : "bg-red-500"}`} />
                        <div className="flex-1 min-w-0">
                          {editing[n.id] !== undefined ? (
                            <div className="flex gap-2">
                              <Input value={editing[n.id]} onChange={(e) => setEditing((s) => ({ ...s, [n.id]: e.target.value }))} className="h-8 text-sm" />
                              <Button size="sm" onClick={() => renameNode(n.id)}>Save</Button>
                              <Button size="sm" variant="ghost" onClick={() => setEditing((e) => { const c = { ...e }; delete c[n.id]; return c; })}>Cancel</Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium truncate">{n.displayName}</p>
                              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setEditing((e) => ({ ...e, [n.id]: n.displayName }))}>
                                <Pencil className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                          <p className="text-[11px] text-muted-foreground truncate">{n.location}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">{n.uptime["30d"]?.toFixed(1) ?? "—"}% / 30d</Badge>
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Discord Invite</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Label className="text-xs text-muted-foreground">Invite URL</Label>
                  <Input value={invite} onChange={(e) => setInvite(e.target.value)} placeholder="https://discord.gg/..." />
                  <p className="text-[11px] text-muted-foreground">Used everywhere on the site (navbar, footer, popups, TOS).</p>
                  <Button onClick={saveInvite} className="gap-1.5 glow-primary"><Save className="h-4 w-4" /> Save</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
