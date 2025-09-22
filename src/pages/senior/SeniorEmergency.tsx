import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Phone, 
  Shield, 
  MapPin, 
  Clock,
  Users,
  Heart,
  Zap,
  PhoneCall,
  MessageSquare,
  Plus
} from "lucide-react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SeniorEmergency = () => {
  const { toast } = useToast();
  const [sosActive, setSosActive] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  const [customEmergencyType, setCustomEmergencyType] = useState("");
  
  const [emergencyContacts] = useState([
    {
      id: 1,
      name: "Dr. Sarah Wilson",
      relationship: "Primary Doctor",
      phone: "+1-555-0123",
      type: "medical",
      notes: "Cardiologist - Heart conditions"
    },
    {
      id: 2,
      name: "Maria Johnson",
      relationship: "Daughter",
      phone: "+1-555-0198",
      type: "family",
      notes: "Lives 10 minutes away"
    },
    {
      id: 3,
      name: "Tom Martinez",
      relationship: "Neighbor",
      phone: "+1-555-0167",
      type: "neighbor",
      notes: "Next door - has spare key"
    },
    {
      id: 4,
      name: "City General Hospital",
      relationship: "Hospital",
      phone: "+1-555-0911",
      type: "medical",
      notes: "Emergency room - 5 minutes away"
    }
  ]);

  const emergencyTypes = [
    {
      type: "medical",
      title: "Medical Emergency",
      description: "Health-related urgent situation",
      icon: Heart,
      color: "bg-destructive",
      examples: ["Heart attack", "Severe pain", "Can't breathe", "Severe injury"]
    },
    {
      type: "fall",
      title: "Fall or Injury",
      description: "Physical accident or fall",
      icon: AlertTriangle,
      color: "bg-warning",
      examples: ["Fell down", "Can't get up", "Injured myself", "Hit my head"]
    },
    {
      type: "safety",
      title: "Safety Concern",
      description: "Security or safety issue",
      icon: Shield,
      color: "bg-destructive",
      examples: ["Intruder", "Fire", "Gas leak", "Feeling unsafe"]
    },
    {
      type: "help",
      title: "Need Immediate Help",
      description: "Urgent assistance required",
      icon: Users,
      color: "bg-primary",
      examples: ["Can't reach phone", "Lost", "Locked out", "Confused"]
    }
  ];

  const handleSOS = async (emergencyType?: string) => {
    setSosActive(true);
    
    const message = emergencyType 
      ? `EMERGENCY: ${emergencyType} - ${emergencyMessage || 'Need immediate assistance'}`
      : `SOS: Need immediate help - ${emergencyMessage || 'Emergency situation'}`;

    // Here you would typically send the SOS to your backend
    console.log("SOS Alert sent:", message);
    
    toast({
      title: "🚨 SOS Alert Sent!",
      description: "Emergency alert sent to nearby volunteers and your emergency contacts. Help is on the way.",
      variant: "destructive"
    });

    // Simulate turning off SOS after 30 seconds
    setTimeout(() => {
      setSosActive(false);
    }, 30000);
  };

  const handleQuickCall = (contact: any) => {
    // Here you would typically initiate a call
    console.log(`Calling ${contact.name} at ${contact.phone}`);
    toast({
      title: "Calling...",
      description: `Dialing ${contact.name} - ${contact.phone}`,
    });
  };

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case "medical": return "bg-destructive";
      case "family": return "bg-success";
      case "neighbor": return "bg-primary";
      default: return "bg-muted";
    }
  };

  return (
    <SeniorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Emergency Center</h1>
          <p className="text-muted-foreground">
            Quick access to emergency help and your important contacts
          </p>
        </div>

        {/* SOS Status */}
        {sosActive && (
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-medium">
              🚨 SOS ACTIVE - Help is being dispatched to your location. Stay calm and wait for assistance.
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4"
                onClick={() => setSosActive(false)}
              >
                Cancel SOS
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Main SOS Button */}
        <Card className="border-destructive shadow-strong">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              <Shield className="h-8 w-8 text-destructive" />
              <span>Emergency SOS</span>
            </CardTitle>
            <CardDescription>
              Press this button in any emergency situation for immediate help
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <Button
              size="lg"
              className="w-48 h-48 rounded-full text-2xl font-bold bg-destructive hover:bg-destructive/90 shadow-strong"
              onClick={() => handleSOS()}
              disabled={sosActive}
            >
              <div className="flex flex-col items-center space-y-2">
                <Zap className="h-16 w-16" />
                <span>{sosActive ? "SOS ACTIVE" : "SOS"}</span>
              </div>
            </Button>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              This will immediately alert nearby volunteers, your emergency contacts, and local emergency services with your location.
            </p>
          </CardContent>
        </Card>

        {/* Quick Emergency Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emergencyTypes.map((emergency) => (
            <Dialog key={emergency.type}>
              <DialogTrigger asChild>
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${emergency.color} text-white`}>
                        <emergency.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{emergency.title}</h3>
                        <p className="text-sm text-muted-foreground">{emergency.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <emergency.icon className="h-5 w-5" />
                    <span>{emergency.title}</span>
                  </DialogTitle>
                  <DialogDescription>
                    Send a specific emergency alert with details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Common situations:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {emergency.examples.map((example, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Additional Details (Optional)</label>
                    <Textarea
                      placeholder="Describe your emergency situation..."
                      value={emergencyMessage}
                      onChange={(e) => setEmergencyMessage(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <Button
                    className="w-full bg-destructive hover:bg-destructive/90"
                    onClick={() => handleSOS(emergency.title)}
                    disabled={sosActive}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Send {emergency.title} Alert
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <PhoneCall className="h-8 w-8 mx-auto text-primary mb-2" />
              <h3 className="font-medium mb-2">Emergency Services</h3>
              <Button variant="destructive" className="w-full">
                Call 911
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-8 w-8 mx-auto text-success mb-2" />
              <h3 className="font-medium mb-2">Share Location</h3>
              <Button variant="outline" className="w-full">
                Send My Location
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="h-8 w-8 mx-auto text-warning mb-2" />
              <h3 className="font-medium mb-2">Text Alert</h3>
              <Button variant="outline" className="w-full">
                Send Text SOS
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Emergency Contacts</span>
              </CardTitle>
              <CardDescription>
                Your saved emergency contacts for quick access
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Emergency Contact</DialogTitle>
                  <DialogDescription>
                    Add a new emergency contact to your list
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Contact Name" />
                  <Input placeholder="Phone Number" />
                  <Input placeholder="Relationship" />
                  <Textarea placeholder="Notes (optional)" />
                  <Button className="w-full">Add Contact</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${getContactTypeColor(contact.type)} flex items-center justify-center text-white`}>
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                      <p className="text-xs text-muted-foreground">{contact.phone}</p>
                      {contact.notes && (
                        <p className="text-xs text-muted-foreground italic">{contact.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleQuickCall(contact)}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Text
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Information */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Safety Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Medical Information</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Blood Type: O+</li>
                  <li>• Allergies: Penicillin</li>
                  <li>• Medical Conditions: Hypertension</li>
                  <li>• Current Medications: Lisinopril</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Emergency Preferences</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Preferred Hospital: City General</li>
                  <li>• Emergency Contact: Maria Johnson</li>
                  <li>• Special Needs: Hearing aid required</li>
                  <li>• Location: 123 Main St, Apt 4B</li>
                </ul>
              </div>
            </div>
            <div className="text-xs text-muted-foreground p-3 bg-background rounded border">
              <Clock className="h-4 w-4 inline mr-1" />
              This information is automatically shared with emergency responders when you activate SOS.
            </div>
          </CardContent>
        </Card>

        {/* Recent Emergency Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Emergency Activity</CardTitle>
            <CardDescription>Your recent emergency alerts and contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm border-l-4 border-success pl-3">
                <div>
                  <p className="font-medium">Safety Check Completed</p>
                  <p className="text-muted-foreground">Daily wellness check - All good</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm border-l-4 border-warning pl-3">
                <div>
                  <p className="font-medium">Emergency Contact Added</p>
                  <p className="text-muted-foreground">Dr. Sarah Wilson added to contacts</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center justify-between text-sm border-l-4 border-primary pl-3">
                <div>
                  <p className="font-medium">SOS Test Completed</p>
                  <p className="text-muted-foreground">Monthly SOS system test successful</p>
                </div>
                <span className="text-xs text-muted-foreground">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SeniorLayout>
  );
};

export default SeniorEmergency;