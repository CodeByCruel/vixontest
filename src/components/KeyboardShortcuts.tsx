import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Shortcut {
  keys: string[];
  description: string;
}

const shortcuts: Shortcut[] = [
  { keys: ["Ctrl", "K"], description: "Open search" },
  { keys: ["/"], description: "Open search" },
  { keys: ["?"], description: "Show keyboard shortcuts" },
  { keys: ["Esc"], description: "Close modal" },
  { keys: ["G", "H"], description: "Go to Home" },
  { keys: ["G", "M"], description: "Go to Minecraft Plans" },
  { keys: ["G", "B"], description: "Go to Bot Hosting" },
  { keys: ["G", "S"], description: "Go to Status" },
];

const routes: Record<string, string> = {
  gh: "/",
  gm: "/minecraft-plans",
  gb: "/bot-plans",
  gs: "/status",
};

const KeyboardShortcuts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const navigate = useNavigate();

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPendingKey(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName;
      const isEditable =
        target.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT";

      if (isOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          closeModal();
        }
        return;
      }

      if (isEditable) return;

      // Ctrl+K or / → search
      if ((e.ctrlKey && e.key === "k") || e.key === "/") {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>(
          'input[type="search"], input[name="search"], input[placeholder*="search" i], input[placeholder*="Search" i]'
        );
        if (searchInput) {
          searchInput.focus();
        }
        return;
      }

      // ? → show shortcuts
      if (e.key === "?") {
        e.preventDefault();
        setIsOpen(true);
        return;
      }

      // g + sequence navigation
      if (e.key === "g" || e.key === "G") {
        setPendingKey("g");
        return;
      }

      if (pendingKey === "g") {
        const route = routes[`g${e.key.toLowerCase()}`];
        if (route) {
          e.preventDefault();
          setPendingKey(null);
          navigate(route);
        } else {
          setPendingKey(null);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, pendingKey, navigate, closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-md glass-strong rounded-2xl border border-white/10 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-foreground">
                Keyboard Shortcuts
              </h2>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                aria-label="Close keyboard shortcuts"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.description}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-muted-foreground">
                    {shortcut.description}
                  </span>
                  <div className="flex items-center gap-1">
                    {shortcut.keys.map((key, i) => (
                      <span key={key} className="flex items-center gap-1">
                        {i > 0 && (
                          <span className="text-xs text-muted-foreground/50">
                            then
                          </span>
                        )}
                        <kbd className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-foreground">
                          {key}
                        </kbd>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
