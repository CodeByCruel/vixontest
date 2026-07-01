import { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Server, Shield, CreditCard, Zap, MessageCircle, ExternalLink, Gamepad2, Globe, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqCategories = [
  {
    title: "General",
    icon: HelpCircle,
    items: [
      { q: "What is VixonCloud?", a: "VixonCloud is a premium game server hosting provider offering high-performance servers for Minecraft, Palworld, Rust, Valheim, and more. We provide instant setup, DDoS protection, and 24/7 support." },
      { q: "How do I get started?", a: "Simply choose a plan from our hosting pages, complete your order, and your server will be set up within minutes. You can also join our Discord for instant assistance." },
      { q: "What games do you support?", a: "We support Minecraft (Java & Bedrock), Palworld, Rust, Valheim, Terraria, 7 Days to Die, ARK, Satisfactory, Hytale, and more. Check our Games section for the full list." },
      { q: "Do you offer a free trial?", a: "We don't offer free trials, but our starter plans are very affordable starting at ₹20/GB. If you're not satisfied, reach out to our support team within 24 hours." },
      { q: "Who owns VixonCloud?", a: "VixonCloud is owned and operated by Deepak and Akshit. We started with a mission to provide affordable, reliable hosting for the Indian gaming community." },
      { q: "Where is VixonCloud based?", a: "We are based in India and serve customers worldwide. Our servers are located in multiple regions for low-latency connections." },
    ],
  },
  {
    title: "Servers & Performance",
    icon: Server,
    items: [
      { q: "What hardware do your servers use?", a: "Our servers run on enterprise-grade hardware with NVMe SSDs, high-clock-speed CPUs (Intel Platinum 8269-CY for Starter, AMD EPYC 7K62 for Standard, AMD EPYC 9754 for Premium), and DDR4/DDR5 ECC RAM." },
      { q: "Where are your servers located?", a: "We have server locations optimized for low latency across India, US, and Europe. Contact us on Discord for specific location details." },
      { q: "What is your uptime guarantee?", a: "We guarantee 99.99% uptime. Our infrastructure includes redundant power, networking, and automatic failover systems." },
      { q: "Can I upgrade my plan later?", a: "Yes! You can upgrade your plan at any time. Contact our support team and we'll handle the upgrade seamlessly with zero downtime." },
      { q: "What is NVMe storage?", a: "NVMe (Non-Volatile Memory Express) is the fastest storage technology available, offering up to 7x faster read/write speeds compared to traditional SSDs. All our plans use enterprise NVMe drives." },
      { q: "How much RAM do I need for Minecraft?", a: "For vanilla Minecraft with 10 players, 2-4GB is enough. For modded servers with 20+ players, we recommend 8-16GB. Check our plan recommendations for specific player counts." },
      { q: "Do you support modded Minecraft?", a: "Yes! We support all major modpacks including Forge, Fabric, Paper, Spigot, BungeeCord, and more. One-click mod installation available on our game panel." },
    ],
  },
  {
    title: "Security & Protection",
    icon: Shield,
    items: [
      { q: "Do you provide DDoS protection?", a: "Yes, all our servers come with enterprise-grade DDoS protection included at no extra cost. We mitigate attacks automatically without any action needed from you." },
      { q: "Are my files backed up?", a: "We perform regular backups of your server data. You can also create manual backups at any time through your server panel." },
      { q: "Is my data secure?", a: "Absolutely. We use encrypted connections, secure data centers, and follow industry best practices to keep your data safe." },
      { q: "How does DDoS protection work?", a: "Our DDoS protection uses advanced traffic filtering to identify and block malicious traffic while allowing legitimate players through. It works at the network level, so there's no impact on server performance." },
      { q: "Can I set up a firewall?", a: "Yes, you have full root access to your server. You can configure firewalls, IP whitelisting, and other security measures as needed." },
    ],
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    items: [
      { q: "What payment methods do you accept?", a: "We accept UPI payments through FamPay. Simply place your order and follow the payment instructions. We also support bank transfers for larger orders." },
      { q: "How does billing work?", a: "We offer monthly billing cycles. Your server remains active as long as your subscription is current. You'll receive reminders before your next billing date." },
      { q: "Can I get a refund?", a: "For Minecraft servers: full refund within 12 hours of purchase, or 75% refund within 24 hours (25% setup fee retained). After 24 hours, no refund. VPS hosting is non-refundable. Contact us on Discord to request a refund." },
      { q: "Do you offer discounts?", a: "Yes! We regularly offer coupon codes and special promotions. Follow us on Discord to stay updated on deals. We also have an affiliate program where you can earn credits." },
      { q: "Will I be charged automatically?", a: "Yes, billing is automatic each month. You can cancel anytime from your dashboard. If you need to pause billing, contact our support team." },
      { q: "What happens if I don't pay on time?", a: "If your payment is overdue, your server will be suspended after 3 days. Your data is retained for 30 days, after which it may be deleted. Contact us to restore your server." },
    ],
  },
  {
    title: "Bot Hosting",
    icon: Zap,
    items: [
      { q: "What is bot hosting?", a: "We host Discord bots 24/7 so they stay online without you needing to keep your computer running. Just upload your bot code and we handle the rest." },
      { q: "What languages are supported for bots?", a: "We support Node.js (JavaScript/TypeScript) and Python bots. Contact us if you need support for other languages like Java or Go." },
      { q: "How much RAM does my bot need?", a: "Most Discord bots run perfectly on 512MB-1GB RAM. Larger bots with many features may need 2-4GB. Start small and upgrade as needed." },
      { q: "Can I host multiple bots on one plan?", a: "Yes! You can run multiple bot instances on a single plan as long as you have enough RAM and CPU resources. Each bot runs in its own container." },
    ],
  },
  {
    title: "VPS Hosting",
    icon: Globe,
    items: [
      { q: "What is VPS hosting?", a: "VPS (Virtual Private Server) hosting gives you a dedicated portion of a physical server with guaranteed resources. You get full root access, your own OS, and complete control." },
      { q: "Do you manage my VPS?", a: "Our VPS plans are unmanaged, meaning you have full control. We provide the hardware, network, and DDoS protection. You handle software installation and maintenance." },
      { q: "What OS can I install?", a: "You can install any Linux distribution (Ubuntu, Debian, CentOS, etc.) or Windows Server. We provide templates for quick deployment." },
      { q: "Can I reinstall my OS?", a: "Yes, you can reinstall your OS at any time from the VPS management panel. Note that this will wipe all data on the server." },
    ],
  },
  {
    title: "Technical Support",
    icon: Headphones,
    items: [
      { q: "How do I contact support?", a: "The best way is through our Discord server. Create a support ticket and our team will respond within minutes, 24/7. You can also email us for non-urgent issues." },
      { q: "What are your support hours?", a: "We provide 24/7 support through Discord. Our team responds to most tickets within 5-15 minutes during peak hours, and within 1 hour during off-peak." },
      { q: "Can you help me set up my server?", a: "Yes! Our team can help with initial server setup, mod installation, plugin configuration, and more. Just ask in your support ticket." },
      { q: "Do you offer server migration?", a: "Yes, we can help you migrate from another host. Contact our support team with your current server details and we'll handle the migration for you." },
      { q: "What panel do you use?", a: "We use Pterodactyl, an open-source game server management panel. It provides a clean web interface for managing your server, files, consoles, and more." },
    ],
  },
];

const FAQPage = () => {
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqCategories.flatMap((cat) =>
        cat.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        }))
      ),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("faq-schema");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen animated-bg">
    <SEOHead
        title="FAQ | VixonCloud"
        description="Find answers to common questions about VixonCloud's game server hosting, billing, DDoS protection, VPS hosting, and more."
        path="/faq"
      />
      <Navbar />
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-primary font-medium mb-4">
              <HelpCircle className="h-3 w-3" /> Frequently Asked Questions
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-black tracking-tight mb-3">
              GOT <span className="text-primary text-glow">QUESTIONS?</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Find answers to common questions about our hosting services, billing, and more.
            </p>
          </motion.div>

          {/* FAQ Categories */}
          <div className="space-y-6">
            {faqCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
                className="glass rounded-xl gradient-border overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 pt-5 pb-2">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/12 flex items-center justify-center">
                    <cat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="font-display text-base font-bold">{cat.title}</h2>
                </div>
                <Accordion type="single" collapsible className="px-6 pb-4">
                  {cat.items.map((item, i) => (
                    <AccordionItem key={i} value={`${ci}-${i}`} className="border-border/10">
                      <AccordionTrigger className="text-sm font-medium hover:no-underline hover:text-primary transition-colors py-3">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-12 text-center glass rounded-xl gradient-border p-8"
          >
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-display text-lg font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground text-xs mb-5">
              Our support team is available 24/7 on Discord. Create a ticket and we'll help you out!
            </p>
            <a href="https://discord.gg/TtV26hZEJx" target="_blank" rel="noopener noreferrer">
              <Button className="glow-primary gap-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                <ExternalLink className="h-3.5 w-3.5" /> Join Discord
              </Button>
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
