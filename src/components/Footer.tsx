import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "@/assets/vixoncloud-logo.png";
import {
  ExternalLink, Heart, MessageCircle, Activity, FileText, Monitor, Star,
  Zap, Twitter, Instagram, Youtube, Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDiscordInvite, PANEL_URL, TRUSTPILOT_URL } from "@/lib/vixon";

const socialLinks = [
  { label: "Twitter / X", href: "https://twitter.com/vixoncloud", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/vixoncloud", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@vixoncloud", icon: Youtube },
];

const paymentMethods = [
  { label: "UPI", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  { label: "Visa", color: "bg-blue-500/15 text-blue-400 border-blue-500/20" },
  { label: "Mastercard", color: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
  { label: "Razorpay", color: "bg-sky-500/15 text-sky-400 border-sky-500/20" },
  { label: "Stripe", color: "bg-violet-500/15 text-violet-400 border-violet-500/20" },
];

const Footer = () => {
  const invite = useDiscordInvite();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success("Thanks for subscribing!", {
      description: "We'll keep you updated with the latest deals and hosting tips.",
    });
    setEmail("");
  };

  return (
    <footer className="border-t border-border/10 bg-surface/50 backdrop-blur-sm py-14 mt-12 relative z-10">
      <div className="container mx-auto px-4">
        {/* ── Link columns ── */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={logo} alt="VixonCloud" className="h-7 w-7 rounded-lg" />
              <span className="font-bold text-base font-display">
                Vixon<span className="gradient-text">Cloud</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We host whatever you want. Premium game, bot &amp; VPS hosting — fast, reliable, affordable.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground/70 mb-3">Services</p>
            <div className="space-y-2 text-sm">
              <Link to="/minecraft-plans" className="block text-muted-foreground hover:text-primary transition-colors">Minecraft Hosting</Link>
              <Link to="/bot-plans" className="block text-muted-foreground hover:text-primary transition-colors">Bot Hosting</Link>
              <Link to="/vps-starter" className="block text-muted-foreground hover:text-primary transition-colors">VPS — Starter</Link>
              <Link to="/vps-premium" className="block text-muted-foreground hover:text-primary transition-colors">VPS — Premium</Link>
              <Link to="/website-plans" className="block text-muted-foreground hover:text-primary transition-colors">Website Plans</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground/70 mb-3">Tools</p>
            <div className="space-y-2 text-sm">
              <Link to="/benchmarks" className="block text-muted-foreground hover:text-primary transition-colors">Benchmarks</Link>
              <Link to="/knowledge-base" className="block text-muted-foreground hover:text-primary transition-colors">Knowledge Base</Link>
              <Link to="/affiliate" className="block text-muted-foreground hover:text-primary transition-colors">Affiliate Program</Link>
              <Link to="/games" className="block text-muted-foreground hover:text-primary transition-colors">All Games</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground/70 mb-3">Company</p>
            <div className="space-y-2 text-sm">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link to="/features" className="block text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link to="/why-us" className="block text-muted-foreground hover:text-primary transition-colors">Why Us</Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/tos" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <FileText className="h-3.5 w-3.5" /> Terms &amp; Refund Policy
              </Link>
            </div>
          </div>

          {/* ── Connect column (with socials) ── */}
          <div>
            <p className="text-xs font-semibold text-foreground/70 mb-3">Connect</p>
            <div className="space-y-2 text-sm">
              <a href={invite} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle className="h-3.5 w-3.5" /> Discord
              </a>
              <a href={PANEL_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <Monitor className="h-3.5 w-3.5" /> Game Panel <ExternalLink className="h-3 w-3" />
              </a>
              <Link to="/status" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <Activity className="h-3.5 w-3.5" /> Status
              </Link>
              <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <Star className="h-3.5 w-3.5" /> Trustpilot Reviews
              </a>
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                  <s.icon className="h-3.5 w-3.5" /> {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Newsletter ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 rounded-xl border border-border/10 bg-background/40 backdrop-blur-md p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" /> Stay Updated
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Get hosting tips, exclusive deals, and updates.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
              <Input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="md:w-60 bg-background/60 border-border/20 text-sm"
              />
              <Button type="submit" size="sm" className="shrink-0">
                Subscribe
              </Button>
            </form>
          </div>
        </motion.div>

        {/* ── Payment methods ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2 mb-8"
        >
          <span className="text-[11px] text-muted-foreground/50 mr-1">Payments:</span>
          {paymentMethods.map((pm) => (
            <span
              key={pm.label}
              className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-[11px] font-mono font-semibold tracking-wide ${pm.color}`}
            >
              {pm.label}
            </span>
          ))}
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="pt-5 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} VixonCloud — We host whatever you want.
          </p>
          <p className="text-xs text-muted-foreground/50 flex items-center gap-1">
            Founded by <span className="text-foreground/80 font-medium">Akshit</span> &amp;{" "}
            <span className="text-foreground/80 font-medium">Deepak</span>
            <span className="mx-1">•</span>
            Made with <Heart className="h-3 w-3 text-primary/70 inline" /> for gamers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
