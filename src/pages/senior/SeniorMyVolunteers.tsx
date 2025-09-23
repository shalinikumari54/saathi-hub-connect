import { useState } from "react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, Phone, MessageCircle, MapPin, Star, Clock, 
  Shield, Award, Navigation, UserMinus 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SeniorMyVolunteers = () => {
  const { toast } = useToast();
  const [volunteers, setVolunteers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 123-4567",
      skills: ["Health Support", "Transportation", "Companionship"],
      rating: 4.9,
      completedTasks: 45,
      status: "active",
      currentTask: "Grocery Shopping",
      distance: "0.8 km away",
      eta: "15 minutes",
      lastActive: "2 minutes ago",
      verified: true,
      specialization: "Healthcare Assistant"
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 234-5678",
      skills: ["Tech Support", "Reading", "Errands"],
      rating: 4.7,
      completedTasks: 32,
      status: "en-route",
      currentTask: "Technology Help",
      distance: "2.1 km away",
      eta: "8 minutes",
      lastActive: "1 minute ago",
      verified: true,
      specialization: "Technology Specialist"
    },
    {
      id: 3,
      name: "Emma Davis",
      avatar: "/placeholder.svg",
      phone: "+1 (555) 345-6789",
      skills: ["Companionship", "Pet Care", "Light Housework"],
      rating: 4.8,
      completedTasks: 28,
      status: "available",
      currentTask: null,
      distance: "1.5 km away",
      eta: null,
      lastActive: "5 minutes ago",
      verified: true,
      specialization: "Companion Care"
    }
  ]);

  const handleTrackLive = (volunteerId: number) => {
    toast({
      title: "Live Tracking Started",
      description: "You can now see the volunteer's real-time location",
    });
  };

  const handleMessage = (volunteerId: number, volunteerName: string) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${volunteerName}`,
    });
  };

  const handleCall = (volunteerId: number, phone: string) => {
    toast({
      title: "Calling Volunteer",
      description: `Dialing ${phone}`,
    });
  };

  const handleRequestReplacement = (volunteerId: number) => {
    toast({
      title: "Replacement Requested",
      description: "We're finding another volunteer for you",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success";
      case "en-route": return "bg-warning";
      case "available": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Working on Task";
      case "en-route": return "On the Way";
      case "available": return "Available";
      default: return "Offline";
    }
  };

  return (
    <SeniorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Volunteers</h1>
            <p className="text-muted-foreground">Manage and communicate with your assigned volunteers</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Users className="w-4 h-4 mr-2" />
            Request New Volunteer
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Assigned Volunteers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">1</div>
              <p className="text-sm text-muted-foreground">Currently Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">4.8</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">105</div>
              <p className="text-sm text-muted-foreground">Total Tasks Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Volunteers List */}
        <div className="space-y-4">
          {volunteers.map((volunteer) => (
            <Card key={volunteer.id} className="border-l-4" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={volunteer.avatar} alt={volunteer.name} />
                      <AvatarFallback>{volunteer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{volunteer.name}</CardTitle>
                        {volunteer.verified && (
                          <Shield className="w-5 h-5 text-success" />
                        )}
                        <Badge className={getStatusColor(volunteer.status)}>
                          {getStatusText(volunteer.status)}
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-2">
                        <p>{volunteer.specialization}</p>
                        <p>Last active: {volunteer.lastActive}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{volunteer.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4 text-primary" />
                          <span>{volunteer.completedTasks} tasks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span>{volunteer.distance}</span>
                        </div>
                        {volunteer.eta && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-warning" />
                            <span>ETA: {volunteer.eta}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Skills & Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {volunteer.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Current Task */}
                {volunteer.currentTask && (
                  <div className="mb-4 p-3 bg-muted/20 rounded-lg">
                    <h4 className="text-sm font-semibold mb-1">Current Task</h4>
                    <p className="text-sm">{volunteer.currentTask}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={() => handleCall(volunteer.id, volunteer.phone)}
                    className="bg-success hover:bg-success/90"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleMessage(volunteer.id, volunteer.name)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  
                  {(volunteer.status === "active" || volunteer.status === "en-route") && (
                    <Button 
                      variant="outline"
                      onClick={() => handleTrackLive(volunteer.id)}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Track Live Location
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleRequestReplacement(volunteer.id)}
                  >
                    <UserMinus className="w-4 h-4 mr-2" />
                    Request Replacement
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{volunteer.phone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact Section */}
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600">Emergency Situations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you're in an emergency or need immediate assistance, use these options:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-red-600 hover:bg-red-700">
                🚨 Emergency SOS
              </Button>
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call 911
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Alert All Nearby Volunteers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {volunteers.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Volunteers Assigned</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any volunteers assigned yet. Request help to get matched with available volunteers.
              </p>
              <Button>
                <Users className="w-4 h-4 mr-2" />
                Request Volunteer Help
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </SeniorLayout>
  );
};

export default SeniorMyVolunteers;