import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export interface CartLine {
  plan_name: string;
  plan_category?: string;
  unit_price_inr: number;
  plan_id?: string | null;
  quantity?: number;
}

export const addToCart = async (line: CartLine) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    toast({ title: "Please sign in", description: "Create an account to add items to your cart.", variant: "destructive" });
    window.location.href = "/sign-in";
    return false;
  }
  const { error } = await supabase.from("cart_items").insert({
    user_id: user.id,
    plan_id: line.plan_id ?? null,
    plan_name: line.plan_name,
    plan_category: line.plan_category ?? null,
    unit_price_inr: line.unit_price_inr,
    quantity: line.quantity ?? 1,
  });
  if (error) {
    toast({ title: "Failed to add", description: error.message, variant: "destructive" });
    return false;
  }
  toast({ title: "Added to cart", description: line.plan_name });
  return true;
};
