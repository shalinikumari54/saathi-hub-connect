import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Users, Heart, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SignupModal = ({ open, onOpenChange }: SignupModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"senior" | "volunteer" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
    skills: "",
    availability: "",
    emergencyContact: ""
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }
    if (step === 2 && (!formData.name || !formData.email || !formData.password)) {
      toast.error("Please fill in all required fields");
      return;
    }
    setStep(step + 1);
  };

  const handleSignup = () => {
    if (!formData.phone || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Mock signup - in real app, this would create account
    localStorage.setItem("userRole", selectedRole!);
    localStorage.setItem("userEmail", formData.email);
    localStorage.setItem("userName", formData.name);
    
    toast.success("Account created successfully!");
    onOpenChange(false);
    
    // Navigate based on role
    switch (selectedRole) {
      case "senior":
        navigate("/senior/dashboard");
        break;
      case "volunteer":
        navigate("/volunteer/dashboard");
        break;
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Join Senior Saathi</DialogTitle>
          <DialogDescription>
            Create your account to start helping or get help
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <div className="space-y-4">
            <Label>How would you like to use Senior Saathi?</Label>
            <div className="grid grid-cols-1 gap-3">
              <Card 
                className={`cursor-pointer transition-colors ${selectedRole === "senior" ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedRole("senior")}
              >
                <CardContent className="flex items-center space-x-3 p-4">
                  <Users className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">I'm a Senior</div>
                    <div className="text-sm text-muted-foreground">
                      I need assistance with daily tasks and activities
                    </div>
                  </div>
                  <Badge variant="secondary">Senior</Badge>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-colors ${selectedRole === "volunteer" ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedRole("volunteer")}
              >
                <CardContent className="flex items-center space-x-3 p-4">
                  <Heart className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium">I'm a Volunteer</div>
                    <div className="text-sm text-muted-foreground">
                      I want to help seniors in my community
                    </div>
                  </div>
                  <Badge variant="secondary">Volunteer</Badge>
                </CardContent>
              </Card>
            </div>
            
            <Button onClick={handleNext} className="w-full" disabled={!selectedRole}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a secure password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleNext} className="flex-1">
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => updateFormData("phone", e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  placeholder="City, State"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {selectedRole === "volunteer" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills & Interests</Label>
                  <Textarea
                    id="skills"
                    placeholder="e.g., Cooking, Shopping, Technology Help, Transportation..."
                    value={formData.skills}
                    onChange={(e) => updateFormData("skills", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input
                    id="availability"
                    placeholder="e.g., Weekends, Evenings, Flexible"
                    value={formData.availability}
                    onChange={(e) => updateFormData("availability", e.target.value)}
                  />
                </div>
              </>
            )}

            {selectedRole === "senior" && (
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  placeholder="Emergency contact name and phone"
                  value={formData.emergencyContact}
                  onChange={(e) => updateFormData("emergencyContact", e.target.value)}
                />
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSignup} className="flex-1">
                Create Account
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;