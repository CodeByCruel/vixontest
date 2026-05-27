import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/vixoncloud-logo.png";
import { ExternalLink, Heart, MessageCircle, Activity, FileText, Monitor, Star } from "lucide-react";
import { useDiscordInvite, PANEL_URL, TRUSTPILOT_URL } from "@/lib/vixon";

const Footer = () => {
  const invite = useDiscordInvite();

  return (
    <footer className="border-t border-border/10 bg-surface/50 backdrop-blur-sm py-14 mt-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img src={logo} alt="VixonCloud" className="h-7 w-7 rounded-lg" />
              <span className="font-bold text-base font-display">Vixon<span className="gradient-text">Cloud</span></span>
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
            <p className="text-xs font-semibold text-foreground/70 mb-3">Company</p>
            <div className="space-y-2 text-sm">
              <Link to="/features" className="block text-muted-foreground hover:text-primary transition-colors">Features</Link>
              <Link to="/why-us" className="block text-muted-foreground hover:text-primary transition-colors">Why Us</Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              <Link to="/tos" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <FileText className="h-3.5 w-3.5" /> Terms &amp; Refund Policy
              </Link>
            </div>
          </div>

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
            </div>
          </div>
        </div>

        <motion.div className="pt-5 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between gap-2" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-xs text-muted-foreground/60">© {new Date().getFullYear()} VixonCloud — We host whatever you want.</p>
          <p className="text-xs text-muted-foreground/50 flex items-center gap-1">
            Founded by <span className="text-foreground/80 font-medium">Akshit</span> &amp; <span className="text-foreground/80 font-medium">Deepak</span>
            <span className="mx-1">•</span>
            Made with <Heart className="h-3 w-3 text-primary/70 inline" /> for gamers
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
