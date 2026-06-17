import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, LayoutGroup } from "framer-motion";
import {
  Menu, X, ExternalLink, FileText, LayoutDashboard, ChevronDown, Gamepad2,
  Box, Cpu, Rocket, Globe, Bot, HelpCircle, Activity, MessagesSquare, Home,
  Sparkles, Receipt, Search, Zap, Shield, Crown, ArrowRight, Server,
  MemoryStick, HardDrive, Users, Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/vixon-logo.png";
import { useDiscordInvite } from "@/lib/vixon";

const GAME_PANEL_URL = "https://dash.vixoncloud.com";
const CLIENT_PANEL_URL = "https://billing.vixoncloud.com";

const announcements = [
  { text: "Minecraft plans from ₹20/GB", icon: Gamepad2 },
  { text: "New: Bot Hosting from ₹25/mo", icon: Bot },
  { text: "99.9% Uptime Guaranteed", icon: Shield },
  { text: "Instant Server Deployment", icon: Zap },
  { text: "VPS plans with AMD EPYC CPUs", icon: Cpu },
];

interface MegaMenuItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  badge?: string;
  badgeColor?: string;
}

interface NavItem {
  label: string;
  to?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: MegaMenuItem[];
}

const navItems: NavItem[] = [
  { label: "Home", to: "/", icon: Home },
  {
    label: "Minecraft",
    icon: Gamepad2,
    children: [
      { label: "All Plans Overview", to: "/minecraft-plans", icon: Box, desc: "Compare all three tiers", badge: "Overview", badgeColor: "bg-blue-500/15 text-blue-400" },
      { label: "Starter Tier", to: "/minecraft-starter", icon: Box, desc: "From ₹20/GB — small SMPs", badge: "₹20/GB", badgeColor: "bg-green-500/15 text-green-400" },
      { label: "Standard Tier", to: "/minecraft-standard", icon: Box, desc: "From ₹40/GB — most popular", badge: "Popular", badgeColor: "bg-primary/15 text-primary" },
      { label: "Premium Tier", to: "/minecraft-premium", icon: Crown, desc: "From ₹55/GB — top performance", badge: "Premium", badgeColor: "bg-amber-500/15 text-amber-400" },
    ],
  },
  {
    label: "Services",
    icon: Server,
    children: [
      { label: "Bot Hosting", to: "/bot-plans", icon: Bot, desc: "Discord bot hosting from ₹25/mo", badge: "New", badgeColor: "bg-emerald-500/15 text-emerald-400" },
      { label: "Website Plans", to: "/website-plans", icon: Globe, desc: "We build websites for you" },
      { label: "VPS Starter", to: "/vps-starter", icon: Cpu, desc: "Intel VPS from ₹400/mo" },
      { label: "VPS Premium", to: "/vps-premium", icon: Rocket, desc: "AMD EPYC VPS from ₹500/mo" },
    ],
  },
  { label: "Games", to: "/games", icon: Gamepad2 },
  { label: "Features", to: "/features", icon: Sparkles },
  {
    label: "Tools",
    icon: Zap,
    children: [
      { label: "Benchmarks", to: "/benchmarks", icon: Activity, desc: "See our performance numbers" },
      { label: "Knowledge Base", to: "/knowledge-base", icon: HelpCircle, desc: "Guides & documentation" },
      { label: "Affiliate Program", to: "/affiliate", icon: Users, desc: "Earn 20-30% commissions", badge: "Earn", badgeColor: "bg-amber-500/15 text-amber-400" },
    ],
  },
  {
    label: "Company",
    icon: Activity,
    children: [
      { label: "About Us", to: "/about", icon: Sparkles, desc: "Our mission & history" },
      { label: "Why Us", to: "/why-us", icon: Activity, desc: "Why thousands trust us" },
      { label: "FAQ", to: "/faq", icon: HelpCircle, desc: "Common questions" },
      { label: "Contact", to: "/contact", icon: MessagesSquare, desc: "Get in touch" },
      { label: "Status", to: "/status", icon: Activity, desc: "Live system status", badge: "Live", badgeColor: "bg-emerald-500/15 text-emerald-400" },
      { label: "Terms & Refund Policy", to: "/tos", icon: FileText, desc: "Legal terms" },
    ],
  },
];

