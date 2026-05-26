import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  { name: "Starting Price (per GB)", vixon: "₹20/mo", other1: "₹30/mo", other2: "₹50/mo" },
  { name: "DDoS Protection", vixon: true, other1: true, other2: false },
  { name: "Instant Setup", vixon: true, other1: false, other2: false },
  { name: "NVMe Storage", vixon: true, other1: false, other2: true },
  { name: "24/7 Live Support", vixon: true, other1: true, other2: false },
  { name: "Free Subdomain", vixon: true, other1: false, other2: false },
  { name: "Uptime SLA", vixon: "99.99%", other1: "99.5%", other2: "99%" },
  { name: "Custom Modpacks", vixon: true, other1: true, other2: true },
  { name: "Auto Backups", vixon: true, other1: false, other2: false },
];

const CellValue = ({ value }: { value: boolean | string }) => {
  if (typeof value === "string") return <span className="text-xs font-medium">{value}</span>;
  return value ? (
    <Check className="h-4 w-4 text-primary mx-auto" />
  ) : (
    <X className="h-4 w-4 text-destructive/60 mx-auto" />
  );
};

const ComparisonTable = () => (
  <section className="py-28 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.span className="text-[10px] font-medium text-primary tracking-[0.25em] uppercase block mb-3 font-mono">
          COMPARISON
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-display">
          Why <span className="gradient-text">VixonCloud</span>?
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mt-4">
          See how we stack up against other hosting providers.
        </p>
      </motion.div>

      <motion.div
        className="rounded-2xl overflow-hidden glass gradient-border"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="grid grid-cols-4 text-center text-[10px] font-semibold uppercase tracking-wider border-b border-border/30">
          <div className="p-4 text-left text-muted-foreground">Feature</div>
          <div className="p-4 bg-primary/10 text-primary">VixonCloud</div>
          <div className="p-4 text-muted-foreground">Host A</div>
          <div className="p-4 text-muted-foreground">Host B</div>
        </div>

        {features.map((f, i) => (
          <motion.div
            key={f.name}
            className="grid grid-cols-4 text-center items-center border-b border-border/15 last:border-b-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
          >
            <div className="p-3.5 text-left text-xs text-foreground/80">{f.name}</div>
            <div className="p-3.5 bg-primary/5">
              <CellValue value={f.vixon} />
            </div>
            <div className="p-3.5">
              <CellValue value={f.other1} />
            </div>
            <div className="p-3.5">
              <CellValue value={f.other2} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ComparisonTable;
