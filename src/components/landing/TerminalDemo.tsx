import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TERMINAL_LINES: Array<{ text: string; type: "command" | "success" | "output" | "summary" }> = [
  { text: "$ vixon deploy --game minecraft --ram 8gb --region mumbai", type: "command" },
  { text: "\u2713 Connecting to VixonCloud API...", type: "success" },
  { text: "\u2713 Allocating resources (Ryzen 9 7950X, 8GB DDR5, 80GB NVMe)", type: "success" },
  { text: "\u2713 Installing Minecraft 1.21.4...", type: "success" },
  { text: "\u2713 Configuring firewall & DDoS protection", type: "success" },
  { text: "\u2713 Panel provisioning complete", type: "success" },
  { text: "", type: "output" },
  { text: "\uD83C\uDFAE Server ready! \u2192 play.yourserver.vixoncloud.com", type: "summary" },
  { text: "\u23F1 Deployed in 42 seconds", type: "summary" },
];

const CHAR_SPEED = 22;
const LINE_DELAY = 400;
const RESTART_DELAY = 6000;

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [visibleChars, setVisibleChars] = useState<number>(0);
  const [isTyping, setIsTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines >= TERMINAL_LINES.length) {
      setIsTyping(false);
      const timer = setTimeout(() => {
        setVisibleLines(0);
        setVisibleChars(0);
        setIsTyping(true);
      }, RESTART_DELAY);
      return () => clearTimeout(timer);
    }

    const currentLine = TERMINAL_LINES[visibleLines];
    if (!currentLine) return;

    if (currentLine.text === "") {
      const timer = setTimeout(() => setVisibleLines((l) => l + 1), LINE_DELAY);
      return () => clearTimeout(timer);
    }

    if (visibleChars < currentLine.text.length) {
      const timer = setTimeout(() => setVisibleChars((c) => c + 1), CHAR_SPEED);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleLines((l) => l + 1);
      setVisibleChars(0);
    }, LINE_DELAY);
    return () => clearTimeout(timer);
  }, [visibleLines, visibleChars]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [visibleLines, visibleChars]);

  const renderLine = (line: typeof TERMINAL_LINES[number], index: number) => {
    if (index > visibleLines) return null;
    const isCurrentlyTyping = index === visibleLines && isTyping;
    const displayText = isCurrentlyTyping
      ? line.text.slice(0, visibleChars)
      : line.text;

    const colorClass =
      line.type === "command"
        ? "text-foreground"
        : line.type === "success"
        ? "text-emerald-400"
        : line.type === "summary"
        ? "text-primary"
        : "text-muted-foreground";

    return (
      <div key={index} className={`line-appear ${colorClass} font-mono text-sm leading-relaxed`}>
        <span className="select-none text-muted-foreground/30 mr-3 inline-block w-4 text-right">
          {index + 1}
        </span>
        <span className="whitespace-pre-wrap break-all">{displayText}</span>
        {isCurrentlyTyping && (
          <span className="terminal-cursor inline-block w-[2px] h-[1.1em] bg-primary/80 align-middle ml-[1px]" />
        )}
      </div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-3xl mx-auto px-4"
    >
      <div className="rounded-2xl overflow-hidden glass-strong border border-border/20 shadow-2xl shadow-black/40">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-secondary/60 border-b border-border/20">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-muted-foreground/70">vixoncloud@deploy:~</span>
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          className="p-5 bg-[hsl(220_30%_3%)] max-h-[340px] overflow-y-auto scrollbar-thin"
        >
          {TERMINAL_LINES.map((line, i) => renderLine(line, i))}

          {visibleLines >= TERMINAL_LINES.length && (
            <div className="mt-3 flex items-center gap-1">
              <span className="text-primary/60 font-mono text-sm">$</span>
              <span className="terminal-cursor inline-block w-[2px] h-[1.1em] bg-primary/80" />
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}
