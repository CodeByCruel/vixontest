import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
 Menu, X, ExternalLink, FileText, LayoutDashboard, ChevronDown, Gamepad2,
 Box, Cpu, Rocket, Globe, Bot, HelpCircle, Activity, MessagesSquare, Home, Sparkles, Receipt
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/vixon-logo.png";
import { useDiscordInvite } from "@/lib/vixon";

const GAME_PANEL_URL = "https://dash.vixoncloud.com";
const CLIENT_PANEL_URL = "https://billing.vixoncloud.com";

const Navbar = () => {
 const [open, setOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
 const location = useLocation();
 const invite = useDiscordInvite();

 useEffect(() => {
 const onScroll = () => setScrolled(window.scrollY > 20);
 window.addEventListener("scroll", onScroll, { passive: true });
 return () => window.removeEventListener("scroll", onScroll);
 }, []);

 const navItems: Array<{ label: string; to?: string; icon?: any; external?: boolean; children?: Array<{ label: string; to: string; icon: any; desc: string; external?: boolean }> }> = [
 { label: "Home", to: "/", icon: Home },
 {
 label: "Minecraft",
 children: [
 { label: "All Plans Overview", to: "/minecraft-plans", icon: Box, desc: "Compare all three tiers" },
 { label: " Starter Tier", to: "/minecraft-starter", icon: Box, desc: "From ₹20/GB — small SMPs" },
 { label: " Standard Tier", to: "/minecraft-standard", icon: Box, desc: "From ₹40/GB — most popular" },
 { label: " Premium Tier", to: "/minecraft-premium", icon: Box, desc: "From ₹55/GB — top performance" },
 ],
 },
 {
 label: "Services",
 children: [
 { label: "Bot Plan", to: "/bot-plans", icon: Bot, desc: "Discord bot hosting" },
 { label: "Website Plan", to: "/website-plans", icon: Globe, desc: "We build websites for you" },
 { label: "VPS Starter Plan", to: "/vps-starter", icon: Cpu, desc: "Intel VPS from ₹400/mo" },
 { label: "VPS Premium Plan", to: "/vps-premium", icon: Rocket, desc: "AMD EPYC VPS from ₹500/mo" },
 ],
 },
 { label: "Games", to: "/games", icon: Gamepad2 },
 { label: "Features", to: "/features", icon: Sparkles },
 {
 label: "Company",
 children: [
 { label: "About Us", to: "/about", icon: Sparkles, desc: "Our mission & history" },
 { label: "Why Us", to: "/why-us", icon: Activity, desc: "Why thousands trust us" },
 { label: "FAQ", to: "/faq", icon: HelpCircle, desc: "Common questions" },
 { label: "Contact", to: "/contact", icon: MessagesSquare, desc: "Get in touch" },
 { label: "Status", to: "/status", icon: Activity, desc: "Live system status" },
 { label: "Terms & Refund Policy",to: "/tos", icon: FileText, desc: "Legal terms" },
 ],
 },
 ];

 return (
 <motion.nav
 initial={{ y: -80, opacity: 0 }}
 animate={{ y: 0, opacity: 1 }}
 transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
 className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass-strong shadow-lg shadow-black/30" : "bg-transparent"}`}
 >
 <div className="container mx-auto flex h-14 items-center justify-between px-4">
 <Link to="/" className="flex items-center gap-2.5 shrink-0">
 <img src={logo} alt="VixonCloud" className="h-7 w-7 rounded-lg" />
 <span className="font-bold text-base font-display">
 Vixon<span className="gradient-text">Cloud</span>
 </span>
 </Link>

 {/* Desktop nav */}
 <div className="hidden lg:flex items-center gap-0.5">
 {navItems.map((item) => {
 if (item.children) {
 return (
 <div
 key={item.label}
 className="relative"
 onMouseEnter={() => setActiveDropdown(item.label)}
 onMouseLeave={() => setActiveDropdown(null)}
 >
 <button className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
 {item.label}
 <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
 </button>
 <AnimatePresence>
 {activeDropdown === item.label && (
 <motion.div
 initial={{ opacity: 0, y: 8 }}
 animate={{ opacity: 1, y: 0 }}
 exit={{ opacity: 0, y: 8 }}
 transition={{ duration: 0.18 }}
 className="absolute top-full left-0 mt-1 w-72 rounded-xl glass-strong border border-border/20 p-2 shadow-xl"
 >
 {item.children.map((child) => (
 <Link
 key={child.label}
 to={child.to}
 onClick={() => setActiveDropdown(null)}
 className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-primary/8 transition-colors"
 >
 <div className="shrink-0 rounded-lg bg-primary/10 border border-primary/15 p-1.5 mt-0.5">
 <child.icon className="h-4 w-4 text-primary" />
 </div>
 <div>
 <p className="text-sm font-medium text-foreground">{child.label}</p>
 <p className="text-xs text-muted-foreground mt-0.5">{child.desc}</p>
 </div>
 </Link>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 }

 const active = location.pathname === item.to;
 return (
 <Link
 key={item.label}
 to={item.to!}
 className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${active ? "text-primary bg-primary/8" : "text-muted-foreground hover:text-foreground"}`}
 >
 {item.icon && <item.icon className="h-3.5 w-3.5" />}
 {item.label}
 </Link>
 );
 })}
 </div>

 {/* Right side */}
 <div className="hidden lg:flex items-center gap-2 shrink-0">
 <a href={invite} target="_blank" rel="noopener noreferrer">
 <Button size="sm" variant="outline" className="gap-1.5 text-sm h-9">
 <MessagesSquare className="h-4 w-4" /> Discord
 </Button>
 </a>
 <a href={CLIENT_PANEL_URL} target="_blank" rel="noopener noreferrer">
 <Button size="sm" variant="outline" className="gap-1.5 text-sm h-9">
 <Receipt className="h-4 w-4" /> Client Panel
 <ExternalLink className="h-3 w-3" />
 </Button>
 </a>
 <a href={GAME_PANEL_URL} target="_blank" rel="noopener noreferrer">
 <Button size="sm" className="glow-primary text-sm h-9 gap-1.5 font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
 <LayoutDashboard className="h-4 w-4" /> Game Panel
 <ExternalLink className="h-3 w-3" />
 </Button>
 </a>
 </div>

 {/* Mobile toggle */}
 <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9" onClick={() => setOpen(!open)}>
 {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
 </Button>
 </div>

 {/* Mobile menu */}
 <AnimatePresence>
 {open && (
 <motion.div
 initial={{ opacity: 0, height: 0 }}
 animate={{ opacity: 1, height: "auto" }}
 exit={{ opacity: 0, height: 0 }}
 transition={{ duration: 0.25 }}
 className="lg:hidden overflow-hidden glass-strong border-t border-border/20"
 >
 <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
 {navItems.map((item) => {
 if (item.children) {
 return (
 <div key={item.label}>
 <button
 className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50"
 onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
 >
 {item.label}
 <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`} />
 </button>
 <AnimatePresence>
 {activeDropdown === item.label && (
 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-3 overflow-hidden">
 {item.children.map((child) => (
 <Link key={child.label} to={child.to} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary">
 <child.icon className="h-4 w-4" /> {child.label}
 </Link>
 ))}
 </motion.div>
 )}
 </AnimatePresence>
 </div>
 );
 }
 return (
 <Link key={item.label} to={item.to!} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50">
 {item.icon && <item.icon className="h-4 w-4" />} {item.label}
 </Link>
 );
 })}
 <div className="border-t border-border/20 mt-2 pt-2 flex flex-col gap-2">
 <a href={invite} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
 <Button variant="outline" size="sm" className="w-full gap-1.5"><MessagesSquare className="h-4 w-4" /> Discord</Button>
 </a>
 <a href={CLIENT_PANEL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
 <Button variant="outline" size="sm" className="w-full gap-1.5"><Receipt className="h-4 w-4" /> Client Panel</Button>
 </a>
 <a href={GAME_PANEL_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
 <Button size="sm" className="w-full gap-1.5 glow-primary bg-primary text-primary-foreground hover:bg-primary/90"><LayoutDashboard className="h-4 w-4" /> Game Panel</Button>
 </a>
 </div>
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.nav>
 );
};

export default Navbar;
