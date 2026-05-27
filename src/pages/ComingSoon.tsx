import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Server, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ComingSoon = ({ title, blurb }: { title: string; blurb: string }) => (
  <div className="min-h-screen relative">
    <AnimatedBackground />
    <Navbar />
    <main className="pt-32 pb-16 relative z-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Card className="p-10 text-center bg-card/60">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 pulse-ring">
              <Server className="h-7 w-7 text-primary" />
            </div>
            <p className="inline-flex items-center gap-1.5 text-xs text-primary mb-4 font-medium">
              <Clock className="h-3.5 w-3.5" /> Coming Soon
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 font-display">{title}</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">{blurb}</p>
            <div className="flex gap-3 justify-center">
              <Link to="/"><Button variant="outline">Back home</Button></Link>
              <Link to="/contact"><Button className="glow-primary bg-primary text-primary-foreground hover:bg-primary/90">Notify me</Button></Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
    <Footer />
  </div>
);

export default ComingSoon;
