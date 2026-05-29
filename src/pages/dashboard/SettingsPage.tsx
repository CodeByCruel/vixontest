import { useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { KeyRound, Bell } from "lucide-react";

const SettingsPage = () => {
  const { user } = useAuth();
  const [newPass, setNewPass] = useState("");
  const [emailNotif, setEmailNotif] = useState(true);
  const [orderNotif, setOrderNotif] = useState(true);

  const changePassword = async () => {
    const v = z.string().min(8, "Min 8 characters").safeParse(newPass);
    if (!v.success) return toast({ title: v.error.issues[0].message, variant: "destructive" });
    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) return toast({ title: "Failed", description: error.message, variant: "destructive" });
    toast({ title: "Password updated" });
    setNewPass("");
  };

  return (
    <DashboardLayout title="Settings">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><KeyRound className="h-4 w-4 text-primary" /> Security</CardTitle>
            <CardDescription>Change your password</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">New password</Label>
              <Input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="Min 8 characters" />
            </div>
            <Button onClick={changePassword} size="sm">Update password</Button>
            <p className="text-xs text-muted-foreground pt-2">Signed in as <span className="text-foreground">{user?.email}</span></p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Notification preferences</CardTitle>
            <CardDescription>What we'll alert you about</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-3">
              <div><p className="text-sm font-medium">Email notifications</p><p className="text-xs text-muted-foreground">Order receipts, invoices, replies</p></div>
              <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
            </div>
            <div className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-3">
              <div><p className="text-sm font-medium">Order status updates</p><p className="text-xs text-muted-foreground">In-app + email when status changes</p></div>
              <Switch checked={orderNotif} onCheckedChange={setOrderNotif} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
