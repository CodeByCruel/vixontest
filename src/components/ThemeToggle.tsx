import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    try {
      return !document.documentElement.classList.contains("light");
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.remove("light");
    } else {
      root.classList.add("light");
    }
    try {
      localStorage.setItem("vixon-theme", dark ? "dark" : "light");
    } catch {
      /* localStorage may be unavailable */
    }
  }, [dark]);

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDark((d) => !d)}
      className="relative h-9 w-9 rounded-full glass border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        key={dark ? "dark" : "light"}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </motion.div>
    </motion.button>
  );
}
