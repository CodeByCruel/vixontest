import { motion } from "framer-motion";
import { Puzzle, GitBranch, Package, Check } from "lucide-react";

const features = [
  {
    icon: Puzzle,
    title: "One-Click Plugin Installer",
    desc: "Browse and install thousands of Spigot and Modrinth plugins directly from your panel. Search, filter, and manage your plugins without ever touching a file manager.",
    bullets: ["1000+ plugins", "Auto dependency resolution", "No FTP needed"],
  },
  {
    icon: GitBranch,
    title: "Instant Version Changer",
    desc: "Switch between Vanilla, Paper, Fabric, Forge, NeoForge, Velocity, and more with a single click. Access hundreds of builds and MC versions effortlessly.",
    bullets: ["All major loaders", "Hundreds of builds", "Seamless switching"],
  },
  {
    icon: Package,
    title: "Built-in Mod Installer",
    desc: "Install Fabric and Forge mods from Modrinth directly in your panel. Browse popular mods like Lithium, FabricAPI, and more — no manual downloads needed.",
    bullets: ["Modrinth integration", "Auto-updates", "Conflict detection"],
  },
];

const FeaturesShowcase = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6">
            <Puzzle className="h-3.5 w-3.5" />
            Powerful panel features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            Everything you need, <span className="gradient-text">built-in</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Our custom panel comes loaded with tools to manage your server — no SSH or FTP required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur p-7 hover:border-primary/40 transition-colors"
            >
              <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-5">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{f.desc}</p>
              <ul className="space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
