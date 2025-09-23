import { useState } from "react";
import SeniorLayout from "@/components/layout/SeniorLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, MapPin, Star, MessageCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SeniorMyEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Community Garden Club",
      description: "Join us for weekly gardening activities and plant care",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "2 hours",
      location: "Community Center Garden",
      category: "Recreation",
      volunteersNeeded: 3,
      volunteersAssigned: 2,
      status: "confirmed",
      rsvpStatus: "confirmed",
      organizer: "Sarah Johnson"
    },
    {
      id: 2,
      title: "Technology Workshop",
      description: "Learn basic smartphone and tablet usage with volunteer instructors",
      date: "2024-01-18",
      time: "2:00 PM",
      duration: "1.5 hours",
      location: "Senior Center Room A",
      category: "Education",
      volunteersNeeded: 2,
      volunteersAssigned: 2,
      status: "confirmed",
      rsvpStatus: "pending",
      organizer: "Tech Volunteers"
    },
    {
      id: 3,
      title: "Health & Wellness Check",
      description: "Monthly health screening and wellness consultation",
      date: "2024-01-22",
      time: "9:00 AM",
      duration: "30 minutes",
      location: "Medical Center",
      category: "Health",
      volunteersNeeded: 1,
      volunteersAssigned: 1,
      status: "scheduled",
      rsvpStatus: "confirmed",
      organizer: "Dr. Martinez"
    }
  ]);

  const handleRSVP = (eventId: number, status: string) => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, rsvpStatus: status }
        : event
    ));
    toast({
      title: "RSVP Updated",
      description: `Your response has been recorded as ${status}`,
    });
  };

  const handleRequestVolunteer = (eventId: number) => {
    toast({
      title: "Volunteer Request Sent",
      description: "We'll notify available volunteers about this event",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success";
      case "pending": return "bg-warning";
      case "scheduled": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getRSVPColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-success";
      case "pending": return "bg-warning";
      case "declined": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <SeniorLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Events</h1>
            <p className="text-muted-foreground">View and manage your upcoming events and activities</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Calendar className="w-4 h-4 mr-2" />
            Browse More Events
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">2</div>
              <p className="text-sm text-muted-foreground">Confirmed RSVPs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">1</div>
              <p className="text-sm text-muted-foreground">Pending RSVPs</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-sm text-muted-foreground">Events This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="border-l-4" style={{ borderLeftColor: 'hsl(var(--primary))' }}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Badge variant="outline" className={getRSVPColor(event.rsvpStatus)}>
                        RSVP: {event.rsvpStatus}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{event.time} ({event.duration})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{event.volunteersAssigned}/{event.volunteersNeeded} volunteers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.rsvpStatus === "pending" && (
                    <>
                      <Button 
                        onClick={() => handleRSVP(event.id, "confirmed")}
                        className="bg-success hover:bg-success/90"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm RSVP
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleRSVP(event.id, "declined")}
                      >
                        Decline
                      </Button>
                    </>
                  )}
                  
                  {event.volunteersAssigned < event.volunteersNeeded && (
                    <Button 
                      variant="outline"
                      onClick={() => handleRequestVolunteer(event.id)}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Request More Volunteers
                    </Button>
                  )}
                  
                  <Button variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Organizer
                  </Button>
                  
                  <Button variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Location
                  </Button>
                  
                  <Button variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    Add to Favorites
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm"><strong>Organizer:</strong> {event.organizer}</p>
                  <p className="text-sm"><strong>Category:</strong> {event.category}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {events.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Events Scheduled</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any upcoming events. Browse available events to join activities in your community.
              </p>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Browse Events
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </SeniorLayout>
  );
};

export default SeniorMyEvents;