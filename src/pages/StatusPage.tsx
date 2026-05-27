import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, CheckCircle2, AlertCircle, RefreshCcw, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { callPteroProxy } from "@/lib/vixon";

interface NodeStatus {
  id: number;
  displayName: string;
  location: string;
  online: boolean;
  maintenance: boolean;
  uptime: Record<string, number>;
}

const StatusPage = () => {
  const [nodes, setNodes] = useState<NodeStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await callPteroProxy<{ nodes: NodeStatus[]; error?: string }>({ action: "status" });
      if (res.error) setError(res.error);
      setNodes(res.nodes || []);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStatus(); }, []);

  const allOnline = nodes.length > 0 && nodes.every((n) => n.online && !n.maintenance);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs text-primary mb-6">
              <Activity className="h-3.5 w-3.5" /> System Status
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 font-display">
              Node <span className="gradient-text">Status</span>
            </h1>
            <p className="text-muted-foreground">Real-time status of every VixonCloud node.</p>
          </motion.div>

          <div className="flex items-center justify-between mb-6 gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${allOnline ? "border-green-500/30 bg-green-500/10 text-green-400" : nodes.length === 0 ? "border-border bg-secondary/30 text-muted-foreground" : "border-amber-500/30 bg-amber-500/10 text-amber-400"}`}>
              {allOnline ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
              <span className="text-sm font-medium">
                {nodes.length === 0 ? "No nodes configured" : allOnline ? "All systems operational" : "Some nodes degraded"}
              </span>
            </div>
            <Button onClick={fetchStatus} disabled={loading} size="sm" variant="outline" className="gap-1.5">
              <RefreshCcw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
          </div>

          {error && (
            <Card className="p-4 mb-4 border-destructive/30 bg-destructive/5">
              <p className="text-sm text-destructive">Status check failed: {error}</p>
              <p className="text-xs text-muted-foreground mt-1">An admin needs to configure the Pterodactyl panel URL & API key.</p>
            </Card>
          )}

          {loading && nodes.length === 0 ? (
            <Card className="p-10 text-center">
              <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">Checking nodes...</p>
            </Card>
          ) : nodes.length === 0 ? (
            <Card className="p-10 text-center">
              <Activity className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No nodes are configured yet.</p>
            </Card>
          ) : (
            <div className="grid gap-3">
              {nodes.map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-5 hover:border-primary/30 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`relative h-3 w-3 rounded-full ${n.maintenance ? "bg-amber-500" : n.online ? "bg-green-500" : "bg-red-500"}`}>
                          {n.online && !n.maintenance && <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />}
                        </div>
                        <div>
                          <p className="font-semibold">{n.displayName}</p>
                          <p className="text-xs text-muted-foreground">{n.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {n.maintenance ? (
                          <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 gap-1"><Wrench className="h-3 w-3" /> Maintenance</Badge>
                        ) : n.online ? (
                          <Badge className="bg-green-500/15 text-green-400 border-green-500/30">Operational</Badge>
                        ) : (
                          <Badge className="bg-red-500/15 text-red-400 border-red-500/30">Offline</Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/40">
                      {["24h", "7d", "30d"].map((w) => (
                        <div key={w} className="text-center">
                          <p className="text-xs text-muted-foreground uppercase">{w}</p>
                          <p className="text-lg font-bold text-foreground stat-number">{n.uptime[w]?.toFixed(1) ?? "—"}%</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;
