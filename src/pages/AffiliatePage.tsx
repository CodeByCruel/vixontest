import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Share2,
  UserPlus,
  IndianRupee,
  TrendingUp,
  Users,
  Award,
  Star,
  Shield,
  Headphones,
  Server,
  ExternalLink,
  ChevronRight,
  HelpCircle,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DISCORD_INVITE } from "@/lib/vixon";

const steps = [
  {
    icon: Share2,
    title: "Share your link",
    desc: "Get a unique referral link from your dashboard and share it with friends, communities, or on social media.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: UserPlus,
    title: "Friends sign up",
    desc: "They purchase any hosting plan using your referral link — no extra cost to them.",
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: IndianRupee,
    title: "Earn commission",
    desc: "Get 20% of their first payment, paid directly via UPI or bank transfer. No caps, no limits.",
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
  },
];

const tiers = [
  {
    name: "Basic",
    referrals: "1-5 referrals",
    commission: "20%",
    color: "from-blue-500/15 to-cyan-500/5 border-blue-500/30",
    badge: "bg-blue-500/15 text-blue-400",
    perks: ["20% per referral", "Monthly payouts", "Dashboard analytics"],
    featured: false,
  },
  {
    name: "Pro",
    referrals: "6-20 referrals",
    commission: "25%",
    color: "from-purple-500/15 to-violet-500/5 border-purple-500/30",
    badge: "bg-purple-500/15 text-purple-400",
    perks: ["25% per referral", "Priority support badge", "Faster payouts", "Exclusive updates"],
    featured: true,
  },
  {
    name: "Elite",
    referrals: "21+ referrals",
    commission: "30%",
    color: "from-amber-500/15 to-orange-500/5 border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-400",
    perks: ["30% per referral", "Free server", "Dedicated account manager", "Custom payouts"],
    featured: false,
  },
];

const stats = [
  { value: "₹50,000+", label: "Paid out to affiliates", icon: IndianRupee },
  { value: "200+", label: "Active affiliates", icon: Users },
  { value: "₹500", label: "Avg per referral", icon: TrendingUp },
];

const faqs = [
  {
    q: "How do I get my referral link?",
    a: "Once you join the program through our Discord, we'll generate a unique referral link for you. You can find it in your affiliate dashboard along with real-time tracking of your referrals and earnings.",
  },
  {
    q: "When do I get paid?",
    a: "Payouts are processed monthly, typically within the first week of each month. Once your balance reaches the minimum payout threshold, we'll send your commission via UPI or bank transfer — whichever you prefer.",
  },
  {
    q: "Is there a minimum payout?",
    a: "Yes, the minimum payout is ₹500. If your monthly earnings are below this threshold, they'll roll over to the next month until you reach the minimum. There's no cap on how much you can earn.",
  },
  {
    q: "Can I refer myself?",
    a: "No, self-referrals are not allowed. You must refer a new customer who hasn't used VixonCloud before. We verify all referrals to ensure fairness for our affiliate community.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const AffiliatePage = () => (
  <div className="min-h-screen relative">
    <SEOHead
      title="Affiliate Program — VixonCloud"
      description="Refer friends to VixonCloud and earn up to 30% commission on every referral. Join our affiliate program today."
      path="/affiliate"
    />
    <AnimatedBackground />
    <Navbar />
    <main className="pt-24 pb-20 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Hero */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs text-primary mb-6">
            AFFILIATE PROGRAM
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-display">
            Earn with <span className="gradient-text">VixonCloud</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Refer friends, earn commissions. Our affiliate program rewards you with real money for every new customer you bring in.
          </p>
        </motion.div>

        {/* How it works */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-center mb-3">
            How it works
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-10 max-w-lg mx-auto">
            Three simple steps to start earning commissions.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative"
              >
                <Card className={`p-6 h-full glass gradient-border card-lift`}>
                  <div className="flex flex-col items-start">
                    <div className={`h-12 w-12 rounded-xl ${step.bg} border flex items-center justify-center mb-4`}>
                      <step.icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-mono">STEP {i + 1}</span>
                      {i < 2 && (
                        <ChevronRight className="h-3 w-3 text-muted-foreground/40 absolute top-7 right-4 hidden md:block" />
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base mb-2">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commission tiers */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="mb-20">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-center mb-3">
            Commission <span className="gradient-text">tiers</span>
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-10 max-w-lg mx-auto">
            The more you refer, the more you earn. Unlock higher tiers as you grow.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <Card className={`p-6 h-full flex flex-col bg-gradient-to-br ${tier.color} relative overflow-hidden card-lift`}>
                  {tier.featured && (
                    <div className="absolute top-3 right-3 text-[10px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="h-3 w-3" /> POPULAR
                    </div>
                  )}
                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`inline-flex w-fit items-center text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md ${tier.badge} mb-3`}>
                      {tier.commission} COMMISSION
                    </div>
                    <h3 className="text-2xl font-extrabold font-display mb-1">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{tier.referrals}</p>
                    <ul className="space-y-2 flex-1 mb-5">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-center gap-2 text-xs text-foreground/80">
                          <Award className="h-3.5 w-3.5 text-primary shrink-0" /> {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mb-20">
          <div className="grid gap-6 md:grid-cols-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
              >
                <Card className="p-6 text-center glass gradient-border card-lift">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-extrabold font-display gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="mb-20 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold font-display text-center mb-3">
            Frequently asked <span className="text-primary text-glow">questions</span>
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-10">
            Everything you need to know about the affiliate program.
          </p>
          <div className="glass rounded-xl gradient-border overflow-hidden">
            <Accordion type="single" collapsible className="px-6 pb-4">
              {faqs.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border/10">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline hover:text-primary transition-colors py-3">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-xs leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center glass rounded-xl gradient-border p-10"
        >
          <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
          <h3 className="font-display text-2xl font-bold mb-2">Ready to start earning?</h3>
          <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto">
            Join our affiliate program on Discord and start earning commissions today. No sign-up fees, no hidden terms.
          </p>
          <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold">
              Join the Affiliate Program <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </motion.div>

      </div>
    </main>
    <Footer />
  </div>
);

export default AffiliatePage;
