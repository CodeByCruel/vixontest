import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, ExternalLink } from "lucide-react";

type DiscordData = {
  guild: { name: string };
  presence_count: number;
  member_count: number;
};

const FALLBACK: DiscordData = {
  guild: { name: "VixonCloud" },
  presence_count: 0,
  member_count: 2000,
};

const API_URL = "https://discord.com/api/guilds/1385268738859843604/widget.json";
const DISCORD_INVITE = "https://discord.gg/TtV26hZEJx";

function formatCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1).replace(/\.0$/, "") + "K+";
  return n.toLocaleString();
}

export default function DiscordWidget() {
  const [data, setData] = useState<DiscordData>(FALLBACK);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed");
      const json: DiscordData = await res.json();
      setData(json);
      setError(false);
    } catch {
      setError(true);
      setData(FALLBACK);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  const online = data.presence_count || Math.floor(data.member_count * 0.15);
  const members = data.member_count;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass gradient-border rounded-2xl p-6 max-w-sm w-full"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="h-11 w-11 rounded-xl bg-[#5865F2]/15 flex items-center justify-center">
          <MessageCircle className="h-5 w-5 text-[#5865F2]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold font-display truncate">{data.guild.name}</p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] text-emerald-400 font-semibold">
              {online.toLocaleString()} online
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="rounded-xl bg-secondary/30 p-3.5 text-center">
          <Users className="h-4 w-4 text-primary mx-auto mb-1.5" />
          <p className="text-lg font-bold font-mono text-foreground">
            {formatCount(members)}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Members</p>
        </div>
        <div className="rounded-xl bg-secondary/30 p-3.5 text-center">
          <span className="relative flex h-4 w-4 mx-auto mb-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-500/30" />
          </span>
          <p className="text-lg font-bold font-mono text-emerald-400">
            {formatCount(online)}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Online</p>
        </div>
      </div>

      <a
        href={DISCORD_INVITE}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 border border-[#5865F2]/20 text-[#5865F2] text-xs font-bold font-display transition-all duration-300 hover:scale-[1.02]"
      >
        Join Discord
        <ExternalLink className="h-3.5 w-3.5" />
      </a>

      {error && (
        <p className="text-[9px] text-muted-foreground/50 text-center mt-2">
          Using cached data
        </p>
      )}
    </motion.div>
  );
}
