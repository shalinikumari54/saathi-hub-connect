import { useState } from "react";
import VolunteerLayout from "@/components/layout/VolunteerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Heart, MessageCircle, Phone, MapPin, Calendar, 
  Clock, Star, Search, Users, Gift, CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VolunteerMySeniors = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const [mySeniors] = useState([
    {
      id: 1,
      name: "Margaret Anderson",
      avatar: "/placeholder.svg",
      age: 78,
      address: "123 Oak Street, Apt 4B",
      phone: "+1 (555) 123-4567",
      joinedDate: "2023-06-15",
      tasksCompleted: 12,
      lastInteraction: "2 days ago",
      rating: 5,
      preferredCategories: ["shopping", "companionship"],
      medicalConditions: ["Arthritis", "High Blood Pressure"],
      notes: "Very kind and patient. Enjoys talking about gardening. Has difficulty with stairs.",
      emergencyContact: {
        name: "Sarah Anderson (Daughter)",
        phone: "+1 (555) 987-6543"
      },
      upcomingTasks: [
        {
          title: "Grocery Shopping",
          date: "Tomorrow",
          time: "2:00 PM"
        }
      ],
      relationship: "regular"
    },
    {
      id: 2,
      name: "Robert Chen",
      avatar: "/placeholder.svg",
      age: 82,
      address: "456 Maple Avenue",
      phone: "+1 (555) 234-5678",
      joinedDate: "2023-08-20",
      tasksCompleted: 8,
      lastInteraction: "1 week ago",
      rating: 5,
      preferredCategories: ["transportation", "medical"],
      medicalConditions: ["Heart Condition", "Uses Walker"],
      notes: "Retired engineer. Very punctual and organized. Needs extra time for mobility.",
      emergencyContact: {
        name: "Linda Chen (Wife)",
        phone: "+1 (555) 876-5432"
      },
      upcomingTasks: [
        {
          title: "Medical Appointment",
          date: "Jan 18",
          time: "10:30 AM"
        }
      ],
      relationship: "regular"
    },
    {
      id: 3,
      name: "Dorothy Williams",
      avatar: "/placeholder.svg",
      age: 75,
      address: "789 Pine Street",
      phone: "+1 (555) 345-6789",
      joinedDate: "2023-11-10",
      tasksCompleted: 3,
      lastInteraction: "3 days ago",
      rating: 5,
      preferredCategories: ["tech", "companionship"],
      medicalConditions: ["None reported"],
      notes: "Former teacher. Very curious about technology. Loves learning new things.",
      emergencyContact: {
        name: "Michael Williams (Son)",
        phone: "+1 (555) 765-4321"
      },
      upcomingTasks: [],
      relationship: "new"
    },
    {
      id: 4,
      name: "Frank Rodriguez",
      avatar: "/placeholder.svg",
      age: 88,
      address: "321 Elm Street",
      phone: "+1 (555) 456-7890",
      joinedDate: "2023-05-05",
      tasksCompleted: 18,
      lastInteraction: "Yesterday",
      rating: 5,
      preferredCategories: ["companionship", "shopping"],
      medicalConditions: ["Diabetes", "Mild Dementia"],
      notes: "Veteran. Enjoys sharing stories. Family visits on weekends. Very grateful for help.",
      emergencyContact: {
        name: "Maria Rodriguez (Niece)",
        phone: "+1 (555) 654-3210"
      },
      upcomingTasks: [
        {
          title: "Companionship Visit",
          date: "Friday",
          time: "3:00 PM"
        }
      ],
      relationship: "favorite"
    }
  ]);

  const filteredSeniors = mySeniors.filter(senior =>
    senior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    senior.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCall = (phone: string, name: string) => {
    toast({
      title: "Calling Senior",
      description: `Dialing ${name} at ${phone}`,
    });
  };

  const handleMessage = (name: string) => {
    toast({
      title: "Opening Chat",
      description: `Starting conversation with ${name}`,
    });
  };

  const handleScheduleVisit = (name: string) => {
    toast({
      title: "Schedule Visit",
      description: `Opening scheduling form for ${name}`,
    });
  };

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case "favorite": return "bg-red-500";
      case "regular": return "bg-blue-500";
      case "new": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getRelationshipLabel = (relationship: string) => {
    switch (relationship) {
      case "favorite": return "⭐ Favorite";
      case "regular": return "Regular";
      case "new": return "New";
      default: return "Unknown";
    }
  };

  return (
    <VolunteerLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Seniors</h1>
            <p className="text-muted-foreground">The seniors you regularly help and support</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500">⭐ {mySeniors.filter(s => s.relationship === "favorite").length} Favorites</Badge>
            <Badge className="bg-blue-500">{mySeniors.filter(s => s.relationship === "regular").length} Regular</Badge>
            <Badge className="bg-green-500">{mySeniors.filter(s => s.relationship === "new").length} New</Badge>
          </div>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search seniors by name or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Seniors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSeniors.map((senior) => (
            <Card key={senior.id} className="border-l-4" style={{ borderLeftColor: `var(--${senior.relationship === "favorite" ? "red" : senior.relationship === "regular" ? "blue" : "green"}-500)` }}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={senior.avatar} alt={senior.name} />
                      <AvatarFallback className="text-lg">{senior.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{senior.name}</CardTitle>
                        <Badge className={getRelationshipColor(senior.relationship)}>
                          {getRelationshipLabel(senior.relationship)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Age {senior.age}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {Array.from({ length: senior.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">({senior.rating}/5)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{senior.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>{senior.phone}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-3 border-y">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{senior.tasksCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tasks Done</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{senior.lastInteraction}</p>
                    <p className="text-xs text-muted-foreground">Last Contact</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{senior.preferredCategories.length}</p>
                    <p className="text-xs text-muted-foreground">Categories</p>
                  </div>
                </div>

                {/* Preferred Categories */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Preferred Help Types:</h4>
                  <div className="flex flex-wrap gap-1">
                    {senior.preferredCategories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Medical Conditions */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">Health Notes:</h4>
                  <div className="flex flex-wrap gap-1">
                    {senior.medicalConditions.map((condition) => (
                      <Badge key={condition} variant="outline" className="text-xs bg-red-50 text-red-700">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Personal Notes */}
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-800 mb-1">Personal Notes:</h4>
                  <p className="text-sm text-blue-700">{senior.notes}</p>
                </div>

                {/* Upcoming Tasks */}
                {senior.upcomingTasks.length > 0 && (
                  <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-800 mb-2">Upcoming Tasks:</h4>
                    {senior.upcomingTasks.map((task, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-green-700">
                        <CheckCircle className="w-4 h-4" />
                        <span>{task.title} - {task.date} at {task.time}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Emergency Contact */}
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg">
                  <h4 className="text-sm font-semibold text-orange-800 mb-1">Emergency Contact:</h4>
                  <p className="text-sm text-orange-700">
                    {senior.emergencyContact.name} - {senior.emergencyContact.phone}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button 
                    onClick={() => handleCall(senior.phone, senior.name)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleMessage(senior.name)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => handleScheduleVisit(senior.name)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Visit
                  </Button>

                  <Button variant="outline">
                    <Gift className="w-4 h-4 mr-2" />
                    Send Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Impact Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{mySeniors.length}</p>
                <p className="text-sm text-muted-foreground">Seniors Helped</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  {mySeniors.reduce((sum, senior) => sum + senior.tasksCompleted, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  {(mySeniors.reduce((sum, senior) => sum + senior.rating, 0) / mySeniors.length).toFixed(1)}
                </p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">
                  {mySeniors.filter(s => s.relationship === "favorite").length}
                </p>
                <p className="text-sm text-muted-foreground">Favorite Relationships</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerMySeniors;