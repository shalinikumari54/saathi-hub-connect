import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Heart, 
  Calendar, 
  MessageSquare, 
  MapPin, 
  Phone,
  Star,
  Plus,
  User,
  DollarSign
} from "lucide-react";
import SeniorLayout from "@/components/layout/SeniorLayout";

const SeniorDashboard = () => {
  const [activeTasks] = useState([
    { 
      id: 1, 
      title: "Grocery Shopping", 
      volunteer: "John Doe", 
      status: "in-progress", 
      time: "2:30 PM",
      estimatedDuration: "1 hour",
      location: "Walmart Supercenter"
    },
    { 
      id: 2, 
      title: "Medical Appointment", 
      volunteer: "Sarah Wilson", 
      status: "scheduled", 
      time: "Tomorrow 10:00 AM",
      estimatedDuration: "2 hours",
      location: "City Medical Center"
    }
  ]);

  const [upcomingEvents] = useState([
    { id: 1, title: "Community Lunch", date: "Dec 25", time: "12:00 PM", volunteers: 8 },
    { id: 2, title: "Book Club Meeting", date: "Dec 28", time: "3:00 PM", volunteers: 3 }
  ]);

  const [donations] = useState([
    { id: 1, item: "Winter Coat", status: "approved", donor: "Mike Chen", date: "Dec 20" },
    { id: 2, item: "Groceries", status: "pending", amount: "$50", date: "Dec 22" }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in-progress": return "bg-blue-500";
      case "scheduled": return "bg-yellow-500";
      case "approved": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <SeniorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back, Mary!</h1>
            <p className="text-muted-foreground">Here's what's happening today</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Emergency
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Request Help
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">1 in progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Unread</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{donations.length}</div>
              <p className="text-xs text-muted-foreground">Recent</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="tasks" className="space-y-4">
          <TabsList>
            <TabsTrigger value="tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="volunteers">My Volunteers</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="grid gap-4">
              {activeTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{task.volunteer}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{task.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{task.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Estimated duration: {task.estimatedDuration}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        {task.status === "in-progress" && (
                          <Button variant="outline" size="sm">
                            <MapPin className="h-4 w-4 mr-2" />
                            Track
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center p-8">
                  <Button variant="outline" className="h-20 w-full">
                    <Plus className="h-6 w-6 mr-2" />
                    Request New Task
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <div className="grid gap-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          <span>{event.date} at {event.time}</span>
                          <Badge variant="secondary">
                            {event.volunteers} volunteers signed up
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center p-8">
                  <Button variant="outline" className="h-20 w-full">
                    <Plus className="h-6 w-6 mr-2" />
                    Schedule New Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-4">
            <div className="grid gap-4">
              {donations.map((donation) => (
                <Card key={donation.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {donation.item || `$${donation.amount}`}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          {donation.donor && <span>From: {donation.donor}</span>}
                          <span>Requested: {donation.date}</span>
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(donation.status)}`} />
                          <span className="capitalize">{donation.status}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed">
                <CardContent className="flex items-center justify-center p-8">
                  <Button variant="outline" className="h-20 w-full">
                    <Plus className="h-6 w-6 mr-2" />
                    Request Donation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Helping Volunteers</CardTitle>
                  <CardDescription>Volunteers who have helped you the most</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["John Doe", "Sarah Wilson", "Mike Chen"].map((volunteer, index) => (
                      <div key={volunteer} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {volunteer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium">{volunteer}</p>
                            <p className="text-sm text-muted-foreground">
                              {12 - index * 3} tasks completed
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">4.{9 - index}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SeniorLayout>
  );
};

export default SeniorDashboard;