const DiscordWidget = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-2xl overflow-hidden border border-primary/20 shadow-xl shadow-primary/10 bg-card/40 backdrop-blur-sm ${className}`}>
    <iframe
      src="https://discord.com/widget?id=1484178640609742868&theme=dark"
      width="350"
      height="500"
      allowTransparency
      frameBorder="0"
      sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
      title="VixonCloud Discord"
      className="block w-full max-w-[350px]"
    />
  </div>
);

export default DiscordWidget;
