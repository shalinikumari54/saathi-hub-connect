import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Clock, 
  User, 
  Star, 
  Filter, 
  Search,
  Heart,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Phone,
  MessageSquare,
  Navigation
} from "lucide-react";
import VolunteerLayout from "@/components/layout/VolunteerLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const VolunteerAvailableTasks = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const [availableTasks] = useState([
    {
      id: 1,
      title: "Weekly Grocery Shopping for Elderly Lady",
      description: "Mary needs help with her weekly grocery shopping. She has a specific list and prefers organic products when possible. The store is about 10 minutes away.",
      category: "Groceries",
      urgency: "normal",
      senior: {
        name: "Mary Johnson",
        age: 78,
        rating: 4.9,
        location: "Downtown",
        distance: "0.8 km"
      },
      timeWindow: "2 hours",
      preferredTime: "Tomorrow 10:00 AM - 12:00 PM",
      duration: "1-2 hours",
      skillsRequired: ["Physical strength", "Grocery shopping"],
      rewardPoints: 50,
      datePosted: "2024-01-20",
      isUrgent: false,
      volunteersNeeded: 1,
      specialNotes: "Please call before arriving. Mary prefers to discuss the shopping list in person."
    },
    {
      id: 2,
      title: "Emergency Medical Appointment Transport",
      description: "Robert needs urgent transportation to his cardiologist appointment. He uses a walker and may need assistance getting in/out of the vehicle.",
      category: "Transportation",
      urgency: "urgent",
      senior: {
        name: "Robert Smith",
        age: 82,
        rating: 4.7,
        location: "Uptown",
        distance: "1.2 km"
      },
      timeWindow: "4 hours",
      preferredTime: "Today 1:30 PM - 5:30 PM",
      duration: "3 hours",
      skillsRequired: ["Driving", "Physical assistance", "Medical support"],
      rewardPoints: 80,
      datePosted: "2024-01-20",
      isUrgent: true,
      volunteersNeeded: 1,
      specialNotes: "Must have reliable vehicle and be comfortable assisting seniors with mobility aids."
    },
    {
      id: 3,
      title: "Smart TV and WiFi Setup Help",
      description: "Eleanor recently bought a smart TV and needs help setting it up, connecting to WiFi, and installing streaming apps like Netflix and YouTube.",
      category: "Technology",
      urgency: "normal",
      senior: {
        name: "Eleanor Brown",
        age: 75,
        rating: 5.0,
        location: "Midtown",
        distance: "2.1 km"
      },
      timeWindow: "Same day",
      preferredTime: "This weekend, flexible timing",
      duration: "1-2 hours",
      skillsRequired: ["Technology", "Patience", "Teaching"],
      rewardPoints: 40,
      datePosted: "2024-01-19",
      isUrgent: false,
      volunteersNeeded: 1,
      specialNotes: "Eleanor is very eager to learn and would love someone patient who can explain things step by step."
    },
    {
      id: 4,
      title: "Home Deep Cleaning Assistance",
      description: "Frank needs help with deep cleaning his apartment, including bathroom deep clean, kitchen organization, and dusting throughout.",
      category: "Household",
      urgency: "normal",
      senior: {
        name: "Frank Davis",
        age: 71,
        rating: 4.8,
        location: "Westside",
        distance: "3.5 km"
      },
      timeWindow: "1 day",
      preferredTime: "Next Tuesday or Wednesday",
      duration: "4-6 hours",
      skillsRequired: ["Cleaning", "Physical strength", "Organization"],
      rewardPoints: 75,
      datePosted: "2024-01-18",
      isUrgent: false,
      volunteersNeeded: 2,
      specialNotes: "Frank will provide all cleaning supplies. Looking for 2 volunteers to make the job easier."
    },
    {
      id: 5,
      title: "Companionship and Board Games",
      description: "Dorothy is feeling lonely and would love someone to visit, chat, and maybe play some board games or cards. She makes excellent tea and cookies!",
      category: "Companionship",
      urgency: "normal",
      senior: {
        name: "Dorothy Wilson",
        age: 79,
        rating: 4.9,
        location: "Downtown",
        distance: "1.8 km"
      },
      timeWindow: "Flexible",
      preferredTime: "Weekday afternoons preferred",
      duration: "2-3 hours",
      skillsRequired: ["Social skills", "Patience", "Board games"],
      rewardPoints: 45,
      datePosted: "2024-01-17",
      isUrgent: false,
      volunteersNeeded: 1,
      specialNotes: "Dorothy loves to talk about her garden and her grandchildren. Very welcoming and kind."
    },
    {
      id: 6,
      title: "URGENT: Light Bulb Replacement and Safety Check",
      description: "Alice has several burned-out light bulbs in high places and is worried about safety. Needs someone to replace bulbs and do a quick safety check around the house.",
      category: "Household",
      urgency: "urgent",
      senior: {
        name: "Alice Cooper",
        age: 76,
        rating: 4.6,
        location: "Eastside",
        distance: "2.8 km"
      },
      timeWindow: "Within 4 hours",
      preferredTime: "ASAP - Any time today",
      duration: "1 hour",
      skillsRequired: ["Basic maintenance", "Ladder safety"],
      rewardPoints: 35,
      datePosted: "2024-01-20",
      isUrgent: true,
      volunteersNeeded: 1,
      specialNotes: "Alice is nervous about being in the dark. Quick and simple task but very important for her safety."
    }
  ]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent": return "bg-destructive";
      case "emergency": return "bg-destructive";
      case "normal": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "groceries": return "🛒";
      case "transportation": return "🚗";
      case "technology": return "💻";
      case "household": return "🏠";
      case "companionship": return "👥";
      case "medical": return "🏥";
      default: return "📝";
    }
  };

  const handleAcceptTask = (taskId: number) => {
    console.log(`Accepting task ${taskId}`);
    toast({
      title: "Task Accepted! 🎉",
      description: "You've successfully accepted this task. The senior has been notified and will contact you soon.",
    });
  };

  const handleRequestMoreInfo = (taskId: number) => {
    console.log(`Requesting more info for task ${taskId}`);
    toast({
      title: "Request Sent",
      description: "Your request for more information has been sent to the senior. They'll respond soon.",
    });
  };

  const filteredTasks = availableTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.senior.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || task.category.toLowerCase() === categoryFilter;
    const matchesUrgency = urgencyFilter === "all" || task.urgency === urgencyFilter;
    
    return matchesSearch && matchesCategory && matchesUrgency;
  });

  return (
    <VolunteerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Available Tasks</h1>
            <p className="text-muted-foreground">Find meaningful ways to help seniors in your community</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Update Location
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Find Near Me
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredTasks.length}</div>
              <p className="text-xs text-muted-foreground">Within 10km</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Urgent Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {filteredTasks.filter(t => t.urgency === "urgent").length}
              </div>
              <p className="text-xs text-muted-foreground">Need immediate help</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Potential Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">
                {filteredTasks.reduce((sum, task) => sum + task.rewardPoints, 0)}
              </div>
              <p className="text-xs text-muted-foreground">From all tasks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Match Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">85%</div>
              <p className="text-xs text-muted-foreground">Based on your skills</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks, seniors, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="transportation">Transport</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="household">Household</SelectItem>
                  <SelectItem value="companionship">Companionship</SelectItem>
                </SelectContent>
              </Select>

              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Urgency</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="closest">Closest First</SelectItem>
                  <SelectItem value="urgent">Urgent First</SelectItem>
                  <SelectItem value="points">Highest Points</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <Card key={task.id} className={`shadow-elegant ${task.isUrgent ? 'border-destructive' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCategoryIcon(task.category)}</span>
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      {task.isUrgent && (
                        <Badge variant="destructive" className="animate-pulse">
                          URGENT
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm">
                      {task.description}
                    </CardDescription>
                  </div>
                  <div className="text-right space-y-2">
                    <Badge className={getUrgencyColor(task.urgency)}>
                      {task.urgency}
                    </Badge>
                    <div className="text-lg font-bold text-warning">
                      +{task.rewardPoints} pts
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Senior Info */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <User className="h-10 w-10 p-2 bg-primary text-primary-foreground rounded-full" />
                    <div>
                      <p className="font-medium">{task.senior.name}, {task.senior.age}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Star className="h-3 w-3 text-warning fill-current" />
                        <span>{task.senior.rating}</span>
                        <span>•</span>
                        <MapPin className="h-3 w-3" />
                        <span>{task.senior.location} ({task.senior.distance})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">Volunteers needed: {task.volunteersNeeded}</p>
                    <p className="text-muted-foreground">Posted {task.datePosted}</p>
                  </div>
                </div>

                {/* Task Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Duration: {task.duration}</p>
                      <p className="text-muted-foreground">{task.timeWindow} window</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Preferred Time:</p>
                      <p className="text-muted-foreground">{task.preferredTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Skills needed:</p>
                      <p className="text-muted-foreground">{task.skillsRequired.join(", ")}</p>
                    </div>
                  </div>
                </div>

                {/* Special Notes */}
                {task.specialNotes && (
                  <div className="p-3 bg-card rounded-lg border-l-4 border-primary">
                    <h5 className="text-sm font-medium mb-1">Special Notes:</h5>
                    <p className="text-sm text-muted-foreground">{task.specialNotes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{task.title}</DialogTitle>
                          <DialogDescription>Complete task information</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Full Description</h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><span className="font-medium">Category:</span> {task.category}</div>
                            <div><span className="font-medium">Duration:</span> {task.duration}</div>
                            <div><span className="font-medium">Volunteers needed:</span> {task.volunteersNeeded}</div>
                            <div><span className="font-medium">Reward points:</span> {task.rewardPoints}</div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Required Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {task.skillsRequired.map((skill, index) => (
                                <Badge key={index} variant="outline">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Senior Information</h4>
                            <div className="text-sm space-y-1">
                              <p><span className="font-medium">Name:</span> {task.senior.name}, {task.senior.age} years old</p>
                              <p><span className="font-medium">Rating:</span> {task.senior.rating}/5.0</p>
                              <p><span className="font-medium">Location:</span> {task.senior.location} ({task.senior.distance} away)</p>
                            </div>
                          </div>
                          {task.specialNotes && (
                            <div>
                              <h4 className="font-medium mb-2">Special Notes</h4>
                              <p className="text-sm text-muted-foreground">{task.specialNotes}</p>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="outline" size="sm" onClick={() => handleRequestMoreInfo(task.id)}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      More Info
                    </Button>

                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      Contact Senior
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline">
                      Save for Later
                    </Button>
                    <Button onClick={() => handleAcceptTask(task.id)} className="bg-success hover:bg-success/90">
                      <Heart className="h-4 w-4 mr-2" />
                      Accept Task
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No Tasks Found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or check back later for new opportunities.
              </p>
              <Button variant="outline">Clear Filters</Button>
            </CardContent>
          </Card>
        )}

        {/* Help Text */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">💡 Tips for Accepting Tasks:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Read the full description and special notes carefully</li>
              <li>• Make sure you have the required skills and availability</li>
              <li>• Consider the distance and transportation time</li>
              <li>• Don't hesitate to ask for more information if needed</li>
              <li>• Urgent tasks earn bonus points and help seniors in immediate need</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </VolunteerLayout>
  );
};

export default VolunteerAvailableTasks;