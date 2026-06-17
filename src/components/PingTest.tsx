import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Zap, Trophy, Loader2, ChevronRight } from "lucide-react";

type ServerLocation = {
  city: string;
  flag: string;
  color: string;
  minPing: number;
  maxPing: number;
};

const servers: ServerLocation[] = [
  { city: "Mumbai", flag: "🇮🇳", color: "#10b981", minPing: 2, maxPing: 8 },
  { city: "Delhi", flag: "🇮🇳", color: "#3b82f6", minPing: 4, maxPing: 12 },
  { city: "Singapore", flag: "🇸🇬", color: "#8b5cf6", minPing: 15, maxPing: 30 },
  { city: "Dubai", flag: "🇦🇪", color: "#f59e0b", minPing: 20, maxPing: 40 },
  { city: "Frankfurt", flag: "🇩🇪", color: "#fb923c", minPing: 45, maxPing: 70 },
  { city: "US West", flag: "🇺🇸", color: "#f97316", minPing: 50, maxPing: 80 },
  { city: "Tokyo", flag: "🇯🇵", color: "#a78bfa", minPing: 25, maxPing: 45 },
];

type PingResult = {
  city: string;
  flag: string;
  ms: number;
  rating: string;
  color: string;
};

function getPing(ms: number): { rating: string; color: string } {
  if (ms < 20) return { rating: "Excellent", color: "#10b981" };
  if (ms < 50) return { rating: "Good", color: "#f59e0b" };
  return { rating: "Fair", color: "#f97316" };
}

function simulatePing(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function PingTest() {
  const [testing, setTesting] = useState<string | null>(null);
  const [results, setResults] = useState<Record<string, PingResult>>({});
  const [testingAll, setTestingAll] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bestServer, setBestServer] = useState<PingResult | null>(null);
  const [showBest, setShowBest] = useState(false);
  const abortRef = useRef(false);

  const testServer = useCallback(async (server: ServerLocation): Promise<PingResult> => {
    return new Promise((resolve) => {
      const delay = 1000 + Math.random() * 1000;
      setTimeout(() => {
        const ms = simulatePing(server.minPing, server.maxPing);
        const { rating, color } = getPing(ms);
        resolve({ city: server.city, flag: server.flag, ms, rating, color });
      }, delay);
    });
  }, []);

  const handleSingleTest = useCallback(async (server: ServerLocation) => {
    setTesting(server.city);
    setShowBest(false);
    setBestServer(null);
    const result = await testServer(server);
    setResults((prev) => ({ ...prev, [server.city]: result }));
    setTesting(null);
  }, [testServer]);

  const handleFindBest = useCallback(async () => {
    setTestingAll(true);
    setResults({});
    setBestServer(null);
    setShowBest(false);
    abortRef.current = false;
    let best: PingResult | null = null;

    for (let i = 0; i < servers.length; i++) {
      if (abortRef.current) break;
      const server = servers[i];
      setTesting(server.city);
      setProgress(((i + 1) / servers.length) * 100);
      const result = await testServer(server);
      setResults((prev) => ({ ...prev, [server.city]: result }));
      if (!best || result.ms < best.ms) best = result;
    }

    setTesting(null);
    setTestingAll(false);
    setProgress(100);
    if (best) {
      setBestServer(best);
      setShowBest(true);
    }
  }, [testServer]);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer">
            <Wifi className="h-3.5 w-3.5" />
            Network Tools
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display">
            Test Your <span className="gradient-text">Connection</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-sm">
            Check ping to our global data centers and find the fastest server for your region.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass gradient-border rounded-2xl p-6 md:p-8"
        >
          {/* Server Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
            {servers.map((server, i) => {
              const result = results[server.city];
              const isTesting = testing === server.city;
              const isBest = bestServer?.city === server.city && showBest;

              return (
                <motion.button
                  key={server.city}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => !testingAll && handleSingleTest(server)}
                  disabled={testingAll}
                  className={`relative p-4 rounded-xl text-left transition-all duration-300 ${
                    isBest
                      ? "bg-primary/15 border-2 border-primary/50 glow-primary"
                      : result
                      ? "bg-secondary/40 border border-border/30"
                      : "bg-secondary/20 border border-border/20 hover:border-primary/20 hover:bg-secondary/40"
                  } ${testingAll && !isTesting && !result ? "opacity-50" : ""}`}
                >
                  {isBest && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1"
                    >
                      <Trophy className="h-3 w-3" />
                    </motion.div>
                  )}

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{server.flag}</span>
                    <span className="text-sm font-semibold font-display">{server.city}</span>
                    <span
                      className="ml-auto w-2 h-2 rounded-full"
                      style={{ backgroundColor: server.color }}
                    />
                  </div>

                  <AnimatePresence mode="wait">
                    {isTesting ? (
                      <motion.div
                        key="testing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="h-3.5 w-3.5 text-primary animate-spin" />
                        <span className="text-xs text-primary font-mono">testing...</span>
                      </motion.div>
                    ) : result ? (
                      <motion.div
                        key="result"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1.5"
                      >
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl font-bold font-mono" style={{ color: result.color }}>
                            {result.ms}
                          </span>
                          <span className="text-[10px] text-muted-foreground">ms</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: result.color }}
                          />
                          <span className="text-[10px] font-semibold" style={{ color: result.color }}>
                            {result.rating}
                          </span>
                        </div>
                        <div className="w-full h-1 rounded-full bg-secondary/50 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: result.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(5, 100 - result.ms)}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-muted-foreground"
                      >
                        Click to test
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Progress Bar (testing all) */}
          <AnimatePresence>
            {testingAll && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Testing all servers...</span>
                  <span className="text-xs font-mono text-primary">{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-secondary/30 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Best Server Result */}
          <AnimatePresence>
            {showBest && bestServer && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass rounded-xl p-4 border border-primary/20 mb-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Your best server</p>
                    <p className="text-sm font-bold font-display">
                      {bestServer.flag} {bestServer.city}{" "}
                      <span className="text-primary">({bestServer.ms}ms)</span>
                    </p>
                  </div>
                  <span
                    className="ml-auto px-3 py-1 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: bestServer.color + "20", color: bestServer.color }}
                  >
                    {bestServer.rating}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Find Best Button */}
          <motion.button
            onClick={handleFindBest}
            disabled={testingAll}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 rounded-xl text-sm font-bold font-display flex items-center justify-center gap-2 transition-all duration-300 ${
              testingAll
                ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground glow-primary hover:bg-primary/90"
            }`}
          >
            {testingAll ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Testing Servers...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Find Best Server
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