const AnnouncementBar = ({ onClose }: { onClose: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = announcements[index];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="relative overflow-hidden border-b border-border/30"
      style={{ background: "linear-gradient(90deg, hsl(210 100% 55% / 0.06), hsl(195 100% 65% / 0.04), hsl(210 100% 55% / 0.06))" }}
    >
      <div className="container mx-auto px-4 h-8 flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 text-xs"
          >
            <current.icon className="h-3 w-3 text-primary" />
            <span className="text-muted-foreground">{current.text}</span>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={onClose}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors p-1"
        >
          <X className="h-3 w-3" />
        </button>
        {/* Progress dots */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex gap-1">
          {announcements.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-4 bg-primary" : "w-1 bg-muted-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const MegaMenu = ({
  item,
  onClose,
  isHovered,
}: {
  item: NavItem;
  onClose: () => void;
  isHovered: boolean;
}) => {
  if (!item.children) return null;

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] rounded-2xl glass-strong border border-border/20 shadow-2xl shadow-black/40 overflow-hidden"
          onMouseEnter={() => {}}
          onMouseLeave={onClose}
        >
          {/* Gradient header line */}
          <div className="h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="p-3">
            {/* Section label */}
            <div className="px-3 py-2 mb-1">
              <p className="text-[10px] font-bold text-muted-foreground/50 uppercase tracking-[0.15em]">
                {item.label}
              </p>
            </div>

            {/* Menu items */}
            <div className="space-y-0.5">
              {item.children.map((child, i) => (
                <motion.div
                  key={child.to}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                >
                  <Link
                    to={child.to}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/8 transition-all duration-200 group"
                  >
                    <div className="shrink-0 rounded-xl bg-primary/10 border border-primary/15 p-2 group-hover:bg-primary/15 group-hover:border-primary/25 transition-all">
                      <child.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {child.label}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {child.desc}
                      </p>
                    </div>
                    {child.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${child.badgeColor}`}>
                        {child.badge}
                      </span>
                    )}
                    <ArrowRight className="h-3 w-3 text-muted-foreground/0 group-hover:text-muted-foreground transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom glow */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileMenu = ({
  open,
  onClose,
  navItems,
  invite,
}: {
  open: boolean;
  onClose: () => void;
  navItems: NavItem[];
  invite: string;
}) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredItems = navItems.filter((item) =>
    search === "" || item.label.toLowerCase().includes(search.toLowerCase()) ||
    item.children?.some((c) => c.label.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden fixed inset-0 z-40"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm glass-strong border-l border-border/20 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 p-4 border-b border-border/20 bg-background/80 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-3">
                <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
                  <img src={logo} alt="VixonCloud" className="h-7 w-7 rounded-lg" />
                  <span className="font-bold text-base font-display">
                    Vixon<span className="gradient-text">Cloud</span>
                  </span>
                </Link>
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.9, rotate: 90 }}
                  className="h-9 w-9 rounded-xl glass flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 text-sm rounded-xl bg-secondary/50 border-border/30"
                />
              </div>
            </div>

            {/* Menu items */}
            <div className="p-3 space-y-1">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                >
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary/8 transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="h-4 w-4 text-primary" />
                          {item.label}
                        </span>
                        <motion.div
                          animate={{ rotate: expanded === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4"
                          >
                            <div className="py-1 space-y-0.5">
                              {item.children.map((child, j) => (
                                <motion.div
                                  key={child.to}
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.03 }}
                                >
                                  <Link
                                    to={child.to}
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/8 transition-colors"
                                  >
                                    <div className="rounded-lg bg-primary/10 p-1.5">
                                      <child.icon className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-medium">{child.label}</p>
                                      <p className="text-[11px] text-muted-foreground">{child.desc}</p>
                                    </div>
                                    {child.badge && (
                                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${child.badgeColor}`}>
                                        {child.badge}
                                      </span>
                                    )}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={item.to!}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-foreground hover:bg-primary/8 transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="sticky bottom-0 p-4 border-t border-border/20 bg-background/80 backdrop-blur-xl space-y-2">
              <a href={invite} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                <Button variant="outline" size="sm" className="w-full gap-2 h-11 rounded-xl">
                  <MessagesSquare className="h-4 w-4" /> Discord
                </Button>
              </a>
              <a href={CLIENT_PANEL_URL} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                <Button variant="outline" size="sm" className="w-full gap-2 h-11 rounded-xl">
                  <Receipt className="h-4 w-4" /> Client Panel
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
              <a href={GAME_PANEL_URL} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                <Button size="sm" className="w-full gap-2 h-11 glow-primary bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold">
                  <LayoutDashboard className="h-4 w-4" /> Game Panel
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollYRef = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const invite = useDiscordInvite();
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load announcement visibility from localStorage
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("vixon-announcement-dismissed");
      if (dismissed) setAnnouncementVisible(false);
    } catch { /* localStorage may be unavailable */ }
  }, []);

  const dismissAnnouncement = useCallback(() => {
    setAnnouncementVisible(false);
    try { localStorage.setItem("vixon-announcement-dismissed", "1"); } catch { /* localStorage may be unavailable */ }
  }, []);

  // Scroll handling: auto-hide navbar + auto-hide announcement bar + glass effect
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        setScrolled(currentY > 20);

        // Auto-hide announcement bar when scrolling down
        if (currentY > 100 && announcementVisible) {
          setAnnouncementVisible(false);
        }

        if (currentY < 60) {
          setHidden(false);
        } else if (currentY > lastScrollYRef.current + 5) {
          setHidden(true);
          setHoveredItem(null);
        } else if (currentY < lastScrollYRef.current - 5) {
          setHidden(false);
        }
        lastScrollYRef.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [announcementVisible]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
    setHoveredItem(null);
  }, [location.pathname]);

  const handleDesktopEnter = useCallback((label: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredItem(label);
  }, []);

  const handleDesktopLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => setHoveredItem(null), 150);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{
          y: hidden ? -80 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
          scrolled
            ? "glass-strong shadow-lg shadow-black/30 border-b border-border/10"
            : "bg-transparent"
        }`}
        style={{ top: announcementVisible ? "32px" : "0px" }}
      >
        <div className="container mx-auto flex h-14 items-center justify-between px-4 overflow-hidden">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <motion.img
              src={logo}
              alt="VixonCloud"
              className="h-7 w-7 rounded-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            />
            <span className="font-bold text-base font-display">
              Vixon<span className="gradient-text">Cloud</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <LayoutGroup>
            <div className="hidden lg:flex items-center gap-0.5 min-w-0">
              {navItems.map((item) => {
                if (item.children) {
                  const isActive = item.children.some((c) => location.pathname === c.to);
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => handleDesktopEnter(item.label)}
                      onMouseLeave={handleDesktopLeave}
                    >
                      <button
                        className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors relative ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.icon && <item.icon className="h-3.5 w-3.5" />}
                        {item.label}
                        <motion.div
                          animate={{ rotate: hoveredItem === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </motion.div>
                        {isActive && (
                          <motion.div
                            layoutId="nav-active-bg"
                            className="absolute inset-0 rounded-lg bg-primary/8 -z-10"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                      <MegaMenu
                        item={item}
                        onClose={() => setHoveredItem(null)}
                        isHovered={hoveredItem === item.label}
                      />
                    </div>
                  );
                }

                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.label}
                    to={item.to!}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors relative ${
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.icon && <item.icon className="h-3.5 w-3.5" />}
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-lg bg-primary/8 -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <motion.a
              href={invite}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button size="sm" variant="outline" className="gap-1.5 text-sm h-9 rounded-lg">
                <MessagesSquare className="h-4 w-4" /> <span className="hidden xl:inline">Discord</span>
              </Button>
            </motion.a>
            <ThemeToggle />
            <motion.a
              href={CLIENT_PANEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button size="sm" variant="outline" className="gap-1.5 text-sm h-9 rounded-lg">
                <Receipt className="h-4 w-4" /> <span className="hidden xl:inline">Client Panel</span>
              </Button>
            </motion.a>
            <motion.a
              href={GAME_PANEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="sm" className="glow-primary text-sm h-9 gap-1.5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg">
                <LayoutDashboard className="h-4 w-4" /> <span className="hidden xl:inline">Game Panel</span>
              </Button>
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <motion.button
            whileTap={{ scale: 0.9, rotate: 90 }}
            className="lg:hidden h-9 w-9 rounded-xl glass flex items-center justify-center"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Announcement Bar */}
      <AnimatePresence>
        {announcementVisible && (
          <div className="fixed top-0 left-0 right-0 z-[60]">
            <AnnouncementBar onClose={dismissAnnouncement} />
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        navItems={navItems}
        invite={invite}
      />
    </>
  );
};

export default Navbar;
