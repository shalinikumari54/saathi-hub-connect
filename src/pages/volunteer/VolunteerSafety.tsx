import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  MapPin, 
  Phone, 
  AlertTriangle, 
  Users, 
  Clock,
  CheckCircle,
  Zap,
  PhoneCall,
  MessageSquare,
  Navigation,
  Heart,
  Eye
} from "lucide-react";
import VolunteerLayout from "@/components/layout/VolunteerLayout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";

const VolunteerSafety = () => {
  const { toast } = useToast();
  const [sosActive, setSosActive] = useState(false);
  const [locationSharing, setLocationSharing] = useState(true);
  const [safetyMode, setSafetyMode] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState("");
  
  const [safetyChecklist] = useState([
    { id: 1, item: "Verify task details with senior before arriving", completed: true },
    { id: 2, item: "Share your location with emergency contacts", completed: true },
    { id: 3, item: "Carry identification and volunteer badge", completed: false },
    { id: 4, item: "Keep phone charged above 50%", completed: true },
    { id: 5, item: "Inform someone about your volunteer schedule", completed: false },
    { id: 6, item: "Have emergency contacts readily available", completed: true },
    { id: 7, item: "Trust your instincts about situations", completed: true }
  ]);

  const [emergencyContacts] = useState([
    {
      id: 1,
      name: "Emergency Services",
      phone: "911",
      type: "emergency",
      description: "Police, Fire, Medical Emergency"
    },
    {
      id: 2, 
      name: "Senior Saathi Safety Line",
      phone: "+1-555-SAFE-NOW",
      type: "platform",
      description: "24/7 volunteer safety support"
    },
    {
      id: 3,
      name: "Sarah Wilson",
      phone: "+1-555-0198",
      type: "personal",
      description: "My emergency contact - Sister"
    },
    {
      id: 4,
      name: "John Doe",
      phone: "+1-555-0123",
      type: "personal", 
      description: "My emergency contact - Best friend"
    }
  ]);

  const [nearbyVolunteers] = useState([
    {
      id: 1,
      name: "Mike Chen",
      distance: "0.3 km",
      status: "available",
      rating: 4.9,
      currentTask: null
    },
    {
      id: 2,
      name: "Lisa Garcia", 
      distance: "0.7 km",
      status: "on-task",
      rating: 4.8,
      currentTask: "Grocery shopping"
    },
    {
      id: 3,
      name: "Tom Martinez",
      distance: "1.2 km", 
      status: "available",
      rating: 4.7,
      currentTask: null
    }
  ]);

  const handleSOS = () => {
    setSosActive(true);
    
    const message = emergencyMessage || "Volunteer needs immediate assistance";
    console.log("SOS Alert sent:", message);
    
    toast({
      title: "🚨 SOS Alert Sent!",
      description: "Emergency alert sent to nearby volunteers, platform safety team, and your emergency contacts. Help is on the way.",
      variant: "destructive"
    });

    // Simulate turning off SOS after 30 seconds
    setTimeout(() => {
      setSosActive(false);
    }, 30000);
  };

  const handleShareLocation = () => {
    console.log("Sharing live location");
    toast({
      title: "Location Shared",
      description: "Your live location is now being shared with the senior and platform safety team.",
    });
  };

  const handleQuickCall = (contact: any) => {
    console.log(`Calling ${contact.name} at ${contact.phone}`);
    toast({
      title: "Calling...",
      description: `Dialing ${contact.name} - ${contact.phone}`,
    });
  };

  const toggleSafetyChecklist = (id: number) => {
    // Here you would update the checklist item completion status
    console.log(`Toggling checklist item ${id}`);
    toast({
      title: "Checklist Updated",
      description: "Safety checklist item updated.",
    });
  };

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case "emergency": return "bg-destructive";
      case "platform": return "bg-primary";
      case "personal": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getVolunteerStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-success";
      case "on-task": return "bg-warning";
      case "offline": return "bg-muted";
      default: return "bg-muted";
    }
  };

  const completedItems = safetyChecklist.filter(item => item.completed).length;
  const completionPercentage = (completedItems / safetyChecklist.length) * 100;

  return (
    <VolunteerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Location & Safety</h1>
          <p className="text-muted-foreground">
            Stay safe while helping others with our comprehensive safety tools
          </p>
        </div>

        {/* SOS Status */}
        {sosActive && (
          <Alert className="border-destructive bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="font-medium">
              🚨 SOS ACTIVE - Emergency alert sent. Platform safety team and nearby volunteers have been notified.
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

        {/* Safety Mode Banner */}
        {safetyMode && (
          <Alert className="border-warning bg-warning/10">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              🛡️ Safety Mode Active - Enhanced monitoring enabled. Your location is being tracked and check-ins are mandatory.
            </AlertDescription>
          </Alert>
        )}

        {/* Main Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SOS Button */}
          <Card className="border-destructive shadow-strong">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl flex items-center justify-center space-x-2">
                <Shield className="h-6 w-6 text-destructive" />
                <span>Emergency SOS</span>
              </CardTitle>
              <CardDescription>
                Immediate help for dangerous situations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="w-32 h-32 rounded-full text-lg font-bold bg-destructive hover:bg-destructive/90 shadow-strong"
                    disabled={sosActive}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Zap className="h-12 w-12" />
                      <span>{sosActive ? "ACTIVE" : "SOS"}</span>
                    </div>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      <span>Send Emergency SOS</span>
                    </DialogTitle>
                    <DialogDescription>
                      This will immediately alert platform safety team, nearby volunteers, and your emergency contacts
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Emergency Details (Optional)</label>
                      <Textarea
                        placeholder="Briefly describe the emergency situation..."
                        value={emergencyMessage}
                        onChange={(e) => setEmergencyMessage(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">This will notify:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Senior Saathi Safety Team (immediate response)</li>
                        <li>• {nearbyVolunteers.filter(v => v.status === 'available').length} nearby volunteers</li>
                        <li>• Your {emergencyContacts.filter(c => c.type === 'personal').length} emergency contacts</li>
                        <li>• Current senior you're helping (if on task)</li>
                      </ul>
                    </div>
                    <Button
                      className="w-full bg-destructive hover:bg-destructive/90"
                      onClick={handleSOS}
                      disabled={sosActive}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Send SOS Alert
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <p className="text-sm text-muted-foreground">
                Press for threats, medical emergencies, or any unsafe situation
              </p>
            </CardContent>
          </Card>

          {/* Location Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Location Sharing</span>
              </CardTitle>
              <CardDescription>
                Share your location for safety and coordination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Live Location Sharing</p>
                  <p className="text-sm text-muted-foreground">Share with senior and safety team</p>
                </div>
                <Switch 
                  checked={locationSharing}
                  onCheckedChange={setLocationSharing}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enhanced Safety Mode</p>
                  <p className="text-sm text-muted-foreground">Extra monitoring for risky areas</p>
                </div>
                <Switch 
                  checked={safetyMode}
                  onCheckedChange={setSafetyMode}
                />
              </div>

              <div className="pt-2 space-y-2">
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={handleShareLocation}
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Share Live Location Now
                </Button>
                <Button className="w-full" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Location History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Safety Checklist */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Safety Checklist</span>
              </CardTitle>
              <CardDescription>
                Complete these items before starting any volunteer task
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{completedItems}/{safetyChecklist.length}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Safety Preparedness</span>
                <span>{Math.round(completionPercentage)}%</span>
              </div>
              <Progress value={completionPercentage} className="w-full" />
            </div>
            
            <div className="space-y-3">
              {safetyChecklist.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                  <div 
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                      item.completed ? 'bg-success border-success' : 'border-muted-foreground'
                    }`}
                    onClick={() => toggleSafetyChecklist(item.id)}
                  >
                    {item.completed && <CheckCircle className="h-3 w-3 text-white" />}
                  </div>
                  <p className={`flex-1 ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {item.item}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </CardTitle>
            <CardDescription>
              Quick access to safety and emergency contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${getContactTypeColor(contact.type)} flex items-center justify-center text-white`}>
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">{contact.description}</p>
                      <p className="text-xs text-muted-foreground">{contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleQuickCall(contact)}
                      className={contact.type === 'emergency' ? 'bg-destructive hover:bg-destructive/90' : ''}
                    >
                      <PhoneCall className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                    {contact.type !== 'emergency' && (
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Text
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Nearby Volunteers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Nearby Volunteers</span>
            </CardTitle>
            <CardDescription>
              Other volunteers in your area who can provide backup support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {nearbyVolunteers.map((volunteer) => (
                <div key={volunteer.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Users className="h-8 w-8 p-1 bg-primary text-primary-foreground rounded-full" />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getVolunteerStatusColor(volunteer.status)}`} />
                    </div>
                    <div>
                      <p className="font-medium">{volunteer.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{volunteer.distance}</span>
                        <span>•</span>
                        <Badge variant="outline" className={getVolunteerStatusColor(volunteer.status)}>
                          {volunteer.status}
                        </Badge>
                      </div>
                      {volunteer.currentTask && (
                        <p className="text-xs text-muted-foreground">Currently: {volunteer.currentTask}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    {volunteer.status === "available" && (
                      <Button size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        Request Backup
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Tips */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Safety Guidelines</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-medium mb-2">🏠 Before Arriving</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Verify task details with the senior</li>
                  <li>• Share your ETA with emergency contacts</li>
                  <li>• Ensure your phone is fully charged</li>
                  <li>• Review the senior's location and notes</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🚪 During the Task</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Keep your location sharing enabled</li>
                  <li>• Trust your instincts about situations</li>
                  <li>• Maintain professional boundaries</li>
                  <li>• Report any concerning behavior immediately</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">⚠️ Red Flags</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Senior asks you to turn off location sharing</li>
                  <li>• Requests for financial information</li>
                  <li>• Inappropriate comments or behavior</li>
                  <li>• Unsafe home conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">🆘 Emergency Actions</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Use SOS button for immediate threats</li>
                  <li>• Call 911 for medical emergencies</li>
                  <li>• Contact platform safety team for concerns</li>
                  <li>• Leave immediately if you feel unsafe</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">99.8%</div>
              <p className="text-sm text-muted-foreground">Safe task completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">< 2 min</div>
              <p className="text-sm text-muted-foreground">Average SOS response time</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">24/7</div>
              <p className="text-sm text-muted-foreground">Safety team availability</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerSafety;