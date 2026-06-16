import { motion } from "framer-motion";
import { Star, Quote, ExternalLink, MessageCircle, ThumbsUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const staticReviews = [
  { id: "s1", name: "Aarav K.", text: "Best MC hosting I've ever used. Zero lag with 80+ players on my SMP. The DDoS protection saved us three times last month alone.", stars: 5, role: "SMP Owner" },
  { id: "s2", name: "Priya S.", text: "My Discord bot has been running for 3 months straight with zero restarts. Incredible value for the price — absolutely worth it.", stars: 5, role: "Bot Developer" },
  { id: "s3", name: "Rohan M.", text: "Ryzen 9 performance is insane — consistent 20 TPS with 100+ players, mods, and plugins. The NVMe storage makes chunk loading instant.", stars: 5, role: "Server Admin" },
  { id: "s4", name: "Arjun P.", text: "Moved from a budget host and the difference is night and day. Sub-10ms latency, instant support responses, and the panel is incredibly intuitive.", stars: 5, role: "Network Owner" },
  { id: "s5", name: "Sneha R.", text: "Deployed a Rust server in 45 seconds flat. The one-click mod installer saved me hours of manual setup. Highly recommended!", stars: 5, role: "Game Developer" },
  { id: "s6", name: "Vikram T.", text: "Support team responds in under 3 minutes, even at 2 AM. They helped me optimize my server config and doubled my player capacity.", stars: 5, role: "Community Manager" },
];

const stats = [
  { label: "Happy Customers", value: "2,500+", icon: Users },
  { label: "5-Star Reviews", value: "1,200+", icon: Star },
  { label: "Avg Response", value: "<5 min", icon: MessageCircle },
];

const TestimonialsSection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      <motion.div className="absolute top-20 right-10 opacity-[0.03]" animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
        <Quote className="h-40 w-40 text-primary" />
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-primary mb-6 animate-shimmer">
            <MessageCircle className="h-3.5 w-3.5" />
            Trusted by Thousands
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-display">
            Loved by{" "}
            <motion.span className="gradient-text inline-block" whileInView={{ scale: [0.8, 1.08, 1] }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              Gamers
            </motion.span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
            Don't just take our word for it. Here's what our community has to say about VixonCloud.
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-12"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 glass rounded-xl px-4 py-2.5"
            >
              <s.icon className="w-4 h-4 text-primary" />
              <div>
                <div className="text-sm font-bold text-white">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {staticReviews.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="min-w-[300px] max-w-[340px] snap-start shrink-0 rounded-xl glass gradient-border p-5 relative overflow-hidden group"
              >
                <Quote className="absolute top-4 right-4 h-7 w-7 text-primary/5" />
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center font-bold text-sm text-primary font-display">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm font-display">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.role}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} className="h-2.5 w-2.5 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">"{t.text}"</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> Helpful</span>
                  <span>Verified Customer</span>
                </div>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[1px]"
                  style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.25), transparent)" }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 0.8 }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto glass gradient-border rounded-xl p-6 text-center mt-10"
        >
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className="h-5 w-5 fill-[#00b67a] text-[#00b67a]" />
            ))}
          </div>
          <p className="text-sm font-semibold mb-1">Rate us 5 Stars on Trustpilot!</p>
          <p className="text-xs text-muted-foreground mb-4">Your feedback helps us grow and serve you better.</p>
          <a href="https://www.trustpilot.com/review/vixoncloud.com" target="_blank" rel="noopener noreferrer">
            <Button className="gap-2 bg-[#00b67a] hover:bg-[#00a06a] text-white text-xs">
              <Star className="h-3.5 w-3.5 fill-white" />
              Review us on Trustpilot
              <ExternalLink className="h-3 w-3" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
