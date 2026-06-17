import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TourStep {
  title: string;
  description: string;
  content: React.ReactNode;
}

const DashboardContent = () => (
  <div className="p-4 space-y-3">
    <div className="flex items-center justify-between text-xs text-white/40 border-b border-white/5 pb-2">
      <span>Server Name</span>
      <span>Status</span>
      <span>Players</span>
    </div>
    {[
      { name: "Survival SMP", status: "running", players: "12/50", ping: "18ms" },
      { name: "Creative World", status: "running", players: "3/20", ping: "22ms" },
      { name: "Skyblock", status: "stopped", players: "0/30", ping: "—" },
      { name: "Minigames Hub", status: "running", players: "45/100", ping: "15ms" },
    ].map((s, i) => (
      <div
        key={i}
        className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs"
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              s.status === "running" ? "bg-emerald-400" : "bg-red-400"
            }`}
            style={{
              boxShadow:
                s.status === "running"
                  ? "0 0 6px hsl(152 100% 50% / 0.6)"
                  : "0 0 6px hsl(0 100% 50% / 0.6)",
            }}
          />
          <span className="text-white/80 font-mono">{s.name}</span>
        </div>
        <span className="text-white/40">{s.players}</span>
        <span className="text-primary/70 font-mono">{s.ping}</span>
      </div>
    ))}
  </div>
);

const ConsoleContent = () => (
  <div className="p-4 space-y-2">
    <div className="rounded-lg bg-black/40 border border-white/5 p-3 font-mono text-[10px] leading-relaxed space-y-1 overflow-hidden">
      {[
        "[12:04:02] [Server] INFO Starting Minecraft server version 1.21",
        "[12:04:02] [Server] INFO Loading properties",
        "[12:04:03] [Server] INFO Default game type: SURVIVAL",
        "[12:04:03] [Server] INFO Generating keypair",
        "[12:04:04] [Server] INFO Preparing level \"world\"",
        "[12:04:05] [Server] INFO Preparing spawn area: 48%",
        "[12:04:06] [Server] INFO Done (3.2s)!",
        "[12:04:06] [Server] INFO Listening on *:25565",
        "[12:04:06] [Server] INFO Using epoll channel type",
      ].map((line, i) => (
        <p
          key={i}
          className={
            line.includes("Done")
              ? "text-emerald-400"
              : line.includes("Listening")
              ? "text-primary"
              : "text-white/40"
          }
        >
          {line}
        </p>
      ))}
    </div>
    <div className="flex items-center gap-2 mt-3">
      <span className="text-primary font-mono text-xs">$</span>
      <div className="flex-1 bg-white/[0.03] border border-white/5 rounded px-3 py-1.5 text-xs text-white/30 font-mono">
        say Hello, players!
      </div>
    </div>
  </div>
);

const FileManagerContent = () => (
  <div className="p-4 space-y-1">
    {[
      { name: "📁 plugins/", depth: 0, size: "" },
      { name: "  📁 WorldEdit/", depth: 1, size: "3.2 MB" },
      { name: "  📁 EssentialsX/", depth: 1, size: "1.8 MB" },
      { name: "  📁 LuckPerms/", depth: 1, size: "956 KB" },
      { name: "📁 world/", depth: 0, size: "" },
      { name: "  📄 level.dat", depth: 1, size: "12.4 MB" },
      { name: "  📄 session.lock", depth: 1, size: "8 B" },
      { name: "📄 server.properties", depth: 0, size: "1.2 KB" },
      { name: "📄 bukkit.yml", depth: 0, size: "890 B" },
      { name: "📄 eula.txt", depth: 0, size: "12 B" },
    ].map((f, i) => (
      <div
        key={i}
        className="flex items-center justify-between p-1.5 rounded hover:bg-white/[0.03] text-xs cursor-pointer transition-colors"
        style={{ paddingLeft: `${f.depth * 16 + 8}px` }}
      >
        <span className="text-white/60 font-mono">{f.name}</span>
        {f.size && (
          <span className="text-white/25 font-mono text-[10px]">{f.size}</span>
        )}
      </div>
    ))}
  </div>
);

const ModInstallerContent = () => (
  <div className="p-4 space-y-3">
    {[
      {
        name: "EssentialsX",
        desc: "Essential commands and features",
        version: "2.20.1",
        installed: true,
      },
      {
        name: "LuckPerms",
        desc: "Advanced permissions system",
        version: "5.4.121",
        installed: true,
      },
      {
        name: "WorldEdit",
        desc: "In-game world editing tool",
        version: "7.3.0",
        installed: false,
      },
      {
        name: "Vault",
        desc: "Economy & permissions API",
        version: "1.7.3",
        installed: false,
      },
    ].map((mod, i) => (
      <div
        key={i}
        className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5"
      >
        <div>
          <p className="text-white/80 text-xs font-medium">{mod.name}</p>
          <p className="text-white/30 text-[10px] mt-0.5">{mod.desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-white/20 text-[10px] font-mono">
            v{mod.version}
          </span>
          <span
            className={`px-2.5 py-1 rounded text-[10px] font-medium ${
              mod.installed
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-primary/20 text-primary border border-primary/30 cursor-pointer hover:bg-primary/30 transition-colors"
            }`}
          >
            {mod.installed ? "Installed" : "Install"}
          </span>
        </div>
      </div>
    ))}
  </div>
);

const steps: TourStep[] = [
  {
    title: "Server Dashboard",
    description:
      "Monitor all your servers at a glance with real-time status, player counts, and ping.",
    content: <DashboardContent />,
  },
  {
    title: "Console",
    description:
      "Full access to your server console with command input and color-coded logs.",
    content: <ConsoleContent />,
  },
  {
    title: "File Manager",
    description:
      "Browse and edit server files directly in the panel — no FTP needed.",
    content: <FileManagerContent />,
  },
  {
    title: "Mod Installer",
    description:
      "One-click install for popular plugins and mods. Never manually upload jars again.",
    content: <ModInstallerContent />,
  },
];

const PanelTour = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () =>
    setCurrentStep((prev) => (prev + 1) % steps.length);
  const prev = () =>
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Powerful{" "}
            <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Control Panel
            </span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Our custom Pterodactyl panel gives you full control over your
            servers
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl overflow-hidden border border-white/10"
          style={{
            background:
              "linear-gradient(135deg, hsl(220 30% 12%) 0%, hsl(220 40% 8%) 100%)",
            boxShadow:
              "0 0 60px hsl(210 100% 55% / 0.08), 0 25px 50px -12px rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <span className="text-[10px] text-white/25 font-mono tracking-wider uppercase">
              VixonCloud Panel — {steps[currentStep].title}
            </span>
            <div className="w-[52px]" />
          </div>

          {/* Step Header */}
          <div className="px-6 pt-5 pb-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-primary font-mono mb-1">
                Step {currentStep + 1}/{steps.length}
              </p>
              <h3 className="text-lg font-bold text-white">
                {steps[currentStep].title}
              </h3>
              <p className="text-xs text-white/40 mt-1">
                {steps[currentStep].description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-8 h-8 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative overflow-hidden" style={{ height: "280px" }}>
            <AnimatePresence mode="wait" custom={currentStep}>
              <motion.div
                key={currentStep}
                custom={currentStep}
                initial={(direction: number) => ({
                  x: direction > 0 ? 300 : -300,
                  opacity: 0,
                })}
                animate={{ x: 0, opacity: 1 }}
                exit={(direction: number) => ({
                  x: direction > 0 ? -300 : 300,
                  opacity: 0,
                })}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {steps[currentStep].content}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-2 py-4 border-t border-white/5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === currentStep
                    ? "w-6 h-2 bg-primary"
                    : "w-2 h-2 bg-white/15 hover:bg-white/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PanelTour;
