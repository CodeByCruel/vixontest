import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, hsl(210 100% 55%), hsl(180 100% 60%))",
          boxShadow: "0 0 10px hsl(210 100% 55% / 0.6), 0 0 20px hsl(180 100% 60% / 0.3)",
        }}
      />
    </motion.div>
  );
};

export default ScrollProgress;
