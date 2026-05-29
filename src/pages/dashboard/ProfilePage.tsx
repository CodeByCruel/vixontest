import { useState, useEffect } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Save, Upload, BadgeCheck, ShieldAlert } from "lucide-react";

const schema = z.object({
  full_name: z.string().trim().min(1).max(80),
  username: z.string().trim().min(3, "Min 3 chars").max(32).regex(/^[a-zA-Z0-9_]+$/, "Letters, numbers, _ only").optional().or(z.literal("")),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  state: z.string().trim().max(80).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  postal_code: z.string().trim().max(20).optional().or(z.literal("")),
});

const ProfilePage = () => {
  const { user, profile, reloadProfile } = useAuth();
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (profile) setForm({
      full_name: profile.full_name || "",
      username: profile.username || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      country: profile.country || "",
      postal_code: profile.postal_code || "",
    });
  }, [profile]);

  const save = async () => {
    const v = schema.safeParse(form);
    if (!v.success) return toast({ title: "Invalid input", description: v.error.issues[0].message, variant: "destructive" });
    if (!user) return;
    setSaving(true);
    const payload: any = { ...v.data };
    Object.keys(payload).forEach((k) => { if (payload[k] === "") payload[k] = null; });
    const { error } = await supabase.from("profiles").update(payload).eq("user_id", user.id);
    setSaving(false);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Profile updated" });
    await reloadProfile();
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return;
    if (file.size > 4 * 1024 * 1024) return toast({ title: "Max 4MB", variant: "destructive" });
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (error) { setUploading(false); return toast({ title: "Upload failed", description: error.message, variant: "destructive" }); }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("user_id", user.id);
    setUploading(false);
    toast({ title: "Avatar updated" });
    await reloadProfile();
  };

  const initials = (profile?.full_name || user?.email || "U").split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase();

  return (
    <DashboardLayout title="Profile">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Avatar</CardTitle>
            <CardDescription>JPG/PNG, max 4MB</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-primary/15 text-primary text-xl">{initials}</AvatarFallback>
            </Avatar>
            <label>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && uploadAvatar(e.target.files[0])} />
              <Button asChild variant="outline" size="sm" className="gap-2 cursor-pointer">
                <span><Upload className="h-4 w-4" /> {uploading ? "Uploading…" : "Upload new"}</span>
              </Button>
            </label>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account details</CardTitle>
            <CardDescription>Used for billing and order verification</CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            {[
              { k: "full_name", label: "Full name", required: true },
              { k: "username", label: "Username" },
              { k: "phone", label: "Phone number" },
              { k: "address", label: "Address" },
              { k: "city", label: "City" },
              { k: "state", label: "State / region" },
              { k: "country", label: "Country" },
              { k: "postal_code", label: "Postal code" },
            ].map((f) => (
              <div key={f.k} className="space-y-1.5">
                <Label className="text-xs">{f.label}{f.required && <span className="text-destructive"> *</span>}</Label>
                <Input value={form[f.k] || ""} onChange={(e) => setForm({ ...form, [f.k]: e.target.value })} />
              </div>
            ))}
            <div className="space-y-1.5 sm:col-span-2">
              <Label className="text-xs">Email</Label>
              <Input value={user?.email || ""} disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Verification status</CardTitle>
            <CardDescription>Coming soon</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-border/40 px-3 py-2 text-sm">
              {profile?.phone_verified ? <BadgeCheck className="h-4 w-4 text-green-400" /> : <ShieldAlert className="h-4 w-4 text-muted-foreground" />}
              Phone {profile?.phone_verified ? "verified" : "not verified"}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border/40 px-3 py-2 text-sm">
              {profile?.kyc_status === "approved" ? <BadgeCheck className="h-4 w-4 text-green-400" /> : <ShieldAlert className="h-4 w-4 text-muted-foreground" />}
              KYC: {profile?.kyc_status || "none"}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={save} disabled={saving} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary">
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
