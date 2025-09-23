import { useState } from "react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MapPin, Navigation, Phone, MessageCircle, Clock, 
  Car, User, Bike, AlertCircle, CheckCircle, Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SeniorLocationTracking = () => {
  const { toast } = useToast();
  const [activeTracking, setActiveTracking] = useState([
    {
      id: 1,
      volunteerName: "Sarah Johnson",
      avatar: "/placeholder.svg",
      task: "Grocery Shopping",
      status: "en-route",
      distance: "0.8 km",
      eta: "12 minutes",
      phone: "+1 (555) 123-4567",
      transportMode: "car",
      lastUpdate: "30 seconds ago",
      route: [
        { lat: 40.7589, lng: -73.9851, timestamp: "10:00 AM", location: "Started from home" },
        { lat: 40.7614, lng: -73.9776, timestamp: "10:15 AM", location: "Grocery store" },
        { lat: 40.7505, lng: -73.9934, timestamp: "10:45 AM", location: "En route to you" }
      ]
    },
    {
      id: 2,
      volunteerName: "Michael Chen",
      avatar: "/placeholder.svg",
      task: "Medical Appointment Companion",
      status: "arrived",
      distance: "0.1 km",
      eta: "Arrived",
      phone: "+1 (555) 234-5678",
      transportMode: "walking",
      lastUpdate: "2 minutes ago",
      route: [
        { lat: 40.7505, lng: -73.9934, timestamp: "2:00 PM", location: "Started journey" },
        { lat: 40.7505, lng: -73.9934, timestamp: "2:20 PM", location: "Arrived at location" }
      ]
    }
  ]);

  const [trackingHistory] = useState([
    {
      id: 1,
      volunteerName: "Emma Davis",
      task: "Pharmacy Pickup",
      date: "2024-01-14",
      duration: "45 minutes",
      status: "completed",
      rating: 5
    },
    {
      id: 2,
      volunteerName: "David Wilson",
      task: "Technology Help",
      date: "2024-01-12",
      duration: "2 hours",
      status: "completed",
      rating: 4
    }
  ]);

  const handleContactVolunteer = (volunteerId: number, phone: string) => {
    toast({
      title: "Calling Volunteer",
      description: `Dialing ${phone}`,
    });
  };

  const handleMessage = (volunteerId: number, name: string) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${name}`,
    });
  };

  const handleViewFullMap = (volunteerId: number) => {
    toast({
      title: "Opening Map",
      description: "Opening detailed map view with live location",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en-route": return "bg-warning";
      case "arrived": return "bg-success";
      case "completed": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case "car": return <Car className="w-4 h-4" />;
      case "walking": return <User className="w-4 h-4" />;
      case "bike": return <Bike className="w-4 h-4" />;
      default: return <Navigation className="w-4 h-4" />;
    }
  };

  return (
    <SeniorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Location Tracking</h1>
            <p className="text-muted-foreground">Track your volunteers in real-time and view location history</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Eye className="w-4 h-4 mr-2" />
            View All on Map
          </Button>
        </div>

        {/* Active Tracking */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Active Tracking</h2>
          
          {activeTracking.length > 0 ? (
            activeTracking.map((volunteer) => (
              <Card key={volunteer.id} className="border-l-4" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={volunteer.avatar} alt={volunteer.volunteerName} />
                        <AvatarFallback>{volunteer.volunteerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{volunteer.volunteerName}</CardTitle>
                          <Badge className={getStatusColor(volunteer.status)}>
                            {volunteer.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{volunteer.task}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{volunteer.distance} away</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>ETA: {volunteer.eta}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {getTransportIcon(volunteer.transportMode)}
                            <span className="capitalize">{volunteer.transportMode}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-muted-foreground" />
                            <span>{volunteer.lastUpdate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Live Map Placeholder */}
                  <div className="mb-4 h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto text-primary mb-2" />
                      <h3 className="font-semibold mb-1">Live Location Map</h3>
                      <p className="text-sm text-muted-foreground">
                        Real-time tracking of {volunteer.volunteerName}
                      </p>
                    </div>
                  </div>

                  {/* Route History */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Journey Progress</h4>
                    <div className="space-y-2">
                      {volunteer.route.map((point, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className={`w-3 h-3 rounded-full ${
                            index === volunteer.route.length - 1 ? 'bg-primary' : 'bg-muted'
                          }`}></div>
                          <span className="font-medium">{point.timestamp}</span>
                          <span className="text-muted-foreground">{point.location}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => handleContactVolunteer(volunteer.id, volunteer.phone)}
                      className="bg-success hover:bg-success/90"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleMessage(volunteer.id, volunteer.volunteerName)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleViewFullMap(volunteer.id)}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      View Full Map
                    </Button>
                    
                    <Button variant="outline">
                      <Navigation className="w-4 h-4 mr-2" />
                      Share My Location
                    </Button>
                  </div>

                  {/* Safety Info */}
                  <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm font-semibold">Safety Features Active</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This volunteer is verified and has background check clearance. Location is being monitored for your safety.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <MapPin className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Tracking</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any volunteers currently tracked. When a volunteer accepts your task, you'll be able to track their location here.
                </p>
                <Button>
                  <MapPin className="w-4 h-4 mr-2" />
                  Request Help
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tracking History */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tracking History</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trackingHistory.map((entry) => (
              <Card key={entry.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{entry.volunteerName}</h3>
                    <Badge className="bg-success">completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{entry.task}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Date: {entry.date}</p>
                    <p>Duration: {entry.duration}</p>
                    <div className="flex items-center gap-1">
                      <span>Rating:</span>
                      <div className="flex">
                        {Array.from({ length: entry.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-500">⭐</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Section */}
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Emergency & Safety
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              If you feel unsafe or need immediate assistance, use these emergency options:
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
                <MessageCircle className="w-4 h-4 mr-2" />
                Alert Admin
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SeniorLayout>
  );
};

export default SeniorLocationTracking;