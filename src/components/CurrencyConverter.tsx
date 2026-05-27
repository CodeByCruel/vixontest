import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const rates: Record<string, { symbol: string; rate: number }> = {
  INR: { symbol: "₹", rate: 1 },
  USD: { symbol: "$", rate: 0.012 },
  EUR: { symbol: "€", rate: 0.011 },
  GBP: { symbol: "£", rate: 0.0094 },
  AUD: { symbol: "A$", rate: 0.018 },
  CAD: { symbol: "C$", rate: 0.016 },
  JPY: { symbol: "¥", rate: 1.78 },
  SGD: { symbol: "S$", rate: 0.016 },
  AED: { symbol: "د.إ", rate: 0.044 },
  BDT: { symbol: "৳", rate: 1.44 },
  PKR: { symbol: "Rs", rate: 3.34 },
  LKR: { symbol: "Rs", rate: 3.88 },
};

const CurrencyConverter = ({ amount }: { amount: number }) => {
  const [currency, setCurrency] = useState("USD");
  const converted = (amount * rates[currency].rate).toFixed(2);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1.5 text-sm">
      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
      <span className="text-muted-foreground">≈ {rates[currency].symbol}{converted}</span>
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="h-6 w-16 border-none bg-transparent px-1 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(rates).filter((c) => c !== "INR").map((c) => (
            <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default CurrencyConverter;
