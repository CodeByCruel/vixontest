import { motion } from "framer-motion";

const UptimeBadge = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-2 rounded-full border border-border/10 bg-background/60 backdrop-blur-md px-3 py-1.5 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>
      <span className="text-xs font-semibold text-emerald-400 tracking-wide">
        99.99% Uptime
      </span>
    </motion.div>
  );
};

export default UptimeBadge;
