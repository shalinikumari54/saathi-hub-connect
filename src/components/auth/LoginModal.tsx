import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "senior" | "volunteer" | null>(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    // Mock login - in real app, this would validate credentials
    localStorage.setItem("userRole", selectedRole);
    localStorage.setItem("userEmail", email);
    
    toast.success("Login successful!");
    onOpenChange(false);
    
    // Navigate based on role
    switch (selectedRole) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "senior":
        navigate("/senior/dashboard");
        break;
      case "volunteer":
        navigate("/volunteer/dashboard");
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Sign in to your Senior Saathi account
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Role Selection */}
          <div className="space-y-3">
            <Label>Select your role</Label>
            <div className="grid grid-cols-1 gap-2">
              <Card 
                className={`cursor-pointer transition-colors ${selectedRole === "admin" ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedRole("admin")}
              >
                <CardContent className="flex items-center space-x-3 p-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">Administrator</div>
                    <div className="text-sm text-muted-foreground">Manage platform</div>
                  </div>
                  <Badge variant="secondary">Admin</Badge>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-colors ${selectedRole === "senior" ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedRole("senior")}
              >
                <CardContent className="flex items-center space-x-3 p-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">Senior</div>
                    <div className="text-sm text-muted-foreground">Request assistance</div>
                  </div>
                  <Badge variant="secondary">Senior</Badge>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-colors ${selectedRole === "volunteer" ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedRole("volunteer")}
              >
                <CardContent className="flex items-center space-x-3 p-3">
                  <Heart className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">Volunteer</div>
                    <div className="text-sm text-muted-foreground">Help seniors</div>
                  </div>
                  <Badge variant="secondary">Volunteer</Badge>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={handleLogin} className="w-full">
            Sign In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;