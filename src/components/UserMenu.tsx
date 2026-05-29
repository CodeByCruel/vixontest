import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, User, Receipt, Settings, ShoppingCart, ShieldCheck, LogOut, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const UserMenu = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const nav = useNavigate();

  if (!user) {
    return (
      <Link to="/sign-in">
        <Button size="sm" variant="outline" className="gap-1.5 h-9">
          <LogIn className="h-4 w-4" /> Sign in
        </Button>
      </Link>
    );
  }

  const initials = (profile?.full_name || profile?.username || user.email || "U")
    .split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 px-1.5 gap-2 rounded-full">
          <Avatar className="h-7 w-7">
            <AvatarImage src={profile?.avatar_url || undefined} />
            <AvatarFallback className="bg-primary/15 text-primary text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col">
            <span className="text-sm font-medium">{profile?.full_name || profile?.username || "User"}</span>
            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => nav("/dashboard")}><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => nav("/dashboard/profile")}><User className="h-4 w-4 mr-2" />Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={() => nav("/cart")}><ShoppingCart className="h-4 w-4 mr-2" />Cart</DropdownMenuItem>
        <DropdownMenuItem onClick={() => nav("/dashboard/billing")}><Receipt className="h-4 w-4 mr-2" />Billing</DropdownMenuItem>
        <DropdownMenuItem onClick={() => nav("/dashboard/settings")}><Settings className="h-4 w-4 mr-2" />Settings</DropdownMenuItem>
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => nav("/adminpagemeow/panel")}>
              <ShieldCheck className="h-4 w-4 mr-2 text-primary" />Admin panel
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={async () => { await signOut(); nav("/"); }} className="text-destructive">
          <LogOut className="h-4 w-4 mr-2" />Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
