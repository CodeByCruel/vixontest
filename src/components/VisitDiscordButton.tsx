import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle, ShoppingCart } from "lucide-react";
import { useDiscordInvite } from "@/lib/vixon";

interface Props {
  label?: string;
  className?: string;
  size?: "sm" | "lg" | "default";
  variant?: "default" | "outline";
  fullWidth?: boolean;
  icon?: boolean;
}

const VisitDiscordButton = ({ label = "Visit Discord", className = "", size = "sm", variant = "default", fullWidth, icon = true }: Props) => {
  const [open, setOpen] = useState(false);
  const invite = useDiscordInvite();

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        onClick={() => setOpen(true)}
        className={`${fullWidth ? "w-full" : ""} gap-1.5 ${className}`}
      >
        {icon && <ShoppingCart className="h-3.5 w-3.5" />}
        {label}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" /> Billing is temporarily off
            </DialogTitle>
            <DialogDescription className="pt-2 leading-relaxed">
              Our website checkout is temporarily disabled. To place an order right now, please join our Discord — our team will set everything up instantly.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-between gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            <a href={invite} target="_blank" rel="noopener noreferrer" className="inline-flex">
              <Button className="gap-1.5 glow-primary">
                <ExternalLink className="h-4 w-4" /> Open Discord
              </Button>
            </a>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VisitDiscordButton;
