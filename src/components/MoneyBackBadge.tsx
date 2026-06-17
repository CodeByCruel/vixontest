import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const MoneyBackBadge = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`inline-flex items-center gap-3 rounded-xl border border-teal-500/15 bg-teal-500/5 backdrop-blur-md px-4 py-3 ${className}`}
    >
      <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-teal-500/10 shrink-0">
        <ShieldCheck className="h-5 w-5 text-teal-400" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-foreground leading-tight">
          7-Day Money-Back Guarantee
        </p>
        <p className="text-xs text-muted-foreground leading-snug mt-0.5">
          Not satisfied? Full refund, no questions asked.
        </p>
      </div>
    </motion.div>
  );
};

export default MoneyBackBadge;
