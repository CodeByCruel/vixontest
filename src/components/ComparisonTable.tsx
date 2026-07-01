import { motion } from "framer-motion";
import { Check, X, Crown, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type CellValue = {
  icon: "check" | "x";
  label: string;
};

type Row = {
  feature: string;
  vixon: CellValue;
  hostA: CellValue;
  hostB: CellValue;
};

const rows: Row[] = [
  {
    feature: "NVMe SSD Storage",
    vixon: { icon: "check", label: "✓" },
    hostA: { icon: "x", label: "✗ (HDD)" },
    hostB: { icon: "x", label: "✗ (SATA SSD)" },
  },
  {
    feature: "DDoS Protection",
    vixon: { icon: "check", label: "✓ Included" },
    hostA: { icon: "x", label: "✗ Extra ₹500/mo" },
    hostB: { icon: "x", label: "✗ Not available" },
  },
  {
    feature: "99.99% Uptime SLA",
    vixon: { icon: "check", label: "✓ Guaranteed" },
    hostA: { icon: "x", label: '✗ "Best effort"' },
    hostB: { icon: "x", label: "✗ No SLA" },
  },
  {
    feature: "Instant Setup",
    vixon: { icon: "check", label: "✓ Under 5 min" },
    hostA: { icon: "x", label: "✗ 24-48 hours" },
    hostB: { icon: "x", label: "✗ 12-24 hours" },
  },
  {
    feature: "24/7 Support",
    vixon: { icon: "check", label: "✓ Discord + Tickets" },
    hostA: { icon: "x", label: "✗ Email only (business hours)" },
    hostB: { icon: "x", label: "✗ Forum only" },
  },
  {
    feature: "Free Migration",
    vixon: { icon: "check", label: "✓ We move you" },
    hostA: { icon: "x", label: "✗ Not offered" },
    hostB: { icon: "x", label: "✗ Not offered" },
  },
  {
    feature: "7-Day Refund",
    vixon: { icon: "check", label: "✓ Full refund" },
    hostA: { icon: "x", label: "✗ No refunds" },
    hostB: { icon: "x", label: "✗ No refunds" },
  },
  {
    feature: "Indian Data Center",
    vixon: { icon: "check", label: "✓ Mumbai + Delhi" },
    hostA: { icon: "x", label: "✗ Singapore only" },
    hostB: { icon: "x", label: "✗ US only" },
  },
  {
    feature: "AMD EPYC CPUs",
    vixon: { icon: "check", label: "✓ Premium tier" },
    hostA: { icon: "x", label: "✗ Old Intel Xeons" },
    hostB: { icon: "x", label: "✗ Shared cores" },
  },
  {
    feature: "Price (4GB Minecraft)",
    vixon: { icon: "check", label: "From ₹80/mo" },
    hostA: { icon: "x", label: "₹150-300/mo" },
    hostB: { icon: "x", label: "₹100-200/mo" },
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] },
  },
};

const CheckMark = () => (
  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500/15 shrink-0">
    <Check className="h-3.5 w-3.5 text-emerald-400" strokeWidth={3} />
  </span>
);

const XMark = () => (
  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-500/15 shrink-0">
    <X className="h-3.5 w-3.5 text-red-400" strokeWidth={3} />
  </span>
);

const ComparisonTable = () => {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.span className="text-[10px] font-medium text-primary tracking-[0.25em] uppercase block mb-3 font-mono">
            COMPARE
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-display">
            Why Settle for{" "}
            <span className="gradient-text">Less?</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            See how VixonCloud stacks up against typical budget hosting providers.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <Card className="glass gradient-border overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 border-b border-border/20">
              <div className="p-4 md:p-5 text-xs font-semibold text-muted-foreground uppercase tracking-wider font-mono">
                Feature
              </div>
              <div className="p-4 md:p-5 text-center relative bg-primary/5">
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 text-primary" />
                    <span className="text-sm font-bold font-display">VixonCloud</span>
                  </div>
                  <Badge className="bg-primary/15 text-primary border border-primary/20 text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-mono font-bold">
                    YOUR CHOICE
                  </Badge>
                </div>
              </div>
              <div className="p-4 md:p-5 text-center opacity-50">
                <span className="text-sm font-semibold text-muted-foreground font-display">Budget Host A</span>
              </div>
              <div className="p-4 md:p-5 text-center opacity-50">
                <span className="text-sm font-semibold text-muted-foreground font-display">Budget Host B</span>
              </div>
            </div>

            {/* Table Body */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {rows.map((row, i) => (
                <motion.div
                  key={row.feature}
                  variants={rowVariants}
                  className={`grid grid-cols-4 group transition-colors duration-200 hover:bg-white/[0.02] ${
                    i < rows.length - 1 ? "border-b border-border/10" : ""
                  }`}
                >
                  {/* Feature Name */}
                  <div className="p-4 md:p-5 flex items-center">
                    <span className="text-xs md:text-sm font-medium text-foreground/90 font-display">
                      {row.feature}
                    </span>
                  </div>

                  {/* VixonCloud Column */}
                  <div className="p-4 md:p-5 flex items-center justify-center gap-2.5 bg-primary/[0.03] border-l border-primary/10">
                    {row.vixon.icon === "check" ? <CheckMark /> : <XMark />}
                    <span className="text-xs md:text-sm font-medium text-foreground">
                      {row.vixon.label.replace("✓ ", "").replace("✗ ", "")}
                    </span>
                  </div>

                  {/* Budget Host A */}
                  <div className="p-4 md:p-5 flex items-center justify-center gap-2.5 opacity-50">
                    {row.hostA.icon === "check" ? <CheckMark /> : <XMark />}
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {row.hostA.label.replace("✓ ", "").replace("✗ ", "")}
                    </span>
                  </div>

                  {/* Budget Host B */}
                  <div className="p-4 md:p-5 flex items-center justify-center gap-2.5 opacity-50">
                    {row.hostB.icon === "check" ? <CheckMark /> : <XMark />}
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {row.hostB.label.replace("✓ ", "").replace("✗ ", "")}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Row */}
            <div className="border-t border-border/20 p-6 md:p-8 bg-primary/[0.02]">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 border border-primary/15 shrink-0">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold font-display text-foreground">
                      See why thousands choose VixonCloud
                    </p>
                    <p className="text-xs text-muted-foreground">
                      12-hour refund (Minecraft) · Instant setup · Premium hardware
                    </p>
                  </div>
                </div>
                <a
                  href="https://discord.gg/TtV26hZEJx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold font-display hover:bg-primary/90 transition-colors shrink-0"
                >
                  Get Started
                  <Zap className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
