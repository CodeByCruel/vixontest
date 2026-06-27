import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  ExternalLink,
  Gamepad2,
  Server,
  Bot,
  LayoutDashboard,
  CreditCard,
  Shield,
  CheckCircle2,
  Clock,
  MessageCircle,
} from "lucide-react";
import { DISCORD_INVITE, STATUS_URL } from "@/lib/vixon";

const services = [
  {
    name: "Game Servers",
    description: "Minecraft, Rust, Palworld & more",
    icon: Gamepad2,
    status: "operational" as const,
    uptime: "99.99%",
    lastChecked: "2 min ago",
  },
  {
    name: "VPS Infrastructure",
    description: "Intel & AMD virtual servers",
    icon: Server,
    status: "operational" as const,
    uptime: "99.99%",
    lastChecked: "2 min ago",
  },
  {
    name: "Bot Hosting Platform",
    description: "Node.js, Python, Java bots",
    icon: Bot,
    status: "operational" as const,
    uptime: "99.98%",
    lastChecked: "2 min ago",
  },
  {
    name: "Control Panel",
    description: "dash.vixoncloud.com",
    icon: LayoutDashboard,
    status: "operational" as const,
    uptime: "99.99%",
    lastChecked: "2 min ago",
  },
  {
    name: "Billing System",
    description: "Payments & subscriptions",
    icon: CreditCard,
    status: "operational" as const,
    uptime: "100%",
    lastChecked: "2 min ago",
  },
  {
    name: "Network & DDoS Protection",
    description: "Edge mitigation & filtering",
    icon: Shield,
    status: "operational" as const,
    uptime: "100%",
    lastChecked: "2 min ago",
  },
];

const statusConfig = {
  operational: {
    color: "bg-emerald-500",
    pulseColor: "bg-emerald-500",
    label: "Operational",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  },
  degraded: {
    color: "bg-amber-500",
    pulseColor: "bg-amber-500",
    label: "Degraded",
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  },
  down: {
    color: "bg-red-500",
    pulseColor: "bg-red-500",
    label: "Down",
    badgeClass: "bg-red-500/15 text-red-400 border-red-500/25",
  },
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const StatusPage = () => {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen relative">
      <SEOHead
        title="Service Status — VixonCloud"
        description="Real-time status and uptime monitoring for all VixonCloud services. Check server availability, incidents, and maintenance schedules."
        path="/status"
      />
      <Navbar />
      <main className="pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge
              className={`inline-flex items-center gap-2 mb-5 ${
                allOperational
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                  : "bg-amber-500/15 text-amber-400 border border-amber-500/25"
              }`}
            >
              {allOperational ? (
                <CheckCircle2 className="h-3 w-3" />
              ) : (
                <Activity className="h-3 w-3" />
              )}
              {allOperational ? "All Systems Operational" : "Issues Detected"}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-3">
              Service <span className="gradient-text">Status</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              Real-time monitoring for all VixonCloud infrastructure and services.
            </p>
          </motion.div>

          {/* Status iframe */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-12"
          >
            <Card className="overflow-hidden bg-card/60 border-primary/15">
              <iframe
                src={STATUS_URL}
                title="VixonCloud Status Page"
                className="w-full border-0"
                style={{ height: 600 }}
              />
            </Card>
          </motion.div>

          {/* Service grid */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-extrabold font-display">
                Service <span className="gradient-text">Overview</span>
              </h2>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service) => {
                const cfg = statusConfig[service.status];
                return (
                  <motion.div key={service.name} variants={item}>
                    <Card className="p-5 h-full bg-card/60 border-primary/15 hover:border-primary/25 card-lift transition-all">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative flex h-2.5 w-2.5">
                            <span
                              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${cfg.pulseColor} opacity-50`}
                            />
                            <span
                              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${cfg.color}`}
                            />
                          </div>
                          <Badge variant="outline" className={`text-[10px] ${cfg.badgeClass}`}>
                            {cfg.label}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-sm mb-1">{service.name}</h3>
                      <p className="text-xs text-muted-foreground mb-4">{service.description}</p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-3 border-t border-border/50">
                        <span>
                          Uptime: <span className="text-foreground font-medium">{service.uptime}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.lastChecked}
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Report Issue CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="p-8 text-center bg-gradient-to-br from-primary/10 via-primary/4 to-transparent border-primary/25">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-lg font-bold mb-2">Encountering an issue?</h3>
              <p className="text-muted-foreground text-xs mb-5 max-w-md mx-auto">
                Report service disruptions or get live help from our team on Discord.
              </p>
              <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                <Button className="glow-primary gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <ExternalLink className="h-4 w-4" /> Report Issue on Discord
                </Button>
              </a>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatusPage;
