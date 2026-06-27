import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Rocket,
  Pickaxe,
  Server,
  Bot,
  Shield,
  CreditCard,
  ExternalLink,
  BookOpen,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { DISCORD_INVITE } from "@/lib/vixon";

const categories = [
  {
    icon: Rocket,
    title: "Getting Started",
    description: "Server setup, panel walkthrough, first steps",
    articleCount: 12,
    articles: [
      "How to deploy your first game server",
      "Navigating the VixonCloud control panel",
      "Understanding your server dashboard",
      "Connecting to your server via SFTP",
    ],
  },
  {
    icon: Pickaxe,
    title: "Minecraft Guides",
    description: "Mods, plugins, world management, performance tuning",
    articleCount: 18,
    articles: [
      "Installing Forge & Fabric modpacks",
      "Optimizing Minecraft server TPS",
      "Managing world backups & restores",
      "Configuring Bukkit & Spigot plugins",
    ],
  },
  {
    icon: Server,
    title: "VPS Management",
    description: "Linux commands, Docker, web server setup",
    articleCount: 15,
    articles: [
      "Setting up Ubuntu on your VPS",
      "Installing Docker & Docker Compose",
      "Configuring Nginx reverse proxy",
      "Firewall rules with UFW",
    ],
  },
  {
    icon: Bot,
    title: "Bot Hosting",
    description: "Node.js, Python, Java bot deployment guides",
    articleCount: 10,
    articles: [
      "Deploying a Discord.js bot",
      "Running Python bots with PM2",
      "Setting environment variables securely",
      "Monitoring bot uptime & logs",
    ],
  },
  {
    icon: Shield,
    title: "Networking & DDoS",
    description: "Port forwarding, DNS setup, protection config",
    articleCount: 8,
    articles: [
      "Configuring DNS records for your domain",
      "Setting up port forwarding rules",
      "Understanding DDoS mitigation layers",
      "Whitelisting IPs on protected servers",
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Account",
    description: "Payments, invoices, account management",
    articleCount: 9,
    articles: [
      "How to upgrade or downgrade your plan",
      "Understanding your invoice breakdown",
      "Updating payment methods",
      "Requesting a refund",
    ],
  },
];

const popularArticles = [
  { title: "How to deploy your first game server", category: "Getting Started", reads: "2.4k" },
  { title: "Optimizing Minecraft server TPS", category: "Minecraft Guides", reads: "1.8k" },
  { title: "Setting up Docker on your VPS", category: "VPS Management", reads: "1.5k" },
  { title: "Deploying a Discord.js bot 24/7", category: "Bot Hosting", reads: "1.3k" },
  { title: "Configuring DDoS protection rules", category: "Networking & DDoS", reads: "1.1k" },
  { title: "How to upgrade your hosting plan", category: "Billing & Account", reads: "980" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const KnowledgeBase = () => (
  <div className="min-h-screen relative">
    <SEOHead
      title="Knowledge Base — VixonCloud"
      description="Guides, tutorials, and documentation for VixonCloud hosting services. Learn how to set up servers, manage VPS, host bots, and more."
      path="/knowledge-base"
    />
    <Navbar />
    <main className="pt-24 pb-20 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Badge className="inline-flex items-center gap-2 mb-5 bg-primary/15 text-primary border border-primary/25">
            <BookOpen className="h-3 w-3" /> KNOWLEDGE BASE
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold font-display tracking-tight mb-3">
            Knowledge <span className="gradient-text">Base</span>
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Guides, tutorials, and documentation to help you get the most out of VixonCloud.
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="max-w-xl mx-auto mb-14"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles, guides, and tutorials..."
              readOnly
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-card/60 border border-primary/15 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/30 transition-colors cursor-text"
            />
          </div>
        </motion.div>

        {/* Category grid */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-display">
              Browse <span className="gradient-text">Categories</span>
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => (
              <motion.div key={cat.title} variants={item}>
                <Card className="p-6 h-full bg-card/60 border-primary/15 hover:border-primary/25 card-lift transition-all group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                      <cat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-[10px] border-primary/20 text-muted-foreground">
                      {cat.articleCount} articles
                    </Badge>
                  </div>
                  <h3 className="font-display font-bold text-sm mb-1">{cat.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                    {cat.description}
                  </p>
                  <ul className="space-y-2 pt-3 border-t border-border/50">
                    {cat.articles.map((article) => (
                      <li
                        key={article}
                        className="flex items-start gap-2 text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      >
                        <span className="mt-1 h-1 w-1 rounded-full bg-primary/40 shrink-0" />
                        {article}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Popular articles */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold font-display">
              Popular <span className="gradient-text">Articles</span>
            </h2>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularArticles.map((article, i) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 h-full bg-card/60 border-primary/15 hover:border-primary/25 card-lift transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge variant="outline" className="text-[9px] border-primary/20 text-muted-foreground mb-2">
                        {article.category}
                      </Badge>
                      <h4 className="font-display font-semibold text-sm leading-snug group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground shrink-0 pt-1">
                      <TrendingUp className="h-3 w-3" />
                      {article.reads}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 text-center bg-gradient-to-br from-primary/10 via-primary/4 to-transparent border-primary/25">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold mb-2">Can't find what you need?</h3>
            <p className="text-muted-foreground text-xs mb-5 max-w-md mx-auto">
              Join our Discord for live support. Our team and community are ready to help you 24/7.
            </p>
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              <Button className="glow-primary gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <ExternalLink className="h-4 w-4" /> Join our Discord
              </Button>
            </a>
          </Card>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default KnowledgeBase;
